/* Renders the email signature artwork to PNG, at 2x.
 *
 * Email clients do not render SVG (Gmail and Outlook both drop it) and
 * Outlook desktop ignores border-radius, so every icon ships as a flat PNG
 * with its circle already painted in. Sources are the Paper file "Email
 * Signature", Template artboard: the raster assets are in tools/signature-src,
 * downloaded from Paper, and the vector icons are the Paper SVG paths below.
 *
 *   node tools/build-signature-assets.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const SRC = 'tools/signature-src';
const OUT = 'email-signature/img';
const BRAND = '#00404B';
const SURFACE = '#FBFAF7';
const STAR = '#C9A26B';

const dataUri = (file) =>
  `data:image/${file.endsWith('.jpg') ? 'jpeg' : 'png'};base64,${readFileSync(`${SRC}/${file}`).toString('base64')}`;

const facebook = `<svg viewBox="96 25 23 23" width="23" height="23" xmlns="http://www.w3.org/2000/svg"><path d="M107.341 25C101.077 25 96 30.149 96 36.5 96 41.893 99.662 46.419 104.601 47.661 104.601 47.661 104.601 40.014 104.601 40.014 104.601 40.014 102.263 40.014 102.263 40.014 102.263 40.014 102.263 36.5 102.263 36.5 102.263 36.5 104.601 36.5 104.601 36.5 104.601 36.5 104.601 34.986 104.601 34.986 104.601 31.072 106.348 29.257 110.138 29.257 110.856 29.257 112.096 29.4 112.603 29.543 112.603 29.543 112.603 32.728 112.603 32.728 112.336 32.7 111.871 32.686 111.293 32.686 109.433 32.686 108.715 33.4 108.715 35.257 108.715 35.257 108.715 36.5 108.715 36.5 108.715 36.5 112.419 36.5 112.419 36.5 112.419 36.5 111.783 40.014 111.783 40.014 111.783 40.014 108.715 40.014 108.715 40.014 108.715 40.014 108.715 47.916 108.715 47.916 114.331 47.228 118.682 42.38 118.682 36.5 118.681 30.149 113.604 25 107.341 25Z" fill="${BRAND}"/></svg>`;

const linkedin = `<svg viewBox="60.5 25 23 23" width="23" height="23" xmlns="http://www.w3.org/2000/svg"><path d="M81.662 25C81.662 25 62.334 25 62.334 25 61.408 25 60.659 25.741 60.659 26.657 60.659 26.657 60.659 46.338 60.659 46.338 60.659 47.254 61.408 48 62.334 48 62.334 48 81.662 48 81.662 48 82.587 48 83.341 47.254 83.341 46.343 83.341 46.343 83.341 26.657 83.341 26.657 83.341 25.741 82.587 25 81.662 25ZM67.389 44.599C67.389 44.599 64.022 44.599 64.022 44.599 64.022 44.599 64.022 33.621 64.022 33.621 64.022 33.621 67.389 33.621 67.389 33.621 67.389 33.621 67.389 44.599 67.389 44.599ZM65.705 32.125C64.624 32.125 63.752 31.24 63.752 30.148 63.752 29.057 64.624 28.172 65.705 28.172 66.781 28.172 67.654 29.057 67.654 30.148 67.654 31.235 66.781 32.125 65.705 32.125ZM79.987 44.599C79.987 44.599 76.625 44.599 76.625 44.599 76.625 44.599 76.625 39.263 76.625 39.263 76.625 37.992 76.603 36.352 74.875 36.352 73.125 36.352 72.86 37.74 72.86 39.173 72.86 39.173 72.86 44.599 72.86 44.599 72.86 44.599 69.502 44.599 69.502 44.599 69.502 44.599 69.502 33.621 69.502 33.621 69.502 33.621 72.726 33.621 72.726 33.621 72.726 33.621 72.726 35.121 72.726 35.121 72.726 35.121 72.771 35.121 72.771 35.121 73.218 34.258 74.317 33.347 75.952 33.347 79.358 33.347 79.987 35.62 79.987 38.575 79.987 38.575 79.987 44.599 79.987 44.599 79.987 44.599 79.987 44.599 79.987 44.599Z" fill="${BRAND}"/></svg>`;

const instagram = `<svg viewBox="25 25 23 23" width="23" height="23" xmlns="http://www.w3.org/2000/svg"><path d="M36.659 27.071C39.69 27.071 40.048 27.084 41.24 27.138 42.348 27.188 42.945 27.376 43.344 27.534 43.872 27.74 44.252 27.992 44.646 28.392 45.045 28.796 45.289 29.178 45.493 29.712 45.648 30.117 45.834 30.727 45.883 31.846 45.936 33.059 45.949 33.423 45.949 36.491 45.949 39.564 45.936 39.927 45.883 41.136 45.834 42.259 45.648 42.865 45.493 43.27 45.289 43.804 45.041 44.191 44.646 44.59 44.248 44.995 43.872 45.242 43.344 45.448 42.945 45.606 42.343 45.794 41.24 45.844 40.044 45.898 39.685 45.911 36.659 45.911 33.63 45.911 33.27 45.898 32.079 45.844 30.972 45.794 30.373 45.606 29.975 45.448 29.448 45.242 29.066 44.99 28.672 44.59 28.273 44.186 28.03 43.804 27.826 43.27 27.671 42.865 27.485 42.254 27.436 41.136 27.383 39.923 27.37 39.559 27.37 36.491 27.37 33.418 27.383 33.054 27.436 31.846 27.485 30.723 27.671 30.117 27.826 29.712 28.03 29.178 28.278 28.791 28.672 28.392 29.071 27.987 29.448 27.74 29.975 27.534 30.373 27.376 30.976 27.188 32.079 27.138 33.27 27.084 33.63 27.071 36.659 27.071ZM36.659 25C33.58 25 33.195 25.013 31.986 25.068 30.781 25.121 29.952 25.319 29.235 25.602 28.486 25.898 27.853 26.289 27.223 26.932 26.59 27.569 26.205 28.212 25.912 28.967 25.633 29.699 25.438 30.534 25.385 31.756 25.332 32.987 25.319 33.378 25.319 36.5 25.319 39.622 25.332 40.013 25.385 41.239 25.438 42.461 25.633 43.301 25.912 44.029 26.205 44.788 26.59 45.431 27.223 46.068 27.853 46.706 28.486 47.102 29.23 47.393 29.952 47.677 30.776 47.874 31.981 47.928 33.191 47.982 33.576 47.996 36.655 47.996 39.734 47.996 40.119 47.982 41.328 47.928 42.533 47.874 43.362 47.677 44.079 47.393 44.824 47.102 45.457 46.706 46.086 46.068 46.715 45.431 47.105 44.788 47.393 44.033 47.672 43.301 47.867 42.466 47.92 41.244 47.974 40.018 47.987 39.627 47.987 36.504 47.987 33.383 47.974 32.992 47.92 31.765 47.867 30.543 47.672 29.703 47.393 28.976 47.114 28.212 46.728 27.569 46.095 26.932 45.466 26.294 44.833 25.898 44.088 25.607 43.366 25.323 42.542 25.126 41.337 25.072 40.123 25.013 39.738 25 36.659 25Z" fill="${BRAND}"/><path transform="translate(11.67 11.67)" d="M24.987 18.921C21.771 18.921 19.162 21.567 19.162 24.828 19.162 28.089 21.771 30.735 24.987 30.735 28.203 30.735 30.813 28.089 30.813 24.828 30.813 21.567 28.203 18.921 24.987 18.921ZM24.987 28.66C22.901 28.66 21.209 26.944 21.209 24.828 21.209 22.712 22.901 20.996 24.987 20.996 27.074 20.996 28.766 22.712 28.766 24.828 28.766 26.944 27.074 28.66 24.987 28.66Z" fill="${BRAND}"/><path transform="translate(33.94 8.31)" d="M10.137 22.053C10.137 22.817 9.526 23.432 8.777 23.432 8.024 23.432 7.417 22.812 7.417 22.053 7.417 21.289 8.029 20.674 8.777 20.674 9.526 20.674 10.137 21.294 10.137 22.053Z" fill="${BRAND}"/></svg>`;

const star = `<svg viewBox="0 2.703 16 16" width="16" height="16" xmlns="http://www.w3.org/2000/svg" style="display:block;overflow:visible"><path transform="translate(2 2)" d="M1.883 14.929C1.883 14.929 2.967 10.245 2.967 10.245 2.967 10.245-0.666 7.096-0.666 7.096-0.666 7.096 4.134 6.679 4.134 6.679 4.134 6.679 6 2.262 6 2.262 6 2.262 7.866 6.679 7.866 6.679 7.866 6.679 12.666 7.096 12.666 7.096 12.666 7.096 9.033 10.245 9.033 10.245 9.033 10.245 10.117 14.929 10.117 14.929 10.117 14.929 6 12.446 6 12.446 6 12.446 1.883 14.929 1.883 14.929Z" fill="${STAR}"/></svg>`;

/* The contact icons sit in a 48px circle, the photo is 28px inside it. */
const circleIcon = (file) =>
  `<div style="width:48px;height:48px;border-radius:50%;background:${SURFACE};display:flex;align-items:center;justify-content:center"><img src="${dataUri(file)}" width="28" height="28"></div>`;

const jobs = [
  ['logo.png', 86, 40, `<img src="${dataUri('logo.png')}" width="86" height="40" style="display:block">`],
  ['icon-phone.png', 48, 48, circleIcon('phone.png')],
  ['icon-location.png', 48, 48, circleIcon('location.png')],
  ['facebook.png', 23, 23, facebook],
  ['linkedin.png', 23, 23, linkedin],
  ['instagram.png', 23, 23, instagram],
  ['stars.png', 80, 16, `<div style="display:flex">${star.repeat(5)}</div>`],
];

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 2 });
for (const [name, w, h, html] of jobs) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(
    `<style>html,body{margin:0;background:transparent}svg{display:block}</style>${html}`,
  );
  await page.screenshot({ path: `${OUT}/${name}`, omitBackground: true, clip: { x: 0, y: 0, width: w, height: h } });
  console.log(`${OUT}/${name}`);
}

/* The default headshot, resized for the in-browser compositor. */
const photoPage = await browser.newPage({ deviceScaleFactor: 1, viewport: { width: 600, height: 600 } });
await photoPage.setContent(`<style>html,body{margin:0}</style><img src="${dataUri('photo.jpg')}" width="600" height="600" style="display:block">`);
const photo = await photoPage.screenshot({ type: 'jpeg', quality: 86 });
await browser.close();

/* assets.js carries every image as a data URI as well, so the generator
 * works opened straight from disk: the photo compositor needs untainted
 * sources for its canvas, and a signature copied from a page that is not
 * publicly hosted has no URL its images could point at. */
const b64 = (buf, type) => `data:image/${type};base64,${buf.toString('base64')}`;
const embedded = {};
for (const [name] of jobs) embedded[name] = b64(readFileSync(`${OUT}/${name}`), 'png');
for (const name of ['laurel-left.png', 'laurel-right.png']) {
  writeFileSync(`${OUT}/${name}`, readFileSync(`${SRC}/${name}`));
  embedded[name] = b64(readFileSync(`${OUT}/${name}`), 'png');
}
embedded['photo-source.jpg'] = b64(photo, 'jpeg');
embedded['wave.png'] = b64(readFileSync(`${SRC}/logo.png`), 'png');

writeFileSync(
  'email-signature/assets.js',
  `/* Generated by tools/build-signature-assets.mjs. Do not edit by hand. */\nwindow.SIGNATURE_ASSETS = ${JSON.stringify(embedded, null, 1)};\n`,
);
console.log('email-signature/assets.js');
