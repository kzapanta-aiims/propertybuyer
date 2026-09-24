# Location inner pages: diagnosis, structure, content plan and build plan

Drafted 2 September 2026 for Kenn Zapanta. Supersedes `locations/STRATEGY.md`,
`locations/REFERENCE.md` and `locations/BRIEF.md` of 21 August 2026 where they
disagree. Where those files still hold, this document says so rather than
restating them.

Three pages: Melbourne (template), Adelaide, Perth. Organic search, indexable,
shipped in HubSpot, referenced from the repository as plain HTML and CSS.

---

## 0. What changed since 21 August, and why this is a restart

The 21 August work treated the live Brisbane page as the thing to learn from
and derived a structure from its anatomy. Three facts checked on 2 September
change the frame.

**1. All three target URLs already exist, and they are the same template as
Brisbane.** `/location/melbourne` and `/location/adelaide` are live HubSpot
pages with the same section order, the same award wall, the same sitewide
testimonial carousel, the same "Why choose us" six, the same FAQ pattern, the
same office block and the same voice. `/location/perth` does not exist; the
nav link for Perth is empty. So Melbourne and Adelaide are **replacements of
ranking URLs**, not new pages, and Perth is the only new one.

**2. Because Melbourne and Adelaide share Brisbane's structure, structure
cannot be what makes Brisbane rank.** Whatever separates the pages is not the
section list. The 21 August analysis answered "why does Brisbane work" by
reading Brisbane alone. The right question is comparative: same template,
three outcomes, what differs.

**3. The task now includes AEO.** The 21 August plan split the page into a
conversion zone and an SEO zone and said nothing about answer engines. That
split still holds for attention, but it is the wrong model for what the lower
page is *for*. An answer engine extracts from anywhere on the page and quotes
the most direct, most specific, best attributed sentence it can find. That
changes how every section below the fold is written, not just whether it
exists.

What survives from 21 August, unchanged:

- Two zones by attention: screens one and two convert, everything below earns
  the ranking. The NN/g fold figures still hold.
- Segment chips as step one of the form, location prefilled and editable,
  `data-location` on forms and never `data-segment`, no chip pre-selected,
  segment group required. The checker already enforces this contract.
- Tier 1 proof discipline, the proof register, the claims register, bracketed
  slots for anything unfilled.
- Same repository, own design layer (`locations.css`), no generator, HubSpot
  delivery as plain HTML and CSS, no build step.
- The Perth finding: no office, no proof records. Perth gets a variant, not the
  template.
- The Final URL Expansion collision with the paid pages.

What is discarded:

- The 23 section anatomy as a brief. It is a description of a HubSpot template
  three pages share, not a formula.
- The assumption that the Brisbane page's copy or structure explains its
  rankings.
- The Melbourne build of 21 August as the template. Its capture contract and
  its two audited proof records carry forward; its composition does not.
  Archive it on a branch rather than delete it.

---

## 1. Why the Brisbane page ranks, graded by evidence

Ranking data was not reachable from this session. Semrush and Ahrefs are
connected to the account but not to this chat, and GSC needs Manu. So every
claim below is graded: **observed** means read from the live markup on
2 September, **inferred** means a reasonable reading of observed facts,
**unknown** means it needs data before anyone acts on it.

### 1.1 What the three pages share (so it is not the differentiator)

Observed on all three:

- URL pattern `/location/<slug>`, self referencing canonical, HubSpot.
- H1 pattern `<City> Buyers' Agent Specialists` (Adelaide drops "Specialists")
  with a second all caps line typed in capitals.
- The generalist award wall, thirty plus badges.
- The same six "Why choose us" cards, duplicated in the markup.
- The same sitewide testimonial carousel, about thirty reviews, almost all
  Sydney, named Sydney agents, not filtered by city.
- Transport, schools and lifestyle sections. Entity dense, locally specific,
  and mostly irrelevant to the buying decision.
- One `<form>` for several capture headings.
- Office block with Google Maps embed and NAP.
- Rich's blog feed and podcast feed, which inject fresh content sitewide.
- No `LocalBusiness`, `FAQPage` or `BreadcrumbList` structured data (per the
  21 August read; re-verify before build).
- "We also service" links pointing at legacy URLs (`/brisbane-new`,
  `/sydney-new`, `/about/where-we-service/...`) rather than the canonical
  `/location/` pages. Internal link equity is being split.

### 1.2 What differs, page by page

| Signal | Brisbane | Melbourne | Adelaide |
|---|---|---|---|
| Title tag | Buyers' Agents in Brisbane, Invest in Property, Propertybuyer | Buyers Agent Melbourne, Property Buyers Advocate in Melbourne | Buyers Agent Adelaide and Buyers Advocate Adelaide, Propertybuyer |
| Meta description | Full length, banned "Discover" | 74 characters, banned "Discover" | Full length, exclamation mark |
| Named team | 12, of whom roughly 6 are QLD based | 8, of whom 2 or 3 are VIC based | 5, of whom 1 is SA based |
| "Our purchases in city" embed | Yes (iframe, not crawlable) | **Missing** | Yes (iframe) |
| Region cards | 6 (Brisbane, Redlands, Ipswich, Logan, Moreton Bay, Toowoomba) | 5, all inner city (South Bank, Bayside, North, East, St Kilda) | **None** |
| Extra nav links pointing at the page | 4 (Brisbane, Toowoomba, Logan, Moreton Bay) | 6 (CBD, North, East, South Bank, Bayside, St Kilda) | 1 |
| FAQ | 6, Brisbane specific (flood maps, Olympics, migration) | 6, weaker (COVID, WFH) | **10, best written of the three**, direct answers, named suburbs |
| Local phone | Yes | Yes | No, 1300 only |
| Factual errors | None obvious | "Melbourne's subtropical climate", "windy conditions great for surfers" | Duplicated Food & Wine paragraph; "4 to 6 weeks" contradicts the 30 to 60 day claim; "50 to 60 local experts" is Tier 3 |

Two things stand out. Melbourne is the weakest page of the three on local
signals despite the largest market: fewest local agents named, no purchases
embed, region cards that are all within 5 km of the CBD, and a factual error
an answer engine will happily quote. Adelaide has the strongest FAQ and the
weakest everything else.

### 1.3 The hypotheses, ranked, with the test for each

**H1. Competition intensity differs by city (inferred, likely dominant).**
Melbourne is the densest buyers' advocate market in the country, with a dozen
established local specialists whose entire domain is Melbourne. Brisbane has
fewer strong local incumbents. If this is the main variable, no on-page rebuild
closes the Melbourne gap on its own; it improves conversion and AEO capture and
sets a floor.
*Test:* Semrush keyword difficulty and the top ten for "buyers agent
melbourne", "buyers advocate melbourne", "buyers agent brisbane", and the
Adelaide pair. Count how many of the top ten are single city specialists.

**H2. Local authority signals differ (observed).** Brisbane names more QLD
staff, has a purchases embed, more regional sub-pages pointing at it, and a
better FAQ than Melbourne. These are the "location earned by proof" signals
your own audit skill treats as ranking levers. This is the variable the
rebuild can move.
*Test:* GSC query report per URL. If Brisbane ranks for suburb and region
modifiers (Redlands, Logan, Toowoomba) that Melbourne does not for its own,
this is confirmed.

**H3. Vocabulary mismatch in Victoria (inferred).** "Buyers' advocate" is the
dominant Victorian term; "buyers' agent" is the NSW and QLD term. Melbourne's
title tag covers both. Its H1 does not. The design system bans "advocate" in
headings and CTAs. This is a real conflict for Melbourne specifically, and the
resolution is the two layer model: "advocate" is allowed in the ranking layer
(title, meta, alt, schema `alternateName`, anchor text) and stays out of the
persuasion layer. Decision needed, see section 8.
*Test:* Semrush volume for "buyers advocate melbourne" versus "buyers agent
melbourne". If advocate is 2x or more, the ranking layer must carry it.

**H4. Backlinks, GBP reviews and URL age differ (unknown).** Plausible, cheap
to check, and if it dominates, the rebuild's SEO expectation should be set
lower and its conversion and AEO expectation higher.
*Test:* Ahrefs referring domains per URL; GBP review counts for the Brisbane,
Melbourne and Adelaide listings.

**H5. Brisbane's structure or copy is the reason (rejected).** The controls
share it.

### 1.4 What "working really well" needs to mean before design hours are spent

Ranking is not the goal. Labelled leads at the right budget are. Before
committing the design, three numbers per URL from GSC and HubSpot:

- Impressions, clicks and average position for the head term and its advocate
  variant, last 90 days.
- Which queries Brisbane ranks for that Melbourne does not (the gap list).
- Form submissions and CallRail calls attributed to each location page, and
  their segment and budget once labelled. A page that ranks and produces
  unqualified leads is a different problem to a page that does not rank.

If Brisbane converts poorly, "the page that works" is a page that gets found
and then wastes the visit, and the template argument gets stronger, not
weaker.

### 1.5 AEO read of the live pages

What an answer engine can extract from the Brisbane page today:

- The office address and phone, cleanly.
- Six FAQ answers, some of them useful ("How do you avoid buying in a
  floodplain" is a good one).
- Named staff with titles.
- Suburb lists.

What it cannot:

- Any purchase proof, because it is an iframe from a third party host.
- Any fee, timeframe or process, because none is stated.
- Any dated market fact, because nothing is dated.
- Who wrote it or when it was reviewed.

The Adelaide FAQ is the one part of any of the three pages that is already
written the way answer engines want: a question as the heading and a complete
answer in the first sentence. The rest of every page buries or omits the
answer.

### 1.6 Two layer audit verdict, Brisbane

Ranks `flag` · Converts `fail` · On-brand `fail`.

Ranking layer: title and slug are fine. Meta opens on a banned word. No
LocalBusiness, FAQPage or BreadcrumbList schema. Proof is not crawlable.
Internal links to siblings hit legacy URLs.

Persuasion layer: the H1 carries the keyword rather than a human idea, and the
body repeats "buyers agent Brisbane" in the copy where the two layer model
says location should be proven, not sprinkled. No segment capture. Award wall
in the second screen. "Australia's most awarded" without the count. Sydney
testimonials on a Brisbane page.

One line steer: keep the ranking layer inventory and rebuild the persuasion
layer around local proof and segment capture.

---

## 2. The ranking layer inventory to preserve on replacement

These are replacement pages. Losing a ranking URL's content signals is the
one way a rebuild goes backwards. Before any Melbourne copy is written, run
the inventory below against the live page and carry every item into the new
page or record why it was dropped.

**Keep verbatim or near verbatim**

- URL `/location/melbourne`, self referencing canonical. No redirects, same
  URL.
- Title tag semantic content: buyers agent, buyers advocate, Melbourne,
  Propertybuyer. Rewrite the string, keep the terms.
- Every suburb currently named: Toorak, South Yarra, Brighton, Doncaster,
  Essendon, Maribyrnong, Mt Evelyn, Keilor Downs, Beaumaris, Frankston,
  Mornington, Blackburn, Donvale, Ringwood, St Kilda West, Portsea,
  Kingsville, St Andrews Beach, Maidstone, Footscray, Preston, Carlton, East
  Melbourne, Mordialloc, Carrum Downs, Aspendale, Seaford, Parkdale,
  Cheltenham, South Bank, North Melbourne, St Kilda, Bayside. Add, never
  subtract.
- Every named VIC staff member and their profile URL.
- Office NAP exactly as it appears in GBP: 49 Porter Street, Prahran VIC 3181,
  +61 3 9000 0430.
- The FAQ questions as query variants (rewrite the answers).
- Internal links to `/who-we-help/*`, `/services/*`, `/suburb-report`,
  `/resources/property-brief`, and the sibling location pages, with the
  sibling links corrected to canonical `/location/` URLs.
- H2 count of at least ten. Fewer headings than the current page is a
  regression in query coverage.

**Drop deliberately, and record it**

- The award wall. Replaced by one line with the count and the two most
  significant wins (Tier 2 treatment).
- The sitewide testimonial carousel. Replaced by Melbourne only testimonials.
- The purchases iframe. Replaced by three crawlable Tier 1 cards.
- Lifestyle, transport, food and wine. Fold the entity names into the market
  and regions sections; drop the prose. If Manu wants it kept for query
  coverage, it goes below the closing capture.
- The duplicate FAQ heading and the duplicate "Why choose us" markup.

**Fix**

- "Subtropical climate" and "surfers". Melbourne is temperate.
- Meta description length and the banned opener.

A script for this is in the Claude Code plan (`tools/extract-live-inventory.mjs`).
It exists so the check is a diff rather than a reading.

---
## 3. Page structure: the Melbourne template

Thirteen sections. Two zones by attention, three jobs per section. Every
section below states what it does for conversion, for ranking and for answer
engines, and what has to be true of its copy. A section with nothing in the
AEO column is either Zone A, where AEO does not apply, or should be questioned.

### The AEO layer, applied to every Zone B section

These are markup and copy rules, not a section. They apply to sections 4
through 11.

1. **The H2 is a query, not a brand line.** Either a question ("How much does
   a buyers' agent cost in Melbourne") or a query noun phrase ("Off market
   property in Melbourne"). Under 60 characters.
2. **The first sentence under every H2 is a complete standalone answer** of no
   more than 40 words, naming Propertybuyer or Melbourne or both, that would
   still be true if quoted with nothing around it. Detail follows it. This is
   the single highest value AEO rule and the checker can test the word count.
3. **Specific over general.** A number, a suburb, a date, a name, a fee. A
   paragraph with none of those is Tier 2 at best and is a candidate to cut.
4. **Dated facts carry their date** in the sentence ("as at August 2026") and
   the page carries a visible "Reviewed" date and a named reviewer with a
   `Person` node. Undated market claims decay into wrong ones and answer
   engines penalise stale.
5. **No claim the register does not clear.** Same tiers as DESIGN.md. A Tier 3
   claim in an answer engine's mouth is worse than on the page, because it is
   repeated without the page's context.
6. **Structured data mirrors visible content only.** `LocalBusiness`,
   `FAQPage`, `BreadcrumbList`, `Person` for the named agents. Nothing in the
   JSON-LD that is not on the page.

### Zone A, screens one and two

| # | Section | Conversion job | Ranking job | Design note |
|---|---|---|---|---|
| 1 | **Hero** | State the promise, show one hard local number, offer two ways to act | H1 carries "buyers' agents" and "Melbourne". The only SEO concession in Zone A | `bg/brand` band. H1 Proyale, 44 desktop, 34 mobile. Subhead under 42. One terracotta button. Phone as a text link beside it, tracked CallRail VIC number. Sparse density, `gap-lg`. This is the page's one sparse section |
| 2 | **Capture, step one, in the hero** | Segment chips, six, none selected, required. Budget band. Suburb prefilled "Melbourne", editable. Continue | None, deliberately | Right column at 1440, below the H1 at 390. Chip row at 44 tap height. Selected chip state is still undefined in DESIGN.md Stop and Flag; design it here, since this page cannot ship without it |
| 3 | **Melbourne proof, three records** | Pay off the promise while attention is high | Suburb, price, month and year, first name and segment. The local entity signals search and answer engines both want, crawlable this time | Three cards, `type/stat` for the one number per card, `bg/surface` on `bg/page`, `border/default`, `radius/card`. Standard density. No badge, no icon. Photograph only if it is the actual property |
| 4 | **Your Melbourne buyers' agents** | Trust forms on a named person. Testimonials on the live pages say so repeatedly | Named staff feed `Person` and `LocalBusiness.employee`. E-E-A-T | Only VIC based agents. Photo, name, title, the suburbs they cover, one sentence in their voice. Three to four people. Not the executive team |

Screens one and two now hold the promise, the evidence, the people and two
ways to act. Nothing in Zone A exists for SEO alone.

### Zone B, the body

| # | Section | H2 (query form, draft) | First sentence answers | Design note |
|---|---|---|---|---|
| 5 | The argument, once | Why use a buyers' agent in Melbourne | The one thing every segment shares: going direct hands your budget, deadline and finance position to the person paid to act against you. Then the Melbourne specific: Australia's largest auction market, so auction representation is the local version of the argument | `bg/surface-alt` band. Intro measure 760. One paragraph plus three short supporting points, no icons |
| 6 | The market | The Melbourne property market in 2026 | Two or three sourced, dated figures: median house and unit, clearance trend, the inner, middle, outer split. Bracketed until Rich or Manu supply and source them | White band. A small data table rather than prose. Every figure carries a source line and an as-at date |
| 7 | Where we buy | Where our Melbourne buyers' agents buy | Six to eight regions in real Melbourne buyer vocabulary, each with three or four named suburbs. Inner east, Bayside, inner north, inner south east, west, outer east, Mornington Peninsula, and one regional link (Geelong and Surf Coast) if serviced | Cards with `radius/card`, dense grid, `gap`. Each card links to a sub-page only if one exists and is not a self link. Today all Melbourne region links point at this page. Flag to Manu |
| 8 | Process and fee | How it works, and what a buyers' agent costs in Melbourne | The three service options with the fee basis stated plainly: full search at a fixed fee equivalent to 1.5 to 2 percent, appraise and negotiate at 1 percent, auction bidding at $660 engagement plus $3,300 success. 30 to 60 days engagement to purchase. Fee publication is a client decision, see section 8 | Steps as a numbered list, not a 3-up icon grid. Fee table beneath |
| 9 | Off market | Off market property in Melbourne | Framed as access to stock that never lists, never as a discount. REBAA notes off market stock often carries a premium; the claim is coverage, not price. Database of 10,000+ agents is a cleared Tier 2 line | Short. Two paragraphs. `bg/surface-alt` |
| 10 | Segment fork | Who we buy for in Melbourne | Six anchored H3 blocks, one per segment, 60 to 90 words each, each with its own first sentence answer and one link into the closing form with the chip preselected via URL hash. Register by segment per DESIGN.md Voice | Two column at 1440, stacked at 390. Prestige block may use `text/prestige` for its heading only |
| 11 | Local testimonials | What Melbourne clients say | Melbourne only. Existing candidates on the live carousel: Alison and Colin (Amanda, Melbourne investment), Helen (Amanda), Ben and Philip (Amanda), Fiona and Luke (Tass, interstate investors), Matthew (Tass). Each with first name, suburb if known, agent, outcome | Three to five, quote and attribution. No stars unless the count is real and sourced |
| 12 | FAQ | Questions about buying in Melbourne | Eight to ten. Each answer complete in its first sentence. `FAQPage` schema carries only the answers that are complete, per the existing checker rule | Accordion is acceptable but the answers must be in the DOM, not loaded on open |
| 13 | Closing capture and office | Talk to a Melbourne buyers' agent | Full form: segment, budget, suburb, then name, email, phone. Office NAP, map, hours. `LocalBusiness` schema. Links to sibling location pages on canonical URLs | `bg/brand` band for the form, office block beneath on `bg/brand-deep` with the footer. Density monotonic: nothing below the first CTA is sparser than the section above it |

**Optional, below 13:** Rich's blog feed filtered to VIC or Melbourne tagged
posts, if HubSpot can filter by tag. It is fresh content and costs nothing. If
it cannot be filtered to Melbourne, leave it out; a Sydney article on a
Melbourne page is noise.

**Dropped from the live page and not replaced:** award wall, "Why choose us"
six, "Experience the Propertybuyer difference", lifestyle, transport, food and
wine, landmarks, sitewide testimonials, suburb report promo band, service guide
band, purchases iframe. The two promo bands become a single inline link in
section 8 ("Get a free suburb report") so the offer survives without a band.

### Minimum contents check

One capture point in the first screen (2). One proof block in the first two
screens (3). One segment router (2 and 10). One closing capture (13). Passes.

### Design principles that apply to this family

From DESIGN.md, the ones this page is most likely to break:

- Roughly 70 light, 25 dark teal, 5 everything else. Hero and closing capture
  are the teal. Nothing else is.
- Terracotta on actions only. The one primary action per viewport is the
  continue button in the hero form, then nothing until the closing form.
  Section 10's six segment links are text links, not buttons.
- One sparse section: the hero. Everything below is standard or dense.
- No eyebrow labels above headings. The heading carries the section. Section
  numbering is not shown.
- No 3-up icon card grids. Process is a numbered list. Regions are text cards
  with suburb lists, no icons.
- Headings sentence case, Proyale for H1 and H2 only, Geist 600 for H3.
- Nothing below 16px in Light. Field labels 13px Bold uppercase, always
  visible.
- No shadows. Bands, hairlines and density do the separation.

---

## 4. Content plan, Melbourne

Counts are `used/budget`. Budgets are the ones `tools/check.mjs` enforces.
Anything in `[brackets]` is an input, not copy.

### 4.1 Ranking layer

| Field | Draft | Notes |
|---|---|---|
| URL | `/location/melbourne` | unchanged |
| Canonical | self | |
| Title | Buyers' Agents in Melbourne \| Independent Buyers' Advocates \| Propertybuyer | 70, will truncate after "Advocates". Acceptable: the truncated part is the brand. "Advocate" lives here, not in the H1. Decision pending, see 8 |
| Meta description | Independent buyers' agents and advocates in Melbourne since 2001. We act for buyers only, never for sellers. Fixed fees, off market access, 30 to 60 days to purchase. Prahran office. | 178, trim to 155 if Manu prefers |
| H1 | Buyers' agents in Melbourne | 27/60 |
| Breadcrumb | Home › Locations › Melbourne | `BreadcrumbList` |
| Image alt pattern | `[Agent name], buyers' agent, Propertybuyer Melbourne` for people; `[Suburb] house purchased [Month Year] by Propertybuyer for a [segment] client` for proof photographs | alt carries location and segment, the visible caption carries the human line |

### 4.2 Zone A copy

**Hero**

| Element | Draft | Count |
|---|---|---|
| H1 | Buyers' agents in Melbourne | 27/60 |
| Subhead | We work for you. Never for the seller. | 38/42, the settled hero control |
| Proof line | `[Tier 1 number]`, e.g. Bought $263,800 under appraisal in `[suburb]`, May 2025 | inline, `type/stat` for the number only |
| Primary action | Talk to a Melbourne buyers' agent | 33/34 full width at 390 |
| Short sibling | Talk to an agent | 16/20 |
| Phone | Call `[tracked VIC CallRail number]` | text link, not a button |

Subhead alternatives inside budget: "Buyers only. Never for the seller." 34.
"On your side of the table, only." 31. The control has already been through
the client; use it unless the client asks otherwise.

**Capture, step one**

| Element | Draft | Count |
|---|---|---|
| Field label | What are you buying? | 20/20 |
| Chips | Home buyer · Investor · Commercial · Developer · Prestige · Expat | fixed strings |
| Budget label | Your budget | 11/20 |
| Budget options | under-650k · 650k-1m · 1m-1.5m · 1.5m-2m · 2m-plus | assumed from the buyer page, unconfirmed, see 8 |
| Suburb label | Buying in | 9/20 |
| Suburb value | Melbourne | prefilled, editable |
| Continue | Continue | 8/20 |
| Microcopy | Two minutes. No cost, no obligation. | 36, the settled form line |

**Proof, three records**

| Slot | Heading | Count | Body | Source |
|---|---|---|---|---|
| 1 | Bought $263,800 under appraisal | 31/32 | Geoff, Melbourne. A 952 sqm office bought as an owner occupier in May 2025 for $3,908,748 against a $4,172,548 appraisal. | commercial deck p.7, audited clean 21 Aug |
| 2 | $225,000 of equity in two years | 31/32 | Wendy, Melbourne. Bought 2024 for $1,175,000 on a 5.0 percent initial yield. Valued at $1,400,000 in 2026. Renting at $1,200 a week. | investor deck p.37, audited clean 21 Aug |
| 3 | `[Melbourne home buyer record]` | | `[Blocked on the client. Both candidates are re-narrated in the investor deck. Ask Rich to confirm Stephen and Melanie's framing, or supply a clean home buyer record with suburb, month, year, price and outcome.]` | see `melbourneThirdProofContested` |

The third slot matters more than the other two. Organic intent on "buyers
agent melbourne" is residential and the page currently proves commercial and
investor. Ship with a bracket rather than a plausible card.

**Your Melbourne buyers' agents**

| Element | Draft | Count |
|---|---|---|
| H2 | Your Melbourne buyers' agents | 29/60 |
| Intro | Three people, all based in Melbourne, all licensed, all buying here every week. `[Confirm names and licence status with the client.]` | |
| Cards | `[Amanda Jones]`, `[Tass Pattas]`, `[third VIC agent or none]`. Name, title, suburbs covered, one sentence in their own words | Greg Willmott and Jono Roy appear on the live page; confirm whether they are VIC based before including |

Do not pad with the executive team. Rich, Michelle, Peter and Denise appear on
every location page today, which is exactly what makes "local" unbelievable.
Rich can appear once, as the reviewer in the byline.

### 4.3 Zone B copy, headings and first sentences

Each first sentence is the answer engine's extract. Body follows at draft
quality; the SEO team refines. Counts on the H2.

**5. Why use a buyers' agent in Melbourne** (36/60)
First sentence: A buyers' agent in Melbourne acts only for you, so the selling
agent never learns your budget, your deadline or your finance position. Body:
the privacy shield argument, then the local version: Melbourne is Australia's
largest auction market, and a buyer who bids for themselves does so against a
professional, in public, with their limit on their face.

**6. The Melbourne property market in 2026** (39/60)
First sentence: `[As at Month 2026, Melbourne's median house price is $X and
median unit price is $Y, with clearance rates at Z percent, source.]` Body: the
inner, middle and outer split; houses against units; what has changed since the
May 2026 Budget for investors and what has not for owner occupiers. Every
figure sourced and dated. Written by or attributed to Rich.

**7. Where our Melbourne buyers' agents buy** (42/60)
First sentence: Propertybuyer buys across metropolitan Melbourne and the
Mornington Peninsula, with agents based in `[Prahran and X]`. Then the region
cards.

**8. How it works, and what a buyers' agent costs in Melbourne** (56/60)
First sentence: Propertybuyer charges a fixed fee agreed before the search
starts, typically equivalent to 1.5 to 2 percent of the purchase price for a
full search, 1 percent for appraisal and negotiation, and $660 plus a $3,300
success fee for auction bidding only. Then the steps. `[Fee publication is a
client decision.]`

**9. Off market property in Melbourne** (33/60)
First sentence: Off market means a property offered to buyers' agents before or
instead of a public listing; Propertybuyer's brief goes to a database of more
than 10,000 selling agents. Body: access, not a bargain. State that off market
stock can carry a premium and that the job is to price it correctly.

**10. Who we buy for in Melbourne** (28/60)
Six H3s, each 32 characters or fewer: Home buyers in Melbourne · Investors in
Melbourne · Commercial buyers in Melbourne · Prestige homes in Melbourne ·
Expats buying in Melbourne · Developers in Melbourne. Register per DESIGN.md.
Each block ends: Tell us what you are looking for → anchors to section 13 with
the chip preselected.

**11. What Melbourne clients say** (27/60)
Melbourne only. Five candidates named in section 3, table row 11. Pull the
full text from HubSpot, confirm permission, keep first names.

**12. Questions about buying in Melbourne** (35/60)
Ten, with the answer complete in the first sentence:

1. How much does a buyers' agent cost in Melbourne?
2. Do buyers' agents in Melbourne charge a percentage or a fixed fee?
3. How long does it take to buy a property with a buyers' agent in Melbourne?
4. Do you bid at auction on my behalf?
5. What areas of Melbourne do you cover?
6. Do you buy in regional Victoria or Geelong?
7. How do you find off market properties in Melbourne?
8. Can you help me buy in Melbourne if I live interstate or overseas?
9. How do you stop me overpaying at a Melbourne auction?
10. What is the difference between a buyers' agent and a buyers' advocate?

Question 10 is deliberate. It is a real query in Victoria, it lets the page
use "advocate" once in the persuasion layer inside an answer rather than a
heading, and the answer is short: the same thing, two names.

**13. Talk to a Melbourne buyers' agent** (33/60)
Full form. Office block: Propertybuyer Melbourne, 49 Porter Street, Prahran
VIC 3181, `[tracked number]`, `[hours]`. Sibling links: Sydney, Brisbane,
Adelaide, Gold Coast, Sunshine Coast, Newcastle, Central Coast, Canberra,
Hobart, all on `/location/` URLs.

### 4.4 Schema

One JSON-LD block per page, `@graph` with:

- `LocalBusiness` (or `RealEstateAgent`, which is a subtype): name
  "Propertybuyer Melbourne", `parentOrganization` Propertybuyer, address,
  telephone, geo, `areaServed` (Melbourne and the region list from section 7),
  `employee` linking to the `Person` nodes, `url`, `image`, `sameAs` to the GBP
  listing.
- `Person` per named agent: name, jobTitle, worksFor, url to profile, image.
- `FAQPage` with only the complete answers.
- `BreadcrumbList`.
- `WebPage` with `dateModified`, `reviewedBy` → Rich's `Person`.

Nothing in the graph that is not visible on the page.

### 4.5 Claims register additions for this page

| Claim | Tier | Status |
|---|---|---|
| Australia's largest auction market | 2 | Clear, widely reported; cite REIV or Cotality in the sentence |
| Fee figures | 1 | Client's own pricing schedule; publication decision pending |
| 30 to 60 days | 2 | Cleared in DESIGN.md |
| Median prices and clearance | 1 | Blocked until sourced and dated |
| 10,000+ agents | 2 | Cleared |
| Award count | 3 | Gated; use "one of Australia's most awarded" with the two named wins only if the count question is resolved, otherwise omit awards entirely |
| "4 to 6 weeks" (Adelaide FAQ) | 3 | Contradicts 30 to 60; do not carry over |
| "50 to 60 local experts" (Adelaide FAQ) | 3 | Do not carry over |

---

## 5. Adelaide and Perth, deltas only

### Adelaide

Same template. Changes:

- Title carries both terms: Buyers' Agents in Adelaide \| Buyers' Advocates \|
  Propertybuyer.
- Proof: extract three SA records from the investor deck (75 records across
  four cities; none pulled yet). Run the cross deck check before selecting.
- Team: Jonathon Moore is the only SA based person on the live page. One
  named agent is honest; do not pad. If one person, the section becomes "Your
  Adelaide buyers' agent" and carries his suburbs and a longer bio.
- Regions: none exist on the live page. Propose: City and North Adelaide,
  Eastern suburbs (Norwood, Burnside, Unley), Western beaches (Glenelg,
  Henley), Inner south, Northern growth corridor (Prospect, Gawler), Adelaide
  Hills, and a regional link (Barossa, McLaren Vale). Confirm with the client.
- FAQ: carry the ten existing questions, rewrite the two with Tier 3 claims.
- Office: 224 Hutt Street, Adelaide SA 5000. No local phone on the live page;
  a tracked SA number is a client supply item.
- Market section: Adelaide's affordability and low vacancy story is the local
  angle; source it.

### Perth

Variant, not the template. No office and no proof records mean three sections
cannot exist honestly.

- Section 3 (proof) becomes **"How we buy in Perth"**: served from `[nearest
  office]`, inspected in person, `[named agent who travels]`. If the client
  cannot name a person who has bought in Perth, the page should not be built
  yet.
- Section 4 (local team) is removed.
- Section 13 loses the office block. Schema is `Service` with `areaServed`
  Perth, not `LocalBusiness`. `LocalBusiness` on Perth is a false machine
  readable claim.
- Regions: propose Western suburbs (Cottesloe, Claremont, Nedlands), Inner
  north (Mount Lawley, Leederville), Inner south (South Perth, Applecross),
  Fremantle and coast, Northern corridor (Joondalup), Hills. Confirm.
- The FAQ carries "Do you have an office in Perth?" with an honest answer. An
  answer engine will ask it whether the page does or not.
- Perth is the only new URL. It has no rankings to protect and no inventory to
  preserve, so it is the right page to build last and to use as the test of
  what the template looks like without local presence.

Perth's honest option three from 21 August still stands: two good pages beat
three where one cannot support its own structure. If the client cannot supply
a named person and at least one Perth purchase, hold Perth.

---
## 6. Design plan, Figma

File: landing pages file `jJkJZSphbVXWFdDCyB8rtM`. New page "Locations".
Tokens from the source file's Mapped collection; bind to Mapped, never Base.

Order of work:

1. **Selected chip state first.** It is the single undefined interactive
   element the whole family depends on, it is in DESIGN.md Stop and Flag, and
   this page cannot ship without it. Three candidates: teal fill with white
   label, teal border at 2px with a weight change and no fill, or terracotta
   fill. The third breaks "one primary action per viewport" with six chips on
   screen. Recommend the border and weight change: it reads as selection, not
   action, and it survives on `bg/brand` in the hero. Record the decision in
   DESIGN.md and Figma.
2. **Hero at 1440**, then immediately at 390, because the form column has to
   stack and the H1 has to hold at 34 without an orphan.
3. **Proof card** as a component with the stat, the suburb line, the date, the
   body, and an optional photograph slot. One component, three instances.
4. **Agent card**, one component. Photograph, name, title, suburbs, one line.
5. **Region card**, dense, text only.
6. **FAQ row**, with the answer visible in the design at least once so the
   copy length is real.
7. **Full form** for section 13 on `bg/brand`, using the lead capture
   component already promoted to `base.css`.
8. Compose the page top to bottom at 1440. Then run the 390 check on the
   whole page: no horizontal scroll, no clipped text, no orphan on a heading,
   every tap target 44.

Reused from the shipped system: header, footer, lead capture component,
button primary, pill, section band, `.wrap` container. Everything else in
sections 3 through 12 is new composition for `locations.css`.

Checks before handover to build: every colour, size and radius resolves to a
Mapped token; accent on actions only; one primary action per viewport; no
Tier 3 claim rendered; hero subhead under 42; other headings under 60; the
selected chip state documented.

---

## 7. Claude Code plan

Working directory: the `propertybuyer` repository. Read order
for the agent is unchanged: `DESIGN.md`, `HANDOVER.md`, `shared/segments.json`,
then this file at `locations/PLAN.md`.

Eight phases. One branch per phase, merge by PR. Each phase has a paste ready
prompt and a definition of done. Phases 0 and 1 are cheap and unblock
everything; do not start phase 3 until phase 2 is reviewed by a human.

### Phase 0, preflight (inputs, mostly not code)

Owner: Kenn with Manu and Kynan. Nothing in the repository depends on the
outcome except the expectations you set.

- [ ] GSC export, last 90 days, for `/location/brisbane`, `/location/melbourne`,
      `/location/adelaide`: queries, impressions, clicks, position. Save as
      `locations/data/gsc-<slug>-2026-09.csv`.
- [ ] Semrush keyword volume and difficulty for the head term and advocate
      variant in each city. `locations/data/keywords-2026-09.csv`.
- [ ] Ahrefs referring domains per URL and GBP review counts per office.
- [ ] HubSpot and CallRail attribution for the three location pages, last 90
      days: submissions, calls, and segment and budget where labelled.
- [ ] Confirm with Kynan that Performance Max Final URL Expansion is off, or
      will be before these pages are re-indexed.
- [ ] Client decisions: fee publication, advocate in the ranking layer, VIC
      and SA agent lists, tracked numbers per state, the third Melbourne
      proof record, whether Perth has a person and a purchase.

Definition of done: `locations/data/` holds the exports and
`locations/PLAN.md` section 1.3 has each hypothesis marked confirmed, rejected
or open against them.

### Phase 1, reset the family

Prompt:

```
Read DESIGN.md, HANDOVER.md, shared/segments.json, shared/locations.json and
locations/PLAN.md in that order. Then:

1. Create branch locations/reset.
2. Move locations/melbourne/ to locations/_archive/melbourne-2026-08-21/ and
   add a one paragraph README there saying why it was archived and what
   carries forward (the capture contract, the two audited proof records, the
   checker rules). Do not delete it.
3. Move locations/STRATEGY.md, REFERENCE.md and BRIEF.md into
   locations/_archive/ as well. locations/PLAN.md supersedes them.
4. Rewrite locations/README.md to point at PLAN.md and describe the new
   shape: melbourne/ (template), adelaide/, perth/ (variant), data/, and
   tools referenced below.
5. Update shared/locations.json: melbourne status back to "planned" with a
   note that the 21 Aug build is archived; add openDecisions entries for
   templateNotFormula (the three live pages share Brisbane's template, so
   structure is not the ranking variable), advocateInRankingLayer (open),
   feePublication (open), replacementInventory (the rule in PLAN.md section
   2). Date each 2 Sep 2026.
6. Update CLAUDE.md's location paragraph and file map to match.
7. Run npm run check and confirm nothing else regressed. Commit with a
   sentence describing intent. Open a PR.

Do not touch tokens.css, base.css, landing.css or anything under New Builds/.
```

Definition of done: PR merged, checker green, no location page built.

### Phase 2, inventory tool and copy deck

Prompt:

```
Branch locations/melbourne-copy. Read locations/PLAN.md sections 2, 3 and 4.

Part A. Write tools/extract-live-inventory.mjs. Given a URL, it fetches the
page (respecting robots; if blocked, accept a saved HTML file path instead),
and writes locations/data/inventory-<slug>.json containing: title, meta
description, canonical, H1, every H2 and H3 in order, every internal link
href and anchor, every proper noun that matches a supplied suburb list
(seed it from PLAN.md section 2), every named person and their profile URL,
the office NAP block, every FAQ question, and image alt text. Add npm run
inventory <url>. Run it against the saved HTML of the live Melbourne page,
which I will place in locations/data/live-melbourne-2026-09-02.html.

Part B. Write locations/melbourne/COPY.md from PLAN.md section 4. Every
element with its used/budget count. Every unfilled value in [brackets] with
what unblocks it. For each Zone B section, the H2 and the first sentence
answer, word counted, with a 40 word ceiling. Ten FAQ questions with
answers. The schema field list. A "Preserved from live" table at the end
that maps every item in inventory-melbourne.json to where it lands in the
new page, or records that it was dropped and why.

Run the banned word list from tools/check.mjs against COPY.md. "advocate"
is permitted only in the title, meta and the answer to FAQ 10; flag any other
occurrence. No em dashes, no exclamation marks, Australian English, sentence
case. Do not invent a figure, a suburb, a name or a fee. Stop and list what
you need if a slot cannot be filled from the repository or PLAN.md.
```

Definition of done: a human has read COPY.md end to end and signed it off, the
preserved-from-live table has no unexplained drops, and every bracket has an
owner.

### Phase 3, build the Melbourne template

Prompt:

```
Branch locations/melbourne-build. Read DESIGN.md, HANDOVER.md,
locations/PLAN.md sections 3 and 4, and locations/melbourne/COPY.md. The
Figma page "Locations" in file jJkJZSphbVXWFdDCyB8rtM is the visual
reference; if you have Figma MCP access, read the frames before writing CSS,
and load the figma-use skill first.

Build locations/melbourne/index.html and extend assets/css/locations.css.
Constraints:

- Three stylesheets in order: tokens.css, base.css, locations.css. Never
  landing.css. No raw hex anywhere. No :root outside tokens.css.
- Reuse header, footer, lead capture, buttons, pills, .wrap and .section from
  base.css. Compose everything else new. Do not lift from landing.css.
- Sections exactly as PLAN.md section 3 numbers them, with an id per section
  matching the slugged H2 so the segment fork can deep link into the closing
  form.
- Both forms carry data-location="melbourne" and no data-segment. Six chips,
  none preselected, group required. Suburb field prefilled "Melbourne",
  editable. Budget options exactly the buyer page's option values.
- Every Zone B H2 is followed by a <p class="answer"> whose text is the first
  sentence answer from COPY.md, 40 words or fewer.
- One JSON-LD @graph per PLAN.md 4.4. Every value in the graph must appear
  visibly on the page; add a comment above the script listing where each
  value renders.
- Visible "Reviewed [Month Year] by [Name]" line with a Person node.
- No iframe. Proof is three crawlable cards.
- Testimonials: only the Melbourne records named in COPY.md.
- Unfilled values render in [brackets], never as plausible copy.
- Mobile first, breakpoints 390, 768, 1100. Design time at 1440, hard check
  at 390.
- No entry animations in this family unless PLAN.md is amended; organic
  pages should paint their content on first render.

Then extend tools/check.mjs for the locations family with these rules and
run them: exactly one H1; title 50 to 70 characters and meta 120 to 160;
every H2 in Zone B followed by a .answer of 40 words or fewer; at least ten
H2s; FAQPage items equal visible FAQ answers; LocalBusiness present with
address and telephone matching the visible office block; BreadcrumbList
present; no <iframe>; every sibling location link resolves to /location/;
"advocate" appears only in <title>, meta description, alt text or the FAQ 10
answer; every img has alt; the reviewed line is present. Keep the existing
data-location, chip and bracket rules.

npm run check melbourne must pass. Add a /melbourne rewrite in vercel.json.
Record any decision you took in shared/locations.json openDecisions with the
date. Commit and open a PR.
```

Definition of done: checker green at all four widths, PR reviewed against the
Figma frames, HANDOVER.md updated with anything the build learned about the
template.

### Phase 4, client review round

Owner: Kenn. Production URL plus `?review=1` for the overlay. Settle which
channel is the record before sending: the feedback hub, BugHerd or Paper
comments, not all three. The 31 August lesson in CLAUDE.md is that an answer
sat open for three days because it arrived on the channel nobody was watching.

Prompt, after the round:

```
Branch locations/melbourne-review-1. Pull the round with the client-review
skill into .feedback/. Apply each item to locations/melbourne/index.html and
COPY.md together, so the deck and the page never diverge. Any item that asks
for a claim not in the register or a value not in Figma Variables is
recorded in shared/locations.json as an open decision and left bracketed,
not applied. Re-run npm run check melbourne. Reply and resolve threads only
after the checker passes. Commit per item.
```

### Phase 5, Adelaide from the template

Prompt:

```
Branch locations/adelaide. Read locations/PLAN.md section 5 and the Adelaide
deltas. Run tools/extract-live-inventory.mjs against the saved live Adelaide
page at locations/data/live-adelaide-2026-09-02.html.

Write locations/adelaide/COPY.md first, from the Melbourne deck, applying
every delta in PLAN.md section 5. Extract three SA proof records from the
investor deck in .deck-src/ into paper/proof-register.md, running the cross
deck check described under melbourneThirdProofContested before selecting.
Carry the ten live Adelaide FAQ questions; rewrite the two answers that hold
Tier 3 claims ("4 to 6 weeks", "50 to 60 local experts").

Then derive locations/adelaide/index.html from the Melbourne page. Change
copy, data-location="adelaide", the schema values and the proof cards. Leave
structure, classes and tokens alone. If the local team is one person, use
the single agent variant of section 4 described in PLAN.md. Preserved-from-
live table, checker, rewrite, PR, same as Melbourne.
```

### Phase 6, Perth as a variant

Prompt:

```
Branch locations/perth. Read locations/PLAN.md section 5, Perth. Before
writing anything, check shared/locations.json for whether the client has
supplied a named person who buys in Perth and at least one Perth purchase. If
neither is recorded, stop and write locations/perth/BLOCKED.md saying exactly
what is missing. Do not build.

If both are recorded: derive from Melbourne, remove section 4, replace
section 3 with "How we buy in Perth" per PLAN.md, remove the office block
from section 13, and replace LocalBusiness with Service and areaServed in the
schema. Add "Do you have an office in Perth?" to the FAQ with the honest
answer. Extend the checker so a page with no office block cannot carry
LocalBusiness. Perth is a new URL, so no inventory step. Checker, PR.
```

### Phase 7, HubSpot handover pack

Prompt:

```
Branch locations/handover. Write locations/HANDOVER-LOCATIONS.md for the
client developer porting these pages into HubSpot templates. It must include:

- The three stylesheets and their load order, and which selectors in
  locations.css each section uses, so a HubSpot module can be cut per
  section.
- The full asset list with current ../../ paths and a column for the HubSpot
  file manager URL to fill in. Fonts with the immutable cache header from
  vercel.json.
- The form contract: data-location, six chip values, budget option values,
  the hidden fields HubSpot needs to receive segment, budget and location.
- The JSON-LD block per page and the rule that it mirrors visible content.
- URL handling: same URLs, no redirects, and the publish checklist: take a
  GSC baseline the day before, publish, request indexing, watch the head
  term and the gap list for 28 days, roll back if position on the head term
  falls more than [threshold] for 14 days.
- The list of legacy internal links on other pages that should be updated to
  the canonical /location/ URLs (from the inventory files).
- Every open decision in shared/locations.json, as blocking questions,
  numbered.

Then update README.md, CLAUDE.md and HANDOVER.md so the repository describes
itself accurately. PR.
```

### Guardrails for every phase

These are already in CLAUDE.md and DESIGN.md. Restated because the location
family is where they are most likely to slip, since the copy is longer and
more factual.

1. Never invent a value, a claim, a statistic, a suburb, a name or a fee.
   Bracket it.
2. Never soften a constraint because the brief seems to want it softened.
   Name the conflict.
3. The six segment strings and the budget option values are HubSpot routing.
   Do not touch them.
4. No em dashes, no exclamation marks, Australian English, sentence case,
   anywhere, including comments and JSON.
5. One page at a time. Melbourne teaches what is template. Fold that back
   before Adelaide starts.
6. Every decision taken in a build is recorded in `shared/locations.json`
   with a date, a status and a consequence.

---

## 8. Open decisions, numbered, with an owner

1. **Advocate in the ranking layer.** Title, meta, alt and schema may carry
   "buyers' advocate" for Victoria and South Australia; headings and CTAs do
   not. Recommend yes. Owner: Kenn, with Manu on the volume data. Blocks the
   title tag.
2. **Fee publication.** The fee basis is in the client's own onboarding
   material. Publishing it is the strongest single AEO move on the page and
   the strongest trust move over a long cycle. It is also a commercial call.
   Owner: Rich via Jason. Blocks section 8 and FAQ 1 and 2.
3. **Third Melbourne proof record.** Stephen and Melanie's framing, or a
   clean home buyer record. Owner: Rich. Blocks proof slot 3.
4. **VIC and SA agent lists**, with licence status and the suburbs each
   covers. Owner: Michelle. Blocks section 4 on both pages.
5. **Tracked numbers per state** in CallRail. Owner: Kynan or the client.
   Blocks the hero phone link.
6. **Melbourne and Adelaide regions**, six to eight each, in the client's own
   vocabulary. Owner: the local agents. Blocks section 7.
7. **Sourced market figures** for section 6, dated. Owner: Rich or Manu.
   Blocks section 6.
8. **Perth: a named person and a purchase**, or hold Perth. Owner: Rich.
9. **Selected chip state.** Design decision, this week. Owner: Kenn.
10. **Budget bands** on a page that serves every segment. The residential set
    is assumed. Changing option values after launch breaks routing. Owner:
    Kenn with Jason. Confirm before phase 3.
11. **Final URL Expansion** off before re-index. Owner: Kynan.
12. **Which review channel is the record.** Owner: Kenn. Before phase 4.

---

## 9. Questions worth asking before believing this plan

- Is Brisbane's ranking actually good, or good relative to a low bar? Position
  one for "buyers agent brisbane" and position eight are both "ranking". The
  GSC export answers it.
- Does the Brisbane page convert? If it ranks and produces poor leads, the
  case for the template is stronger and the case for copying anything from it
  is weaker.
- If H1 (competition) dominates, how much of the Melbourne design budget
  should go to this page at all, versus the sub-region pages that Melbourne
  buyers actually search (Bayside, inner east, Mornington Peninsula), which
  currently all self link to the city page?
- Is the six chip router right for an organic visitor? On a paid page it is a
  measurement instrument. An organic visitor who searched "buyers agent
  melbourne" has not seen an ad and may be earlier in the cycle. The chips
  still cost nothing and still label the lead; the question is whether the
  budget field belongs in the hero for this traffic or only in the closing
  form. Test it, do not decide it.
- What does the HubSpot developer need from a Figma file versus from the
  reference HTML? If the answer is "only the HTML", the Figma work is for
  client sign off, and it can be lighter than a full component build.
