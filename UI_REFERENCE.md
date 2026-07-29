# UI Reference — Design System

The canonical design system for this project. Derived **directly** from the reference
screenshots supplied by the user (the "Square Card" fintech site — desktop, mobile,
and full-page views). Nothing in this file is invented taste; every token, radius,
and pattern below is read off those screenshots.

**Read this before writing or changing any CSS, choosing a color, or designing a
component.** Companion file: [`ui-reference.html`](ui-reference.html) — a working
specimen that renders the entire system. **The HTML is the authority.** Where this
prose and the rendered page disagree, match the page.

---

## 1. Tokens

Copy these verbatim. Do not substitute, do not "warm them up", do not add a third accent.

```css
:root{
  /* surfaces */
  --bg:          #EAE8EF;   /* page canvas — cool lavender-grey, NOT beige */
  --white:       #FFFFFF;   /* cards, full-bleed light sections */
  --tint:        #F5F4F8;   /* inset / active-state panel inside a white card */

  /* ink */
  --black:       #000000;   /* headings, nav, footer, primary text — pure black */
  --body:        #8E8B96;   /* body copy on light surfaces */
  --body-2:      #6F6C79;   /* slightly stronger body copy */
  --foot-body:   #A9A5B4;   /* body copy on the black footer */

  /* accents — exactly two */
  --lime:        #D2F53C;   /* primary: CTA fill, number badges, knobs, arrows */
  --violet:      #A78BFA;   /* secondary: mosaic squares, emphasised words, linework */
  --violet-deep: #7C4DFF;   /* violet at full strength: filled dots, social badge */

  /* lines */
  --line:        #E5E3EB;   /* hairline borders */
  --dot:         #C7C4D1;   /* dotted / dashed stroke grey */

  /* radii */
  --r-card:      24px;      /* standard card */
  --r-lg:        34px;      /* large container */
  --r-pill:      999px;     /* buttons, chips, toggles */
}
```

**Accent discipline.** Lime is the *only* color used for filled call-to-action
surfaces. Violet never fills a large area — it appears as small squares, thin
strokes, emphasised words, and small dots. Everything else is black, white, lavender,
or grey. There is no third accent and no gradient between accents anywhere in the
system except inside illustration shapes.

## 2. Typography

**One family for the entire page.** The reference uses a Helvetica-Now-class
grotesque; **Inter** is the substitute used here (closest match available on Google
Fonts). There is **no monospace font anywhere in this system** — drop mono entirely.

| Role | Size | Weight | Tracking | Line-height | Color |
|---|---|---|---|---|---|
| Hero headline | `clamp(40px,6.2vw,68px)` | 700 | `-0.03em` | 1.06 | `--black` |
| Section heading | `clamp(28px,3.6vw,42px)` | 700 | `-0.02em` | 1.16 | `--black` |
| Card title | 17px | 600 | `-0.01em` | 1.35 | `--black` |
| Body copy | 13.5px | 400 | 0 | 1.75 | `--body` |
| Nav / button | 14px | 500 / 600 | 0 | 1 | `--black` |

**Title Case is a hard rule.** Headings *and* body copy are written in Title Case —
"This Modern Bank Card Embraces The Era Of Contactless Payments". This is the single
most recognisable signature of the system. Sentence case reads as a different design.

Emphasis inside a heading is done by coloring the word `--violet` — never by italics,
never by a gradient fill, never by a highlight background.

## 3. Layout

- Content width `1160px`, gutter `28px`.
- Section padding `76px` vertical.
- Cards sit **flat on the canvas** — a white fill on `--bg` is enough separation. No
  drop shadows. A `1px --line` border only where two white surfaces meet.
- Generous internal padding: `40–48px` inside a large white card, `26px` inside a
  small one.
- Big radii everywhere: `24px` on cards, `34px` on large containers, full pill on
  anything interactive.
- Grids are **equal-weight** — four features across, three cards across. The third
  card in a carousel row is deliberately **clipped by the viewport edge** to signal
  horizontal scroll; do not fit it neatly.

## 4. Components

**Buttons.** Two variants only, both full pills with a trailing `↗` glyph:
- Primary — `--lime` fill, black text, no border.
- Secondary — black fill, white text.
- Outline (`Sign In` only) — white fill, `1px` black border, black text.

**Nav.** Logo mark (two black rectangles) + wordmark, left. Centered link row where
every link is prefixed by a small `•` dot; the active link and its dot are `--violet`.
Right side: a search glyph and the outlined `Sign In` pill. Nothing else.

**Carousel arrows.** A white circular `←` and a wide `--lime` pill `→`, paired at the
right of the section heading.

**Inline toggle chip.** A white pill with a `1px` black border sitting *inside* an
`h2` line (`From 2020` + a small black switch). Used to qualify a heading.

**Numbered list.** `26px` `--lime` circles with black numerals, black label text, laid
out in two columns. Paired with an illustration on the opposite side — never one icon
per row.

**Footer.** Full-bleed pure black. Signature **double-arch notch** cut out of the top
centre, filled with the color of the section above. Three columns: brand + description,
`Quick Access` links in two sub-columns, newsletter capture. A `Contact Us :` row of
small circular social badges — the first is `--violet-deep` filled, the rest near-black.
The bottom edge dissolves into a **checkerboard strip** of background-colored squares,
one and two cells tall, in an irregular pattern. Copyright sits centred on `--bg` below
the black.

## 5. Illustration

All illustration is **flat vector built from primitives** — squares, circles, dotted
strokes, thin outlines. No 3D, no photography, no raster art, no icon fonts, no emoji.

Four recipes carry the whole system:

1. **Pixel-mosaic dissolve** — a solid black rounded rect, tilted ~12°, whose lower
   half is overlaid with a grid of `17px` violet and lime squares that grows denser
   downward until the black itself breaks into squares and scatters off the bottom.
   Lime rounded rects peek out from behind the right edge. Detached squares float
   nearby, joined by dotted elbow lines ending in tiny squares.
2. **Orbit / particle field** — a solid black disc holding a cluster of small lime and
   violet circles, wrapped on the left by three concentric arcs of evenly spaced black
   dots, with dotted rays firing off to the right that terminate in filled and hollow
   circles.
3. **Thin-line feature icons** — overlapping outlined circles, dashed toggle rows with
   one lime knob, nested rings, dotted branch trees. Grey linework with violet as the
   single highlight and lime reserved for the one "on" element.
4. **Gradient chiplets** — small rounded rects with a lime→violet gradient arranged in
   a ring, each carrying a tiny dot-grid glyph.

## 6. Not in this system

These appear nowhere in the reference. Their presence is the tell that a page has
drifted back into generic AI output:

1. Dark background with blurred radial gradient "glow blobs".
2. Glow / box-shadow halos on buttons, dots, or cards.
3. Pulsing, breathing, or floating idle animation with no user input behind it.
4. Glassmorphism — translucent blurred panels with a light border-glow.
5. Gradient-filled headline text.
6. Drop shadows used to lift every card off the background.
7. A monospace font.
8. Sentence case body copy.
9. A third accent color, or an accent-per-section.
10. Emoji, sparkles, or "AI"/"NEW" badges with no information content.
11. Icons rendered as a filled gradient circle repeated across a feature grid.
12. Stock photography or 3D renders.

## 7. Applying it to the research pages

The site is migrating from the dark theme in `pages/base.css` to this light system.
That migration has **not** been done yet — `base.css` still describes the old pages and
violates items 1, 2, 3, 7, and 8 above.

When the rebuild happens, the research pages keep their information density but adopt
this system wholesale: lavender canvas, white content cards, pure-black headings in
Title Case, lime for the one accent, violet for emphasis and diagram linework. The
existing inline SVG signal-chain and spectra diagrams already match recipe 3 in spirit
and should be restyled to the palette rather than redrawn.
