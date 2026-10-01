/**
 * One-shot image compression for the Paper asset exports.
 *
 * Converts every raster in assets/img to WebP, capped at 2x its largest
 * rendered size, alpha preserved. SVGs are untouched. Prints a rename map;
 * references in index.html and landing.css must be updated to .webp (the
 * build commit that introduced this script did that).
 *
 *   node tools/compress-images.mjs
 */
import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync, readFileSync, renameSync } from 'node:fs';
import { join, parse } from 'node:path';

const DIR = 'assets/img';

/* Max width in device pixels: 2x the largest CSS rendering. */
const CAPS = [
  /* The commercial page holds its own photographs under a prefix, because
     both pages share this folder and the unprefixed names belong to the
     buyer page. Written by tools/import-paper-images.mjs, already at these
     sizes; the caps are here so a later run of this script cannot quietly
     resize them to the 1440 default. */
  [/^commercial-truth/, 722],
  [/^commercial-step/, 454],
  [/^commercial-service/, 746],
  /* Same reasoning, developer page. This one did not come through Paper: the
     client attached it to BugHerd task 9 on 31 Aug 2026 and it was cropped by
     hand from 5472x3648 to the slot's 2x. The cap is here so a later run
     cannot quietly resize it. The other developer- files match no pattern in
     this list and fall to the 1440 default, which is larger than any of them,
     so nothing resizes today. Worth capping properly if they are ever
     re-exported bigger. */
  [/^developer-service/, 746],
  /* Broad page, its own prefix for the same reason. all-segment-home came from
     BugHerd project 543721 task 11 on 1 Oct 2026, resized by hand to 800x533. */
  [/^all-/, 800],
  [/^commercial-auction/, 1146],
  [/^auction-\d/, 1146],
  [/^truth-card/, 722],
  [/^truth-docs/, 1300],
  [/^step-\d/, 600],
  [/^hero-/, 400],
  [/^badge-/, 160],
  [/^story-/, 800],
  [/^investor-story/, 800],
  [/^stats-team/, 1100],
  [/^medal/, 200],
  [/^prestige-liquid/, 1100],
  [/^prestige-grain/, 1440],
  [/^texture-wall/, 1440],
];

const QUALITY = { default: 82, texture: 72 };

let before = 0;
let after = 0;

for (const file of readdirSync(DIR)) {
  const { name, ext } = parse(file);
  if (!/\.(png|jpe?g|webp)$/i.test(ext)) continue;

  const src = join(DIR, file);
  const size = statSync(src).size;
  before += size;

  const cap = (CAPS.find(([re]) => re.test(name)) || [null, 1440])[1];
  const q = /texture|grain/.test(name) ? QUALITY.texture : QUALITY.default;

  /* Read to a buffer so no handle stays open on the source; Windows
     refuses the in-place rename otherwise. */
  const img = sharp(readFileSync(src));
  const meta = await img.metadata();
  const width = Math.min(meta.width, cap);

  const out = join(DIR, `${name}.webp`);
  const tmp = join(DIR, `${name}.tmp.webp`);
  await img.resize({ width, withoutEnlargement: true }).webp({ quality: q, effort: 5 }).toFile(tmp);

  if (src !== out) unlinkSync(src);
  try { unlinkSync(out); } catch {}
  renameSync(tmp, out);

  const newSize = statSync(out).size;
  after += newSize;
  console.log(`${file} -> ${name}.webp  ${(size / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB`);
}

console.log(`\ntotal ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`);
