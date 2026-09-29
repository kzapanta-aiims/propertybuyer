# Transferring the theme tokens into Paper

Paper's MCP server is local only. Paper Desktop serves it at
`http://127.0.0.1:29979/mcp` while a file is open, and there is no hosted
endpoint.

**This is why a remote session cannot do the transfer.** `127.0.0.1` means
the machine the session is running on. In a session on the design lead's own
machine that is Paper Desktop; in a Claude Code session running in a cloud
container it is the container, where nothing is listening. Verified 13 August
2026:
connection refused from the container, and `paper.design` is blocked by the
egress proxy as well. The `paper-desktop` plugin being enabled does not change
this, because the plugin only supplies that same localhost address.

So the transfer runs from a machine with Paper Desktop open. Everything is
prepared here so that run is mechanical.

Target file: `https://app.paper.design/file/01KZW0Y27PGW3NV0QJRPXAJ9DZ/3-0`

## State of the repository

This file was written on a branch, before the layout changed. It now lives on
`main`, in the repository `propertybuyer`, whose root is the
client folder. Two things moved since it was drafted:

- The four segment pages sit under `New Builds/`. The home buyers page is
  **built**, at `New Builds/buyer/index.html`, and is the template the other
  three copy. `investor`, `commercial` and `developer` are briefs awaiting
  content.
- Everything shared sits at the repository root: `paper/`, `assets/`,
  `shared/`, `tools/`, `DESIGN.md`, `HANDOVER.md`.

Paths in this file are root relative and current. Read `README.md` for the
full layout before starting.

## Setup on the local machine

1. Open the target file in **Paper Desktop** (not the browser). Opening the
   file starts the MCP server automatically, and it stays up only while the
   file is open.
2. Start a local session in the repository, on `main`. The `paper-desktop`
   plugin is enabled at account level, so it should load with no further
   setup. Confirm the `paper` server is connected under `/mcp`.
3. Only if it is not listed, add it by hand:

   ```sh
   claude mcp add --transport http paper http://127.0.0.1:29979/mcp
   ```

   If that connects but immediately fails or falls back to an auth prompt,
   add it via JSON instead, with the Accept header Paper's transport
   requires (a known Claude Code issue, #42470):

   ```json
   {
     "mcpServers": {
       "paper": {
         "type": "http",
         "url": "http://127.0.0.1:29979/mcp",
         "headers": { "Accept": "application/json, text/event-stream" }
       }
     }
   }
   ```

## The task prompt for the local session

Paste this as-is:

> Transfer the Propertybuyer design tokens into the open Paper file's theme,
> then read the landing page context page. Do not build anything.
>
> 1. Read `paper/theme-tokens.css` in this repo. It is the verified snapshot
>    of the Figma Mapped collection. Create every variable in the `:root`
>    block as a token in the Paper file's theme, keeping the names exactly
>    as written. Do not invent, round, or add any value that is not in the
>    file. Carry the three flags in the file header into Paper as token
>    descriptions where Paper supports them, especially the conflict note on
>    `--bg-prestige`.
> 2. Author the tokens in the commented "mobile-390" block as a second theme
>    mode named `mobile-390`, changing only the five tokens listed there.
>    If Paper's mode support cannot express this, create the tokens in the
>    default mode only and report that the mobile values did not transfer.
> 3. Do not create the three tokens marked MISSING FROM MAPPED. They do not
>    exist in Figma and must not be authored downstream first.
> 4. Verify: read the theme back out of Paper and diff it against
>    `paper/theme-tokens.css`. Report any token that differs or failed.
> 5. Then read the context page at `/3-0` in this file. Extract everything it
>    says about the landing pages: strategy, and the different user types or
>    segments. Four pages are now in scope, so capture every segment it
>    covers, not the home buyer alone. The home buyer page is already built at
>    `New Builds/buyer/index.html`; the value here is what the page cannot yet
>    answer, and what the `investor`, `commercial` and `developer` briefs are
>    still missing. Write what you find, verbatim where it matters, to
>    `paper/context-segments.md` in this repo, commit it to `main` and push.
> 6. Do not build the landing page. Do not create frames or artboards beyond
>    what token creation requires.

## Why the values are trustworthy

Every value in `paper/theme-tokens.css` was read out of the Figma `2. Mapped`
collection on 13 August 2026 and recorded in `DESIGN.md`, which is the
audited snapshot. The standing rules apply to the transfer as much as to a
build: never invent a value, never soften a constraint, and on any conflict
Figma wins.
