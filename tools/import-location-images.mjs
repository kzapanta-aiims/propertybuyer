/**
 * Imports the location page artwork from the Paper file "Location Pages -
 * Adelaide, Perth, Melbourne" into assets/img.
 *
 * WHY THIS IS A SEPARATE SCRIPT
 * tools/import-paper-images.mjs serves the paid pages and reads a different
 * Paper file. This one reads file 01M1B4DVTSCVFR0E3D9K0DB6S5, the three
 * location artboards, as they stood on 29 September 2026.
 *
 * WHY THE OUTPUT IS PREFIXED
 * All pages share one assets/img, and the unprefixed names belong to the
 * buyer page (CLAUDE.md). Every file written here carries a prefix:
 *   melbourne-, adelaide-, perth-   artwork used by one location page only
 *   agent-                          portraits, shared by the location family
 *   loc-                            furniture shared by the location family
 * Nothing here can overwrite an image a paid page references.
 *
 * WHY THE PORTRAITS CARRY GEOMETRY
 * Paper crops a portrait by oversizing the image rectangle inside a 300x410
 * frame and offsetting it. The visible window is a function of the
 * rectangle's size and offset, so the numbers below are the ones
 * get_computed_styles reported, and the crop is computed from them rather
 * than read off a screenshot. Everything else fills its frame with a centred
 * cover, which the page reproduces with object-fit, so those are only
 * resized.
 *
 * The Adelaide and Perth photographs are Unsplash. The licence asks for a
 * credit where practical; the credits are in locations/HANDOVER-LOCATIONS.md.
 *
 *   npm run import-location-images
 *
 * Sources are fetched to .paper-src/, which is scratch and gitignored.
 */
import sharp from 'sharp';
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';

const SRC = '.paper-src/locations';
const OUT = 'assets/img';
const QUALITY = 80;
const PAPER = 'https://app.paper.design/file-assets/01M1B4DVTSCVFR0E3D9K0DB6S5';

/* `width` is the stored width: 2x the widest CSS render where the source has
   the pixels, native otherwise. Nothing is ever enlarged. */
const COVER = [
  /* --- Melbourne ---------------------------------------------------------- */
  { out: 'melbourne-hero-1.webp', asset: '0YSXA7B6HVA2GWDDXW3P126Y39.jpg', width: 520 }, // terraces
  { out: 'melbourne-hero-2.webp', asset: '3EKWM8JRN3QH6ZCHZGA5NAP16N.jpg', width: 520 }, // tram
  { out: 'melbourne-hero-3.webp', asset: '0VHSWH89WTEM886XQ1FGQG4QAR.jpg', width: 520 }, // Yarra skyline
  /* Slot 1 is the bracketed home buyer record. This photograph is on the
     approved artboard but is NOT the purchased property; see the page. */
  { out: 'melbourne-story-1.webp', asset: '3F9HMSDRT0NQDAFS31XSDVGHDJ.webp', width: 760 },
  { out: 'melbourne-story-2.webp', asset: '7RCFV0KK2QKBPN06VEW4J2Z4K5.webp', width: 760 }, // Wendy
  { out: 'melbourne-story-3.webp', asset: '11W9BY0NFPVFJBKPNFQ0PYW4WW.webp', width: 760 }, // Geoff
  { out: 'melbourne-argument.webp', asset: '616JQRNVC0HCB5K357M8JHGRVE.jpg', width: 880 },
  { out: 'melbourne-market.webp', asset: '359GVRDAFGFCXBVH2FFS0MHMRJ.jpg', width: 2320 },
  { out: 'melbourne-regions.webp', asset: '21TJDXD9983X55JB0KSTER1XW2.jpg', width: 2320 },
  { out: 'melbourne-offmarket.webp', asset: '67TREK8RY254GAYQM5KGNWMM98.jpg', width: 880 },
  { out: 'melbourne-map.webp', asset: '01M1JQTAGQK0PBZMBE9KGS2Q2T.png', width: 1040 },

  /* --- Adelaide. Story photographs are already in assets/img from the
     client decks (adelaide-story-1 to 3), so they are not re-imported. --- */
  { out: 'adelaide-hero-1.webp', asset: '6QY9PNGGVYN720ZJH5Y0DZC0CW.avif', width: 520 }, // Seacliff beach house
  { out: 'adelaide-hero-2.webp', asset: '36YZG022QBGHJZWBSRK4H27Q3X.avif', width: 520 }, // Adelaide Oval
  { out: 'adelaide-hero-3.webp', asset: '71YJ5TX198HXH2J76K2SPN05SA.avif', width: 520 }, // from the Hills
  { out: 'adelaide-argument.webp', asset: '67JG6YN0RG95K0ZQ1NTB5QGCAE.avif', width: 880 },
  { out: 'adelaide-market.webp', asset: '6ZQGWGXAS86PDDFX3H4VHW03DJ.avif', width: 2320 },
  { out: 'adelaide-regions.webp', asset: '4Q9K4NWCXR4PN7YD1H0TDJ0KDJ.avif', width: 2320 }, // Adelaide Hills
  { out: 'adelaide-offmarket.webp', asset: '28BX5FJS5B4VAZ0HWJG4676BGX.avif', width: 880 },

  /* --- Perth. The three card photographs are streetscapes, not purchases,
     and are named that way in the Paper layer tree. ------------------------ */
  { out: 'perth-hero-1.webp', asset: '0308CHHNXPKPY4Q2K181ZVXSF4.avif', width: 520 }, // Palmyra house
  { out: 'perth-hero-2.webp', asset: '4M7532QR2NP9BHRGBE6FM9VYKZ.avif', width: 520 }, // Fremantle street
  { out: 'perth-hero-3.webp', asset: '2DM23HN29CAEB5BJ1FRBRQ9EYY.avif', width: 520 }, // Perth CBD
  { out: 'perth-card-1.webp', asset: '7BWK2NXDV047576K5DCSZMHA8J.avif', width: 760 }, // skyline at sunrise
  { out: 'perth-card-2.webp', asset: '6YTN44YEHH6GDKC3A0RZS4K35K.avif', width: 760 }, // Bicton from Palmyra
  { out: 'perth-card-3.webp', asset: '7JH6M7YNGD3JHVMM9G4YZFA11B.avif', width: 760 }, // Cottesloe
  { out: 'perth-argument.webp', asset: '3KGJWH4QSGYNF6QZ6HNABGGBEP.avif', width: 880 }, // Fremantle port
  { out: 'perth-market.webp', asset: '2RSXH82V238SAR15VA95ACPVNX.avif', width: 2320 }, // from Kings Park
  { out: 'perth-regions.webp', asset: '4D3TSG9TAAKYR9BSKVSKRV41YR.avif', width: 2320 }, // Cottesloe beach
  { out: 'perth-offmarket.webp', asset: '0JHQA7FZK9R3HPMHBC9ZV03Y6V.avif', width: 880 },

  /* --- Family furniture ---------------------------------------------------- */
  { out: 'loc-fee-keys.webp', asset: '1HVK7PN3989D33J14QJAAV04RE.jpg', width: 832 },
  { out: 'loc-team-mark.webp', asset: '01M1JKN3X9BPG89C1TAGHVZFYN.png', width: 730, alpha: true },
  { out: 'loc-team-texture.webp', asset: '01M06WMRY9C93JFNJMR36E7CC1.png', width: 1440 },
];

/* Portraits. frame is the visible window, rect the image rectangle, at its
   offset against the frame, all in CSS px at 1440. Stored at 600x820. */
const FRAME = [300, 410];
const PORTRAITS = [
  { out: 'agent-amanda-jones.webp', asset: '01M1JGQ7GSJ0V8Z71WSPVKJ91M.png', rect: [486, 486], at: [-93, -28.297] },
  { out: 'agent-tass-pattas.webp', asset: '01M30TJHV1HT99XHMKJPKXGYGV.png', rect: [455, 456], at: [-69, -40] },
  /* Centred with translate(-50%, -50%) at top: calc(50% + 23px). */
  { out: 'agent-jono-roy.webp', asset: '01M21K0NGH5Y9622Z8VHN5NBCN.jpg', rect: [484, 484], at: [150 - 242, 205 + 23 - 242] },
  { out: 'agent-greg-willmott.webp', asset: '01M30TQ1NWN8TDT9TVY4HJ8NN6.png', rect: [944, 1170], at: [-329, -164] },
  { out: 'agent-rich-harvey.webp', asset: '01M1JGPSPS8N4ZJPVRSZQNAGWP.png', rect: [482, 482], at: [-67, -14.297] },
  /* Centred, top: calc(50% + 6px). */
  { out: 'agent-jonathon-moore.webp', asset: '01M1ZSF2JA5XJG34Q5EG0J1R4V.jpg', rect: [302, 452], at: [150 - 151, 205 + 6 - 226] },
  { out: 'agent-michelle-derderyan.webp', asset: '01M1ZS2C8BDF0Q6F345HD5FT21.jpg', rect: [1068, 1325], at: [-405, -226] },
];

/* Footer social icons, copied as they are. */
const RAW = [
  { out: 'loc-social-linkedin.svg', asset: '10A418PN35ERQKH2CTRF69V3K7.svg' },
  { out: 'loc-social-facebook.svg', asset: '3F5R0Q0JSTKNEAE1PSN11N55EM.svg' },
  { out: 'loc-social-instagram.svg', asset: '59W8VW13FP3FA32TNZ11AVW0SW.svg' },
  { out: 'loc-social-youtube.svg', asset: '4M4WN5BM7KWSRWSZW29QM0P7N9.svg' },
  { out: 'loc-social-x.svg', asset: '743CB9T84Q49WYR8TYRQ43Z2G1.svg' },
];

mkdirSync(SRC, { recursive: true });

const fetchAsset = async (asset) => {
  const path = `${SRC}/${asset}`;
  if (!existsSync(path)) {
    const res = await fetch(`${PAPER}/${asset}`);
    if (!res.ok) throw new Error(`${asset}: HTTP ${res.status}`);
    writeFileSync(path, Buffer.from(await res.arrayBuffer()));
  }
  return path;
};

for (const slot of COVER) {
  const src = await fetchAsset(slot.asset);
  const info = await sharp(src)
    .resize({ width: slot.width, withoutEnlargement: true })
    .webp({ quality: QUALITY, alphaQuality: slot.alpha ? 90 : 100 })
    .toFile(`${OUT}/${slot.out}`);
  console.log(`${slot.out}  ${info.width}x${info.height}`);
}

for (const p of PORTRAITS) {
  const src = await fetchAsset(p.asset);
  const { width: sw, height: sh } = await sharp(src).metadata();
  const [w, h] = p.rect;
  /* background-size: cover inside the rect, centred. */
  const s = Math.max(w / sw, h / sh);
  const ox = (w - sw * s) / 2;
  const oy = (h - sh * s) / 2;
  const left = Math.max(0, Math.round((-p.at[0] - ox) / s));
  const top = Math.max(0, Math.round((-p.at[1] - oy) / s));
  const cw = Math.min(sw - left, Math.round(FRAME[0] / s));
  const ch = Math.min(sh - top, Math.round(FRAME[1] / s));
  const info = await sharp(src)
    .extract({ left, top, width: cw, height: ch })
    .resize({ width: FRAME[0] * 2, height: FRAME[1] * 2, fit: 'cover', withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(`${OUT}/${p.out}`);
  console.log(`${p.out}  ${info.width}x${info.height}  crop ${cw}x${ch} at ${left},${top}`);
}

for (const r of RAW) {
  const src = await fetchAsset(r.asset);
  copyFileSync(src, `${OUT}/${r.out}`);
  console.log(r.out);
}
