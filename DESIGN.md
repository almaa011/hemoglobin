---
name: Research Index
description: Local research documentation on biomedical electronics — lavender-grey canvas, flat white cards, exactly two accents.
colors:
  bg: "#EAE8EF"
  white: "#FFFFFF"
  tint: "#F5F4F8"
  black: "#000000"
  body: "#8E8B96"
  body-2: "#6F6C79"
  foot-body: "#A9A5B4"
  lime: "#D2F53C"
  violet: "#A78BFA"
  violet-deep: "#7C4DFF"
  line: "#E5E3EB"
  dot: "#C7C4D1"
  warn-text: "#CFCBD6"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(38px, 4.9vw, 60px)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(28px, 3.6vw, 42px)"
    fontWeight: 700
    lineHeight: 1.16
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "21px"
    fontWeight: 600
    lineHeight: 1.6
    letterSpacing: "-0.02em"
  card-title:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  tile-title:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "14.5px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.01em"
  body-lg:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: "normal"
  caption:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  micro:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "12.5px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.01em"
  citation:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "normal"
  numeral:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.88em"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  tick: "2px"
  chip: "5px"
  callout: "16px"
  spec: "18px"
  tile: "20px"
  card: "24px"
  lg: "34px"
  pill: "999px"
spacing:
  gutter: "28px"
  section-y: "72px"
  section-y-mobile: "52px"
  card-lg-pad: "48px"
  card-pad: "32px 30px"
  panel-pad: "28px"
components:
  button-primary:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.black}"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
  button-dark:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "14px 26px"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.black}"
    rounded: "{rounded.pill}"
    padding: "10px 22px"
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "32px 30px"
  panel:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "28px"
  spec-card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.spec}"
    padding: "22px"
---

# Design System: Research Index

## Overview

**Creative North Star: "The Fintech-Grade Lab Notebook"**

This system borrows the flat, confident, primary-color-driven language of a
consumer fintech marketing site and repoints it at hardware documentation. The
canvas is a cool lavender-grey, never beige or dark; surfaces are flat white
cards with no shadow, lifted only by color and radius. Two accents carry the
entire system — lime for the one active/primary element on a surface, violet
for secondary emphasis and linework — and nothing else is ever added.

The content is dense and technical (datasheets, extinction coefficients,
register values), but the shell around it stays light, spacious, and
confident rather than "engineering-tool dark mode." Confirmed visual
rejections: no dark background, no glow, no glassmorphism, no drop shadow,
no gradient text, no emoji, no third accent, no second font family.

**Key Characteristics:**
- Lavender-grey canvas with flat white cards, zero elevation shadows
- Exactly two accents: lime (primary/active) and violet (secondary/emphasis)
- Single sans family (Inter) in Title Case throughout, headings and body alike
- Illustration built only from squares, circles, and dotted strokes
- Motion only in direct response to scroll or input — nothing idle

## Colors

The palette is a small closed set: one canvas neutral, one ink scale, and
exactly two accents. Every other value in the system derives from these.

### Primary
- **Citrus Lime** (`#D2F53C`): the one "on"/active fill per surface — CTA
  buttons, number badges (`.num b`), the read-progress bar, the lime rule on
  `.callout`. Never used for large background fills or body text.

### Secondary
- **Soft Violet** (`#A78BFA`): emphasis and linework — `<em>` inside headings,
  the `.eyebrow` label and its leading dot, the `.note` accent rule, active
  nav-link state. Small doses only: dots, thin rules, single words.
- **Violet Deep** (`#7C4DFF`): violet at full strength — `.tbl .good` cells,
  reference-list link color. Reserve for text/links, not fills.

### Neutral
- **Lavender Canvas** (`#EAE8EF`): the page background (`--bg`) — cool
  lavender-grey, deliberately not beige or dark.
- **White** (`#FFFFFF`): every card, panel, and table surface.
- **Tint** (`#F5F4F8`): inset panel inside a white card (currently used for
  `code`/`.mono` backgrounds).
- **Pure Black** (`#000000`): all headings, nav, footer background, primary
  ink. Never softened to a near-black gray.
- **Body Grey 2** (`#6F6C79`): the system's one body-text grey — `.lead`, `.mut`,
  table body cells, panel captions, back-links, references. Chosen over Body
  Grey specifically because it clears WCAG AA (4.22:1 on the canvas; Body Grey
  measures 2.75:1 and fails).
- **Body Grey** (`#8E8B96`): kept in the palette for large-scale or decorative
  use only (AA's 3:1 "large text" threshold) — not used for any current body,
  caption, or label text after the accessibility fix above.
- **Footer Grey** (`#A9A5B4`): body copy on the black footer only.
- **Warn Text** (`#CFCBD6`): body copy inside `.warn-note` only — deliberately
  brighter than Footer Grey, since a hard-limit warning needs more contrast
  and urgency on black than routine footer boilerplate.
- **Hairline** (`#E5E3EB`) / **Dot Grey** (`#C7C4D1`): borders and dotted /
  dashed strokes, including the `.eyebrow` numeral color.

### Named Rules
**The Two-Accent Rule.** Lime and violet are the entire accent palette. No
page, section, or component introduces a third color for emphasis — not even
a "just this once" tint. This is a closed system, not a per-page choice.

**The Lime-Is-Singular Rule.** Only one element per surface gets the lime
fill — the CTA, the active badge, the one "on" state in an illustration.
Lime repeated across every item in a list or grid is a misuse of the token,
not the intended pattern.

## Typography

**Display / Body Font:** Inter (with `system-ui, -apple-system, sans-serif`
fallback) — the single family for every page, headings and body alike.
**Code Font:** JetBrains Mono — permitted in exactly one context: `<code>` /
`.mono`, for literal machine text (register values, pin names). It is banned
everywhere else, including labels, eyebrows, dates, and metadata.

**Character:** A single confident grotesque doing all the work — no serif
counterpart, no display/body split beyond size and weight.

### Hierarchy
- **Display** (700, `clamp(38px,4.9vw,60px)`, 1.06, `-0.03em`): page `<h1>` only.
- **Headline** (700, `clamp(28px,3.6vw,42px)`, 1.16, `-0.02em`): `<h2>` section titles.
- **Title** (600, 21px, inherits body line-height 1.6, `-0.02em`): `<h3>` sub-heads.
- **Card Title** (600, 17px, 1.4, `-0.01em`): the `<h4>` heading inside a `.cards .card`. Documented in `UI_REFERENCE.md` §2 and read off `ui-reference.html`.
- **Tile Title** (600, 14.5px, 1.4): the `<h4>` inside a four-up `.feat` tile, and the `.num` label text — a tighter step used only inside dense grids.
- **Body Large** (400, 16px, 1.8): `.lead`, wordmark, panel/reference-summary titles — one step up from Body for slightly heavier UI text.
- **Body** (400, 15px, 1.8): `<p>`, `<ul>`/`<ol>` text, color `--body-2`.
- **Label** (500–600, 14px, 1, `-0.01em`): nav links, buttons, `.eyebrow` text.
- **Caption** (400, 13px, 1.6): secondary/meta text on white surfaces — table headers, `.panel-sub`, `.spec-card .sl`, footer copy, reference-list body (`.srcbody`). Always paired with `--body` or `--body-2`, never used at a size below 13px for anything a reader must parse as prose.
- **Micro** (600, 12–12.5px, 1): the digit inside a `.num` badge, callout `.lbl` labels. Reserved for short numerals or short label-weight text, never sentences.
- **Citation** (600, 11px, 1): `.ref` inline citation marks only — the single smallest text in the system, by design subtle enough not to interrupt reading flow.
- **Numeral** (700, 26px, 1.1, `-0.03em`): the big number in `.stat .v` / `.spec-card .sv` — one deliberate display-weight step for a headline metric inside a small card, distinct from the page-level Display role.

### Named Rules
**The Title Case Rule.** Headings and body copy are written in Title Case —
"This Modern Bank Card Embraces The Era Of Contactless Payments" — not
sentence case. This is the system's single most recognizable signature; a
polish pass that "corrects" it to sentence case is reverting the design, not
improving it.

**The One-Emphasis-Method Rule.** Emphasis inside a heading is done by
coloring the word `--violet` via `<em>` — never italics, never a gradient
fill, never a highlight background.

## Layout

Content width caps at `1160px` (`.wrap`) or `860px` for prose-heavy pages
(`.wrap-narrow`), with a `28px` gutter at every breakpoint. Section vertical
padding is `72px`, dropping to `52px` under `900px` viewport width. Below
`900px`, the nav's link row hides, the footer grid and numbered-list grid
collapse from multi-column to a single column, and `.bigcard` padding tightens
from `48px` to `32px 24px`.

Cards sit flat on the lavender canvas — a white fill against `--bg` is the
only separation used; there is no drop shadow anywhere in the system.

## Elevation & Depth

**The Flat-By-Default Rule.** This system has no shadow vocabulary at all —
depth is conveyed entirely through the white-card-on-lavender-canvas contrast
and generous radius, never through `box-shadow`. A polish or audit pass must
not introduce shadows to "lift" cards; the absence of shadow is the intended
elevation model, confirmed in `UI_REFERENCE.md` §6 ("drop shadows used to lift
every card off the background" is explicitly listed as *not* in this system).

## Shapes

Radii are large and consistent: `24px` on standard cards and panels
(`--r-card`), `34px` on large containers (`--r-lg`), and a full pill
(`999px`) on every button, chip, and toggle. Callout boxes (`.note`,
`.callout`, `.warn-note`, `.conflict`) use a smaller `16px` radius plus a
`3px` colored left rule that carries their semantic meaning (violet = key
finding, lime = formula/note, black = hard limit or researcher conflict).
Spec cards use an `18px` radius, and the four-up `.feat` tiles inside a
`.bigcard` use `20px` (read directly off `ui-reference.html`). Two smaller
decorative radii round out the
scale: `2px` (the tick-mark corners on the `.mark` logo bars and the
`.spec-card .sc` accent tick) and `5px` (the `code`/`.mono` chip background).
There is no sharp-cornered surface anywhere in the system.

## Components

### Buttons
- **Shape:** full pill (`999px` radius) on all three variants.
- **Primary** (`.btn-lime`): lime fill, black text, no border — the one CTA
  per view.
- **Secondary** (`.btn-dark`): black fill, white text.
- **Outline** (`.btn-out`): white fill, `1px` black border, black text —
  used for secondary navigation actions like "Design System".
- **Hover:** opacity drops to `.85` on all variants; no color shift, no shadow.

### Cards / Panels
- **Corner style:** `24px` (`.card`, `.panel`) or `34px` (`.bigcard`).
- **Background:** white only, on the lavender canvas.
- **Shadow strategy:** none — see Elevation & Depth.
- **Internal padding:** `32px 30px` standard, `48px` large, `28px` for
  diagram/figure panels.

### Callouts (Note / Callout / Warn-Note / Conflict)
- **Style:** `16px` radius, `3px` left rule colored by semantic role (violet
  = key finding, lime = formula/note, black = hard limit/warning or
  researcher conflict). `.warn-note` inverts to a black fill with lime label
  text instead of using the left-rule treatment.
- **Label:** 12.5px, weight 600, colored to match the rule.

### Tables
- **Style:** white background, `24px` radius, hairline row dividers
  (`1px --line`), no external border.
- **Semantic cells:** `.good` (violet-deep), `.bad` (black), `.warn`
  (body-2) — all bold weight, never a background-color fill on the cell.

### Navigation
- **Style:** logo mark (two black rectangles) + wordmark, left; link row
  with a small dot prefix per link (dot grey by default, violet + violet dot
  for the active link); outline "Design System" pill, right.
- **Mobile:** link row hides entirely under `900px` — no hamburger menu is
  part of the current system.

### Footer
- **Style:** full-bleed pure black, double-arch notch cut from the top
  center filled with the canvas color behind it, checkerboard strip
  dissolving the bottom edge into the lavender canvas. Three-column grid
  (brand, nav links) collapsing to one column under `900px`.

### Section Label (`.eyebrow`) — signature component
A small violet dot, a numeral (`01`, `02`, ...) in dot-grey, and a Title Case
label in violet, 13px/600 weight, opening every major section. This is a
deliberate, repeated system component — not the generic "tracked uppercase
eyebrow over every section" anti-pattern a detector might otherwise flag; it
is confirmed, load-bearing, and required by this project's own page template
(see `CLAUDE.md` → Page Design Conventions).

## Do's and Don'ts

### Do:
- **Do** keep every new page's `<style>` block scoped to layout tweaks and
  page-unique component classes only — never redefine `--lime`, `--violet`,
  or any other core token from `ui.css`.
- **Do** reuse the existing component vocabulary (`.card`, `.panel`,
  `.note`, `.callout`, `.warn-note`, `.conflict`, `.tbl`, `.spec-grid`,
  `.nums`, `.btn-lime/-dark/-out`) before inventing a new class name.
- **Do** keep the numbered `.eyebrow` label at the top of every major
  section — it is this system's Named Section Label, confirmed and required.
- **Do** keep the footer's double-arch notch and checkerboard strip exactly
  as built — it is the system's one signature flourish, not a template to
  simplify away.
- **Do** write headings and body copy in Title Case, including in generated
  or polished copy.

### Don't:
- **Don't** add a third accent color, a per-page accent, or a gradient
  between accents anywhere outside illustration shapes.
- **Don't** add drop shadows, glow halos, glassmorphism, or gradient-filled
  headline text — this system is flat by design (see Elevation & Depth).
- **Don't** add pulsing, breathing, or floating idle animation with no user
  input behind it — motion responds only to scroll or interaction.
- **Don't** "correct" Title Case headings/body copy to sentence case — Title
  Case is the confirmed signature, not an inconsistency to fix.
- **Don't** remove or flatten the numbered `.eyebrow` section labels as
  generic "AI slop" — they are this project's specific, intentional
  section-label convention, documented in `CLAUDE.md`.
- **Don't** introduce emoji, a second font family, or monospace outside
  `<code>`/`.mono`.
- **Don't** link a second stylesheet (`base.css`, `style.css`) or add an
  inline full stylesheet block to any page — page overrides only.
- **Don't** touch pages already on the legacy dark `pages/base.css` theme —
  they are explicitly out of scope for migration (see `CLAUDE.md`).
