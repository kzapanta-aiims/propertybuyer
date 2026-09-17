/**
 * Imports the portfolio review page's photography out of its Paper file.
 *
 * WHY A SECOND IMPORTER
 * tools/import-paper-images.mjs is pinned to the buyer/commercial Paper file
 * 01KZW0Y27PGW3NV0QJRPXAJ9DZ and to that artboard's crop geometry. The
 * portfolio review page is designed in a different file, so its slots and its
 * geometry are recorded here rather than bolted onto that list. Neither
 * script touches the other's output.
 *
 * WHY THE OUTPUT IS PREFIXED
 * Every page shares one assets/img, and the unprefixed names belong to the
 * buyer page. Writing over them redecorates pages that are already client
 * reviewed. Everything this writes is prefixed `review-`, the same rule the
 * commercial, investor and developer imports follow.
 *
 * WHY THE GEOMETRY IS RECORDED
 * Paper crops by oversizing a rectangle inside a smaller frame and offsetting
 * it, so the visible window is a function of the rectangle's size and its
 * position against the parent. The numbers below are as get_computed_styles
 * and get_jsx reported them on 17 September 2026, from artboard
 * "PORTFOLIO REVIEW - 1440 -- v2".
 *
 *   node tools/import-review-images.mjs
 *
 * Sources are fetched to .paper-src/, which is scratch and gitignored.
 */
import sharp from 'sharp';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';

const SRC = '.paper-src';
const OUT = 'assets/img';
const QUALITY = 82;

const PAPER_FILE = '01M26QSHXNKJ3CA52AQ4GRSW2F';
const PAPER_ASSETS = `https://app.paper.design/file-assets/${PAPER_FILE}`;

/* `frame` is the visible window in Paper. Where the image rectangle is the
   same size as its frame, a centred cover at 2x the CSS size is faithful and
   no crop is recorded. Nothing is ever enlarged past its source. */
const SLOTS = [
  /* --- How it works, three cards. 370x260 in CSS, rect fills the frame. --- */
  { out: 'review-step-1.webp', asset: '6F0HYNN6Y0B5V4FF5NY89VG4FE.webp', size: [740, 520] },
  { out: 'review-step-2.webp', asset: '2BEBMHH1XEAN237EKH80QVD7BC.webp', size: [740, 520] },
  { out: 'review-step-3.webp', asset: '1R655APV4NXRZV0AD20DJ8VHQQ.webp', size: [740, 520] },

  /* --- The honest rating band, right hand photograph. 548x493 in CSS.
     Rect 552x730 sits at top -50 with its right edge on the frame's right
     edge, so the rect's own left edge is at -4. The visible window in rect
     coordinates is therefore x 4..552 and y 50..543. That is expressed below
     as a fraction of the rect so it survives whatever the source resolution
     turns out to be. */
  { out: 'review-scorecard.webp', asset: '779RAKRAT2D7GFY1PD2GHXM8FR.webp', size: [1096, 986],
    cropOfRect: { rect: [552, 730], left: 4, top: 50, width: 548, height: 493 } },

  /* --- The record behind the verdict, three story cards. NOT IMPORTED.
     The artboard's three photographs were pulled on 17 September 2026 and
     compared against the artwork already in the repository: they are the same
     images, to a mean absolute difference of zero on a 16x16 greyscale
     signature. investor-story-1, -2 and -3 are the audited files for those
     same three purchases, so the page references those and this importer
     writes nothing for that band. The asset ids, if they are ever wanted
     again: 2XRA3ZSAAYMD4EBAMFRJRGDTVG, 7PN6P5FGP5Z2SZWCDMVWN6V85V and
     23RJRKNQR0QPK6PB0SRA3TGS8E. */
];

if (!existsSync(SRC)) mkdirSync(SRC, { recursive: true });

for (const slot of SLOTS) {
  const srcPath = `${SRC}/${slot.asset}`;

  if (!existsSync(srcPath)) {
    const url = `${PAPER_ASSETS}/${slot.asset}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`  FAIL  ${slot.asset}: ${res.status} ${res.statusText}`);
      continue;
    }
    writeFileSync(srcPath, Buffer.from(await res.arrayBuffer()));
  }

  let img = sharp(readFileSync(srcPath));
  const meta = await img.metadata();

  if (slot.cropOfRect) {
    const c = slot.cropOfRect;
    const k = meta.width / c.rect[0];
    img = img.extract({
      left: Math.round(c.left * k),
      top: Math.round(c.top * k),
      width: Math.min(Math.round(c.width * k), meta.width - Math.round(c.left * k)),
      height: Math.min(Math.round(c.height * k), meta.height - Math.round(c.top * k)),
    });
  }

  const [w, h] = slot.size;
  await img
    .resize(w, h, { fit: 'cover', position: 'centre', withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(`${OUT}/${slot.out}`);

  const done = await sharp(`${OUT}/${slot.out}`).metadata();
  console.log(`  ok    ${slot.out}  ${done.width}x${done.height}  from ${meta.width}x${meta.height}`);
}
