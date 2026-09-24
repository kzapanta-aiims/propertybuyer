# locations/

The location inner pages. Organic search, indexable.

**Read `PLAN.md` first.** It is the rules layer for this family and it
supersedes `STRATEGY.md`, `REFERENCE.md` and `BRIEF.md` of 21 August 2026,
all three of which are now in `_archive/`. It carries the comparative read of
the three live pages, the thirteen section structure, the AEO layer, the copy
plan, the eight build phases and the numbered open decisions.

**These ship in HubSpot.** This directory is the reference implementation that
gets handed to the client developer to port, not the thing that serves the
traffic. Plain HTML, CSS and JavaScript, no framework and no build step, which
is what the repository already is. The Vercel deploy is a preview for review
and handoff.

## Two of the three URLs already exist

Melbourne and Adelaide are live HubSpot pages running the same template as
Brisbane. They are **replacements of ranking URLs**, not new pages, so the
inventory rule in `PLAN.md` section 2 applies before any copy is written:
carry every content signal from the live page into the new one, or record why
it was dropped. Perth is the only new URL.

| Page | Status | Holding it back |
|---|---|---|
| `melbourne/` | planned, the template. Paper artboard client-approved | the 21 Aug build is archived; needs the phase 2 copy deck and the third proof record |
| `adelaide/` | designed in Paper 8 Sep 2026, `COPY.md` written | client to confirm the framing of three proof records, and the Melbourne HTML template |
| `perth/` | blocked, `BLOCKED.md` says exactly why. Paper artboard shows the variant | a named agent who buys in Perth, one Perth purchase, and which office runs it |

Build one at a time. Melbourne teaches what is genuinely template; fold that
back before Adelaide starts. The Paper designs run ahead of the HTML: all
three artboards exist in the file "Location Pages - Adelaide, Perth,
Melbourne", and the two copy decks here record what the Adelaide and Perth
artboards say.

The client's five success-story decks are committed in `../paper/decks/`
since 8 Sep 2026. The Adelaide proof comes from the two Legacy decks; no deck
holds a Perth record.

## Shape

```
locations/PLAN.md              the rules layer for this family, 2 Sep 2026
locations/melbourne/           the template, built in phase 3
locations/adelaide/            derived from Melbourne in phase 5
locations/perth/               a variant, not the template. Phase 6
locations/data/                GSC, Semrush and inventory exports, gitignored
locations/_archive/            the 21 Aug 2026 work, and why it was replaced
../shared/locations.json       the registry and the decision log
../tools/extract-live-inventory.mjs   the live page inventory, phase 2
```

`data/` holds the analytics exports and the saved live HTML the inventory tool
reads. It is inputs, not source, and the exports carry client performance
figures, so it stays out of the repository.

The folder name is the slug, and the slug is the URL segment in the client's
existing `/location/<slug>` pattern. The two never differ.

Two levels below the repository root, the same depth as the segment pages
under `New Builds/`, so every asset reference is `../../` relative and the
checker's path rule applies unchanged.

## The markup contract

Written down on the Melbourne page and enforced per page by `tools/check.mjs`:
forms carry `data-location` and never `data-segment`, no chip is pre-selected
and the group is `required`, the suburb field is prefilled and editable, and
the FAQ structured data carries only the answers that are complete. This
contract survived the reset unchanged; it was the part of the 21 August build
that was right.

`PLAN.md` section 7, phase 3 adds the AEO rules to the checker: an `.answer`
of 40 words or fewer under every Zone B H2, at least ten H2s, no iframe,
`LocalBusiness` matching the visible office block, and `advocate` confined to
the ranking layer.

## Stylesheets

Three, in this order, and never `landing.css` as well:

```html
<link rel="stylesheet" href="../../assets/css/tokens.css">
<link rel="stylesheet" href="../../assets/css/base.css">
<link rel="stylesheet" href="../../assets/css/locations.css">
```

`tokens.css` and `base.css` are shared with the paid pages and are not edited
by a location build. Between them they carry every colour, space, radius, size
and face, the reset, the base typography, the two type utilities, the button
and pill components, the header, the footer, the lead capture component, and
the `.wrap` container and `.section` band. That is the shared design
reference, and it holds under any layout.

`landing.css` is not a starting point. These pages are composed differently, so
almost all of it, the hero, truth cards, stats band, steps, services, auction
strip, prestige and FAQ, does not apply.

## Indexing

This is about the preview only. Production indexing for these pages is set in
HubSpot, on the client's own domain.

The paid pages carry `X-Robots-Tag: noindex, nofollow` and must keep it while
they are a proof of concept. These pages are worthless with it. So
`vercel.json` denies by default and carves this directory out:

```
"source": "/((?!locations).*)"
```

Deny by default is the safe direction. Vercel matches a header `source`
against the incoming request path, before rewrites, so scoping the noindex
rule to `New Builds/` instead would have quietly stopped covering `/` and
`/buyer`, which are the URLs the client actually opens.

`_archive/` is the one exception inside this directory, and it carries its own
noindex rule in `vercel.json`. An archived page is a duplicate of a live
client URL, so it is the exact cannibalisation this carve out was written to
avoid. Anything else added to `locations/` is crawlable the day it ships.

Two things follow. Do not widen the rule back to `/(.*)`. And do not serve a
location page from a path outside this directory without moving the carve out
with it.
