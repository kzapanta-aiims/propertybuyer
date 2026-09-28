/**
 * Propertybuyer acceptance checklist, automated.
 *
 * Runs the items from Design Rules section 10 that a machine can check by
 * looking. The ones it cannot check (accent on actions only, one primary
 * action per viewport, gold inside prestige components, tier mixing) still
 * need a human pass.
 *
 *   npm install
 *   npm run check              every built page
 *   npm run check home         one segment
 *
 * Exits non zero if any hard rule fails.
 *
 * Run from the repository root, which is the client folder. Paths below are
 * root relative. The pages themselves live under "New Builds/".
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

/* ------------------------------------------------------------- segments --- */
/* shared/segments.json is the single source of truth. DESIGN.md fixes the six
   strings and HubSpot routing depends on them, so a page that disagrees with
   this file is a failure, not a variation. */

const registry = JSON.parse(readFileSync('shared/segments.json', 'utf8'));
const ALLOWED = registry.segments.map((s) => s.key);

/* The location pages are a second family with their own registry. Same
   tokens, same voice rules, same chips; different capture contract, checked
   below under its own branch. */
const locations = existsSync('shared/locations.json')
  ? JSON.parse(readFileSync('shared/locations.json', 'utf8')).locations
  : [];

const only = process.argv[2];
const pages = [
  ...registry.segments
    .filter((s) => s.page && existsSync(s.page))
    .map((s) => ({ key: s.key, file: s.page, family: 'segment' })),
  ...locations
    .filter((l) => l.page && existsSync(l.page))
    .map((l) => ({ key: l.slug, file: l.page, family: 'location' })),
  /* The broad-targeting page, 28 Sep 2026. Same design layer as the segment
     pages, but no segment of its own, so it takes the location family's
     inverted capture contract with data-page in place of data-location.
     See openDecisions.broadPageCaptureContract. */
  ...(registry.broadPages || [])
    .filter((b) => b.page && existsSync(b.page))
    .map((b) => ({ key: b.key, file: b.page, family: 'broad' })),
].filter((p) => !only || p.key === only);

if (only && pages.length === 0) {
  const known = [...ALLOWED, ...locations.map((l) => l.slug), ...(registry.broadPages || []).map((b) => b.key)];
  console.log(`No built page for "${only}". Known pages: ${known.join(', ')}`);
  process.exit(1);
}
if (pages.length === 0) {
  console.log('No built pages found. Nothing to check.');
  process.exit(1);
}

/* styles.css was split into four layers on 21 Aug 2026: tokens, base, and one
   design layer per page family. Read whatever is in the folder rather than a
   fixed list, so a fifth layer is covered the day someone adds it. */
const sheets = readdirSync('assets/css')
  .filter((f) => f.endsWith('.css'))
  .sort()
  .map((f) => ({ name: f, css: readFileSync(`assets/css/${f}`, 'utf8') }));

let failures = 0;
const pass = (m) => console.log(`  ok    ${m}`);
const fail = (m) => { failures++; console.log(`  FAIL  ${m}`); };
const note = (m) => console.log(`  note  ${m}`);
const head = (m) => console.log(`\n${m}`);
const banner = (m) => console.log(`\n${'='.repeat(70)}\n${m}\n${'='.repeat(70)}`);

/* ----------------------------------------------------- browser, portable --- */
/* The sandbox this was first written in shipped chromium at a fixed path.
   Fall back to whatever Playwright installed locally so the checklist runs on
   a developer machine too. */

const PINNED = '/opt/pw-browsers/chromium';
const executablePath = process.env.CHROMIUM_PATH
  || (existsSync(PINNED) ? PINNED : undefined);
const browser = await chromium.launch(executablePath ? { executablePath } : {});

/* ============================================================ per page === */

for (const { key, file, family } of pages) {
  banner(`${key}  ${file}`);

  const html = readFileSync(file, 'utf8');

  /* Visible copy only: comments, scripts and markup stripped. Gated claims
     live in comments on purpose and must not be linted as if they rendered. */
  const stripped = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/g, '');
  const unescape = (s) => s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&copy;/g, '(c)')
    .replace(/&#9733;/g, '*');
  const text = (frag) => unescape(frag.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
  const visible = text(stripped);

  const between = (tag) =>
    [...stripped.matchAll(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag.split(' ')[0]}>`, 'g'))]
      .map((m) => text(m[1]));

  /* -------------------------------------------------------------- copy --- */
  head('Copy');

  for (const [label, ch] of [['em dash', '—'], ['exclamation mark', '!']]) {
    const n = visible.split(ch).length - 1;
    n === 0 ? pass(`no ${label} in visible copy`) : fail(`${n} ${label}(s) in visible copy`);
  }

  /* 'journey' came off this list on 25 Aug 2026 at the client's direction,
     for the investor hero body. 'unlock' came off it on 1 Sep 2026 the same
     way, for the developer truth card. The rest stand. */
  const banned = [
    'lowest price', 'elevate', 'seamless', 'empower',
    "in today's market", 'now more than ever', 'passionate about',
    'pride ourselves', 'solutions', 'click here', 'find out more',
  ];
  const hits = banned.filter((w) => visible.toLowerCase().includes(w));
  hits.length === 0 ? pass('no banned language') : fail(`banned language: ${hits.join(', ')}`);

  const buttons = between('button');
  const headings = ['h1', 'h2', 'h3'].flatMap(between);
  const bannedCta = ['discover', 'explore', 'learn more', 'submit', 'get started', 'click here'];
  const ctaHits = buttons.filter((b) => bannedCta.some((w) => b.toLowerCase().includes(w)));
  ctaHits.length === 0 ? pass('no banned button labels') : fail(`banned CTA: ${ctaHits.join(', ')}`);

  const advocate = [...headings, ...buttons].filter((t) => t.toLowerCase().includes('advocate'));
  advocate.length === 0 ? pass('no "advocate" in a heading or CTA') : fail(`"advocate" in: ${advocate.join(', ')}`);

  /* Bracketed placeholder copy was a hard failure until 18 Aug 2026, when it
     was retired at the client's direction: the Tier 1 proof points arrive
     after the proof of concept, and failing every run until then was noise
     rather than signal. The brackets are still tracked as an open item in
     README.md and HANDOVER.md, and they remain self-evident in the rendered
     page, so nothing silently passes as real. */

  /* Demo scaffolding. The expert count and its toggle assert live
     availability: a visitor can read "6 experts available right now" as
     fact, and the toggle lets anyone rewrite it from the URL. Unlike the
     bracketed copy above, that reads as true rather than as unfinished,
     which is why this one stays a gate. Added 18 Aug 2026. Remove the
     attributes to pass. */
  const poc = [];
  if (/<body[^>]*\sdata-poc=/.test(html)) poc.push('data-poc on <body>, renders the demo availability toggle');
  if (/<body[^>]*\sdata-experts-count=/.test(html)) poc.push('data-experts-count on <body>, seeds an unverified availability claim');
  if (/class="[^"]*\bpoc-toggle\b/.test(html)) poc.push('.poc-toggle markup is still present');
  poc.length === 0
    ? pass('no proof-of-concept scaffolding left in the page')
    : fail(`${poc.length} demo item(s) present, NOT SHIPPABLE: ${poc.join('; ')}`);

  /* Client review overlay. Every page carries the loader so a review link
     works on any page, and only the loader: review.js self-mounting without
     the ?review=1 gate would put the overlay in front of real visitors, the
     same class of mistake as the demo toggle above. Added 28 Aug 2026, see
     the client-review skill and the feedback-hub repo. */
  /<script[^>]*review-loader\.js[^>]*data-review-site=/.test(html)
    ? pass('review overlay loader present')
    : fail('review overlay loader missing (script tag with data-review-site)');
  !/<script[^>]*src="[^"]*\breview\.js"/.test(html)
    ? pass('review.js loads only through its gate')
    : fail('review.js referenced directly, bypassing the ?review=1 gate');

  /* ------------------------------------------------- character budgets --- */
  head('Mobile character budgets, checked at 390');

  const subhead = text((stripped.match(/class="hero__subhead">([\s\S]*?)<\/p>/) || [])[1] || '');
  /* Per page, deliberately. The budget is 42 because the slot is one display
     line at --type-h3-card with no max width, and 42 is what fits on one line
     at 390.

     The commercial, investor and developer pages are all over it on
     purpose, each because the client supplied the subhead and overruled the
     budget rather than the copy. Commercial took 78 on 26 Aug 2026, naming
     who the agency acts for. Investor took 55 on 28 Aug 2026, naming who
     the agency helps, set in sentence case rather than the title case
     supplied because DESIGN.md bans title case outright; the words are
     unchanged. Developer took 62 on 28 Aug 2026, rewritten in Paper to
     "Due diligence does not just involve costings and realisations."

     All three wrap to more than one line and cost vertical space in the
     hero. The clipping, scroll, tap target and rhythm checks below still
     pass at all four widths on each, which is what makes these budget
     exceptions rather than render bugs. Recorded as
     openDecisions.commercialClientCopyEdits,
     openDecisions.investorClientCopyEdits28Aug and
     openDecisions.developerPaperEdits28Aug.

     A client overrule on one page is not a new house rule, so any page not
     named here still answers to 42. */
  const subheadBudget = { commercial: 78, investor: 55, developer: 62 }[key] ?? 42;

  subhead.length <= subheadBudget
    ? pass(`hero subhead ${subhead.length}/${subheadBudget}`)
    : fail(`hero subhead ${subhead.length}/${subheadBudget}: "${subhead}"`);

  const over = (list, max, what) => {
    const bad = list.filter((t) => t.length > max);
    bad.length === 0
      ? pass(`${what} within ${max}`)
      : fail(`${what} over ${max}: ${bad.map((t) => `${t.length} "${t}"`).join(' | ')}`);
  };

  /* H1 and H2 were one 60 character gate until 28 Aug 2026. They are split
     so the investor H1 can carry its own exception without also relaxing
     that page's H2s, which all still answer to 60. On 28 Aug 2026 the client
     was adamant on a 68 character H1 for the investor page. It is authored
     with four explicit line breaks and its widest line, "investment
     portfolio", is unchanged from the 59 character version, so it costs no
     extra width at any of the four widths and the render checks below pass.
     Recorded as openDecisions.investorClientCopyEdits28Aug. */
  over(between('h1'), key === 'investor' ? 68 : 60, 'H1');
  over(between('h2'), 60, 'H2');
  over(between('h3'), 32, 'card headings');
  over(buttons, 34, 'button labels');
  over(between('label class="micro"').concat(between('legend class="micro"')), 20, 'field labels');

  /* ----------------------------------------------------------- capture --- */
  head('Segment capture');

  const used = [...new Set([...html.matchAll(/data-segment="([^"]+)"/g)].map((m) => m[1]))];
  const bad = used.filter((v) => !ALLOWED.includes(v));
  bad.length === 0
    ? pass(`data-segment values all valid (${used.length} distinct)`)
    : fail(`invalid data-segment: ${bad}`);

  /* Every page carries the whole router, so every page must offer all six
     chips. A page that quietly drops a segment breaks the router contract. */
  const missing = ALLOWED.filter((v) => !used.includes(v));
  missing.length === 0
    ? pass('all six segments present in the router and chip rows')
    : fail(`segments missing from this page: ${missing.join(', ')}`);

  const forms = html.match(/<form[^>]*>/g) || [];

  if (family === 'segment') {
    const tagged = forms.filter((f) => f.includes('data-segment'));
    tagged.length === forms.length && forms.length >= 2
      ? pass(`${forms.length} capture points, all carry data-segment`)
      : fail(`${tagged.length} of ${forms.length} capture points carry data-segment, and a page needs at least 2`);

    /* Both capture points must default to the page's own segment, otherwise a
       lead that never touches the chip row arrives labelled as another page. */
    const defaults = [...html.matchAll(/<form[^>]*data-segment="([^"]+)"/g)].map((m) => m[1]);
    defaults.every((d) => d === key)
      ? pass(`both capture points default to "${key}"`)
      : fail(`capture points default to ${defaults.join(', ')}, expected "${key}"`);
  } else {
    /* A location page inverts the capture: the location is fixed by the page
       and the segment is the question. So every form carries data-location
       for HubSpot, no form fixes a segment, no chip is pre-selected (a
       default would mislabel every lead that never touched the row), and the
       radio group is required so the choice cannot be skipped. The broad page
       inverts it the same way, tagged data-page instead of data-location. */
    const attr = family === 'broad' ? 'data-page' : 'data-location';
    const locTagged = forms.filter((f) => f.includes(`${attr}="${key}"`));
    locTagged.length === forms.length && forms.length >= 2
      ? pass(`${forms.length} capture points, all carry ${attr}="${key}"`)
      : fail(`${locTagged.length} of ${forms.length} capture points carry ${attr}="${key}", and a page needs at least 2`);

    const segForms = forms.filter((f) => f.includes('data-segment'));
    segForms.length === 0
      ? pass('no capture point fixes a segment')
      : fail(`${segForms.length} capture point(s) carry data-segment; a location page must not fix a segment`);

    /<input[^>]*name="segment"[^>]*\schecked/.test(html)
      ? fail('a segment chip is pre-selected; a location page asks, never assumes')
      : pass('no segment chip pre-selected');

    /<input[^>]*name="segment"[^>]*\srequired/.test(html)
      ? pass('segment choice is required')
      : fail('segment radio group is not required, so the qualification step can be skipped');
  }

  /* ------------------------------------------------------------ markup --- */
  head('Token discipline, markup');

  const inline = (stripped.match(/style="/g) || []).length;
  inline === 0 ? pass('no inline style attributes') : fail(`${inline} inline style attribute(s)`);

  /* Pages live two levels down, under "New Builds/", so every asset reference
     is ../../ relative. Anything shallower resolves to nothing and the page
     loads unstyled, which is easy to miss on a machine that caches. */
  const badRefs = [...html.matchAll(/(?:href|src)="((?:\.\.\/)?assets\/[^"]*)"/g)].map((m) => m[1]);
  badRefs.length === 0
    ? pass('asset paths are relative to the page folder')
    : fail(`asset paths need ../../ : ${badRefs.join(', ')}`);

  /* Three sheets, in order. tokens.css carries the Figma aliases and the two
     faces, base.css the reset and the shared components, then exactly one
     design layer. A page that loads both design layers is a mistake rather
     than a variation: they define the same class names for different page
     families. A page missing tokens.css renders unstyled, because every var()
     falls back to nothing, and that reads as a layout bug rather than as a
     missing file. */
  const sheetRefs = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="[^"]*assets\/css\/([^"]+)"/g)]
    .map((m) => m[1]);
  const layers = sheetRefs.filter((f) => f === 'landing.css' || f === 'locations.css');
  const wanted = ['tokens.css', 'base.css'];
  wanted.every((f, i) => sheetRefs[i] === f)
    ? pass('tokens.css then base.css, first and second')
    : fail(`stylesheet order is ${sheetRefs.join(', ') || 'none'}, wanted ${wanted.join(', ')} first`);
  const expectedLayer = family === 'location' ? 'locations.css' : 'landing.css';
  layers.length === 1 && layers[0] === expectedLayer
    ? pass(`one design layer, the right one: ${layers[0]}`)
    : fail(`design layer(s): ${layers.join(', ') || 'none'}. This family loads exactly ${expectedLayer}`);

  /* ---------------------------------------------------------- rendered --- */
  head('Rendered checks');

  /* pathToFileURL, not string concatenation: the page path now contains a
     space, and on Windows a backslash drive path, both of which need encoding
     before Chromium will open them. */
  const url = pathToFileURL(file).href;

  for (const [w, h] of [[390, 844], [768, 1024], [1100, 900], [1440, 900]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto(url, { waitUntil: 'networkidle' });

    const r = await page.evaluate(() => {
      const de = document.documentElement;
      const small = [];
      document.querySelectorAll('a, button, select, summary, .chip__label, input:not([type=radio])').forEach((el) => {
        const b = el.getBoundingClientRect();
        if (b.width === 0 && b.height === 0) return;
        if (getComputedStyle(el).position === 'absolute' && b.left < 0) return; // skip link, off screen until focused
        if (b.height < 44) small.push(`${el.tagName}.${el.className} h=${Math.round(b.height)}`);
      });
      const clipped = [];
      document.querySelectorAll('h1, h2, h3, p, label, legend, button').forEach((el) => {
        if (el.scrollHeight > el.clientHeight + 1 && getComputedStyle(el).overflow === 'hidden') {
          clipped.push(el.tagName);
        }
      });
      const cs = getComputedStyle(document.body);
      return {
        hScroll: de.scrollWidth > de.clientWidth,
        small: [...new Set(small)],
        clipped: [...new Set(clipped)],
        h1: getComputedStyle(document.querySelector('h1')).fontSize,
        h2: getComputedStyle(document.querySelector('h2')).fontSize,
        sectionY: getComputedStyle(document.querySelector('.section')).paddingTop,
        bodySize: cs.fontSize,
        bodyWeight: cs.fontWeight,
      };
    });

    const at = `${w}:`;
    r.hScroll ? fail(`${at} horizontal scroll`) : pass(`${at} no horizontal scroll`);
    r.clipped.length === 0 ? pass(`${at} no clipped text`) : fail(`${at} clipped: ${r.clipped}`);
    r.small.length === 0 ? pass(`${at} every tap target 44 or larger`) : fail(`${at} under 44: ${r.small.join(' | ')}`);

    /* UPDATED 17 Aug 2026 for the Paper rebuild. The design promotes the
       hero H1 to type/stat (52/40) and section H2 to type/display (44/34),
       and moves section rhythm to 120 desktop. Figma Variables still hold
       the old values; HANDOVER.md records the delta until Figma is updated. */
    const expect = w >= 768 ? { h1: '52px', h2: '44px', y: '120px' } : { h1: '40px', h2: '34px', y: '48px' };
    r.h1 === expect.h1 && r.h2 === expect.h2
      ? pass(`${at} H1 ${r.h1} and H2 ${r.h2} match the type tokens`)
      : fail(`${at} H1 ${r.h1} H2 ${r.h2}, expected ${expect.h1} and ${expect.h2}`);
    r.sectionY === expect.y
      ? pass(`${at} section rhythm ${r.sectionY}`)
      : fail(`${at} section rhythm ${r.sectionY}, expected ${expect.y}`);
    if (r.bodySize !== '16px' || r.bodyWeight !== '300') {
      fail(`${at} body is ${r.bodySize}/${r.bodyWeight}, expected 16px/300`);
    }

    await page.close();
  }
}

await browser.close();

/* ======================================================= once, not per page */
/* The stylesheets are shared, so this is a repository check rather than a page
   one. Only tokens.css is allowed to hold values at all, so the other layers
   are checked whole. That is stricter than the single file this replaced. */

banner('Shared stylesheets');
head('Token discipline, CSS');

for (const { name, css } of sheets) {
  /* Everything except the :root token declarations. A hex anywhere else means a
     value was chosen by hand rather than bound to a token in 2. Mapped. */
  const outside = (css.match(/:root\s*\{[\s\S]*?\n\}/g) || [])
    .reduce((acc, block) => acc.replace(block, ''), css)
    .replace(/\/\*[\s\S]*?\*\//g, '');
  const rawHex = [...outside.matchAll(/:\s*(#[0-9a-fA-F]{3,8})/g)].map((m) => m[1]);
  rawHex.length === 0
    ? pass(`${name}: no raw hex outside the token block`)
    : fail(`${name}: raw hex in rules: ${rawHex.join(', ')}`);
}

/* Only tokens.css declares tokens. A :root block in another layer is a second
   source of truth, which is the thing the split was done to prevent. */
for (const { name, css } of sheets) {
  if (name === 'tokens.css') continue;
  const roots = (css.match(/:root\s*\{/g) || []).length;
  roots === 0
    ? pass(`${name}: declares no tokens`)
    : fail(`${name}: ${roots} :root block(s). Tokens belong in tokens.css`);
}

/* --------------------------------------------------------------- human --- */

head('Not checkable by machine, needs a human pass');
note('Accent appears on actions only.');
note('One primary action visible per viewport height.');
note('Gold appears only inside prestige components.');
note('No Tier 3 claim renders as visible text, and no block mixes tiers.');
note('No orphaned single word on a heading at 390.');
note('Register matches the segment, see each page BRIEF.md.');

const built = pages.map((p) => p.key).join(', ');
const waiting = [
  ...registry.segments.filter((s) => s.status === 'planned' && !existsSync(s.page || '')).map((s) => s.key),
  ...locations.filter((l) => l.page && !existsSync(l.page)).map((l) => l.slug),
];

console.log(`\nChecked: ${built}`);
if (waiting.length) console.log(`Not built yet: ${waiting.join(', ')}`);
console.log(`\n${failures === 0 ? 'All hard rules pass.' : `${failures} failure(s).`}`);
process.exit(failures === 0 ? 0 : 1);
