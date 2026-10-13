# Location pages, handover to the HubSpot developer

Written 29 September 2026. This is the brief for porting the three location
pages into HubSpot. The pages in this folder are the **reference front end**:
plain HTML, CSS and one script, no build step and no framework. They are
built from the Paper file "Location Pages - Adelaide, Perth, Melbourne"
(`app.paper.design/file/01M1B4DVTSCVFR0E3D9K0DB6S5`), artboards
`MELBOURNE · 1440`, `ADELAIDE· 1440` and `PERTH· 1440`.

What is done: markup, layout at every width, the capture forms' front end,
structured data, image assets, and the checker passing on all three pages.
What is not: HubSpot templates and modules, form wiring, the global header
and footer, Google Maps, and the content still in `[square brackets]`.

## 1. See it

```sh
npm install
npm run serve
```

Then open `/locations/melbourne/`, `/locations/adelaide/` and
`/locations/perth/`. On the Vercel preview the same paths work, and they are
indexable there on purpose (see `README.md` in this folder).

`npm run check melbourne` (or `adelaide`, `perth`) runs the acceptance
checklist at 390, 768, 1100 and 1440. All three pass. Run it after any
change; it needs `npx playwright install chromium` once.

## 2. Anything in square brackets is not copy

A value in `[square brackets]` is an unfilled input, shipped visibly so
nobody mistakes it for finished copy. Every one carries the class
`loc-unfilled` (or sits inside an element that does), so
`document.querySelectorAll('.loc-unfilled')` lists them all. **Do not ship a
page to production with a bracket on it**, and do not replace a bracket with
plausible text: every one is waiting on a client answer, listed in section 9.

The same goes for the three things commented out as Tier 3 in the markup
(search `TIER 3`): they are claims the claims register does not clear, and
they stay out of the page until the client confirms them.

## 3. Stylesheets and modules

Three stylesheets, in this order, on every location page. Never `landing.css`.

```html
<link rel="stylesheet" href="../../assets/css/tokens.css">
<link rel="stylesheet" href="../../assets/css/base.css">
<link rel="stylesheet" href="../../assets/css/locations.css">
```

- `tokens.css`: every colour, space, size, radius and both faces, as CSS
  custom properties. Shared with the paid pages.
- `base.css`: reset, base type, buttons, pills and the lead capture card
  component (`.lead-card`, `.chip`, `.field`, `.select-wrap`). Shared.
- `locations.css`: this family's layout. Every selector is `loc-` prefixed
  and grouped under a banner per section, so one section is one module.

| # | Section | Root selector | Suggested HubSpot module |
|---|---|---|---|
| | Header | `.loc-header` | **existing global header**, drop this block |
| 1-2 | Hero and capture step one | `.loc-hero` | hero + form |
| 3 | Local proof and awards panel | `.loc-proof`, `.loc-record`, `.loc-awards` | proof cards (repeater of 3) |
| 4 | Local agents | `.loc-team`, `.loc-agent` | team (repeater) |
| 5 | Why use a buyer's agent | `.loc-split` | split text + image |
| 6 | Market | `.loc-market`, `.loc-table` | market table |
| 7 | Regions | `.loc-regions`, `.loc-region` | region cards (repeater) |
| 8 | Process and fee | `.loc-process`, `.loc-steps`, `.loc-fees` | process + fee card |
| 9 | Off market | `.loc-split--offmarket` | split text + image |
| 10 | Segment fork | `.loc-segments`, `.loc-fork` | six blocks |
| 11 | Testimonials | `.loc-voices`, `.loc-quote` | testimonials (repeater) |
| 12 | FAQ | `.loc-faq` | FAQ (repeater, feeds FAQPage schema) |
| 13 | Closing capture and office | `.loc-closer`, `.loc-office` | form + office |
| | Newsletter band | `.loc-newsletter` | **existing global module** |
| | Footer | `.loc-footer` | **existing global footer**, drop this block |

The header, newsletter band and footer are drawn in Paper as the live site's
global chrome, and they are reproduced here only so the reference page reads
as a whole. Their links are `#` placeholders. Use the site's existing global
modules instead. The live site sets them in Gotham, which is not licensed
into this repository, so the reference uses Geist.

Sections 1 to 13 are numbered the same way in `locations/PLAN.md` section 3,
which explains what each one is for. Each section has an `id` equal to its
slugged H2, so it can be deep linked.

Breakpoints: designed at 1440, reflowing at 1023 and 767, checked at 390.

## 4. Assets

All in `assets/img/`, referenced `../../` relative. Upload each to the
HubSpot file manager and swap the path. Fonts: `assets/fonts/proyale-regular.woff2`
and `assets/fonts/geist-variable.woff2`, served with
`Cache-Control: public, max-age=31536000, immutable` (see `vercel.json`),
or the H1 paints late in the fallback face.

| File | Used on | What it is |
|---|---|---|
| `loc-logo-stacked.svg` | all | header logo, teal lockup (global header) |
| `logo-stacked-white.svg` | all | footer logo (global footer) |
| `loc-social-*.svg` (5) | all | footer icons (global footer) |
| `loc-team-texture.webp`, `loc-team-mark.webp` | all | team band texture and 3D mark |
| `loc-fee-keys.webp` | all | fee card photograph |
| `badge-1.webp` to `badge-8.webp`, `badge-reb.svg` | all | award marquee, shared with the paid pages |
| `agent-<name>.webp` (7) | per team | portraits, cropped to the Paper framing |
| `melbourne-hero-1..3`, `-story-1..3`, `-argument`, `-market`, `-regions`, `-offmarket`, `-map` | Melbourne | |
| `adelaide-hero-1..3`, `-story-1..3`, `-argument`, `-market`, `-regions`, `-offmarket` | Adelaide | story photos are the actual properties, from the client decks |
| `perth-hero-1..3`, `-card-1..3`, `-argument`, `-market`, `-regions`, `-offmarket` | Perth | card photos are streetscapes, **not** purchases |

`npm run import-location-images` re-imports everything from Paper
(`tools/import-location-images.mjs`, which records each crop).

**Two image notes.** `melbourne-story-1.webp` is a placeholder on the
approved artboard and is not the purchased property; it is replaced when the
record arrives. `melbourne-map.webp` is a static image; HubSpot should embed
Google Maps for 49 Porter Street in its place, and Adelaide's map slot is an
empty bracketed box for the same embed.

**Unsplash credits.** The Adelaide and Perth location photographs are
Unsplash. The licence asks for a credit where practical.

| File | Subject | Photographer |
|---|---|---|
| `adelaide-hero-1` | Seacliff beach house | Syed Hadi |
| `adelaide-hero-2` | Adelaide Oval and the Torrens | Vlad Kutepov |
| `adelaide-hero-3` | Adelaide from the Hills | Ben |
| `adelaide-argument` | Moseley Square, Glenelg | Syam |
| `adelaide-market` | Adelaide Oval and North Adelaide | Danny Howe |
| `adelaide-regions` | Adelaide Hills | Stephen Mabbs |
| `adelaide-offmarket` | North Adelaide bluestone | Binod Ghimire |
| `perth-hero-1` | Palmyra house | Steve Doig |
| `perth-hero-2` | Fremantle street | Samuel T |
| `perth-hero-3` | Perth CBD skyline | Steve Doig |
| `perth-card-1` | Perth skyline at sunrise | Eddie Mark Blair |
| `perth-card-2` | Bicton from Palmyra | Steve Doig |
| `perth-card-3` | Cottesloe beach | Nathan Hurst |
| `perth-argument` | Fremantle port | Nathan Hurst |
| `perth-market` | Perth from Kings Park | Joshua Leong |
| `perth-regions` | Cottesloe beach clubhouse | Dylan Alcock |
| `perth-offmarket` | Perth suburban street | Steve Doig |

## 5. The form contract

Three forms per page: the hero (`#lead-form`, two steps), the closer
(`#closer-form`, one step), and the newsletter band. All three are stubbed:
`assets/js/page.js` prevents submission. Replace them with HubSpot forms that
send the same fields.

| Field | Values | Notes |
|---|---|---|
| `segment` | `home` · `investor` · `commercial` · `developer` · `prestige` · `expat` | **HubSpot routing strings. Do not change them.** Six chips, none pre-selected, required |
| `budget` | `under-650k` · `650k-1m` · `1m-1.5m` · `1.5m-2m` · `2m-plus` | Routing values, same as the paid pages. Still assumed for a page that serves every segment, see decision 10 |
| `suburb` | free text | Hero: empty, placeholder "Where do you want to buy?". Closer: prefilled with the city, editable |
| `location` | `melbourne` · `adelaide` · `perth` | Hidden field, and `data-location` on every `<form>` |
| `name`, `email`, `phone` | free text | Hero step two; closer on one screen |

Rules the checker enforces and the port must keep: every form carries
`data-location="<slug>"`; **no form carries `data-segment`**; no chip is
`checked` in the markup; the segment group is `required`.

The chip labels differ between the two forms because the artboard draws them
that way ("Home to live in" in the hero, "Home buyer" in the closer). The
values underneath are identical.

The segment fork links (section 10) carry `data-pick-segment`: clicking one
selects that chip in the closing form and jumps to it. That behaviour is in
`page.js` and is about ten lines to carry into the template.

## 6. Structured data

One JSON-LD `@graph` in each page's `<head>`, with a comment above it naming
where every value renders. **Nothing in it that is not visible on the page.**

- Melbourne and Adelaide: `RealEstateAgent` (a LocalBusiness subtype) with
  the office address, `areaServed` from the region cards, and `employee`
  linking to a `Person` per agent card. Adelaide has no `telephone` yet,
  because its office phone is bracketed on the page.
- Perth: `Service` with `areaServed`, **never LocalBusiness**. There is no
  Perth office, and a LocalBusiness node would be a false claim to machines.
- All three: `WebPage` with `reviewedBy` Rich Harvey, `BreadcrumbList`, and
  `FAQPage` carrying **only the FAQ answers that are complete**. Two per page
  today. As each bracketed answer is written, add it to FAQPage.
- Add `dateModified` once the "Reviewed [Month 2026]" line is filled, and
  `image` on each Person and `og:image` once assets have absolute URLs.

## 7. URLs, indexing and the publish checklist

- URLs are the client's existing pattern: `/location/melbourne`,
  `/location/adelaide`, `/location/perth`. Canonicals are set to those.
- **Melbourne and Adelaide replace live, ranking pages. Same URL, no
  redirect.** Perth is new.
- Before publishing a replacement: take a Google Search Console baseline for
  the URL the day before, publish, request indexing, and watch the head term
  ("buyers agent melbourne", "buyers advocate melbourne", and the Adelaide
  pair) for 28 days. Agree a rollback threshold with the SEO lead before
  publishing; `PLAN.md` phase 7 leaves it `[threshold]`.
- Confirm Performance Max **Final URL Expansion is off** before these pages
  are re-indexed (decision 11).
- The "We also buy in" lists link only to location URLs known to exist
  (Brisbane, Melbourne, Adelaide, Perth). Sydney, Gold Coast, Sunshine Coast,
  Newcastle, Central Coast, Canberra and Hobart render as text until their
  `/location/` URLs are confirmed. Other pages on the live site that link to
  legacy URLs (`/brisbane-new`, `/sydney-new`, `/about/where-we-service/...`)
  should be pointed at the canonical `/location/` URLs.
- Perth is not yet in the sibling lists on Melbourne and Adelaide, because the
  artboards omit it. Add it once Perth publishes, so the new URL gets
  internal links.

## 8. Where the build departs from the Paper artboards, and why

The artboards are the design source. In a few places the Paper file has
drifted from decisions already recorded in the repository, and the build
follows the record. Each is commented in the markup.

| Where | Paper says | Built as | Why |
|---|---|---|---|
| Perth, section 3 heading | "Perth purchases" | "How we buy in Perth" | the cards beneath say there are no Perth purchases; the correction of 8 Sep 2026 was lost in Paper |
| Perth, section 3 | a "5.0, 300+ reviews" rating row | not rendered | no Perth listing exists and neither figure is in the claims register (Tier 3) |
| Adelaide, agent card 1 | Jonathon Moore, "Principal Buyers Advocate, Brisbane, 20+ Years in Queensland" | "Senior Buyers' Advocate, Adelaide and regional SA", credential bracketed | carried over from a Brisbane card; the registry records him as the Adelaide agent |
| Melbourne, agent card 1 | "60% Off-Market Purchases" | `[Credential line]` | not in the claims register (Tier 3) |
| Melbourne, proof card 1 | first stat reads "$263,800" | `[$ figure]` | that is Geoff's commercial figure, shown on the unfilled home buyer card |
| All agent titles, Melbourne team H2 | "Buyers Advocate", "buyer's agents" | "Buyers' Advocate", "buyers' agents" | the 8 Sep 2026 language pass, which Paper no longer shows on Melbourne |
| All FAQ rows but two | question only | question plus a bracketed answer | answers must be in the DOM; the unwritten ones are brackets, not drafts |
| Header, footer colours | logo copper, warm grey | nearest tokens | no token exists for either; global modules on port anyway |
| Region names | headings | paragraphs | one name is over the 32 character card heading budget, and the H2 carries the query |

Also worth knowing: the gold on agent titles and the region arrows, and the
gold border on the newsletter band, are on the approved artboards, while
DESIGN.md keeps gold inside prestige components. Kept as designed; worth a
word with the design lead. The region cards carry an arrow but are not links,
because no region sub-page exists yet.

## 9. Open questions, blocking publication

Numbered as in `locations/PLAN.md` section 8, owners there.

1. **"Advocate" in the title and meta.** Built with it, per the
   recommendation. Needs a yes.
2. **Fee publication.** The fee card shows the schedule, as the approved
   artboard does. Needs a yes before publishing, and it unblocks FAQ 1 and 2.
3. **Melbourne's third proof record.** The whole first card is bracketed.
4. **Agent lists and credentials.** Every `[Credential line]`, Jonathon
   Moore's confirmation, and the Perth agents by name.
5. **Tracked phone numbers per state.** Adelaide's office phone is bracketed;
   Melbourne shows the GBP number.
6. **Regions.** Melbourne's Geelong card, Adelaide's inner south suburbs and
   Hills towns, all six Perth regions.
7. **Market figures,** dated and sourced, for all three tables and the
   "Reviewed [Month 2026]" line.
8. **Perth: a named agent who has bought there, one Perth purchase, and which
   office runs Perth briefs.** `perth/BLOCKED.md`. The Perth front end was
   built on 29 Sep 2026 at Kenn Zapanta's direction so the handover is
   complete, but its content is still blocked and it should not publish with
   brackets on it.
9. Selected chip state: settled, in `base.css`.
10. **Budget bands** for a page that serves every segment. Confirm before the
    pages take traffic, because changing option values later breaks routing.
11. **Final URL Expansion** off before re-index.
12. Which review channel is the record for client feedback.

Also bracketed and waiting on the client: the Adelaide Google rating
(`[5.0]`), office hours on both office pages, Melbourne's "[Prahran and X]"
agent bases, testimonial text (Melbourne) and testimonials (Adelaide, Perth),
and eight of ten FAQ answers per page.
