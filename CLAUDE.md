# CLAUDE.md

Segment landing pages for Propertybuyer, for Google Ads and Performance Max
traffic. Static HTML and CSS. No build step, no framework, no CDN.

**Read these before changing anything, in this order.** They are not optional
context; they record decisions that look arbitrary from the code alone.

1. `DESIGN.md` — the rules layer. Tokens, voice, banned language, claim tiers.
2. `HANDOVER.md` — the state of the buyer build, and what is flagged.
3. `shared/segments.json` — the segment list, and `openDecisions`, which is
   the running decision log. **Anything decided in a build gets recorded
   here**, with a status, a consequence and the date.
4. The page's own `New Builds/<segment>/BRIEF.md`.

## Where things are

```
New Builds/buyer/index.html        the home segment, and the template
New Builds/commercial/index.html   built 20 Aug 2026 from that template
New Builds/investor/index.html     built 21 Aug 2026 from that template
New Builds/developer/index.html    built 21 Aug 2026 from that template

assets/css/tokens.css    tokens and both faces. Shared, never edited by a build
assets/css/base.css      reset, base type, buttons, pills. Shared
assets/css/landing.css   design layer, the four paid segment pages
assets/css/locations.css design layer, the location pages
assets/js/page.js        ONE script, every page
assets/js/review-loader.js  client review gate, every page. Vendored, see below
assets/js/review.js         the review overlay, loaded only behind ?review=1
shared/segments.json     segment list plus the decision log
paper/proof-register.md  every Tier 1 proof point, with its source
paper/buyer-copy.md      copy deck, home
paper/commercial-copy.md copy deck, commercial
paper/investor-copy.md   copy deck, investor
paper/developer-copy.md  copy deck, developer
tools/check.mjs          the acceptance checklist, both families
locations/PLAN.md        the rules layer, the location family. Read it first
locations/_archive/      the 21 Aug 2026 location work, and why it was replaced
shared/locations.json    the location registry and its decision log
tools/import-paper-images.mjs  Paper artwork in, with the crop geometry
tools/extract-deck-images.mjs  story photographs out of the client decks
email-signature/PB_Emal-Signature_Generator.html  staff email signature generator, from the Paper "Email Signature" file
tools/build-signature-assets.mjs  renders its PNG icons and assets.js. Rerun after artwork changes
```

**All pages share one `assets/img`, and the unprefixed photograph names
belong to the buyer page.** `truth-card-1.webp`, `auction-1.webp`,
`step-research.webp` and the rest are referenced by both pages, so writing new
artwork over them changes the other page as a side effect. The commercial page
holds its own photographs under a `commercial-` prefix for that reason, and the
investor page under `investor-`. Any future page does the same.

Pages sit two levels down, so every asset reference is `../../` relative.

## Current state, 31 August 2026

| Segment | Status | Blocked on |
|---|---|---|
| `home` | built, client-reviewed | nothing |
| `commercial` | built, client-reviewed, merged | budget bands unconfirmed |
| `investor` | built, client-reviewed | budget bands unconfirmed |
| `developer` | built, five client copy rounds applied, checks clean | truth card 5 still repeats auction move 2, and the two copies differ by one word. See `developerHighestBestUse1Sep` |
| `prestige`, `expat` | no page, deliberately | chip only, see segments.json |

**A third review channel is live, and a whole round came through it.** BugHerd
project 538511 carried nine items on 31 Aug 2026, alongside the feedback hub
and Paper comments. **All nine are applied**, in two commits that day. Settle
which channel is the record before the next round: one consequence already
bit, in that the investor exclusivity answer sat OPEN in `segments.json` for
three days while the client had already supplied the wording on BugHerd. See
`bugherdAsAReviewChannel`.

**The unprefixed shared images are now in use by three pages, not two.**
`service-appraise.webp` is referenced by `buyer`, `investor` AND `developer`.
Replacing the developer page's copy on 31 Aug 2026 meant writing a new
`developer-service-appraise.webp` rather than overwriting that name, which
would have redecorated two live client-reviewed pages silently. Two more
unprefixed files are still shared the same way on the developer services band,
`service-full-search.webp` and `service-auction.webp`. Check `grep -rn` for a
filename across all four pages before replacing any artwork. See
`developerServiceImage31Aug`.

**Next step: a purchase date for three sites the client already publishes.**
All four segment pages are now built. The developer page is the only one whose
three Tier 1 slots are still bracketed, and the ask is no longer a deck: the
client publishes twenty named site purchases with prices, and they lack only a
month and year plus a client first name. Each bracket on the page names the
candidate record it is waiting on. See `developerProofSlots`.

**The buyer and investor pages are ahead of the other two on entry
animations, since 28 August 2026.** They declare their `reveal` and
`reveal-glass` classes in the markup and set `html.js` from a script in the
head, so the from-state is there at the first paint. Commercial and developer
still assemble both in `page.js` at the foot of the body, which paints the
cards visible and blanks them about 150ms later, and they still flash.
`page.js` serves both arrangements, so nothing is broken by the gap. Rolling
it to a page means moving the classes into its markup at whatever the `FADE`
and `GLASS` lists already match there, copying the head script, then
re-testing the three guards and reduced motion. Investor took 35 elements and
needed no CSS or `page.js` change. See `revealStateBeforeFirstPaint` and the
HANDOVER.md section.

**The client's own website is a claim source, and it beat DESIGN.md twice.**
Two pages of propertybuyer.com.au were read on 21 Aug 2026 and they resolved
what DESIGN.md could not: whether the agency touches feasibility, and what a
developer budget band actually looks like. Both answers contradict or exceed
DESIGN.md, and DESIGN.md is behind rather than corrected. Check the equivalent
`services/` and `who-we-help/` pages before deriving any future segment page
from DESIGN.md alone. See `developerClientSiteAsSource`.

**Story photographs come out of the client decks, and they do not need a
renderer.** `tools/extract-deck-images.mjs` reads the embedded image streams
directly; in these decks they are already JPEG. Put the deck in `.deck-src/`
and run `npm run deck-images`. A page rasteriser being unavailable here is not
a reason to leave a story panel empty.

**Also open, and it reaches a live page.** The investor deck retells all three
of the buyer page Tier 1 records as investment purchases, with identical
figures and an incompatible story. See `investorDeckOverlap` in
`shared/segments.json`. Nothing on the investor page depends on it, but the
buyer page may be mis-labelled.

**Build the pages one at a time, not in parallel.** Each page teaches you what
is genuinely template and what was quietly buyer-specific; fold that back
before starting the next.

This used to be enforced by the stylesheet: one file served every page, so
parallel branches collided where a bad merge costs most. That was split into
four layers on 21 Aug 2026, so the collision risk is now confined to whichever
design layer you are in. Within a family the advice still stands, because the
four paid pages all share `landing.css`.

**Three stylesheets per page, in this order:** `tokens.css`, `base.css`, then
exactly one design layer. `tokens.css` and `base.css` are shared by every page,
so a change to either lands on pages someone else may be building on another
branch. Treat it the way you would treat a change to Figma Variables. The two
design layers are never loaded together. `npm run check` fails a page that gets
the order wrong, loads zero or two design layers, holds a raw hex in any layer,
or declares a `:root` block outside `tokens.css`.

**The location pages are a second family, and they take their own layout.**
`locations/`, organic search, shipped in HubSpot rather than on Vercel. They
share the design language and the context, not the page structure, so
`landing.css` is not their starting point. Their capture contract inverts the
paid pages, and the checker enforces it: forms carry `data-location`, never
`data-segment`, no chip is pre-selected and the segment group is required.

**That family was reset on 2 Sep 2026, and `locations/PLAN.md` is now its
rules layer.** Read it before touching anything under `locations/`. It
supersedes `STRATEGY.md`, `REFERENCE.md` and `BRIEF.md`, which are in
`locations/_archive/` alongside the Melbourne page built 21 Aug 2026. The
reset is not a rework of bad work: the page passed every hard rule. It was
composed from the live Brisbane page on the assumption that Brisbane's
structure is why Brisbane ranks, and `/location/melbourne` and
`/location/adelaide` turn out to run that same template with different
outcomes, so the assumption does not hold. Three things carry forward: the
capture contract above, the two audited Melbourne proof records, and the
checker rules. See `templateNotFormula` in `shared/locations.json`.

**Two of the three location URLs already exist, so those two are
replacements of ranking pages rather than new pages.** Melbourne and
Adelaide are live; Perth is the only new URL. Before writing copy for a page
that exists, carry every content signal off the live page or record why it
was dropped. That rule is `replacementInventory` in `shared/locations.json`
and the inventory itself is `PLAN.md` section 2. Dropping a signal quietly is
the one way this work goes backwards.

**The header, the footer and the lead capture component live in base.css**
since 21 Aug 2026, promoted from landing.css when the location family needed
them. They land on every page in both families; treat a change to them like
a change to Figma Variables. See `baseCssPromotion` in
`shared/segments.json`.

## The rules that get broken most

1. **Never invent a value.** Not a token, not a claim, not a statistic, not a
   proof point. If it is not in Figma Variables or the claims register in
   `DESIGN.md`, stop and ask. A guess here reaches the client.
2. **Unfilled values ship in `[square brackets]`**, visibly unfilled, rather
   than as plausible copy. The checker used to fail on any bracket in visible
   copy; that stop was retired 18 Aug 2026, the safeguard was not.
3. **Do not touch the six segment strings.** `home`, `investor`, `commercial`,
   `developer`, `prestige`, `expat`. HubSpot routing depends on them. Same for
   `budget` option values once a page is live.
4. **All six chips stay in every router**, on every page, including the two
   with no page of their own. `tools/check.mjs` fails a page that drops one.
5. **No em dashes and no exclamation marks**, anywhere, including comments and
   data tables. Australian English. Sentence case. See `DESIGN.md` for the
   full banned list.
6. **Figures on cards are exact, never rounded.** If a price does not
   abbreviate exactly, put it in the body text and keep it out of the stat row.
7. `DESIGN.md` says four segments, `shared/segments.json` says six.
   **segments.json wins**, and the checker enforces it. DESIGN.md is behind.

## Adding a segment page

1. Read that segment's `BRIEF.md` and supply what it lists as missing.
2. Write the copy deck first, at `paper/<segment>-copy.md`, with character
   counts against the budgets. Review it before it becomes HTML.
3. Derive the page from `New Builds/buyer/index.html`. Change copy and the
   `data-segment` on both forms. Leave router, chips, classes and tokens alone.
4. Flip `status` to `built` in `shared/segments.json`, and record any decision
   you took in `openDecisions` there.
5. Add a rewrite in `vercel.json` so the client preview can reach it.
6. Record it in `README.md` and in the state table above.

## Running it

```sh
npm run serve
npm run check <segment>
```

`npm run check` with no argument checks every built page, at 390, 768, 1100
and 1440. It needs `npx playwright install chromium` once.

**Known failure, buyer page only, deliberate:** three POC demo items
(`data-poc`, `data-experts-count`, `.poc-toggle`) fail the shippability check.
They are the client-demo availability switch and must be deleted before
launch. A page that fails only these is otherwise passing.

Stripped from `commercial`, `investor` and `developer` on 21 Aug 2026, so all
three cleared the POC items. The CSS rule and the `page.js` handler stay,
because both are gated on `data-poc` and the buyer page still demos with them;
they are inert wherever the attribute is gone.

`developer` reports "All hard rules pass" again as of 1 Sep 2026. It had
failed on the banned word "unlock" since 27 Aug, and the client resolved it on
1 Sep by directing that the word be kept and taken off the list, the same way
"journey" left it on 25 Aug. **The enforced banned list is the array in
`tools/check.mjs`, not the prose list in `DESIGN.md`.** DESIGN.md carried
"journey" for fifteen days after it came off because that removal only touched
the checker; both words are corrected now and DESIGN.md points at check.mjs.
Take a word off in both places. See `developerBannedWordUnlock`.

**The template is the page that keeps the scaffolding**, so any page derived
from `New Builds/buyer/index.html` inherits all three items again. Strip them
as the last step of a new build, before the first `npm run check`. The
developer page shipped with them on 21 Aug 2026 for exactly this reason and
needed a follow-up commit. See `pocScaffoldingState`.

The `?experts=N` URL override was closed the same day, by gating it on
`data-poc` inside `readAvailability`. It is a demo affordance, so it now
lives and dies with the demo: still available on the buyer page for showing
both states in a meeting, ignored anywhere the attribute is absent. Before
that gate any visitor to a live page could render an unverified count with
`?experts=99`, which is a Tier 3 claim as visible text.

## Client review overlay

Every page carries `assets/js/review-loader.js`, added 28 Aug 2026. On a
normal visit it reads a gate and loads nothing: zero requests, zero DOM. With
`?review=1` on the URL it loads `review.js`, which lets the client click any
element or leave general feedback, with photos, no account needed. The gate
persists in a cookie for 14 days; `?review=0` clears it.

Both files are vendored verbatim from the `feedback-hub` repo and are never
edited here; fix them there and re-copy. Threads land in the feedback hub
(`https://feedback-hub-navy.vercel.app`, admin token required). The
`/client-review` skill pulls a round into `.feedback/` (gitignored), and
replies and resolves threads once changes ship. `npm run check` fails a page
that drops the loader or references `review.js` directly.

Review links for the client: production URL plus `?review=1`, one per page.

## Git

Branch per page or per change, merge to `main` by PR. Commit messages here are
sentences describing intent, not conventional-commit prefixes. Match them.
