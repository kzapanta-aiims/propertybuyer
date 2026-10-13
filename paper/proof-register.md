# Proof register, home buyers page

Every Tier 1 item that appears on the Paper design traces to a row here.
Anything not in this register renders bracketed. Retrieved 13 August 2026
from Propertybuyer's published materials. The standing rules apply: nothing
invented, and a bracket marks a value the client must confirm before code.

**Filled from the home buyer deck, 18 August 2026.** The three Tier 1 slots
carry no brackets. They are filled from "Legacy All Homebuyer (1).pdf",
supplied by the client on 18 August 2026: 80 residential purchases, each with
a purchase year and price, a 2026 valuation, client savings, equity created
and a time to purchase. Every figure below is copied from that deck rather
than derived. Figures shown on the page in abbreviated form are exact, not
rounded: $700K is $700,000, $1.88M is $1,880,000, $6.2M is $6,200,000,
$4.87M is $4,870,000 and $15M is $15,000,000.

**Segment mismatch resolved, 18 August 2026.** The slots briefly carried
commercial purchases, from the commercial deck supplied the same day. That
was corrected within the day at the client’s direction: this is the home
buyers page and it now carries home buyer records. The three commercial
records are kept under Reserves, where they are the natural starting content
for the commercial page when it is built.

**Why these three.** The deck is a ladder, not a list. The three chosen cover
the three life stages a home buyer arrives at the page in, at ascending price
points, so a visitor finds themselves in one of them: first home, family home,
downsize. Each also answers a different fear. 74 of the 80 records were passed
over; the selection notes below say what each was chosen against.

## Selected for the three Tier 1 slots

### Slot 1 · First home, after years of renting

- **Source:** Legacy All Homebuyer (1).pdf page 58, client supplied 18 Aug 2026.
- **Record:** Brisbane QLD, 3 bed 2 bath 2 car. Bought 2008 for $700,000,
  valued at $2,000,000 in 2026. Client savings $56,000. Equity created
  $1,300,000, a 2.9x multiple. Current rent $1,100 per week. Time to purchase
  3 weeks. Client Shane.
- **Verbatim:** "I didn’t want something generic. Propertybuyer found me a
  home with real character and soul."
- **On-page copy:** pill `First home` · h3 `First home in Brisbane` · body
  "Shane had rented for years and wanted a first home with real character,
  nothing generic. We found him a classic Queenslander in the suburb he had
  been watching." · stats `$700K` Bought 2008, `$2M` Value today, `3 weeks`
  To purchase.
- **Chosen against:** the other 15 Brisbane records. Shane carries the highest
  multiple of any Brisbane purchase with a named client, and the lowest entry
  price of the three slots, which is what makes the ladder start where a first
  home buyer actually stands.
- **Tier:** 1, complete. Named client, dated, attributable.

### Slot 2 · Family home, after losing at auction

- **Source:** Legacy All Homebuyer (1).pdf page 7, client supplied 18 Aug 2026.
- **Record:** Sydney NSW, 4 bed 3 bath 2 car. Bought 2012 for $1,880,000,
  valued at $6,200,000 in 2026. Client savings $169,000. Equity created
  $4,320,000, a 3.3x multiple. Current rent $2,800 per week. Time to purchase
  6 weeks. Clients Stephen and Veronica.
- **Verbatim:** "We had almost given up. Propertybuyer made it real for us."
  Context published with the record: three auctions lost in a row, and they
  never sat in an auction room again.
- **On-page copy:** pill `Bought without auction` · h3 `Family home in Sydney`
  · body "Stephen and Veronica lost three auctions in a row and were ready to
  stop looking. We found the family home they wanted, and they never sat in an
  auction room again." · stats `$1.88M` Bought 2012, `$6.2M` Value today,
  `6 weeks` To purchase.
- **Chosen against:** every other record in the deck. This is the one that
  matches the home segment register head on, which asks the page to lead with
  handover of risk. Losing three auctions is the segment’s first fear stated
  out loud, and the record answers it.
- **Tier:** 1, complete.

### Slot 3 · Downsizing without giving anything up

- **Source:** Legacy All Homebuyer (1).pdf page 3, client supplied 18 Aug 2026.
- **Record:** Sydney NSW, eastern suburbs, 5 bed 2 bath 2 car. Bought 2014 for
  $4,870,000, valued at $15,000,000 in 2026. Client savings $438,000. Equity
  created $10,130,000, a 3.1x multiple. Current rent $4,500 per week. Time to
  purchase 8 weeks. Clients Roderick and Denise.
- **Verbatim:** "We downsized. We didn’t compromise. Propertybuyer made that
  possible."
- **On-page copy:** pill `Downsizer` · h3 `Downsized in Sydney` · body
  "Roderick and Denise were downsizing and refused to trade quality or
  location for it. We secured an eastern suburbs home that met every point of
  the brief." · stats `$4.87M` Bought 2014, `$15M` Value today, `8 weeks`
  To purchase.
- **Chosen against:** the rest of the deck on size. The largest equity figure
  in all 80 records, and the only one that puts a downsizer on the page, which
  is the life stage the other two do not reach.
- **Tier:** 1, complete.

**Photographs.** The three property images are the hero shots from the same
three pages of the deck, resized under the rules `tools/compress-images.mjs`
applies to `story-*` assets. They are the actual properties purchased.

**The privacy badge is hidden from 18 Aug 2026** at the client’s request. It
is hidden in CSS, not deleted: the markup stays and one declaration in
`landing.css` brings it back. Worth knowing that a street number is legible on
two of the three photographs; the deck is the client’s own published material,
so this publishes nothing they have not already published themselves.

**Not used, and why.** 77 records were not slotted. Melbourne is the largest
single group in the deck at 23 records and is not represented in the three;
its strongest by equity is Stephen and Melanie, page 29, $2,500,000 in 2013
to $4,200,000, and its strongest by client saving is Suzy, page 30, $346,000.
The rules budget three Tier 1 blocks per page, so the ladder was chosen over
the map.

**Neither of those two is usable, checked 21 August 2026.** Both are
re-narrated in the investor deck, one of them provably. Do not take either as
the Melbourne home buyer record without asking the client first. See "Both
Melbourne home buyer candidates are contested" below.

## Reserves, qualified but not slotted

**Commercial, for the commercial page.** Filled the three slots for part of
18 Aug 2026 before the home buyer deck arrived. Sourced from "Latest Recent
Purchases - Commercial.pdf", every figure copied from the deck. Their images
are still in `assets/img/`. These are the natural starting content for
`New Builds/commercial/index.html`.

| Client | Location | Record | Source |
|---|---|---|---|
| Geoff | Melbourne VIC | Office, 952 sqm, owner occupier. May 2025, $3,908,748 against a $4,172,548 appraisal. Savings $263,800, $4,106 per sqm | Commercial deck p.7 |
| Jamie & Tamara | Brisbane QLD | Warehouse, 650 sqm, investment. Dec 2024, $5,550,000. Rent $335,310, yield 6.0 percent, 3 year lease | Commercial deck p.9 |
| Stella | Sydney NSW | Office, 431 sqm, investment, bought from overseas. Apr 2024, $4,475,000. Rent $220,000, yield 4.9 percent, 5+5 year lease | Commercial deck p.14 |


**Residential, displaced 18 Aug 2026.** These three held the Tier 1 slots
until the commercial deck arrived. Still qualified, still short a month and
year, and the natural content for this page if it returns to residential.

| Name | Location | Outcome | Source |
|---|---|---|---|
| Kylie & James | not published | Won at auction against 12 registered bidders | who-we-help/home-buyers, new-testimonial |
| Sam | North Sydney | Engagement to purchase in four weeks | who-we-help/home-buyers |
| Carolyn & Richard | Paddington, Sydney | Found in 2 weeks, sourced off market, bought from Auckland | new-testimonial |

**Residential, never slotted.**

| Name | Location | Outcome | Source |
|---|---|---|---|
| Sophie Johnston | Brisbane (from Newcastle) | First house, offer accepted in 25 days, within budget | new-testimonial |
| Basil Klevansky | not published | Exchanged in 24 hours against 8 other issued contracts | new-testimonial |
| Merridy | Sydney | Property found 3 weeks after engagement | who-we-help/home-buyers |
| Vishwinder Singh Ghai | not published | Won auction against 11 registered bidders | new-testimonial |
| Zane McIntyre | Sydney/Qld | Home in 2 weeks of inspections, 4-week settlement | new-testimonial |
| Rebecca Furzer | Sydney | Family upgrade with 3 kids | new-testimonial |
| Hannah | Eastern Suburbs | Dream family home purchased | new-testimonial |
| Sarah & Jeff | Northern Beaches | Off-market access, "Rich was on the ball all the time" | who-we-help/home-buyers |

## Investor page, selected 21 August 2026

**Filled from "Legacy All Investor.pdf"**, supplied by the client 21 Aug 2026.
75 records across Sydney, Melbourne, Brisbane and Adelaide, each carrying a
purchase year and price, a 2026 valuation, equity created, an initial yield, a
2026 weekly rent and a current yield on the purchase price. Every figure below
is copied from the deck rather than derived.

**Why these three.** The ladder is portfolio stage, which is how DESIGN.md
describes the segment: "first timers through to portfolio builders and SMSF
buyers, heavily interstate". First investment, then an addition to existing
holdings, then a purchase made from another state with no inspection. The three
also give three states, which the commercial page could not, and prices that
ascend across the band the form offers.

| Slot | Client | Location | Bought | Price | Initial yield | Equity created | 2026 value | 2026 rent | Deck page |
|---|---|---|---|---|---|---|---|---|---|
| 1 · First investment | Mathew | Sydney NSW, inner west | 2007 | $580,000 | 6.0% | $1,440,000 | $2,020,000 | $1,000 pw | p20 |
| 2 · Portfolio addition | Wendy | Melbourne VIC | 2024 | $1,175,000 | 5.0% | $225,000 | $1,400,000 | $1,200 pw | p37 |
| 3 · Interstate | Pui Kwan and Janis | Brisbane QLD | 2023 | $1,230,000 | 4.6% | $520,000 | $1,750,000 | $1,200 pw | p63 |

**Arithmetic checked.** Purchase price plus equity created equals the 2026
current value on all three. The deck's current-yield figures also reconcile
against the stated weekly rent: 9.0, 5.3 and 5.1 percent respectively.

**Abbreviations are exact.** $580K, $1.175M, $1.23M, $1.44M, $1.4M, $1.75M and
$2.02M all abbreviate without rounding, so every figure can sit in a stat row
rather than being pushed into body text the way the commercial page had to do
with $3,908,748.

**Photographs are in place.** All three are the hero shots from the deck pages
the records came from, the same source as the buyer page's three, and they
ship at the same native 685x419 those already do. Extracted by
tools/extract-deck-images.mjs, which reads the embedded image streams rather
than rendering a page, so no rasteriser is involved and the result is
reproducible: deleting the three files and re-running reproduces them byte for
byte. Each record page in the deck carries three photographs of the same
property; the card uses the large hero.

**The deck disagrees with itself on slot 1.** Page 20's copy calls the property
an apartment twice. The photographs on that same page are of a freestanding
cottage with a picket fence. The card therefore names no dwelling type at all:
the heading is "Inner west, Sydney" and the body says "his first investment a
short walk from the light rail". Every figure is unchanged. This is the deck
contradicting itself rather than a transcription error, and it is worth a
client answer alongside the overlap question below.

**Not used, and why.** 72 records were not slotted. The strongest unslotted
candidates, kept here in case a slot changes:

| Client | Location | Bought | Price | Initial yield | Note | Deck page |
|---|---|---|---|---|---|---|
| Mary | Sydney NSW, Northern Beaches | 2007 | $790,000 | 6.1% | Highest initial yield in the in-band set, $1,810,000 equity | p18 |
| Stephanie | Brisbane QLD | 2017 | $630,000 | 4.8% | First investment, secured inside five weeks | p72 |
| Gary | Sydney NSW | 2006 | $760,000 | 4.0% | Portfolio addition, harbour outlook | p19 |
| Peter | Regional SA | 2009 | $365,000 | 4.6% | Interstate, "never had to fly down once" | p77 |

Peter's record is the cleanest interstate story in the deck but his quote uses
a word the DESIGN.md banned list rules out, so quoting him verbatim would put
banned copy on the page. Pui Kwan and Janis carry the same story without that
problem.

## Deck overlap, RAISED 21 August 2026, UNRESOLVED

**The investor deck retells all three of the buyer page's Tier 1 records as
investment purchases**, with identical figures and near-identical sentences.

| Client | Live on the buyer page as | In the investor deck as | Figures |
|---|---|---|---|
| Roderick and Denise | Downsizer, "downsizing and refused to trade quality or location" | "adding to their portfolio", let at $4,500 pw, 3.5% initial yield | 2014, $4,870,000, 2026 value $15,000,000. Identical. |
| Rozanne | Upsizer, "spent two years missing the school zone she needed" | "trying to expand her portfolio for two years", let at $1,000 pw, 4.4% initial yield | 2025, $1,140,000, 2026 value $1,250,000. Identical. |
| Shane | First home, "had rented for years and wanted a first home" | "his first investment", let at $1,100 pw, 5.3% initial yield | 2008, $700,000, 2026 value $2,000,000. Identical. |

**Why this matters rather than being a curiosity.** The two framings are
mutually exclusive. An owner-occupied home does not carry a rental yield and a
weekly rent. Shane either bought his first home after years of renting, or he
bought his first investment and let it at 5.3 percent. Both cannot be true of
one purchase, and both are currently published, one on a live page and one in a
client deck.

**What is not known.** Whether the client's decks re-narrate one purchase
history per audience, or whether these are coincidentally identical purchases
by same-named clients. Nothing in the documents settles it, and it is not ours
to guess: DESIGN.md places contested claims at Tier 3, which does not render.

**Consequence, and it reaches a live page.** If the investment framing is the
accurate one, the three Tier 1 cards on the buyer page now in production are
mis-labelled. That page belongs to another branch and was not touched.

**What was done here.** None of the three overlapping records is used on the
investor page. The three selected above appear only in the investor deck, so
they carry no contradiction. But if three records were re-narrated, the other
72 cannot be assumed clean, which is why this section exists rather than a
footnote.

**Needed from the client.** Confirmation of which framing is correct for
Roderick and Denise, Rozanne and Shane, Stephen and Melanie, and probably
Suzy, and whether any record in the investor deck also appears in the
homebuyer or commercial decks under a different story.

### Both Melbourne home buyer candidates are contested, 21 August 2026

The Melbourne location page needs a home buyer record for its third Tier 1
slot. The two candidates this register named above were checked against
"Legacy All Investor.pdf" directly, by pulling the deck's text. Both are in
it, and both are narrated there as investments.

| Candidate | Home buyer deck, per this register | Investor deck, read 21 Aug 2026 | Verdict |
|---|---|---|---|
| **Stephen and Melanie** | p29, $2,500,000 in 2013 to $4,200,000, listed as a home buyer record | Melbourne VIC. 2013, $2,500,000, 2026 value $4,200,000, equity created $1,700,000, let at $2,000 pw, 3.6 percent initial yield, 4.2 percent current. Backstory is prestige: a demanding brief and the budget to match it, with the right prestige asset slipping away | **CONTESTED, CONFIRMED.** Identical figures and the same city, which is this register's own test for re-narration rather than coincidence. A fourth instance of the contradiction above |
| **Suzy** | p30, client saving $346,000 | Melbourne VIC. 2023, $3,850,000, 2026 value $4,200,000, equity created $350,000, let at $1,800 pw, 2.2 percent initial yield. Backstory is portfolio building, wanting a family grade asset to draw quality tenants | **CONTESTED, PROBABLE.** $346,000 does not appear anywhere in the investor deck, and a saving against appraisal is not the same measure as equity created, so this is not proven identical. Same name, same city, and a number four thousand dollars away from the equity figure. Not clean enough to publish |

**So the third slot stays unfilled, and it is no longer an extraction job.**
It was recorded as one, on the basis that the records existed in material the
client had already supplied. They do exist. They are also both contested, and
DESIGN.md puts a contested claim at Tier 3, which does not render. The slot
now needs the client, not the deck.

**Three ways forward, none of them a guess.** Ask the client to confirm the
framing for Stephen and Melanie, which is the strongest Melbourne record in
either deck and would be a genuinely strong card if the home purchase framing
is the true one. Or work through the other 21 Melbourne home buyer records,
which needs the home buyer deck back on disk: it is not there, so this could
not be done here. Or ship Melbourne with two records and say so, which is
worse than three but honest, and is the state the page is in.

**What this changes about the wider problem.** The overlap was three records
out of 75 and could be read as an isolated oddity in how one deck was
written. It is now at least four confirmed, and the two records independently
picked as the strongest Melbourne home buyer material are both in it. That is
no longer an oddity. Until the client answers, treat any record that appears
in more than one deck as Tier 3, and check before selecting rather than after.

**The two records that did ship on the Melbourne page were audited, and are
clean.** Geoff, the commercial office, does not appear in the investor deck at
all. Wendy's figures on the page match the deck exactly: $1,175,000 in 2024,
$1,400,000 in 2026, $225,000 equity created, $1,200 pw, 5.0 percent initial
yield. Neither carries a contradiction that this repository can see.

**Still unverifiable from here.** Whether Wendy, or Mathew and Pui Kwan and
Janis on the investor page, also appear in the home buyer or commercial decks.
That direction needs those two decks, and only the investor deck is on disk.
This register asserted on 21 Aug that the investor page's three "appear only
in the investor deck"; that claim was made when the overlap was thought to be
three records, and it is worth re-running against the other decks when they
are next available.

## Tier 2 verification notes

- **"315+ Google reviews"** could not be verified from public search on
  13 Aug 2026. The claim stays on the page exactly as shipped, with its
  verify-at-publish flag intact. The client targets 500.
- **Award count. Resolved 21 Aug 2026, and the discrepancy is gone.** The
  live site's home-buyers page says "50+ industry awards", while the claims
  register had resolved **53** as cleared on 13 Aug 2026, so the pages and the
  live site disagreed. This was flagged to the client rather than silently
  matched, and the client chose **50+**. All three pages and `DESIGN.md` now
  say 50+, which agrees with the live site.
- **"30 to 60 days"** is corroborated in public use: the live home-buyers
  page leads with "Find Your Home in 30 - 60 Days".
- **Success rate.** The live site now publishes "98%" where older material
  said "96%". Two numbers in circulation confirms the register's ruling:
  GATED, does not render.

## Developer page, FILLED FROM THE HOME BUYER DECK 21 August 2026

**The framing is the open item, not the figures.** The three slots were
filled on 21 August 2026 at the client direction, for client review, after
the concern below was raised and the instruction confirmed. **All three
records are residential home purchases, not development sites.**

| Slot | Client | Record | Source |
|---|---|---|---|
| 1 | Stephen and Veronica | Sydney NSW, 4 bed 3 bath 2 car. Bought 2012 for $1,880,000, valued at $6,200,000 in 2026. 6 weeks to purchase | Homebuyer deck p.7 |
| 2 | Stephen and Melanie | Melbourne VIC. Bought 2013 for $2,500,000, valued at $4,200,000 in 2026. Time to purchase not recorded | Homebuyer deck p.29 |
| 3 | Roderick and Denise | Sydney NSW eastern suburbs, 5 bed 2 bath 2 car. Bought 2014 for $4,870,000, valued at $15,000,000 in 2026. 8 weeks to purchase | Homebuyer deck p.3 |

Every figure is copied from the sections above rather than re-read, and every
abbreviation is exact: $1.88M is $1,880,000, $6.2M is $6,200,000, $2.5M is
$2,500,000, $4.2M is $4,200,000, $4.87M is $4,870,000, $15M is $15,000,000.

**Why these three, and what it cost.** The home buyer PDF is not in the
repository, so the only available records were the five carrying figures in
this register. Three of the five are live on the buyer page. The two that
were unused, slots 1 and 2, were both taken. Slot 3 needed the only other
record above this page own $2.5m budget floor, and that record is already
live on the buyer page.

Two consequences worth stating plainly. **Slot 1 sits below the page own
budget floor** at $1.88m, because no unused record exists between $1.88m and
$4.87m. And **slot 3 now carries one record in three framings**: a downsize
on the buyer page, a portfolio addition let at $4,500 per week in the
investor deck, and a development proof point here. See the deck overlap
section below, which was already unresolved before this was added to it.

**Slot 2 ships two brackets deliberately.** The register holds Stephen and
Melanie figures but not their story or their time to purchase, so the body
says so and the third stat reads `[N weeks]`.

**No photographs, on any of the three.** Only slot 3 has one in the
repository. One real photograph beside two flat blocks reads as a bug, so
all three stay unphotographed. Supplying the home buyer PDF in `.deck-src/`
and running `npm run deck-images` would produce all three.

## Developer page, the development records this page actually wants

**No developer deck exists.** The three client success-story decks supplied so
far are "Legacy All Homebuyer (1).pdf", "Latest Recent Purchases -
Commercial.pdf" and "Legacy All Investor.pdf". There is no developer
equivalent anywhere in the repository, so all three Tier 1 slots on the page
ship in `[square brackets]` per CLAUDE.md rule 2.

**The ask is a date, not a deck.** The client publishes twenty named
development site purchases on
`propertybuyer.com.au/services/development-site-acquisitions`, read
21 August 2026. Each carries a street, a suburb, a price and a site type.
Checked directly against the source: **every one is undated**, and none names
a client. DESIGN.md Tier 1 requires a claim to be attributable AND dated, so
they cannot fill a slot as they stand.

They are also not Tier 2. DESIGN.md defines Tier 2 as what "any competitor
could say", and a $57,000,000 landmark unit site at Kurraba Point is not that.
They are a Tier 1 grade fact set missing one required Tier 1 attribute.

### Candidates, laddered by scale

Home ladders by life stage and investor by portfolio stage. This page ladders
by scale, so a visitor finds themselves in one of the three.

| Slot | Record | Price | Type | Why this one |
|---|---|---|---|---|
| 1 | Heath Rd, Leppington | $7,000,000 | Land subdivision | the small subdivision end of the span DESIGN.md states |
| 2 | Merlin St, Neutral Bay | $15,000,000 | Unit site | the middle, and unit sites are the most common type in the published list |
| 3 | Kurraba Rd, Kurraba Point | $57,000,000 | Landmark unit site | the institutional end, and the largest purchase the client publishes |

### What each slot still needs

- **The purchase month and year.** The only thing standing between the
  published list and three filled Tier 1 cards.
- **The client's first name**, as carried on all three other pages.
- **The end value or sale value estimate.** This is the stat that makes it a
  developer proof point rather than a generic one. The client's own published
  role statement says they estimate sale values, so the figure should exist
  internally even though it is not published.
- Optionally the saving against appraisal, which is what the commercial page
  leads its cards with.

**Figures on cards are exact, never rounded.** None of the three prices above
abbreviates exactly to two decimal places except $15,000,000, so on current
information two of the three would carry the price in the card body and keep
it out of the stat row, which is what the commercial page did with $3,908,748.

### The photographs are withheld, not missing

All three story media panels ship with no `<img>` at all, and render as a flat
`--bg-brand` block. This is deliberate and follows `investorProofSelection`:
a different property's photograph on a Tier 1 card is a false claim. The buyer
page's residential artwork was removed from the panels rather than inherited,
and nothing in `assets/img` was written, so no other page moved.

### Tier 2, taken from the client site the same day

- **"Over $250 million in development sites."** SOURCED from
  `services/development-site-acquisitions`. The source reads "over $250
  million in development sites in past 8 years"; the duration is **dropped**,
  because DESIGN.md is explicit that a hardcoded duration expires. The figure
  is unattributed and undated on the source page, the same standing as the
  review count and the 5,000+ figure. It replaces the "Over 5,000 properties
  purchased." bullet on this page only, which had duplicated the stat callout
  directly above it. See `developerStatBullet`.
- **"30 to 60 days"** is corroborated again on
  `who-we-help/property-developers`: "We find our clients the ideal property
  on average within 30 to 60 days of engagement."

### Gated, does not render

- **Richard Anderson**, Senior Acquisitions Manager for Development and
  Investment, credited with "$700M+ in gross development value and 800+
  dwellings delivered". Not in the DESIGN.md claims register, which clears
  Rich Harvey by name and nobody else, and the source phrasing "more than 25
  years of experience" is the construction DESIGN.md bans. Wants a register
  row rather than a build decision.
- **"Remove the common risks of DA approval"**, a published joint venture
  benefit. The strongest claim on either client URL, addressed to land owners
  rather than developers, and the only DA claim anywhere in the material. The
  page makes no DA claim at all.

Both are recorded under `developerGatedClaims` in `shared/segments.json` and
sit as an HTML comment above the closer band on the page.

### Currency

Everything in this section was read from two live marketing pages on
21 August 2026. Nothing there carries a date or a source of its own. Confirm
both pages are current before this page takes paid traffic, and confirm the
$250 million total and the twenty named purchases specifically, because those
are the two that reach a live page.

## Adelaide location page, selected 8 September 2026

**Source.** The Adelaide section of the two Legacy decks, pages 76 to 80 of
each, now committed in `paper/decks/`. Five South Australian records, the same
five purchases in both decks. The three July 2026 decks supplied the same day
carry no South Australian record at all, and no deck of the five carries a
Perth or Western Australian one.

**The cross deck check was run before selection, and all five are
re-narrated.** Each appears in the homebuyer deck as a home and in the
investor deck as an investment, with identical year, price, 2026 value and
equity, and a different backstory. This is the pattern first seen on 21 August
with three buyer page records, now five for five in Adelaide, and the July
2026 decks repeat it (Mark and Christine, Katherine, Brendan and Audrey, Arin
and Jaydn, Ainslie, Frances and Ben, Sridevi all appear in both July decks
with identical figures). It is no longer an oddity in how one deck was
written; it is how the client writes decks.

| Client | Where | Year | Price | 2026 value | Equity | Homebuyer deck says | Investor deck says | Deck pages |
|---|---|---|---|---|---|---|---|---|
| Karl | Adelaide SA, 3 bed 2 bath 2 car townhouse | 2008 | $400,000 | $1,050,000 | $650,000 | first home, 3 weeks, saving $30,000 | first investment, 3.7% initial yield, $700 pw | p78 both |
| Peter | Adelaide SA, 3 bed 2 bath 2 car | 2009 | $365,000 | $1,050,000 | $685,000 | new role interstate, 3 weeks, saving $29,000 | interstate investor, 4.6% initial yield, $700 pw | p77 both |
| Li | Regional SA, 3 bed 1 bath 1 car | 2025 | $617,000 | $750,000 | $133,000 | biggest move, family home, 3 weeks, saving $43,000 | biggest investment, 5.1% initial yield, $620 pw | p80 both |
| Susan | Regional SA (body says "inner-east pocket"), 3 bed 1 bath 1 car | 2025 | $902,000 | $990,000 | $88,000 | downsize closer to family, 4 weeks, saving $77,000 | regional addition to portfolio, 4.2% initial yield, $750 pw | p76 both |
| Ollie | Regional SA, 3 bed 1 bath 1 car | 2025 | $715,000 | $725,000 | $10,000 | lakeside dream, 3 weeks, saving $54,000 | waterside strategy, 3.2% initial yield, $650 pw | p79 both |

**What renders and what does not.** The figures both decks print are Tier 1:
attributable to a first name, dated, and agreed by two documents. The framing
is contested and therefore Tier 3. So the three Adelaide cards carry the
year, price, 2026 value and equity, plus one fact both decks share for each
(Karl's "first purchase", Peter's "without flying down once", Li's location),
and the segment pill reads `[Home or investment]`. Nothing on a card says
home, investment, yield, rent, saving or time to purchase, because each of
those appears in only one deck. One client answer per record clears the pill.

This is a different treatment from the Melbourne third slot, which stays
bracketed entirely. The difference is deliberate: Melbourne needed a *home
buyer* record for residential intent, so the framing was the point of the
card. Adelaide's cards make no segment claim, so the uncontested figures can
stand on their own.

**Why these three.** Karl and Peter are the only two the decks place in
Adelaide itself; the others are "Regional, SA". Li has the strongest recent
figures of the regional three. Susan's record contradicts itself on location
and Ollie's equity is $10,000. Karl's quote, "We had one shot to get this
right. Propertybuyer made sure we did", is identical in both decks and names
no segment, so it is also the one usable Adelaide testimonial. Peter's quote
is identical in both decks too but contains a word on the banned list.

**Two figures worth a raised eyebrow, recorded rather than resolved.** Karl
and Peter carry the same 2026 value, $1,050,000, and the same 2026 rent, $700
a week, one year apart in purchase. Both decks agree, so it is not a
transcription error here, but it is the kind of thing the client should be
asked about alongside the framing question.

**Photographs** are the hero shots from the deck pages named above, extracted
by `tools/extract-deck-images.mjs` to `assets/img/adelaide-story-1..3.webp`.
Both decks carry the same photographs for the same record.

**Correction to an earlier row.** The 21 August investor table listed Peter
as "Regional SA". The deck header places him in Adelaide, SA; the text
extraction had put the header after the backstory. Corrected above.

## Perth, checked 8 September 2026

Zero records in any of the five decks, no WA person on the client's team
page, no Perth office, and `/location/perth` returns 404. See
`locations/perth/BLOCKED.md`. The Perth artboard in Paper was updated to the
variant with brackets where a person and a purchase would go, and no proof
card exists on it.

## Not hunted, per the claims register

Off-market percentages (competitors quote 69 and 70), the purchase-rate
denominator, award badge imagery.
