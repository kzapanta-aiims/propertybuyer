/* ==========================================================================
   The three templates.

   Every number is a design pixel at the template's own width, measured off
   the client's reference artwork (podcast card 406 wide, episode cover 2000,
   newsletter hero 600, the last one from the Paper frame "Background Image
   (Hero Row)"). render.js turns them into cqw.

   Type: Geist throughout, headings included on the two podcast pieces
   (client direction, 12 Oct 2026, replacing Montserrat). The newsletter
   heading alone keeps the Garamond of its reference, Cormorant Garamond.
   ========================================================================== */

import { h, richText, lines, smartQuotes } from './render.js';

export const FONTS = {
  text: "'Geist', 'Helvetica Neue', Arial, sans-serif",
  headingSerif: "'Cormorant Garamond', Georgia, serif",
};

export const FONT_CSS_URL =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500;1,600&family=Geist:wght@300..800&display=swap';

const COPPER = '#B9795D';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/**
 * Where an image sits inside a frame: scaled to cover, then zoomed and moved
 * by the user. Offsets are clamped so the frame never shows a gap.
 */
export function frameImage(frameW, frameH, img, view = {}) {
  const cover = Math.max(frameW / img.w, frameH / img.h);
  const zoom = Math.max(1, view.zoom || 1);
  const width = img.w * cover * zoom;
  const height = img.h * cover * zoom;
  const maxX = (width - frameW) / 2;
  const maxY = (height - frameH) / 2;
  const x = clamp(view.x || 0, -maxX, maxX);
  const y = clamp(view.y || 0, -maxY, maxY);
  return { left: (frameW - width) / 2 + x, top: (frameH - height) / 2 + y, width, height, x, y };
}

const svg = (html, style, name) => h('span', { name, style: { display: 'block', flexShrink: 0, ...style }, html });

const CLOCK = '<svg viewBox="0 0 16 16" width="100%" height="100%" fill="none" stroke="#FFFFFF" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="6.6"/><path d="M8 4.3V8l2.6 1.7"/></svg>';
const PLAY = '<svg viewBox="0 0 18 20" width="100%" height="100%" aria-hidden="true"><path d="M1 1.2v17.6c0 .8.9 1.3 1.6.9l14.6-8.8c.7-.4.7-1.4 0-1.8L2.6.3C1.9-.1 1 .4 1 1.2Z" fill="#FFFFFF"/></svg>';

function laurel(id, mirrored) {
  const path = 'M7.603 22.386C7.879 22.028 8.138 21.645 8.378 21.239C8.695 20.704 8.975 20.135 9.216 19.539C9.878 19.396 12.646 18.566 14.000 14.519C13.803 14.572 11.190 15.490 9.734 18.015C9.983 17.114 10.152 16.170 10.232 15.203C10.241 15.095 10.249 14.986 10.256 14.878C10.773 14.578 13.223 12.926 13.200 8.573C13.030 8.687 10.827 10.413 10.278 13.301C10.235 12.138 10.062 11.004 9.763 9.937C10.205 9.477 12.071 7.234 10.890 3.089C10.750 3.251 8.953 5.693 9.388 8.805C9.070 7.980 8.648 7.186 8.135 6.433C8.355 5.889 9.231 3.218 6.763 0.000C6.699 0.188 6.015 2.842 7.305 5.348C6.772 4.723 6.171 4.136 5.507 3.594C5.312 3.356 5.096 3.145 4.855 2.951C3.494 1.854 1.751 1.241 0.002 1.243C-0.040 1.791 0.684 2.297 1.064 2.583C1.933 3.237 2.847 3.684 3.910 3.969C4.485 4.124 5.122 4.252 5.729 4.280C6.591 5.047 7.330 5.897 7.929 6.807C7.690 6.560 7.424 6.330 7.132 6.118C6.297 5.514 5.337 5.097 4.346 4.811C4.348 5.016 4.377 5.220 4.430 5.418C4.496 5.663 4.601 5.896 4.717 6.122C5.613 7.877 7.408 9.542 9.386 10.004C9.839 11.611 9.988 13.362 9.852 15.087C9.443 11.548 7.081 9.705 6.891 9.575C6.985 13.778 9.135 15.588 9.749 16.020C9.499 17.798 8.942 19.513 8.094 20.971C8.838 17.234 6.666 14.386 6.504 14.199C5.337 18.454 7.131 20.906 7.721 21.569C6.904 22.793 5.903 23.764 4.750 24.460C6.546 21.405 5.373 18.131 5.279 17.922C3.087 21.358 3.989 23.941 4.341 24.692C3.479 25.151 2.539 25.465 1.532 25.624C1.428 25.640 1.358 25.737 1.374 25.840C1.388 25.933 1.469 26.000 1.561 26.000C1.571 26.000 1.581 25.999 1.591 25.998C3.392 25.714 4.988 24.957 6.316 23.774C6.981 23.890 9.860 24.164 12.648 20.922C12.452 20.898 9.857 20.774 7.602 22.386C7.602 22.386 7.603 22.386 7.603 22.386Z';
  const html = `<svg viewBox="0 0 14 26" width="100%" height="100%" aria-hidden="true" style="overflow:visible"><defs><linearGradient id="${id}" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="#B9795D"/><stop offset="0.15" stop-color="#53362A"/><stop offset="0.51" stop-color="#F8D5C6"/><stop offset="0.86" stop-color="#53362A"/><stop offset="1" stop-color="#B9795D"/></linearGradient></defs><path d="${path}" fill="url(#${id})"/></svg>`;
  return svg(html, { width: 14, height: 26, transform: mirrored ? 'scaleX(-1)' : undefined, filter: 'drop-shadow(0.2px 0.5px 0 #FBDFD2)' }, 'laurel');
}

export function monthYear(ym) {
  const [y, m] = String(ym || '').split('-').map(Number);
  if (!y || !m) return '';
  return `${MONTHS[m - 1]} ${y}`;
}

export function longDate(iso) {
  const [y, m, d] = String(iso || '').split('-').map(Number);
  if (!y || !m || !d) return '';
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

function today() {
  const t = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return { iso: `${t.getFullYear()}-${p(t.getMonth() + 1)}-${p(t.getDate())}`, ym: `${t.getFullYear()}-${p(t.getMonth() + 1)}` };
}

/* ==========================================================================
   1. Cityscape podcast card
   ========================================================================== */

const card = {
  id: 'podcast-card',
  label: 'Podcast card',
  sub: 'Cityscape, 406 × 448',
  W: 406,
  H: 448,
  prefix: 'pb-podcast-card',
  // 4x was dropped 12 Oct 2026: nothing needs it, and the biggest files are the ones browsers fumble.
  scales: [1, 2, 3],
  defaultScale: 2,
  rounded: true,

  defaults() {
    return {
      episode: '121',
      duration: '35 min',
      date: today().iso,
      heading: 'Newcastle’s Next Boom? Where Should Investors Buy Now?',
      name: 'Kevin Mason',
      role: 'Director - Buyer’s Advocate',
      link: '',
      bg: { src: 'https://images.unsplash.com/photo-1585820319945-bd110f06da16?fm=jpg&q=82&w=1400&fit=max', w: 1400, h: 1518, credit: 'Photo: Lena Sifoo, Unsplash' },
      bgView: { zoom: 1, x: 0, y: 0 },
      avatar: { src: 'img/podcast-avatar.webp', w: 240, h: 240 },
      avatarView: { zoom: 1, x: 0, y: 0 },
    };
  },

  fields: [
    { type: 'row', fields: [
      { type: 'text', key: 'episode', label: 'Episode number', prefix: 'Ep.' },
      { type: 'text', key: 'duration', label: 'Duration' },
    ] },
    { type: 'date', key: 'date', label: 'Date' },
    { type: 'textarea', key: 'heading', label: 'Heading', rows: 3, hint: 'Press Enter for a line break. Wrap words in *asterisks* to colour them copper.' },
    { type: 'heading', label: 'Featured person' },
    { type: 'text', key: 'name', label: 'Name' },
    { type: 'text', key: 'role', label: 'Position' },
    { type: 'image', key: 'avatar', view: 'avatarView', frame: [60, 60], label: 'Avatar photo', hint: 'Drag the avatar in the preview to reposition it.' },
    { type: 'heading', label: 'Background' },
    { type: 'image', key: 'bg', view: 'bgView', frame: [406, 448], label: 'Background image', hint: 'The teal overlay always sits on top. Drag the photo in the preview to reposition it.' },
    { type: 'heading', label: 'For websites' },
    { type: 'text', key: 'link', label: 'Play button link', placeholder: 'https://', hint: 'Code export only. Turns the play button into a link.' },
  ],

  build(s) {
    const W = 406, H = 448, TEAL = '#103F4A';
    const bg = frameImage(W, H, s.bg, s.bgView);
    const av = frameImage(60, 60, s.avatar, s.avatarView);
    const pill = (side) => ({
      position: 'absolute', top: 13, [side]: 21, height: 35, display: 'flex', alignItems: 'center', gap: 8,
      padding: '0 15px', borderRadius: 9, backgroundColor: TEAL, fontSize: 15, lineHeight: '20px', whiteSpace: 'nowrap',
    });
    return h('div', { name: 'canvas', style: { position: 'relative', width: W, height: H, overflow: 'hidden', borderRadius: 10, backgroundColor: TEAL, color: '#FFFFFF', fontFamily: FONTS.text } },
      h('div', { name: 'media', attrs: { 'data-ui-drag': 'bg' }, style: { position: 'absolute', left: 0, top: 0, width: W, height: H, overflow: 'hidden' } },
        h('img', { name: 'photo', attrs: { src: s.bg.src, alt: '', draggable: 'false', crossorigin: 'anonymous' }, style: { position: 'absolute', left: bg.left, top: bg.top, width: bg.width, height: bg.height, maxWidth: 'none' } })),
      h('div', { name: 'overlay', style: { position: 'absolute', left: 0, top: 0, width: W, height: H, pointerEvents: 'none', backgroundImage: 'linear-gradient(180deg, rgba(16,63,74,0) 34%, rgba(16,63,74,0.35) 43%, rgba(16,63,74,0.7) 52%, rgba(16,63,74,0.92) 58%, #103F4A 63%)' } }),
      h('p', { name: 'episode', style: { ...pill('left'), margin: 0 } }, `Ep. ${s.episode}`),
      h('p', { name: 'duration', style: { ...pill('right'), margin: 0 } }, svg(CLOCK, { width: 16, height: 16 }, 'clock'), s.duration),
      h('div', { name: 'content', style: { position: 'absolute', left: 21, right: 22, bottom: 15, display: 'flex', flexDirection: 'column', pointerEvents: 'none' } },
        h('p', { name: 'date', style: { margin: 0, fontSize: 13, lineHeight: '16px', letterSpacing: '0.01em' } }, longDate(s.date)),
        h('h2', { name: 'title', style: { margin: '13px 0 0', maxWidth: 262, fontFamily: FONTS.text, fontWeight: 500, fontSize: 21 * (s._fit || 1), lineHeight: `${26 * (s._fit || 1)}px`, letterSpacing: '0.01em' } }, richText(s.heading, { color: COPPER })),
        h('p', { name: 'featuring', style: { margin: '25px 0 0', fontSize: 13, lineHeight: '16px', letterSpacing: '0.01em' } }, 'Featuring'),
        h('div', { name: 'guest', style: { display: 'flex', alignItems: 'center', marginTop: 7, pointerEvents: 'auto' } },
          h('div', { name: 'avatar', attrs: { 'data-ui-drag': 'avatar' }, style: { position: 'relative', width: 60, height: 60, flexShrink: 0, marginRight: 21, overflow: 'hidden', borderRadius: '50%', backgroundColor: '#0B3039' } },
            h('img', { name: 'avatar-photo', attrs: { src: s.avatar.src, alt: smartQuotes(s.name), draggable: 'false' }, style: { position: 'absolute', left: av.left, top: av.top, width: av.width, height: av.height, maxWidth: 'none' } })),
          h('div', { name: 'guest-text', style: { flex: 1, minWidth: 0, paddingTop: 6 } },
            h('p', { name: 'guest-name', style: { margin: 0, color: COPPER, fontSize: 14, lineHeight: '18px', fontWeight: 500, letterSpacing: '0.03em', textTransform: 'uppercase' } }, smartQuotes(s.name)),
            h('p', { name: 'guest-role', style: { margin: '3px 0 0', fontSize: 13, lineHeight: '17px', letterSpacing: '0.01em', textTransform: 'uppercase' } }, smartQuotes(s.role))),
          h(s.link ? 'a' : 'span', { name: 'play', attrs: s.link ? { href: s.link, 'aria-label': 'Play episode' } : { 'aria-hidden': 'true' }, style: { width: 65, height: 65, flexShrink: 0, marginLeft: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: COPPER } },
            svg(PLAY, { width: 18, height: 20, marginLeft: 4 }, 'play-icon')))));
  },

  /** Keep the heading to four lines by shrinking it. */
  fit(root, s) {
    const el = root.querySelector('.pb-podcast-card__title');
    if (!el) return null;
    const lh = parseFloat(getComputedStyle(el).lineHeight);
    const linesUsed = Math.round(el.getBoundingClientRect().height / lh);
    const fit = s._fit || 1;
    if (linesUsed > 4 && fit > 0.7) return { _fit: Math.max(0.7, fit - 0.06) };
    return null;
  },
};

/* ==========================================================================
   2. Episode cover, square, guests cut out onto the teal card
   ========================================================================== */

export const CARD = { left: 46, top: 696, width: 1902, height: 1117 };

const PERSON_DEFAULTS = [
  { src: 'img/episode-guest.webp', w: 729, h: 1088, x: 1163, y: 24, height: 1088, flip: false, z: 3 },
  { src: 'img/episode-host.webp', w: 478, h: 635, x: 685, y: 481, height: 635, flip: false, z: 2 },
  { src: '', w: 600, h: 800, x: 930, y: 420, height: 697, flip: false, z: 1 },
];

const cover = {
  id: 'episode-cover',
  label: 'Episode cover',
  sub: 'Square, 2000 × 2000',
  W: 2000,
  H: 2000,
  prefix: 'pb-episode-cover',
  // 3000 x 3000 was dropped 12 Oct 2026: a 20 MB PNG that Safari and Firefox can fail to save.
  scales: [0.54, 0.7, 1],
  scaleLabels: ['1080 × 1080', '1400 × 1400', '2000 × 2000'],
  defaultScale: 1,

  defaults() {
    return {
      heading: 'Newcastle’s Next Boom?\nWhere Should Investors Buy Now?',
      people: [
        { label: 'With', name: 'Kevin Mason', role: 'Director of\nBuyer’s Advocate' },
        { label: 'And', name: 'Rich Harvey', role: 'CEO & Founder of\nPropertybuyer' },
        { label: 'And', name: 'Guest name', role: 'Position' },
      ],
      third: false,
      episode: 'Episode 121',
      layers: PERSON_DEFAULTS.map((p) => ({ ...p })),
    };
  },

  fields: [
    { type: 'textarea', key: 'heading', label: 'Heading', rows: 3, hint: 'Press Enter for a line break. Wrap words in *asterisks* to colour them copper.' },
    { type: 'heading', label: 'With' },
    { type: 'text', key: 'people.0.name', label: 'Name' },
    { type: 'textarea', key: 'people.0.role', label: 'Position', rows: 2 },
    { type: 'heading', label: 'And' },
    { type: 'text', key: 'people.1.name', label: 'Name' },
    { type: 'textarea', key: 'people.1.role', label: 'Position', rows: 2, hint: 'A position that ends in “Propertybuyer” gets the logo mark after it.' },
    { type: 'checkbox', key: 'third', label: 'Add a third person' },
    { type: 'group', when: 'third', fields: [
      { type: 'heading', label: 'And' },
      { type: 'text', key: 'people.2.name', label: 'Name' },
      { type: 'textarea', key: 'people.2.role', label: 'Position', rows: 2 },
    ] },
    { type: 'text', key: 'episode', label: 'Episode text' },
    { type: 'heading', label: 'Photos' },
    { type: 'people' },
  ],

  build(s) {
    const k = s._fit || 1;
    const count = s.third ? 3 : 2;
    const size = count === 3 ? 0.86 : 1;
    const f = k * size;
    const people = s.people.slice(0, count);
    const layers = s.layers.slice(0, count)
      .map((l, i) => ({ ...l, i }))
      .sort((a, b) => a.z - b.z);

    const label = (text, first) => h('p', { name: 'label', style: { margin: first ? 0 : `${55 * f}px 0 0`, color: COPPER, fontSize: 48 * f, lineHeight: `${56 * f}px`, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' } }, text);
    const roleText = (role) => {
      const m = /^([\s\S]*?)(propertybuyer)\s*$/i.exec(role || '');
      if (!m) return lines(role);
      return [...lines(m[1] + m[2]), h('img', { name: 'mark', attrs: { src: 'img/mark-white.svg', alt: '' }, style: { display: 'inline-block', width: 76 * f, height: 35 * f, marginLeft: 14 * f, verticalAlign: '-0.12em' } })];
    };

    return h('div', { name: 'canvas', style: { position: 'relative', width: 2000, height: 2000, overflow: 'hidden', fontFamily: FONTS.text, backgroundImage: 'linear-gradient(180deg, #FFFFFF 29%, #EDD9D2 50%, #D0A994 75%, #C1886E 98%)' } },
      h('img', { name: 'logo', attrs: { src: 'img/logo-stacked.svg', alt: 'Propertybuyer' }, style: { position: 'absolute', left: 782, top: 92, width: 436, height: 120 } }),
      h('div', { name: 'heading', style: { position: 'absolute', left: 110, right: 110, top: 310, height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
        h('h1', { name: 'title', style: { margin: 0, textAlign: 'center', color: '#406C72', fontFamily: FONTS.text, fontWeight: 500, fontSize: 83 * (s._titleFit || 1), lineHeight: `${106 * (s._titleFit || 1)}px`, letterSpacing: '0.012em' } }, richText(s.heading, { color: COPPER }))),
      h('div', { name: 'card', style: { position: 'absolute', left: CARD.left, top: CARD.top, width: CARD.width, height: CARD.height, overflow: 'hidden', borderRadius: 90, backgroundColor: '#00414B', boxShadow: '0 0 5px rgba(0,35,42,0.45)' } },
        h('div', { name: 'people', attrs: { 'data-ui-stage': 'people' }, style: { position: 'absolute', left: 0, top: 0, width: CARD.width, height: CARD.height } },
          layers.map((l) => l.src
            ? h('img', { name: 'person', attrs: { src: l.src, alt: smartQuotes(people[l.i]?.name || ''), draggable: 'false', 'data-ui-person': l.i }, style: { position: 'absolute', left: l.x, top: l.y, width: l.height * (l.w / l.h), height: l.height, maxWidth: 'none', transform: l.flip ? 'scaleX(-1)' : undefined } })
            : h('div', { name: 'person-empty', ui: true, attrs: { 'data-ui-person': l.i }, uiClass: 'ui-person-empty', style: { position: 'absolute', left: l.x, top: l.y, width: l.height * (l.w / l.h), height: l.height } }, 'Add a photo'))),
        h('div', { name: 'credits', style: { position: 'absolute', left: 106, top: 52, width: 800, color: '#FFFFFF', pointerEvents: 'none' } },
          people.map((p, i) => [
            label(i === 0 ? 'With' : 'And', i === 0),
            h('p', { name: i === 0 ? 'name-lead' : 'name', style: i === 0
              ? { margin: `${30 * f}px 0 0`, fontSize: 90 * f, lineHeight: `${100 * f}px`, fontWeight: 700, letterSpacing: '0.065em', textTransform: 'uppercase' }
              : { margin: `${40 * f}px 0 0`, fontSize: 59 * f, lineHeight: `${72 * f}px`, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' } }, smartQuotes(p.name)),
            h('p', { name: i === 0 ? 'role-lead' : 'role', style: i === 0
              ? { margin: `${25 * f}px 0 0`, fontSize: 60 * f, lineHeight: `${73 * f}px`, fontWeight: 400, letterSpacing: '0.025em' }
              : { margin: `${16 * f}px 0 0`, fontSize: 37 * f, lineHeight: `${53 * f}px`, fontWeight: 400, letterSpacing: '0.03em' } }, roleText(p.role)),
          ]))),
      h('div', { name: 'episode', style: { position: 'absolute', left: 34, right: 0, top: 1866, display: 'flex', alignItems: 'center', gap: 99 } },
        h('p', { name: 'episode-text', style: { margin: 0, color: '#FFFFFF', fontSize: 53, lineHeight: '54px', fontWeight: 500, letterSpacing: '0.055em', textTransform: 'uppercase', whiteSpace: 'nowrap' } }, smartQuotes(s.episode)),
        h('span', { name: 'episode-rule', style: { flex: 1, height: 8, backgroundColor: '#FFFFFF' } })));
  },

  /** Heading to two lines and the credits inside the card, by shrinking. */
  fit(root, s) {
    const out = {};
    const title = root.querySelector('.pb-episode-cover__title');
    if (title) {
      const lh = parseFloat(getComputedStyle(title).lineHeight);
      const n = Math.round(title.getBoundingClientRect().height / lh);
      const t = s._titleFit || 1;
      if (n > 2 && t > 0.6) out._titleFit = Math.max(0.6, t - 0.05);
    }
    const credits = root.querySelector('.pb-episode-cover__credits');
    const cardEl = root.querySelector('.pb-episode-cover__card');
    if (credits && cardEl) {
      const c = credits.getBoundingClientRect();
      const r = cardEl.getBoundingClientRect();
      const k = s._fit || 1;
      if (c.bottom > r.bottom - r.height * 0.05 && k > 0.6) out._fit = Math.max(0.6, k - 0.05);
    }
    return Object.keys(out).length ? out : null;
  },
};

/* ==========================================================================
   3. Newsletter hero, from the Paper frame
   ========================================================================== */

const hero = {
  id: 'newsletter-hero',
  label: 'Newsletter hero',
  sub: 'Email header, 600 wide',
  W: 600,
  H: null,
  prefix: 'pb-newsletter-hero',
  scales: [1, 2, 3],
  defaultScale: 2,

  defaults() {
    const ym = today().ym;
    return {
      month: ym,
      eyebrow: `${monthYear(ym)} Newsletter`,
      byline: 'By Rich Harvey, CEO & Founder',
      heading: 'How long will this\n*downturn* really last?',
      link: '',
    };
  },

  fields: [
    { type: 'month', key: 'month', label: 'Issue month', hint: 'Sets the date on the Market Update image, and the month in the eyebrow.' },
    { type: 'text', key: 'eyebrow', label: 'Eyebrow' },
    { type: 'text', key: 'byline', label: 'Byline', hint: 'Always followed by “, propertybuyer.com.au”.' },
    { type: 'textarea', key: 'heading', label: 'Heading', rows: 3, hint: 'Press Enter for a line break. Wrap words in *asterisks* to colour them copper.' },
    { type: 'heading', label: 'For websites' },
    { type: 'text', key: 'link', label: 'Watch now link', placeholder: 'https://', hint: 'Code export only. Turns the Watch now button into a link.' },
  ],

  build(s) {
    const date = monthYear(s.month);
    return h('div', { name: 'canvas', style: { width: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '40px 25px', backgroundColor: '#00404B', fontFamily: FONTS.text } },
      h('div', { name: 'eyebrow', style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 40, padding: '0 14px', borderRadius: 999, backgroundImage: 'linear-gradient(0deg, #021B20 0%, #001114 100%)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 5px rgba(0,0,0,0.29), 0 18px 9px rgba(0,0,0,0.26), 0 39px 12px rgba(0,0,0,0.15), 0 70px 14px rgba(0,0,0,0.04)' } },
        laurel('pb-laurel-l', true),
        h('p', { name: 'eyebrow-text', style: { margin: 0, color: '#FFFFFF', fontSize: 11.5, lineHeight: '14px', fontWeight: 600, letterSpacing: '1.4px', textTransform: 'uppercase', whiteSpace: 'nowrap' } }, smartQuotes(s.eyebrow)),
        laurel('pb-laurel-r', false)),
      h('div', { name: 'byline', style: { display: 'flex', alignItems: 'center', gap: 8 } },
        h('span', { name: 'byline-rule', style: { width: 12, height: 1, flexShrink: 0, backgroundColor: '#C8A96E' } }),
        h('p', { name: 'byline-text', style: { margin: 0, color: '#E4D5B2', fontSize: 11.5, lineHeight: '14px', fontWeight: 500, letterSpacing: '0.5px' } }, `${smartQuotes(s.byline)}, propertybuyer.com.au`)),
      h('h1', { name: 'title', style: { margin: 0, padding: '0 20px', textAlign: 'center', color: '#FFFFFF', fontFamily: FONTS.headingSerif, fontWeight: 700, fontSize: 50, lineHeight: '60px', letterSpacing: '-0.005em' } }, richText(s.heading, { color: COPPER })),
      h('div', { name: 'feature', style: { position: 'relative', width: 550, height: 309, flexShrink: 0, overflow: 'hidden', borderRadius: 4 } },
        h('img', { name: 'feature-image', attrs: { src: 'img/newsletter-market-update.webp', alt: `Propertybuyer market update, ${date}` }, style: { position: 'absolute', left: 0, top: 0, width: 550, height: 309 } }),
        h('p', { name: 'feature-date', style: { position: 'absolute', left: 248, top: 200, width: 300, margin: 0, textAlign: 'center', color: '#BD7449', fontFamily: FONTS.headingSerif, fontStyle: 'italic', fontWeight: 500, fontSize: 30, lineHeight: '36px', letterSpacing: '0.02em', fontVariantNumeric: 'lining-nums', whiteSpace: 'nowrap' } }, date),
        h(s.link ? 'a' : 'span', { name: 'watch', attrs: s.link ? { href: s.link } : {}, style: { position: 'absolute', left: 36, top: 204, display: 'flex', alignItems: 'center', padding: 10, borderRadius: 8, backgroundColor: COPPER, boxShadow: '2px 4px 0 #FFFFFF', color: '#FFFFFF', fontSize: 16, lineHeight: '20px', fontWeight: 700, letterSpacing: '1.04px', textTransform: 'uppercase', textDecoration: 'none', whiteSpace: 'nowrap' } }, 'Watch now')));
  },
};

export const TEMPLATES = [card, cover, hero];
