# Perth is blocked, and here is exactly what is missing

Written 8 September 2026, per `../PLAN.md` phase 6: before building Perth,
check whether the client has supplied a named person who buys in Perth and at
least one Perth purchase. Neither is recorded, so the HTML page is not built.

## What was checked

- **All five client decks**, now committed in `paper/decks/`: Legacy
  Homebuyer (80 pages), Legacy Investor (80), July 2026 Homebuyers (88), July
  2026 Investors (89), Commercial (14). Cities covered: Sydney, Melbourne,
  Brisbane, Adelaide, Gold Coast, regional NSW, VIC, QLD and SA, and one
  Hobart record. **Zero Perth or Western Australian records.**

  Checked twice, 8 Sep 2026: once by reading every page header, then again by
  text search across all five files for three patterns. `P E R T H` catches
  the letter-spaced city header, `, W A` catches the state code and so would
  find a record headed "Regional, WA" as well, and `Perth` catches any
  mention in the backstory prose. Fifteen searches, zero matches.

  Two controls prove a zero is a real zero rather than a failed search:
  `A D E L A I D E` returns two hits in the Legacy homebuyer deck and
  `H O B A R T` returns one in the July investor deck. The Adelaide control
  also explains why it is two and not five: three of the five South
  Australian records are headed "Regional, SA", so Karl and Peter are the
  only two in Adelaide proper.
- **The client's team page**, `propertybuyer.com.au/about/our-team`. Every
  person is placed in NSW, VIC, QLD or SA, or "Australia-wide". Nobody is
  placed in Perth or WA. **This reading was wrong, corrected 8 Sep 2026 by
  the client lead: Propertybuyer has agents for each location, Perth
  included. They are simply not on the public page, or not placed there.
  The Perth page keeps its team section. See `perthHasATeamSection` in
  `shared/locations.json`.** What is still needed is their names, which is
  item 1 below.
- **The client's office list**, recorded in `paper/commercial-copy.md` and
  `paper/investor-copy.md` and repeated in the site footer: Sydney, Bondi
  Junction, Forestville, Erina, Newcastle, Prahran, Brisbane, Surfers
  Paradise, Maroochydore, Adelaide, Goodwood Island, Redlands. No Perth.
- **`/location/perth`** returns 404. There is no live page and nothing to
  preserve.

## What unblocks it

1. **The Perth agents, by name.** Titles, the areas each covers, the one
   credential line per card, and photographs. The team section is on the
   artboard but still carries the Adelaide names it was copied from. This
   also fills the third "How we buy in Perth" card, the FAQ answer and the
   `[named agent]` bracket.
2. **One Perth purchase** with a month, year, price and client first name,
   in the same shape as the decks. Fills the card's stats. Still zero across
   all five decks, so this is the hardest of the three.
3. **Which office runs Perth briefs**, if any brief is run from elsewhere.
   Fills the two remaining `[nearest office]` brackets, and may fall away
   once the Perth agents are named.

With all three, phase 6 builds the page from the Melbourne template as
described in `COPY.md`. Item 1 is the one that moves most: naming the agents
turns Perth from a page with no local presence into a page with a team and no
published purchase, which is a much smaller gap.

## What exists anyway

The Paper artboard "PERTH· 1440" was updated on 8 September 2026 to the
variant, with the gaps shown as brackets, so the client can see the honest
version of the page and what it is waiting on. `COPY.md` records it.
