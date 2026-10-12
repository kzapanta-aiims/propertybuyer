/* ==========================================================================
   One template tree, three outputs.

   A template is a function of its state that returns a tree built with h().
   Every size in a tree is written in design pixels at the template's own
   width (406 for the podcast card, 2000 for the episode cover, 600 for the
   newsletter hero). This file turns that tree into:

     preview   HTML with inline styles, used by the generator and the exports
     css       HTML with BEM classes plus a stylesheet, for websites
     tailwind  HTML with Tailwind utility classes, for websites

   Design pixels are converted to cqw, a percentage of the wrapper's width,
   so the same markup scales like an image: drop it in a 300px column or a
   1200px one and it keeps its proportions. The wrapper declares
   container-type: inline-size, which is what cqw resolves against.
   ========================================================================== */

export function h(tag, props, ...children) {
  return {
    tag,
    props: props || {},
    children: children.flat(Infinity).filter((c) => c !== null && c !== undefined && c !== false && c !== ''),
  };
}

const UNITLESS = new Set(['opacity', 'zIndex', 'fontWeight', 'flex', 'flexGrow', 'flexShrink', 'order']);

const kebab = (prop) => prop.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
const round = (n) => Math.round(n * 10000) / 10000;

export function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Design px to cqw. Numbers are px; strings have every "Npx" converted. */
function value(prop, v, W) {
  if (typeof v === 'number') {
    if (UNITLESS.has(prop)) return String(v);
    if (v === 0) return '0';
    return round((v / W) * 100) + 'cqw';
  }
  return String(v).replace(/(-?\d*\.?\d+)px\b/g, (_, n) => {
    const x = parseFloat(n);
    return x === 0 ? '0' : round((x / W) * 100) + 'cqw';
  });
}

function declarations(style, W) {
  return Object.entries(style || {})
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => [kebab(k), value(k, v, W)]);
}

/* --- Tailwind ------------------------------------------------------------ */

const TW_KEYWORDS = {
  display: { flex: 'flex', block: 'block', 'inline-block': 'inline-block', 'inline-flex': 'inline-flex', grid: 'grid', none: 'hidden', inline: 'inline' },
  position: { absolute: 'absolute', relative: 'relative', fixed: 'fixed' },
  flexDirection: { column: 'flex-col', row: 'flex-row' },
  flexWrap: { wrap: 'flex-wrap', nowrap: 'flex-nowrap' },
  alignItems: { center: 'items-center', 'flex-start': 'items-start', 'flex-end': 'items-end', stretch: 'items-stretch', baseline: 'items-baseline' },
  alignSelf: { center: 'self-center', 'flex-start': 'self-start', 'flex-end': 'self-end', stretch: 'self-stretch' },
  justifyContent: { center: 'justify-center', 'space-between': 'justify-between', 'flex-end': 'justify-end', 'flex-start': 'justify-start' },
  textAlign: { center: 'text-center', left: 'text-left', right: 'text-right' },
  textTransform: { uppercase: 'uppercase', none: 'normal-case', capitalize: 'capitalize' },
  overflow: { hidden: 'overflow-hidden', visible: 'overflow-visible' },
  objectFit: { cover: 'object-cover', contain: 'object-contain' },
  whiteSpace: { nowrap: 'whitespace-nowrap', 'pre-line': 'whitespace-pre-line' },
  fontStyle: { italic: 'italic', normal: 'not-italic' },
  pointerEvents: { none: 'pointer-events-none', auto: 'pointer-events-auto' },
  boxSizing: { 'border-box': 'box-border' },
  userSelect: { none: 'select-none' },
  WebkitFontSmoothing: { antialiased: 'antialiased' },
  textDecoration: { none: 'no-underline' },
};

const TW_PREFIX = {
  width: 'w', height: 'h', minWidth: 'min-w', maxWidth: 'max-w', minHeight: 'min-h', maxHeight: 'max-h',
  top: 'top', left: 'left', right: 'right', bottom: 'bottom', inset: 'inset',
  gap: 'gap', rowGap: 'gap-y', columnGap: 'gap-x',
  padding: 'p', paddingTop: 'pt', paddingRight: 'pr', paddingBottom: 'pb', paddingLeft: 'pl', paddingInline: 'px', paddingBlock: 'py',
  margin: 'm', marginTop: 'mt', marginRight: 'mr', marginBottom: 'mb', marginLeft: 'ml', marginInline: 'mx', marginBlock: 'my',
  fontSize: 'text', lineHeight: 'leading', letterSpacing: 'tracking',
  borderRadius: 'rounded', zIndex: 'z', opacity: 'opacity',
  color: 'text', backgroundColor: 'bg',
};

const twEscape = (v) => String(v).replace(/_/g, '\\_').replace(/\s+/g, '_');

const TW_WEIGHT = { 100: 'font-thin', 200: 'font-extralight', 300: 'font-light', 400: 'font-normal', 500: 'font-medium', 600: 'font-semibold', 700: 'font-bold', 800: 'font-extrabold', 900: 'font-black' };
const SIDES = { padding: ['p', 'py', 'px', 'pt', 'pr', 'pb', 'pl'], margin: ['m', 'my', 'mx', 'mt', 'mr', 'mb', 'ml'] };

/** padding: '0 15px' and friends, as p/py/px/pt utilities rather than one arbitrary property. */
function boxShorthand(prop, v) {
  const [all, y, x, t, r, b, l] = SIDES[prop];
  const parts = v.split(/\s+/);
  const u = (p, val) => (val === '0' ? `${p}-0` : `${p}-[${val}]`);
  if (parts.length === 1) return [u(all, parts[0])];
  if (parts.length === 2) return parts[0] === parts[1] ? [u(all, parts[0])] : [u(y, parts[0]), u(x, parts[1])];
  const [pt, pr, pb, pl] = parts.length === 3 ? [parts[0], parts[1], parts[2], parts[1]] : parts;
  // Preflight already zeroes margin and padding, so zero sides are left out.
  return [[t, pt], [r, pr], [b, pb], [l, pl]].filter(([, val]) => val !== '0').map(([p, val]) => u(p, val));
}

function tailwindClasses(style, W) {
  const out = [];
  for (const [prop, raw] of Object.entries(style || {})) {
    if (raw === undefined || raw === null || raw === '') continue;
    const kw = TW_KEYWORDS[prop];
    if (kw && typeof raw === 'string' && kw[raw]) { out.push(kw[raw]); continue; }
    if (prop === 'flexShrink' && raw === 0) { out.push('shrink-0'); continue; }
    if (prop === 'flex' && (raw === 1 || raw === '1')) { out.push('flex-1'); continue; }
    if (prop === 'inset' && (raw === 0 || raw === '0')) { out.push('inset-0'); continue; }
    if (prop === 'fontWeight' && TW_WEIGHT[raw]) { out.push(TW_WEIGHT[raw]); continue; }
    if (prop === 'borderRadius' && raw === '50%') { out.push('rounded-full'); continue; }
    const v = value(prop, raw, W);
    if ((prop === 'padding' || prop === 'margin') && typeof raw === 'string') { out.push(...boxShorthand(prop, v)); continue; }
    if (TW_PREFIX[prop] && v === '0' && prop !== 'zIndex' && prop !== 'opacity') { out.push(`${TW_PREFIX[prop]}-0`); continue; }
    const prefix = TW_PREFIX[prop];
    // A colour or a length goes in the matching utility; anything else in an
    // arbitrary property, which both Tailwind 3 and 4 understand.
    const isColor = /^(#|rgb|hsl)/.test(v);
    const isLength = /^-?[\d.]+(cqw|px|%|em|rem)?$/.test(v) || v === '0';
    if (prefix && (prop === 'color' || prop === 'backgroundColor') && isColor) out.push(`${prefix}-[${twEscape(v)}]`);
    else if (prefix && prop !== 'color' && prop !== 'backgroundColor' && (isLength || prop === 'zIndex' || prop === 'opacity')) {
      const neg = v.startsWith('-') && prop !== 'letterSpacing' ? '-' : '';
      const val = neg ? v.slice(1) : v;
      // text-[..] is ambiguous between size and colour, so pin it to a length.
      const hint = prop === 'fontSize' ? 'length:' : '';
      out.push(`${neg}${prefix}-[${hint}${twEscape(val)}]`);
    } else out.push(`[${kebab(prop)}:${twEscape(v)}]`);
  }
  return out;
}

/* --- Serialiser ---------------------------------------------------------- */

const VOID = new Set(['img', 'br', 'source', 'input']);

const INLINE = new Set(['span', 'br', 'strong', 'em']);
const isInline = (c) => typeof c === 'string' || typeof c === 'number' || INLINE.has(c.tag) || (c.tag === 'img' && c.props.name === 'mark');

/**
 * mode: 'preview' | 'css' | 'tailwind'
 * opts.W            design width of the template
 * opts.prefix       class prefix for css mode, e.g. "pb-podcast"
 * opts.src(url)     maps an image src for export, defaults to identity
 * opts.skipUi       drop nodes marked ui: true (selection handles, placeholders)
 * opts.pretty       indent the markup, for code people will read
 * opts.indent       starting indent for pretty output
 */
export function render(tree, mode, opts) {
  const { W, prefix = 'pb', src = (u) => u, skipUi = false, pretty = false, indent = '' } = opts;
  const rules = [];
  const used = new Map();

  function className(name) {
    const base = `${prefix}__${name || 'el'}`;
    const n = used.get(base) || 0;
    used.set(base, n + 1);
    return n ? `${base}-${n + 1}` : base;
  }

  function node(n, depth) {
    if (typeof n === 'string' || typeof n === 'number') return escapeHtml(n);
    const { tag, props, children } = n;
    if (skipUi && props.ui) return '';
    const attrs = [];
    const classes = [];
    if (props.uiClass && mode === 'preview') classes.push(props.uiClass);

    if (mode === 'preview') {
      if (props.name) classes.push(`${prefix}__${props.name}`);
      const decl = declarations(props.style, W);
      if (decl.length) attrs.push(`style="${escapeHtml(decl.map(([k, v]) => `${k}:${v}`).join(';'))}"`);
    } else if (mode === 'css') {
      const cls = depth === 0 ? prefix + '__canvas' : className(props.name);
      classes.push(cls);
      const decl = declarations(props.style, W);
      if (decl.length) rules.push(`.${cls} {\n${decl.map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}`);
    } else {
      classes.push(...tailwindClasses(props.style, W));
    }
    if (classes.length) attrs.push(`class="${escapeHtml(classes.join(' '))}"`);

    for (const [k, v] of Object.entries(props.attrs || {})) {
      if (v === undefined || v === null || v === false) continue;
      if (mode !== 'preview' && (k.startsWith('data-ui') || k === 'draggable' || k === 'crossorigin')) continue;
      const val = k === 'src' ? src(v) : v;
      attrs.push(v === true ? k : `${k}="${escapeHtml(val)}"`);
    }
    const open = `<${tag}${attrs.length ? ' ' + attrs.join(' ') : ''}>`;
    if (VOID.has(tag)) return open;
    if (props.html !== undefined) return `${open}${props.html}</${tag}>`;
    const kids = children.filter((c) => !(skipUi && c && c.props && c.props.ui));
    if (pretty && kids.length && !kids.every(isInline)) {
      const pad = indent + '  '.repeat(depth);
      const inner = kids.map((c) => `\n${pad}  ${node(c, depth + 1)}`).join('');
      return `${open}${inner}\n${pad}</${tag}>`;
    }
    return `${open}${kids.map((c) => node(c, depth + 1)).join('')}</${tag}>`;
  }

  const html = node(tree, 0);
  return { html, css: rules.join('\n\n') };
}

/* --- Text helpers shared by the templates -------------------------------- */

/** Straight quotes to typographic ones, the way the reference artwork sets them. */
export function smartQuotes(s) {
  return String(s)
    .replace(/(\w)'(\w)/g, '$1’$2')
    .replace(/(^|[\s(\[])'/g, '$1‘')
    .replace(/'/g, '’')
    .replace(/(^|[\s(\[])"/g, '$1“')
    .replace(/"/g, '”');
}

/**
 * Heading text to children: line breaks are kept, and *words in asterisks*
 * take the accent colour.
 */
export function richText(text, accentStyle) {
  const lines = smartQuotes(text || '').split(/\r?\n/);
  const out = [];
  lines.forEach((line, i) => {
    if (i) out.push(h('br', {}));
    line.split(/(\*[^*]+\*)/g).forEach((part) => {
      if (!part) return;
      if (/^\*[^*]+\*$/.test(part)) out.push(h('span', { name: 'accent', style: accentStyle }, part.slice(1, -1)));
      else out.push(part);
    });
  });
  return out;
}

export function lines(text) {
  const parts = smartQuotes(text || '').split(/\r?\n/);
  const out = [];
  parts.forEach((p, i) => { if (i) out.push(h('br', {})); out.push(p); });
  return out;
}
