# Image template generator

One page, three templates, for the client to make their own graphics. Built
12 Oct 2026 from the three reference images the client supplied and the Paper
frame "Background Image (Hero Row)" in the Paper file "Hero Image Generators"
(`01M4GD3ZJEPRSE4KD1Y3J7RW5J`).

Separate from the landing pages and the location pages. It shares nothing
with them except the logo files: no `tokens.css`, no `base.css`, no checker.

Live at `/image-generator/` on the Vercel project, so
`https://propertybuyer.vercel.app/image-generator/` once merged to `main`.
`?t=episode-cover` or `?t=newsletter-hero` opens a given template.

| Template | Size | Editable |
|---|---|---|
| Podcast card (cityscape) | 406 x 448, exports at 1x to 4x | episode number, duration, date, heading, featured name and position, avatar, background photo. The teal overlay is fixed and always sits over the photo |
| Episode cover | 2000 x 2000, exports at 1080, 1400, 2000, 3000 | heading, With name and position, And name and position, an optional third person, episode text, two or three cut-out photos placed freely on the card |
| Newsletter hero | 600 wide, height follows the heading | issue month (defaults to the current month and sets the date on the Market Update image), eyebrow, byline (", propertybuyer.com.au" is fixed), heading |

Every template exports as PNG, JPG, HTML and CSS, or Tailwind.

## Files

```
index.html          the page
generator.css       the tool's own interface. Never read by a template
js/templates.js     the three templates, every measurement in design pixels
js/render.js        one template tree to preview HTML, HTML + CSS, or Tailwind
js/cutout.js        background removal, in the browser
js/app.js           fields, preview, dragging, exports
img/                defaults: the cleaned Market Update artwork, the two
                    guest cut-outs, the avatar, the logos
```

## How it works

**One source, three outputs.** Each template is a function of its state that
returns a tree of elements with styles in design pixels. `render.js` converts
every pixel value to `cqw`, a percentage of the container's width, so:

- the preview is the same markup at any size;
- the PNG and JPG are drawn from that markup by modern-screenshot, so the
  export is the preview pixel for pixel, at whatever scale is chosen;
- the HTML + CSS and Tailwind exports are that markup again, and scale to the
  width of whatever holds them, like an image, with the text still live.

**Background removal runs on the visitor's machine.** MODNet, a portrait
matting model, through Transformers.js. The first photo downloads the model,
about 25 MB, from the Hugging Face CDN; after that the browser has it cached.
WebGPU where the browser offers it, WebAssembly otherwise, about five seconds
a photo on a laptop CPU. Nothing is uploaded anywhere and nothing is charged.
A PNG that already has a transparent background skips the model.

**Nothing to host but static files.** The libraries load from jsDelivr at
pinned versions and the fonts from Google Fonts:

| Dependency | Version | Licence | Used for |
|---|---|---|---|
| `@huggingface/transformers` | 3.8.1 | Apache 2.0 | runs the model |
| `Xenova/modnet` | | Apache 2.0 | the matting model |
| `modern-screenshot` | 4.7.0 | MIT | PNG and JPG export |
| `fflate` | 0.8.2 | MIT | the code .zip |
| `@tailwindcss/browser` | 4.1.18 | MIT | only inside the Tailwind .zip demo page |
| Geist, Cormorant Garamond | | OFL | type |

## Type

Geist throughout, including the headings on the two podcast templates. The
first build set those headings in Montserrat to match the Gotham of the
reference; Kenn moved them to Geist on 12 Oct 2026. Geist sets about 7%
narrower than Gotham, so the headings were recalibrated: slightly larger,
lightly tracked, and the card heading's measure narrowed so it still breaks
after "Investors" like the reference.

The newsletter heading alone keeps the face of its reference, Cormorant
Garamond. It is one constant, `FONTS.headingSerif` in `js/templates.js`.

## Photo sizes

Every photo field shows the size to upload and what the current photo can do.

| Field | Frame | Recommended upload |
|---|---|---|
| Podcast background | 406 × 448 | 1624 × 1792 px, the frame at the 4x download |
| Podcast avatar | 60 × 60 | 240 × 240 px |
| Episode cover people | card area 1902 × 1117 | portrait, at least 1600 px tall, for the 3000 download |

Below the recommendation, a live line reports the current photo's pixel size
and the largest download it stays sharp at, accounting for zoom on the
podcast photos and for the size each person is drawn at on the cover. It turns
amber when the photo will soften at the larger download sizes.

Two faces in the Paper file were ruled out for the headings:

- **Roxale Story** has no question mark, and every reference heading ends in
  one. It is also a commercial face (ReyreyBlue) with no web licence on file.
- **Proyale** is capitals only, see `assets/fonts/README.md`, and would set
  every heading in capitals.

## Calibration

Positions and sizes were measured off the references, not estimated: each
template was rendered at its design size and its text rows compared with the
reference image by pixel scan. The podcast card and the episode cover land
within two pixels of the reference on every text row. The newsletter heading
matches its reference to the pixel. Text widths differ by a few percent where
Geist replaces Gotham, which is narrower; size and letter spacing take up most
of it.

## Assets and where they came from

- `newsletter-market-update.webp` is the Paper frame's image with the baked
  "August 2026" painted out, so the date can be live text set from the issue
  month. The rest of the artwork is untouched.
- `episode-guest.webp` and `episode-host.webp` were keyed off the episode
  cover reference. The host is cut straight down his right side, where the
  guest overlaps him in the reference.
- `podcast-avatar.webp` is a crop of the guest from the same reference.
- The default podcast background is a Sydney skyline from Unsplash
  (photo by Lena Sifoo, Unsplash licence), loaded from Unsplash's CDN. The
  reference photo had the card text baked into it, so it could not be reused.
  The client is expected to upload their own each episode.

## Known limits

- Uploaded photos are not saved between visits; text is, in the browser.
- Background removal is tuned for people. A photo with more than one person,
  or a busy background the colour of the subject, may need a pre-cut PNG.
- Very old browsers without container query units (before 2023) will not lay
  out the code export correctly. The images are unaffected.
