/* ==========================================================================
   Image template generator. One page, three templates, no server.

   Exports run in the browser: PNG and JPG through modern-screenshot, which
   draws the template's own DOM, so the image is the preview pixel for pixel.
   Code exports come from the same template tree through render.js.
   ========================================================================== */

import { TEMPLATES, FONT_CSS_URL, frameImage, monthYear } from './templates.js';
import { render } from './render.js';
import { fileToCanvas, hasTransparency, removeBackground, trim, canvasToBlob } from './cutout.js';

const SCREENSHOT = 'https://cdn.jsdelivr.net/npm/modern-screenshot@4.7.0/+esm';
const FFLATE = 'https://cdn.jsdelivr.net/npm/fflate@0.8.2/+esm';
const TAILWIND_CDN = 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4.1.18';
const STORE_KEY = 'pb-image-templates-v1';
const PREVIEW_MAX = { 'podcast-card': 540, 'episode-cover': 780, 'newsletter-hero': 640 };
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const $ = (id) => document.getElementById(id);
const els = {
  tabs: $('tabs'), fields: $('fields'), host: $('host'), stageScroll: $('stageScroll'), status: $('status'),
  scale: $('scale'), png: $('png'), jpg: $('jpg'), code: $('code'), reset: $('reset'),
  dialog: $('codeDialog'), codeBlocks: $('codeBlocks'), codeNote: $('codeNote'), zip: $('zip'), codeClose: $('codeClose'),
};

/* --- State --------------------------------------------------------------- */

const states = {};
const scaleChoice = {};
const blobNames = new Map();
let activeId = TEMPLATES[0].id;
let selectedLayer = -1;
let removeBg = true;
let flavour = 'css';

const tpl = () => TEMPLATES.find((t) => t.id === activeId);
const st = () => states[activeId];
const getPath = (o, p) => p.split('.').reduce((a, k) => (a == null ? a : a[k]), o);
function setPath(o, p, v) {
  const ks = p.split('.');
  const last = ks.pop();
  ks.reduce((a, k) => a[k], o)[last] = v;
}

function merge(def, saved) {
  if (!saved || typeof saved !== 'object') return def;
  const out = Array.isArray(def) ? def.slice() : { ...def };
  for (const k of Object.keys(saved)) {
    if (k.startsWith('_')) continue;
    const sv = saved[k];
    const dv = def[k];
    if (dv && typeof dv === 'object' && sv && typeof sv === 'object') out[k] = merge(dv, sv);
    else if (sv !== undefined && (dv === undefined || typeof sv === typeof dv)) out[k] = sv;
  }
  return out;
}

/** Uploaded photos live in object URLs that die with the tab, so they are not saved. */
function sanitize(v, d) {
  if (Array.isArray(v)) return v.map((x, i) => sanitize(x, d && d[i]));
  if (v && typeof v === 'object') {
    if (typeof v.src === 'string' && v.src.startsWith('blob:')) return d;
    const o = {};
    for (const k of Object.keys(v)) if (!k.startsWith('_')) o[k] = sanitize(v[k], d && d[k]);
    return o;
  }
  return v;
}

function load() {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); } catch { saved = {}; }
  for (const t of TEMPLATES) states[t.id] = merge(t.defaults(), saved.states && saved.states[t.id]);

  // The newsletter always opens on the current month. A custom eyebrow keeps its wording.
  const hero = states['newsletter-hero'];
  const fresh = TEMPLATES.find((t) => t.id === 'newsletter-hero').defaults();
  const m = /^([A-Z][a-z]+ \d{4})(.*)$/.exec(hero.eyebrow || '');
  hero.month = fresh.month;
  if (m && MONTH_NAMES.includes(m[1].split(' ')[0])) hero.eyebrow = monthYear(fresh.month) + m[2];

  const fromUrl = new URLSearchParams(location.search).get('t');
  const pick = fromUrl || saved.active;
  if (pick && TEMPLATES.some((t) => t.id === pick)) activeId = pick;
}

let saveTimer;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      const out = {};
      for (const t of TEMPLATES) out[t.id] = sanitize(states[t.id], t.defaults());
      localStorage.setItem(STORE_KEY, JSON.stringify({ active: activeId, states: out }));
    } catch { /* private mode or full storage: the tool still works, it just forgets */ }
  }, 400);
}

/* --- Status -------------------------------------------------------------- */

let statusTimer;
function status(msg, { error = false, sticky = false } = {}) {
  clearTimeout(statusTimer);
  els.status.textContent = msg || '';
  els.status.classList.toggle('is-error', error);
  if (msg && !sticky) statusTimer = setTimeout(() => { els.status.textContent = ''; }, error ? 9000 : 4000);
}

function busy(on) {
  for (const b of [els.png, els.jpg, els.code, els.zip]) b.disabled = on;
}

/* --- Tabs ---------------------------------------------------------------- */

function renderTabs() {
  els.tabs.innerHTML = TEMPLATES.map((t) => `<button type="button" class="tab" role="tab" id="tab-${t.id}" data-id="${t.id}" aria-selected="${t.id === activeId}" tabindex="${t.id === activeId ? 0 : -1}"><strong>${t.label}</strong><small>${t.sub}</small></button>`).join('');
}

function activate(id) {
  activeId = id;
  selectedLayer = -1;
  renderTabs();
  renderFields();
  renderScale();
  renderPreview();
  save();
}

els.tabs.addEventListener('click', (e) => {
  const b = e.target.closest('.tab');
  if (b && b.dataset.id !== activeId) activate(b.dataset.id);
});
els.tabs.addEventListener('keydown', (e) => {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
  const i = TEMPLATES.findIndex((t) => t.id === activeId);
  const next = TEMPLATES[(i + (e.key === 'ArrowRight' ? 1 : TEMPLATES.length - 1)) % TEMPLATES.length];
  activate(next.id);
  document.getElementById(`tab-${next.id}`).focus();
});

/* --- Fields -------------------------------------------------------------- */

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
}

function button(text, cls, onClick) {
  const b = el('button', cls, text);
  b.type = 'button';
  b.addEventListener('click', onClick);
  return b;
}

function fileButton(text, cls, onFile) {
  const wrap = el('span', `btn file-btn ${cls || ''}`);
  wrap.append(el('span', '', text));
  const input = el('input');
  input.type = 'file';
  input.accept = 'image/png,image/jpeg,image/webp,image/avif,image/heic';
  input.setAttribute('aria-label', text);
  input.addEventListener('change', () => {
    const f = input.files && input.files[0];
    input.value = '';
    if (f) onFile(f);
  });
  wrap.append(input);
  return wrap;
}

function renderFields() {
  const t = tpl();
  const s = st();
  els.fields.replaceChildren(...t.fields.map((f) => field(f, s)));
  syncGroups();
}

function syncGroups() {
  const s = st();
  els.fields.querySelectorAll('.group[data-when]').forEach((g) => { g.hidden = !getPath(s, g.dataset.when); });
}

function field(f, s) {
  if (f.type === 'row') { const d = el('div', 'row'); d.append(...f.fields.map((x) => field(x, s))); return d; }
  if (f.type === 'heading') return el('h3', 'section-heading', f.label);
  if (f.type === 'group') { const d = el('div', 'group'); d.dataset.when = f.when; d.append(...f.fields.map((x) => field(x, s))); return d; }
  if (f.type === 'image') return imageControl(f, s);
  if (f.type === 'people') return peopleControl(s);
  if (f.type === 'month') return monthControl(f, s);

  if (f.type === 'checkbox') {
    const lab = el('label', 'check');
    const input = el('input');
    input.type = 'checkbox';
    input.checked = !!getPath(s, f.key);
    input.addEventListener('change', () => {
      setPath(s, f.key, input.checked);
      if (f.key === 'third' && input.checked) selectedLayer = 2;
      if (f.key === 'third' && !input.checked && selectedLayer > 1) selectedLayer = -1;
      syncGroups();
      refreshPeople();
      update();
    });
    lab.append(input, el('span', '', f.label));
    return lab;
  }

  const wrap = el('label', 'field');
  wrap.append(el('span', 'field-label', f.label));
  let input;
  if (f.type === 'textarea') {
    input = el('textarea');
    input.rows = f.rows || 3;
  } else {
    input = el('input', 'input');
    input.type = f.type === 'date' ? 'date' : 'text';
  }
  input.value = getPath(s, f.key) ?? '';
  input.dataset.key = f.key;
  if (f.placeholder) input.placeholder = f.placeholder;
  input.addEventListener('input', () => {
    setPath(s, f.key, input.value);
    if (f.key.startsWith('people.')) refreshPeopleTitles();
    update();
  });
  let control = input;
  if (f.prefix || f.suffix) {
    control = el('span', 'affix');
    if (f.prefix) control.append(el('span', 'affix-text', f.prefix));
    control.append(input);
    if (f.suffix) control.append(el('span', 'affix-text', f.suffix));
  }
  wrap.append(control);
  if (f.hint) wrap.append(el('p', 'hint', f.hint));
  return wrap;
}

/** Month and year as two selects; input[type=month] is missing in Firefox and Safari. */
function monthControl(f, s) {
  const wrap = el('div', 'field');
  wrap.append(el('span', 'field-label', f.label));
  const row = el('div', 'row');
  const [y0, m0] = String(getPath(s, f.key)).split('-').map(Number);
  const month = el('select');
  month.setAttribute('aria-label', 'Month');
  month.innerHTML = MONTH_NAMES.map((n, i) => `<option value="${i + 1}" ${i + 1 === m0 ? 'selected' : ''}>${n}</option>`).join('');
  const year = el('select');
  year.setAttribute('aria-label', 'Year');
  const now = new Date().getFullYear();
  for (let y = now - 2; y <= now + 2; y++) year.insertAdjacentHTML('beforeend', `<option ${y === y0 ? 'selected' : ''}>${y}</option>`);
  const change = () => {
    const prev = monthYear(getPath(s, f.key));
    const nextValue = `${year.value}-${String(month.value).padStart(2, '0')}`;
    const next = monthYear(nextValue);
    if (prev && s.eyebrow && s.eyebrow.startsWith(prev)) {
      s.eyebrow = next + s.eyebrow.slice(prev.length);
      const eb = els.fields.querySelector('[data-key="eyebrow"]');
      if (eb) eb.value = s.eyebrow;
    }
    setPath(s, f.key, nextValue);
    update();
  };
  month.addEventListener('change', change);
  year.addEventListener('change', change);
  row.append(month, year);
  wrap.append(row);
  if (f.hint) wrap.append(el('p', 'hint', f.hint));
  return wrap;
}

function update() {
  const s = st();
  delete s._fit;
  delete s._titleFit;
  renderPreview();
  save();
}

/* --- Image controls (background, avatar) --------------------------------- */

async function loadFrameImage(file, maxEdge) {
  const canvas = await fileToCanvas(file, maxEdge);
  const transparent = hasTransparency(canvas);
  const blob = await canvasToBlob(canvas, transparent ? 'image/png' : 'image/jpeg', 0.9);
  const url = URL.createObjectURL(blob);
  const base = (file.name || 'image').replace(/\.[^.]+$/, '').replace(/[^\w-]+/g, '-').toLowerCase() || 'image';
  blobNames.set(url, `${base}.${transparent ? 'png' : 'jpg'}`);
  return { src: url, w: canvas.width, h: canvas.height };
}

function imageControl(f, s) {
  const t = tpl();
  const wrap = el('div', 'field');
  wrap.append(el('span', 'field-label', f.label));
  const box = el('div', 'imgctl');
  const thumb = el('div', `thumb${f.key === 'avatar' ? ' is-round' : ''}`);
  const paint = () => { thumb.style.backgroundImage = `url("${getPath(s, f.key).src}")`; };
  paint();
  const right = el('div', 'person-body');
  const actions = el('div', 'imgctl-actions');
  const zoom = el('input');
  zoom.type = 'range';
  zoom.min = '1';
  zoom.max = '3';
  zoom.step = '0.01';
  zoom.value = String(getPath(s, f.view).zoom || 1);
  zoom.dataset.zoomFor = f.view;
  zoom.addEventListener('input', () => { getPath(s, f.view).zoom = Number(zoom.value); renderPreview(); save(); });

  actions.append(
    fileButton('Upload', 'btn-sm', async (file) => {
      status('Loading image', { sticky: true });
      try {
        setPath(s, f.key, await loadFrameImage(file, f.key === 'avatar' ? 800 : 2400));
        setPath(s, f.view, { zoom: 1, x: 0, y: 0 });
        zoom.value = '1';
        paint();
        update();
        status('Image added. Drag it in the preview to reposition.');
      } catch (e) {
        console.error(e);
        status('That image could not be read. Try a JPG or PNG.', { error: true });
      }
    }),
    button('Reset', 'btn btn-sm btn-quiet', () => {
      setPath(s, f.key, t.defaults()[f.key]);
      setPath(s, f.view, { zoom: 1, x: 0, y: 0 });
      zoom.value = '1';
      paint();
      update();
    }),
  );
  const slider = el('label', 'slider');
  slider.append(el('span', '', 'Zoom'), zoom);
  right.append(actions, slider);
  box.append(thumb, right);
  wrap.append(box);
  if (f.hint) wrap.append(el('p', 'hint', f.hint));
  return wrap;
}

/* --- People (episode cover) ---------------------------------------------- */

let peopleRoot = null;

function peopleControl(s) {
  peopleRoot = el('div', 'people');
  const opt = el('label', 'check');
  const cb = el('input');
  cb.type = 'checkbox';
  cb.checked = removeBg;
  cb.addEventListener('change', () => { removeBg = cb.checked; });
  opt.append(cb, el('span', '', 'Remove photo backgrounds automatically'));
  const hint = el('p', 'hint', 'Click a person in the preview to select them, drag to move, scroll to resize, arrow keys to nudge. Backgrounds are removed in your browser; nothing is uploaded.');
  const list = el('div', 'people');
  list.dataset.list = '';
  peopleRoot.append(opt, list, hint);
  refreshPeople();
  return peopleRoot;
}

function refreshPeople() {
  if (!peopleRoot || activeId !== 'episode-cover') return;
  const s = st();
  const t = tpl();
  const list = peopleRoot.querySelector('[data-list]');
  const count = s.third ? 3 : 2;
  list.replaceChildren(...s.layers.slice(0, count).map((layer, i) => {
    const row = el('div', `person${i === selectedLayer ? ' is-selected' : ''}`);
    row.dataset.layer = i;
    row.addEventListener('click', (e) => { if (!e.target.closest('button, input, .file-btn')) selectLayer(i); });
    const thumb = el('div', 'thumb is-cutout');
    if (layer.src) thumb.style.backgroundImage = `url("${layer.src}")`;
    const body = el('div', 'person-body');
    const title = el('div', 'person-title');
    title.append(el('strong', '', `${i === 0 ? 'With' : 'And'}`), el('span', '', s.people[i].name));
    const actions = el('div', 'imgctl-actions');
    const msg = el('p', 'person-status');
    actions.append(
      fileButton(layer.src ? 'Replace photo' : 'Add photo', 'btn-sm', (file) => uploadPerson(i, file, msg)),
      button('Flip', 'btn btn-sm', () => { layer.flip = !layer.flip; selectLayer(i); renderPreview(); save(); }),
      button('Forward', 'btn btn-sm', () => { restack(i, 1); }),
      button('Back', 'btn btn-sm', () => { restack(i, -1); }),
      button('Reset', 'btn btn-sm btn-quiet', () => {
        s.layers[i] = { ...t.defaults().layers[i] };
        refreshPeople();
        renderPreview();
        save();
      }),
    );
    const size = el('input');
    size.type = 'range';
    size.min = '250';
    size.max = '1800';
    size.step = '1';
    size.value = String(Math.round(layer.height));
    size.dataset.sizeFor = i;
    size.addEventListener('input', () => { resizeLayer(i, Number(size.value)); });
    const slider = el('label', 'slider');
    slider.append(el('span', '', 'Size'), size);
    body.append(title, actions, slider, msg);
    row.append(thumb, body);
    return row;
  }));
}

function refreshPeopleTitles() {
  if (!peopleRoot) return;
  const s = st();
  peopleRoot.querySelectorAll('.person').forEach((row) => {
    const span = row.querySelector('.person-title span');
    if (span) span.textContent = s.people[Number(row.dataset.layer)].name;
  });
}

function selectLayer(i) {
  selectedLayer = i;
  if (peopleRoot) peopleRoot.querySelectorAll('.person').forEach((r) => r.classList.toggle('is-selected', Number(r.dataset.layer) === i));
  markSelection();
}

function markSelection() {
  els.host.querySelectorAll('[data-ui-person]').forEach((n) => n.classList.toggle('is-selected', activeId === 'episode-cover' && Number(n.dataset.uiPerson) === selectedLayer));
}

function restack(i, dir) {
  const s = st();
  const count = s.third ? 3 : 2;
  const order = s.layers.slice(0, count).map((l, k) => k).sort((a, b) => s.layers[a].z - s.layers[b].z);
  const pos = order.indexOf(i);
  const to = Math.min(order.length - 1, Math.max(0, pos + dir));
  order.splice(pos, 1);
  order.splice(to, 0, i);
  order.forEach((k, z) => { s.layers[k].z = z + 1; });
  selectLayer(i);
  renderPreview();
  save();
}

/** Resize around the layer's bottom centre, so feet stay on the floor. */
function resizeLayer(i, height) {
  const l = st().layers[i];
  const cx = l.x + (l.height * l.w / l.h) / 2;
  const bottom = l.y + l.height;
  l.height = Math.max(150, Math.min(2400, height));
  l.x = cx - (l.height * l.w / l.h) / 2;
  l.y = bottom - l.height;
  renderPreview();
  save();
}

async function uploadPerson(i, file, msg) {
  const s = st();
  const layer = s.layers[i];
  const say = (text) => { msg.textContent = text; status(text, { sticky: true }); };
  selectLayer(i);
  busy(true);
  try {
    say('Reading photo');
    let canvas = await fileToCanvas(file, 2000);
    if (hasTransparency(canvas)) canvas = trim(canvas);
    else if (removeBg) canvas = await removeBackground(canvas, say);
    const blob = await canvasToBlob(canvas, 'image/png');
    const url = URL.createObjectURL(blob);
    blobNames.set(url, `person-${i + 1}.png`);
    const cx = layer.x + (layer.height * layer.w / layer.h) / 2;
    const bottom = layer.y + layer.height;
    Object.assign(layer, { src: url, w: canvas.width, h: canvas.height });
    layer.x = cx - (layer.height * layer.w / layer.h) / 2;
    layer.y = bottom - layer.height;
    msg.textContent = '';
    status('Photo added. Drag it in the preview to position it.');
    refreshPeople();
    renderPreview();
  } catch (e) {
    console.error(e);
    say('');
    status('The background could not be removed in this browser. Try Chrome or Edge, or upload a PNG that is already cut out.', { error: true });
  } finally {
    busy(false);
  }
}

/* --- Preview ------------------------------------------------------------- */

function sizeHost() {
  const t = tpl();
  const area = els.stageScroll.getBoundingClientRect();
  const cs = getComputedStyle(els.stageScroll);
  const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
  const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
  let w = Math.min(area.width - padX, PREVIEW_MAX[t.id] || 720);
  if (t.H) w = Math.min(w, ((area.height - padY) * t.W) / t.H);
  els.host.style.width = `${Math.max(200, Math.floor(w))}px`;
}

function renderPreview() {
  const t = tpl();
  const s = st();
  sizeHost();
  for (let i = 0; i < 14; i++) {
    els.host.innerHTML = render(t.build(s), 'preview', { W: t.W, prefix: t.prefix }).html;
    const more = t.fit && t.fit(els.host, s);
    if (!more) break;
    Object.assign(s, more);
  }
  markSelection();
}

const cqw = (px) => `${(px / tpl().W) * 100}cqw`;

els.host.addEventListener('pointerdown', (e) => {
  const t = tpl();
  const s = st();
  const ratio = t.W / els.host.getBoundingClientRect().width;
  const person = e.target.closest('[data-ui-person]');
  const frame = !person && e.target.closest('[data-ui-drag]');
  if (!person && !frame) return;
  e.preventDefault();
  const sx = e.clientX;
  const sy = e.clientY;
  let move;

  if (person) {
    const i = Number(person.dataset.uiPerson);
    selectLayer(i);
    const layer = s.layers[i];
    const ox = layer.x;
    const oy = layer.y;
    move = (ev) => {
      layer.x = ox + (ev.clientX - sx) * ratio;
      layer.y = oy + (ev.clientY - sy) * ratio;
      person.style.left = cqw(layer.x);
      person.style.top = cqw(layer.y);
    };
  } else {
    const key = frame.dataset.uiDrag;
    const view = s[`${key}View`];
    const size = key === 'avatar' ? [60, 60] : [t.W, t.H];
    const img = frame.querySelector('img');
    const start = frameImage(size[0], size[1], s[key], view);
    move = (ev) => {
      view.x = start.x + (ev.clientX - sx) * ratio;
      view.y = start.y + (ev.clientY - sy) * ratio;
      const r = frameImage(size[0], size[1], s[key], view);
      view.x = r.x;
      view.y = r.y;
      img.style.left = cqw(r.left);
      img.style.top = cqw(r.top);
    };
  }

  const target = e.target;
  try { target.setPointerCapture(e.pointerId); } catch { /* not all nodes can capture */ }
  const up = () => {
    target.removeEventListener('pointermove', move);
    target.removeEventListener('pointerup', up);
    target.removeEventListener('pointercancel', up);
    renderPreview();
    save();
  };
  target.addEventListener('pointermove', move);
  target.addEventListener('pointerup', up);
  target.addEventListener('pointercancel', up);
});

els.host.addEventListener('wheel', (e) => {
  const s = st();
  const person = e.target.closest('[data-ui-person]');
  const frame = !person && e.target.closest('[data-ui-drag]');
  if (!person && !frame) return;
  e.preventDefault();
  const k = Math.exp(-e.deltaY * 0.0015);
  if (person) {
    const i = Number(person.dataset.uiPerson);
    selectLayer(i);
    resizeLayer(i, s.layers[i].height * k);
    const slider = peopleRoot && peopleRoot.querySelector(`[data-size-for="${i}"]`);
    if (slider) slider.value = String(Math.round(s.layers[i].height));
  } else {
    const key = frame.dataset.uiDrag;
    const view = s[`${key}View`];
    view.zoom = Math.min(3, Math.max(1, (view.zoom || 1) * k));
    const slider = els.fields.querySelector(`[data-zoom-for="${key}View"]`);
    if (slider) slider.value = String(view.zoom);
    renderPreview();
    save();
  }
}, { passive: false });

document.addEventListener('keydown', (e) => {
  if (activeId !== 'episode-cover' || !/^Arrow/.test(e.key)) return;
  if (e.target.closest('input, textarea, select, [role="tab"]')) return;
  const l = st().layers[selectedLayer];
  if (!l) return;
  const step = e.shiftKey ? 20 : 4;
  if (e.key === 'ArrowLeft') l.x -= step;
  if (e.key === 'ArrowRight') l.x += step;
  if (e.key === 'ArrowUp') l.y -= step;
  if (e.key === 'ArrowDown') l.y += step;
  e.preventDefault();
  renderPreview();
  save();
});

/* --- Image export -------------------------------------------------------- */

function renderScale() {
  const t = tpl();
  const chosen = scaleChoice[t.id] ?? t.defaultScale;
  els.scale.innerHTML = t.scales.map((k, i) => {
    const w = Math.round(t.W * k);
    const label = (t.scaleLabels && t.scaleLabels[i]) || `${k}x, ${w} × ${t.H ? Math.round(t.H * k) : 'auto'}`;
    return `<option value="${k}" ${k === chosen ? 'selected' : ''}>${label}</option>`;
  }).join('');
}
els.scale.addEventListener('change', () => { scaleChoice[activeId] = Number(els.scale.value); });

let screenshotLib;
const screenshot = () => (screenshotLib ||= import(SCREENSHOT));

const blobToDataUrl = (blob) => new Promise((resolve, reject) => {
  const r = new FileReader();
  r.onload = () => resolve(r.result);
  r.onerror = reject;
  r.readAsDataURL(blob);
});

/** The latin subset of the three faces, inlined, so exported images carry their fonts. */
let fontCss;
function fontEmbedCss() {
  fontCss ||= (async () => {
    const css = await (await fetch(FONT_CSS_URL)).text();
    const blocks = [];
    const re = /\/\*\s*([\w-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g;
    let m;
    while ((m = re.exec(css))) if (m[1] === 'latin') blocks.push(m[2]);
    const out = await Promise.all(blocks.map(async (b) => {
      const url = /url\((['"]?)([^'")]+)\1\)/.exec(b);
      if (!url) return b;
      const data = await blobToDataUrl(await (await fetch(url[2])).blob());
      return b.replace(url[2], data);
    }));
    return out.join('\n');
  })();
  fontCss.catch(() => { fontCss = null; });
  return fontCss;
}

function slug(v) { return String(v || '').toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, ''); }

function exportName(t, s) {
  if (t.id === 'podcast-card') return `propertybuyer-podcast-card-ep-${slug(s.episode)}`;
  if (t.id === 'episode-cover') return `propertybuyer-${slug(s.episode) || 'episode'}-cover`;
  return `propertybuyer-newsletter-hero-${slug(monthYear(s.month))}`;
}

async function waitForImages(root) {
  await Promise.all([...root.querySelectorAll('img')].map((img) => (img.complete ? img.decode().catch(() => {}) : new Promise((r) => { img.onload = img.onerror = r; }))));
}

async function exportImage(kind) {
  const t = tpl();
  const s = st();
  busy(true);
  status('Preparing your image', { sticky: true });
  const holder = document.createElement('div');
  try {
    const [{ domToPng, domToJpeg }, cssText] = await Promise.all([screenshot(), fontEmbedCss().catch(() => undefined)]);
    holder.setAttribute('aria-hidden', 'true');
    holder.style.cssText = `position:fixed;left:-${t.W + 200}px;top:0;width:${t.W}px;container-type:inline-size;pointer-events:none;`;
    holder.innerHTML = render(t.build(s), 'preview', { W: t.W, prefix: t.prefix, skipUi: true }).html;
    document.body.append(holder);
    const node = holder.firstElementChild;
    await document.fonts.ready;
    await waitForImages(node);
    const scale = Number(els.scale.value) || 1;
    // Whole design pixels, so a 448-high card exports at exactly 896, not 895.
    const width = t.W;
    const height = t.H || Math.round(node.getBoundingClientRect().height);
    const opts = {
      width,
      height,
      scale,
      quality: 0.92,
      backgroundColor: kind === 'jpg' ? '#FFFFFF' : null,
      font: cssText ? { cssText } : undefined,
      timeout: 30000,
    };
    const url = kind === 'png' ? await domToPng(node, opts) : await domToJpeg(node, opts);
    const w = Math.round(width * scale);
    const hgt = Math.round(height * scale);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${exportName(t, s)}-${w}x${hgt}.${kind}`;
    document.body.append(a);
    a.click();
    a.remove();
    status(`Saved ${kind.toUpperCase()}, ${w} × ${hgt}.`);
  } catch (e) {
    console.error(e);
    status('The image could not be created. Check your connection and try again.', { error: true });
  } finally {
    holder.remove();
    busy(false);
  }
}

els.png.addEventListener('click', () => exportImage('png'));
els.jpg.addEventListener('click', () => exportImage('jpg'));

/* --- Code export --------------------------------------------------------- */

const FONT_LINK = `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="${FONT_CSS_URL.replace(/&/g, '&amp;')}">`;

function buildCode(t, s, kind) {
  const files = new Map();
  const taken = new Set();
  const mapSrc = (src) => {
    if (!files.has(src)) {
      let name = blobNames.get(src)
        || (src.startsWith('img/') ? src.slice(4) : null)
        || (/^https?:/.test(src) ? 'background.jpg' : 'image.png');
      const base = name;
      let n = 2;
      while (taken.has(name)) name = base.replace(/(\.\w+)$/, `-${n++}$1`);
      taken.add(name);
      files.set(src, `images/${name}`);
    }
    return files.get(src);
  };
  const r = render(t.build(s), kind, { W: t.W, prefix: t.prefix, src: mapSrc, skipUi: true, pretty: true, indent: '  ' });
  const scales = 'It scales to the width of whatever holds it, like an image, and the text stays live.';
  if (kind === 'css') {
    const html = `<div class="${t.prefix}">\n  ${r.html}\n</div>`;
    const css = [
      `/* Propertybuyer ${t.label.toLowerCase()}. ${scales} */`,
      `.${t.prefix} {\n  container-type: inline-size;\n  width: 100%;\n}`,
      `.${t.prefix} *,\n.${t.prefix} *::before,\n.${t.prefix} *::after {\n  box-sizing: border-box;\n}`,
      r.css,
    ].join('\n\n');
    return { html, css, files };
  }
  const html = `<div class="w-full [container-type:inline-size]">\n  ${r.html}\n</div>`;
  return { html, css: '', files };
}

function codeBlock(title, code) {
  const wrap = el('div', 'code-block');
  const head = el('div', 'code-block-head');
  head.append(el('span', '', title), button('Copy', 'btn btn-sm', async (e) => {
    try {
      await navigator.clipboard.writeText(code);
      e.target.textContent = 'Copied';
      setTimeout(() => { e.target.textContent = 'Copy'; }, 1600);
    } catch { status('Copy is blocked in this browser. Select the code and copy it by hand.', { error: true }); }
  }));
  const pre = el('pre');
  pre.append(el('code', '', code));
  wrap.append(head, pre);
  return wrap;
}

function renderCode() {
  const t = tpl();
  const s = st();
  const { html, css, files } = buildCode(t, s, flavour);
  els.dialog.querySelectorAll('.seg button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.flavour === flavour)));
  els.codeNote.textContent = `${files.size} image${files.size === 1 ? '' : 's'} referenced from an images folder. Download the .zip for the images and a ready-to-open demo page.`
    + (flavour === 'tailwind' ? ' Works with Tailwind 3 and 4.' : '');
  const blocks = [codeBlock('In the page head (fonts)', FONT_LINK), codeBlock('HTML', html)];
  if (css) blocks.push(codeBlock('CSS', css));
  els.codeBlocks.replaceChildren(...blocks);
}

els.code.addEventListener('click', () => { renderCode(); els.dialog.showModal(); });
els.codeClose.addEventListener('click', () => els.dialog.close());
els.dialog.addEventListener('click', (e) => { if (e.target === els.dialog) els.dialog.close(); });
els.dialog.querySelectorAll('.seg button').forEach((b) => b.addEventListener('click', () => { flavour = b.dataset.flavour; renderCode(); }));

function demoPage(t, html, kind) {
  const head = kind === 'css' ? '<link rel="stylesheet" href="styles.css">' : `<script src="${TAILWIND_CDN}"></script>`;
  return `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Propertybuyer ${t.label.toLowerCase()}</title>
${FONT_LINK}
${head}
<style>body { margin: 0; padding: 40px 16px; background: #f5f1e9; } .demo { max-width: ${t.id === 'episode-cover' ? 720 : t.W}px; margin: 0 auto; }</style>
</head>
<body>
<div class="demo">
${html}
</div>
</body>
</html>
`;
}

els.zip.addEventListener('click', async () => {
  const t = tpl();
  const s = st();
  busy(true);
  status('Building the .zip', { sticky: true });
  try {
    const { zipSync, strToU8 } = await import(FFLATE);
    const { html, css, files } = buildCode(t, s, flavour);
    const entries = {
      'index.html': strToU8(demoPage(t, html, flavour)),
      'snippet.html': strToU8(`<!-- Fonts, in the page head -->\n${FONT_LINK}\n\n<!-- Markup -->\n${html}\n`),
    };
    if (css) entries['styles.css'] = strToU8(css);
    for (const [src, path] of files) entries[path] = new Uint8Array(await (await fetch(src)).arrayBuffer());
    const blob = new Blob([zipSync(entries, { level: 6 })], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${exportName(t, s)}-${flavour === 'css' ? 'html-css' : 'tailwind'}.zip`;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    status('Saved the .zip.');
  } catch (e) {
    console.error(e);
    status('The .zip could not be built. Check your connection and try again.', { error: true });
  } finally {
    busy(false);
  }
});

/* --- Reset and start ----------------------------------------------------- */

els.reset.addEventListener('click', () => {
  const t = tpl();
  if (!window.confirm(`Reset the ${t.label.toLowerCase()} to its starting content? Photos you added will be removed.`)) return;
  states[t.id] = t.defaults();
  selectedLayer = -1;
  renderFields();
  renderPreview();
  save();
});

let resizeFrame;
window.addEventListener('resize', () => {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(sizeHost);
});

load();
renderTabs();
renderFields();
renderScale();
renderPreview();
document.fonts.ready.then(() => { const s = st(); delete s._fit; delete s._titleFit; renderPreview(); });
