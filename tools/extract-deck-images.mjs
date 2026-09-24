/**
 * Pulls the story-card photographs out of the client's success-story decks.
 *
 * WHY THIS EXISTS
 * The Tier 1 story cards carry photographs of the actual properties purchased,
 * and those photographs live inside the PDF decks the client supplies. The
 * buyer page's three were taken out by hand; this does the same job
 * reproducibly, and records which deck page each image came from.
 *
 * WHY IT DOES NOT NEED A PDF RENDERER
 * The first attempt at this concluded the images were unreachable, because
 * neither pdftoppm nor the MCP page renderer is available in this
 * environment. That was the wrong conclusion: rasterising a page and reading
 * an embedded image are different jobs. The photographs are stored as image
 * XObjects, and in these decks they are /DCTDecode, which means the stream
 * bytes already are a complete JPEG file. So there is nothing to render. Find
 * the object, write the bytes out, hand them to sharp.
 *
 * The page objects in these decks are not inside object streams, so the page
 * tree can be walked directly. If a future deck compresses them, this will
 * report the page as not found rather than guessing.
 *
 * Each record page carries three photographs of the same property: one large
 * hero at 685x419 and two smaller ones. The hero is the one the card uses,
 * and 685x419 is exactly what the buyer page's three story images already
 * ship at, so this is parity rather than a compromise.
 *
 *   node tools/extract-deck-images.mjs
 *
 * Decks live in paper/decks/ since 8 Sep 2026, committed at the client lead's
 * direction so the record travels with the repository. .deck-src/ is still
 * read as a fallback for a deck that is not committed.
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = existsSync('paper/decks') ? 'paper/decks' : '.deck-src';
const OUT = 'assets/img';
const QUALITY = 82;

/* slot -> deck page. Page numbers are 1-indexed as a reader sees them, and
   each is traced in paper/proof-register.md. */
const SLOTS = [
  { deck: 'Legacy All Investor.pdf', page: 20, out: 'investor-story-1.webp', who: 'Mathew, Sydney inner west' },
  { deck: 'Legacy All Investor.pdf', page: 37, out: 'investor-story-2.webp', who: 'Wendy, Melbourne' },
  { deck: 'Legacy All Investor.pdf', page: 63, out: 'investor-story-3.webp', who: 'Pui Kwan and Janis, Brisbane' },
  /* Adelaide location page, 8 Sep 2026. The same three records sit in the
     Legacy homebuyer deck on the same page numbers with the same photographs;
     the investor deck is used only because it was the one already on disk. */
  { deck: 'Legacy All Investor.pdf', page: 78, out: 'adelaide-story-1.webp', who: 'Karl, Adelaide, 2008' },
  { deck: 'Legacy All Investor.pdf', page: 77, out: 'adelaide-story-2.webp', who: 'Peter, Adelaide, 2009' },
  { deck: 'Legacy All Investor.pdf', page: 80, out: 'adelaide-story-3.webp', who: 'Li, regional SA, 2025' },
];

/* ---- a small read-only PDF object reader ------------------------------- */
function openPdf(path) {
  const buf = readFileSync(path);
  const latin = buf.toString('latin1');
  const objs = new Map();
  const re = /(\d+)\s+(\d+)\s+obj\b/g;
  let m;
  while ((m = re.exec(latin))) {
    const bodyStart = m.index + m[0].length;
    const end = latin.indexOf('endobj', bodyStart);
    if (end < 0) continue;
    objs.set(Number(m[1]), { bodyStart, end, dict: latin.slice(bodyStart, end) });
  }
  return { buf, latin, objs };
}

const REF = /^\s*(\d+)\s+(\d+)\s+R\s*$/;

function dictAt(text, from) {
  const start = text.indexOf('<<', from);
  if (start < 0) return null;
  let depth = 0;
  for (let i = start; i < text.length - 1; i++) {
    if (text[i] === '<' && text[i + 1] === '<') { depth++; i++; }
    else if (text[i] === '>' && text[i + 1] === '>') { depth--; i++; if (!depth) return text.slice(start, i + 1); }
  }
  return null;
}

function val(dict, key) {
  const i = dict.indexOf('/' + key);
  if (i < 0) return null;
  let j = i + key.length + 1;
  while (j < dict.length && /\s/.test(dict[j])) j++;
  if (dict[j] === '<' && dict[j + 1] === '<') return dictAt(dict, j);
  if (dict[j] === '[') {
    let depth = 0;
    for (let k = j; k < dict.length; k++) {
      if (dict[k] === '[') depth++;
      else if (dict[k] === ']') { depth--; if (!depth) return dict.slice(j, k + 1); }
    }
  }
  const m = /^([^/\s\]>]+(?:\s+\d+\s+R)?|\/[^\s/\]>]+)/.exec(dict.slice(j));
  return m ? m[1].trim() : null;
}

function deref(pdf, v) {
  if (typeof v !== 'string') return v;
  const m = REF.exec(v);
  if (!m) return v;
  const o = pdf.objs.get(Number(m[1]));
  return o ? o.dict : v;
}

/* Page objects in reading order, by walking /Root /Pages /Kids. */
function pageOrder(pdf) {
  const cat = [...pdf.objs.entries()].find(([, o]) => /\/Type\s*\/Catalog/.test(o.dict));
  const out = [];
  const walk = (dict, depth) => {
    if (!dict || depth > 60) return;
    const kids = val(dict, 'Kids');
    if (!kids) return;
    for (const m of kids.matchAll(/(\d+)\s+(\d+)\s+R/g)) {
      const o = pdf.objs.get(Number(m[1]));
      if (!o) continue;
      if (/\/Type\s*\/Pages/.test(o.dict)) walk(o.dict, depth + 1);
      else out.push(Number(m[1]));
    }
  };
  if (cat) walk(deref(pdf, val(cat[1].dict, 'Pages')), 0);
  return out;
}

function streamBytes(pdf, num) {
  const o = pdf.objs.get(num);
  if (!o) return null;
  const sIdx = pdf.latin.indexOf('stream', o.bodyStart);
  if (sIdx < 0 || sIdx > o.end) return null;
  let p = sIdx + 6;
  if (pdf.latin[p] === '\r') p++;
  if (pdf.latin[p] === '\n') p++;
  let len = val(o.dict, 'Length');
  if (len && REF.test(len)) {
    const lm = REF.exec(len);
    const lo = pdf.objs.get(Number(lm[1]));
    len = lo ? lo.dict.trim() : null;
  }
  let n = Number(len);
  if (!Number.isFinite(n) || n <= 0) n = pdf.latin.indexOf('endstream', p) - p;
  return pdf.buf.subarray(p, p + n);
}

/* The hero is the largest JPEG on the page. */
function heroJpeg(pdf, pageNum) {
  const pages = pageOrder(pdf);
  const objNum = pages[pageNum - 1];
  if (!objNum) return { error: `page ${pageNum} not found (deck has ${pages.length})` };
  const res = deref(pdf, val(pdf.objs.get(objNum).dict, 'Resources')) || '';
  const xo = deref(pdf, val(res, 'XObject')) || '';
  let best = null;
  for (const m of xo.matchAll(/\/([A-Za-z0-9_.]+)\s+(\d+)\s+(\d+)\s+R/g)) {
    const o = pdf.objs.get(Number(m[2]));
    if (!o || !/\/Subtype\s*\/Image/.test(o.dict)) continue;
    if (!/DCTDecode/.test(val(o.dict, 'Filter') || '')) continue;
    const w = Number(val(o.dict, 'Width')), h = Number(val(o.dict, 'Height'));
    const bytes = streamBytes(pdf, Number(m[2]));
    if (!bytes || bytes[0] !== 0xff || bytes[1] !== 0xd8) continue;
    if (!best || w * h > best.w * best.h) best = { name: m[1], w, h, bytes };
  }
  return best || { error: `no JPEG image found on page ${pageNum}` };
}

if (!existsSync(SRC)) {
  console.error(`${SRC} not found. The decks are client working files and are`);
  console.error('not committed. Create it and put the deck PDFs there.');
  process.exit(1);
}
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const opened = new Map();
let written = 0;

for (const slot of SLOTS) {
  const deckPath = join(SRC, slot.deck);
  if (!existsSync(deckPath)) {
    console.error(`missing ${deckPath}`);
    process.exit(1);
  }
  if (!opened.has(slot.deck)) opened.set(slot.deck, openPdf(deckPath));
  const hero = heroJpeg(opened.get(slot.deck), slot.page);
  if (hero.error) { console.error(`${slot.out}: ${hero.error}`); process.exit(1); }

  /* Native size, no resize. The decks ship 685x419 and so does every story
     image already on the buyer page, so there is nothing to gain by scaling.
     CSS object-fit does the crop to the card panel at render time. */
  const info = await sharp(hero.bytes).webp({ quality: QUALITY, effort: 5 }).toFile(join(OUT, slot.out));
  console.log(
    `${slot.out.padEnd(26)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB` +
    `  <- ${slot.deck} p${slot.page}, ${hero.name}  (${slot.who})`
  );
  written += 1;
}

console.log(`\n${written} photograph(s) written.`);
