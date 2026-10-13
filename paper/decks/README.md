# Client success-story decks

The client's published purchase records, committed here on 8 September 2026
at the client lead's direction so the source of every Tier 1 proof point
travels with the repository. Until then the decks were gitignored working
files under `.deck-src/`; `tools/extract-deck-images.mjs` now reads this
folder first and falls back to `.deck-src/`.

Every figure in `paper/proof-register.md` traces to a page in one of these.
Nothing is derived from them: prices, years, values, yields and client first
names are copied as printed.

| Deck | Pages | Cities, in page order | Record shape |
|---|---|---|---|
| `Legacy All Homebuyer.pdf` | 80 | Sydney p3 to 27, Melbourne p29 to 53, Brisbane p55 to 74, **Adelaide p76 to 80** | Purchase year and price, client savings, 2026 current value, equity created, 2026 rent, time to purchase |
| `Legacy All Investor.pdf` | 80 | Sydney p3 to 27, Melbourne p29 to 53, Brisbane p55 to 74, **Adelaide p76 to 80** | Purchase year and price, equity created, 2026 current value, initial yield, 2026 rent, current yield on purchase price |
| `July 2026 Recent Purchases - All Homebuyers.pdf` | 88 | Sydney p3 to 23, Melbourne p26 to 50, Brisbane p53 to 88 | Month and year, purchase price, client savings, appraisal price, time to purchase |
| `July 2026 Recent Purchases - All Investors.pdf` | 89 | Over $750k: Sydney p3 to 19, Melbourne p21 to 29, Brisbane p31 to 48. Under $750k: Sydney p51 to 52, Melbourne p54 to 65, Brisbane p67 to 87, Hobart p89 | Month and year, purchase price, current rent, appraisal price, rental yield |
| `Latest Recent Purchases - Commercial.pdf` | 14 | Melbourne, Sydney, Gold Coast, Brisbane, mixed | Month and year, purchase price, savings or annual rent, appraisal, yield, price per sqm, lease term |

## Three things to know before selecting a record

**No deck holds a Perth record.** Zero across all five, checked twice on
8 September 2026: every page header read, then fifteen text searches across
the five files for `P E R T H`, `, W A` and `Perth`, with `A D E L A I D E`
and `H O B A R T` as controls to prove the search finds what is there. This is
the finding that keeps `locations/perth/BLOCKED.md` in place, and it is the
one Perth blocker no repository work can clear.

**The July 2026 decks hold no Adelaide records either.** Only the two Legacy
decks do, five each, and they are the same five purchases. So the Adelaide
proof on `locations/adelaide/` comes from the Legacy decks, not the July ones.

**The decks re-narrate one purchase per audience.** The same purchase appears
in the homebuyer deck as a home and in the investor deck as an investment,
with identical figures and a different backstory. This was first seen on
21 August 2026 with three buyer page records and is now systematic: all five
Adelaide records appear in both Legacy decks, and the July 2026 decks do the
same thing (Mark and Christine, Katherine, Brendan and Audrey, Arin and
Jaydn, Ainslie, Frances and Ben, Sridevi all appear in both July decks with
identical figures). Treat the figures as Tier 1 and the framing as contested
until the client says which story is the true one for a given record. The
full argument is in `paper/proof-register.md` under "Deck overlap".

## Duplicates not committed

`Legacy All Investor (1).pdf`, `July 2026 Recent Purchases - All Investors
(1).pdf` and `Latest Recent Purchases - Commercial (1).pdf` in the client
lead's downloads are byte-identical to the files here (SHA-1 checked
8 September 2026). Only one copy of each is kept.
