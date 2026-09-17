# Copy deck, portfolio review page

Built 17 September 2026 from the Paper artboards "PORTFOLIO REVIEW · 1440 --
v2" and "PORTFOLIO REVIEW · 390 -- v2 mobile", on the page named **Client
Approval** in file `01M26QSHXNKJ3CA52AQ4GRSW2F`. That artboard is the only
design for this page, at the design lead's direction of 17 September 2026.

This deck records what shipped rather than what was proposed. Every string
below is on the page. Counts are measured from the built HTML, not estimated,
against the budgets DESIGN.md sets: hero subhead 42, H1 and H2 60, H3 and card
headings 32, buttons 34, micro labels 20.

Source of the offer facts: the client's own guideline artboard in the same
file. Prices, inclusions, credit terms and the eight questions are theirs.

**Checks run by hand on 17 September 2026**, because the page is not in
`tools/check.mjs` yet (see `portfolioReviewNotInTheChecker` in
`shared/segments.json`): no em dashes, no exclamation marks, no banned words,
no banned CTA labels, no "advocate" in a heading or button. Australian English
throughout. Rendered at 390, 768, 1100 and 1440 with no horizontal scroll, no
clipped text and no tap target under 44.

## The one budget exception

| String | Count |
|---|---|
| H1: Is your portfolio actually performing, or just sitting there? | **61/60 OVER** |

The client's own line, authored on the artboard in three lines. It is one
character over and sits on the same footing as the investor H1, which the
client took to 68 on 28 August 2026. It is set at 44 rather than the family's
52 for a separate reason, recorded as `portfolioReviewHeroH1Size`.

## Corrections made to the artboard strings

Five, all mechanical. Nothing was rewritten.

| Artboard | Page | Why |
|---|---|---|
| Pay for signficant value | Pay for significant value | typo |
| Hold or sell verdict indiscated(but locked) | Hold or sell verdict indicated, but locked | typo |
| one free page to a full portfolio verdict | One free page to a full portfolio verdict | sentence case |
| the page with / An honest rating | The page with / an honest rating | sentence case |
| Published prices. / a Rarity in this industry. | Published prices. / A rarity in this industry. | sentence case |

Proyale renders H1 and H2 as capitals either way, so none of the three case
corrections changes what a visitor sees.

**All five were written back into the Paper file on 17 September 2026**, on
both the 1440 and the 390 artboards, along with the restored rating sentence,
the compare table row and the bracketed telephone number. The artboard and the
build now carry the same words, so this table is a record of what was corrected
rather than a list of differences that still exist. Anyone reading the artboard
is reading what ships.

**Two strings were deliberately left as the artboard wrote them, and both want
the client's eye.** "Then invest for unreal value for your portfolio." on the
teal panel is a superlative with nothing behind it and reads unlike the rest of
the page. And the compare table's "not included" mark is a 14px hairline that
reads as an em dash, though no em dash character appears in the copy.

## site-header

| String | Count / budget |
|---|---|
| 25 Years Property Experience | display line |
| Call 1300 655 615 | 17/34. **Filled 17 Sep 2026**, supplied by the design lead. The first real telephone number in this repository: it had been bracketed on every page since 17 Aug 2026. The action is now a real `tel:1300655615` link rather than a jump to the form, on both the desktop button and the mobile call icon, which is what the standing note on five pages said to do once a number arrived |

## hero

| String | Count / budget |
|---|---|
| Pill: Best Buyers Agency of the Year 2026 | pill |
| H1: Is your portfolio / actually performing, / or just sitting there? | 61/60, see above. Three authored lines, Proyale 44 |
| Subhead: A bank tells you what it is worth. | 34/42 |
| Body: Your growth and yield scored against the suburb, and an honest hold or sell verdict on every property you own. | body |
| Button: Get free Prop. Health Check | 27/34 |
| Chart, decorative: Your Property Value · 1.8M · Jan to Jun | hidden from assistive tech. No figure on it is a claim |

### The sample scorecard, hero right

Labelled **SAMPLE**. Every figure is the client's own specimen for 12 Sample
Street. It is a designed illustration of the free page, not a real report.

| String |
|---|
| Free Property Health Check · 12 Sample Street, Blacktown NSW 2148 |
| Estimated value range · $980,000 to $1,080,000 |
| Growth against the suburb, per year · 5.2% vs 5.8% |
| Gross yield against the suburb · 3.1% vs 3.4% |
| Useable equity at 80% · $414,000 |
| Overall rating · amber dot · Solid, but lagging its suburb |
| Verdict, taped over: Hold, and release equity against it |
| Hold or sell verdict. Included in the Property Portfolio Review. |
| Button: Get your free property check | 28/34 |

The taped-over line uses the shared `.redacted` class, revived here after
going dormant on 31 August 2026. The amber dot is this page's first product
use of the semantic ramp DESIGN.md flags as invented; see
`portfolioReviewRagColours`.

## proof-line and the independence claim

| String |
|---|
| Australia's most awarded buyer agents. Eight award badges follow, decorative, with the awards listed once in a hidden list for assistive tech and for search |
| We act for buyers only and never sell property, so the verdict on your portfolio has no listing interest behind it. |
| Founded in 2001 by Rich Harvey, Masters in Economics and President of REBAA for four years. 5,000+ properties purchased since. |

## how it works

| String | Count / budget |
|---|---|
| H2: One free page to a full portfolio verdict | 41/60 |
| Intro: Start free, and upgrade only if the first page earns it. | intro |
| H3: Free Property Health Check | 26/32 |
| Body: Within 24 to 48 hours you get a one-page scorecard: value range, growth and yield scored against the suburb, useable equity, and an overall rating with the reason behind it, signed by a person. A 20-minute call is included. | body. **Changed 17 Sep 2026**, see below |

**The rating was restored to this card on 17 September 2026.** The artboard
reads "...useable equity, signed by a person", which has a fault: the colon
opens a list of what is on the scorecard and the list never closes, so
"signed by a person" reads as the fourth item and the sentence says the
equity is signed. An earlier draft ran "...useable equity, and a red, amber
or green rating, signed by a person", where the "and" closed the list and the
phrase attached to the page. Dropping the rating took the conjunction with it.

It also left the card silent on the free page's headline feature. The rating
is stated in the compare table, in the free pricing tier, on the hero
specimen and in the section heading directly above these cards, which reads
"The page with an honest rating". The card introducing the Health Check was
the only place that did not carry it.

Restored as **"and an overall rating with the reason behind it"** rather than
by naming the colours, at the design lead's direction: say what the rating
signifies, not what colour it is. "Overall rating" is the artboard's own
label on the hero specimen, and the reason is the line beside it there
("Solid, but lagging its suburb"), so nothing is invented. The three states
are deliberately not named, because the artboard only evidences one of them
and labels for the other two would be invented.

The card moves from four lines to five and the row from 420px to 446px, which
also evens the three card bodies at 223, 205 and 190 characters against
174, 205 and 190 before.
| H3: Property Portfolio Review | 25/32 |
| Body: The full treatment for every property you own: a written hold or sell verdict on each, an interactive Excel dashboard, a complete written report, and a presentation call to walk you through every decision. | body |
| H3: Act on it and it pays for itself | 32/32 |
| Body: If the review points to buying and you engage us within 6 months, 100% of your review fee is credited against your buyer's agency fee. Then keep score with an Annual Re-Review at half price. | body |

Photographs `review-step-1`, `-2` and `-3.webp`, imported from the artboard.

## the honest rating band

| String | Count / budget |
|---|---|
| H2: The page with / an honest rating | 30/60 |
| Intro: The free Property Health Check covers one property and comes back as a single signed page. | intro |
| Button: Get free property health check | 30/34 |
| Note: Completely free. No sudden commitments. | small |

**On the free page**, pill "Start free", line "The Health Check shows you that
a verdict exists." Six items, each a bold title and a description:

| Title | Description |
|---|---|
| Estimated value | Value as a range, clearly labelled indicative |
| Property growth | Growth since your purchase against the suburb, over the exact period you have owned it |
| Rent & gross yield | Rent and gross yield against the suburb median |
| Your useable equity | Equity, LVR and useable equity at the 80 percent bank convention |
| Professional analyst insight | One insight from the analyst who reviewed it |
| 20 minute call included | A full 20 minute call with an expert |

**Behind the paywall**, pill "Pay for significant value", line "The Property
Portfolio Review is where you get that verdict." Six items, lock icons:

| Title | Description |
|---|---|
| Hold or sell verdict | The hold or sell verdict on every property, with the reasoning |
| Display every property | Every property beyond the first |
| Net values | Net yield and cashflow after all costs |
| Equity & cashflow insights | 5-year equity and cashflow projections |
| Suburb outlook | Supply, vacancy and forecast |
| See what your equity unlocks | Equity release and next-purchase modelling |

Closing panel, on teal: **Start with a free page.** / Then invest for unreal
value for your portfolio. Button "Start with free page" 20/34, note "Free & no
sudden commitments."

## published prices

| String | Count / budget |
|---|---|
| H2: Published prices. / A rarity in this industry. | 44/60 |
| Intro: Priced per property, so you know the number before you talk to anyone. | intro |
| Pill: All prices include GST | pill |

| Tier | Price | Terms | Button |
|---|---|---|---|
| Free Property Health Check | $0 | One property, one page. Zero hidden fees. | Start with the free page, 24/34 |
| Property Portfolio Review | $1,500 | First property. Then $500 for each additional property, up to 5. | Book your review, 16/34 |
| Premium Portfolio Review | From $4,500 | Typically $4,500 to $7,500. Covers 6 to 20 properties. | Request a fixed quote, 21/34 |

Free tier list: Value range, growth and yield scored against the suburb ·
Ratings signed by a person · Hold or sell verdict indicated, but locked ·
Delivered within 24 to 48 hours · 20-minute call included.

Review tier list: Written hold or sell verdict on every property · Interactive
Excel dashboard, yours to keep · Full written report with suburb research ·
5-year projections and equity modelling · Presentation call with your analyst ·
100% credited if you buy with us within 6 months.

Premium tier list: Everything in the Property Portfolio Review · Entity and
lending structure map · Sell-order sequencing and land tax by state · Senior
adviser presentation, two calls · Fixed quote within 24 hours.

Two rules beneath: **The rule is simple.** $1,500 for the first property and
$500 for each additional property, up to 5. From 6 properties, a fixed quote
within 24 hours. And **Annual Re-Review at half price**, 50% of the standard
Property Portfolio Review price for your portfolio as it stands.

## compare

| String | Count / budget |
|---|---|
| H2: What each level includes | 24/60 |

Twelve rows, three columns. Built as a real `<table>` with column and row
headers, so the columns are announced rather than read as loose rows.

| Row | Free | Review | Premium |
|---|---|---|---|
| Estimated value range and useable equity | yes | yes | yes |
| Growth and yield scored against the suburb | yes | yes | yes |
| Overall rating with the reason behind it | yes | yes | yes |
| Properties covered | 1 | Up to 5 | 6 to 20 |
| Written hold or sell verdict with reasoning | no | yes | yes |
| Interactive Excel dashboard | no | yes | yes |
| Full written report with suburb research | no | yes | yes |
| 5-year equity and cashflow projections | no | yes | yes |
| 100% credit if you buy with us within 6 months | no | yes | yes |
| Entity and lending structure map, sell-order sequencing | no | no | yes |
| Senior adviser presentation | no | no | Two calls |
| Analyst call | 20 minutes | Presentation call | Two calls |

## the record behind the verdict

| String | Count / budget |
|---|---|
| H2: The record behind the verdict | 29/60 |
| Intro: Three purchases from our published investor stories, with the same measures we score your property against: what it cost, what it yields, and what it is worth today. | intro |

The three cards are the investor page's three Tier 1 records, traced in
`paper/proof-register.md`, with the same photographs: `investor-story-1`, `-2`
and `-3.webp`. Nothing new is claimed.

| Card | Figures |
|---|---|
| First investment · Inner West, Sydney · Mathew | $580K bought 2007 · 6.0% initial yield · $2.02M value today |
| Portfolio addition · House in Melbourne · Wendy | $1.175M bought 2024 · 5.0% · $1.4M |
| Interstate · House in Brisbane · Pui Kwan and Janis | $1.23M bought 2023 · 4.6% · $1.75M |

## scale and reviews

Family component, unchanged from the four segment pages: 5,000+ properties
purchased, 50+ industry awards, 4.9 star google reviews, the Sydney, Melbourne
and Brisbane rating rows, and the review pill. H2 "Reviewed by buyers only,
since 2001." 36/60. Button "Book a free consultation" 24/34, note "No
obligation. No upfront fees. Just a conversation." Review counts verify at
publish, as everywhere.

## common questions

| String | Count / budget |
|---|---|
| H2: Common questions | 16/60 |
| Intro: Every answer describes the service. Nothing here advises on what a property will return. | intro |

Eight questions, all the client's. **Only the first carries an answer on the
artboard.** The other seven ship bracketed, under the rule that an unfilled
value ships visibly unfilled rather than as plausible copy.

| Q | A |
|---|---|
| Is the estimated value a valuation? | No. The estimated value is an indicative range from licensed data providers, not a formal valuation, and it is labelled that way on the page. What the page adds is the judgement: how the property has performed against its suburb, and what that means for you. |
| Why is the Health Check limited to one property? | [Answer to be supplied by the client.] |
| Who does the analysis? | [Answer to be supplied by the client, including the analyst name and credentials.] |
| How does the 100 percent credit work? | [Answer to be supplied by the client.] |
| What if you tell me to sell? | [Answer to be supplied by the client.] |
| What do I get at the end of a paid review? | [Answer to be supplied by the client.] |
| Why pay when other firms review portfolios for free? | [Answer to be supplied by the client.] |
| What is the Annual Re-Review? | [Answer to be supplied by the client.] |

## the capture

| String | Count / budget |
|---|---|
| H2: Your free Property / Health Check | 31/60 |
| Body: Complete our form and our team will be back to you within 24 to 48 hours. | body |
| H3: What happens next | 17/32 |
| 1 Complete our form | step |
| 2 We call for the purchase price, loan and rent. | step |
| 3 A specialist scores it against its suburb and signs the page. | step |
| 4 Your one-page scorecard arrives within 24 to 48 hours, and you book your 20-minute call if you want it. | step |
| Note: One property, completely free. No obligation, and no sales pitch on the page. | small |
| Card title: Tell us about your property · Complete the form below. | title |
| Button: Get my free Property Health Check | 33/34 |
| Consent: By sending your details you agree to be contacted about your Health Check. Estimates are indicative and not a formal valuation. This is general information, not financial advice. | small |

Ten fields in one pass, as drawn: property address, property type, properties
you own, purchase price, year purchased, current loan balance, weekly rent,
your name, phone, email. All ten labels are within the 20 character micro
budget. **No segment chip row**, and the form is fixed to `data-segment`
`investor` with `data-form="portfolio-review"` beside it.

Step 2 of the What happens next list says the figures are taken on the call,
while the form also asks for them on the page. That is the artboard as drawn
and it is a real inconsistency for the client to settle. See
`portfolioReviewCaptureFromArtboard`.

## footer

Family footer. The legal slots stay bracketed: [Privacy policy] · [Terms] ·
[Licence numbers].

## still open

1. **Seven FAQ answers.** Bracketed, no client source.
2. **The analyst name and credentials**, inside the third answer.
3. ~~The telephone number in the header.~~ **Supplied 17 Sep 2026**, 1300 655
   615. It is still bracketed on the four segment pages and on the archived
   Melbourne page, which all carry a note to swap in a `tel:` link once a
   number exists. Those are client-reviewed pages and were left alone.
4. **Whether the purchase figures are taken on the page or on the call.** The
   form asks on the page; the What happens next list says on the call. One of
   the two has to move.
5. **The segment a review lead carries.** Investor is assumed.
6. **A HubSpot property for "properties you own"** (1, 2 to 5, 6 to 20, more).
7. **Red, amber and green** use the success, warning and error text tokens,
   which DESIGN.md flags as an invented ramp. This page is their first product
   use, on the sample scorecard only.
8. **"Then invest for unreal value for your portfolio."** An unsupported
   superlative, left as the artboard wrote it.
9. **Registration in `tools/check.mjs`.** The page is not checked by machine.
