# UI Reference — Design Taste Guide

This file is the canonical design-taste reference for this project. It exists because
the current visual language (see `pages/base.css`, dark-bg + neon-glow + pulsing-dot
theme) reads as generic "AI-generated landing page" — and that is exactly what we are
moving away from.

**Read this before writing any CSS, choosing a color, or designing a component.**
Companion file: [`ui-reference.html`](ui-reference.html) — open it in a browser. It is
a working style guide that renders every pattern below. When in doubt, match what's
rendered there, not what's described in prose here.

---

## 1. Where this taste comes from

Derived from a set of reference screenshots supplied directly by the user: a fintech
marketing site ("Square Card" — bank-card product pages, desktop + mobile) and an
education-platform dashboard. Neither is in our domain (biomedical electronics), but
the *taste* — restraint, confidence, geometric illustration instead of decoration — is
what we're extracting. The literal palette (lime + off-white + black) is not mandatory
outside of `ui-reference.html`; the principles are mandatory everywhere.

## 2. Core principles

1. **One accent color, used with confidence.** Not a gradient between two accents. Not
   an accent-per-section. Pick one (plus a neutral secondary if the content truly needs
   it — e.g. a purple used only for line-art icons) and repeat it deliberately.
2. **Type does the work, not decoration.** Headlines are large, bold, tight-leading,
   and plain-colored (solid black or solid ink — never gradient-filled text). Hierarchy
   comes from size and weight jumps, not from adding visual noise around the text.
3. **Illustration is geometric and generative, never skeuomorphic.** Dots, circles,
   squares, thin connecting lines, pixel/voxel mosaics, orbiting particle systems. No
   3D renders, no stock photography, no "AI-image" style hero art, no clipart people.
4. **Flat and solid beats glassy and glowing.** Cards are solid color or plain white/
   dark panels with a hairline border. No frosted-glass blur, no drop-shadow halos, no
   glow effects on buttons or dots.
5. **Whitespace is a feature.** Generous padding, uncluttered grids, room for the type
   to breathe. Density is achieved by page length, not by cramming.
6. **Shapes are deliberate signatures, not decoration filler.** The scalloped cutout at
   the top of the fintech site's footer is a good example — one custom, memorable
   shape used once, not a library of rounded blobs scattered everywhere.
7. **Buttons are solid pills with hard, confident edges.** One primary style (solid
   accent-fill pill, dark text) and one secondary style (solid dark-fill pill, light
   text, or outline). No gradient buttons, no soft glow on hover.
8. **Motion is functional, not ambient.** Scroll progress bars, hover states, chart
   transitions — yes. Idle pulsing dots, floating particles that never stop, ambient
   glow breathing effects — no. If nothing changed on screen and nothing the user did
   caused it, don't animate it.
9. **Data visualization is plain and legible.** Bar charts, sliders, concentric-circle
   diagrams rendered as flat vector shapes with 2–4 colors max. No 3D bars, no
   unnecessary gradients inside chart marks.

## 3. The banned list ("AI slop" checklist)

Reject a design if it does any of these — this list exists because our own
`pages/base.css` currently does several of them:

- Dark navy/black background with large blurred radial-gradient "glow blobs" behind
  the hero copy (`hero-bg` in the current base.css is exactly this — retire it).
- A pulsing/breathing glow animation on a small decorative dot for no functional
  reason (`.kicker .dot` pulse — decorative only, retire it).
- Glassmorphism: translucent blurred panels with a soft white border-glow.
- Gradient-filled headline text (accent-to-accent color transitions across letters).
- Generic icon-in-a-gradient-circle repeated identically across a feature grid.
- Emoji used as functional icons or bullet markers.
- Sparkle/star iconography used to signal "new" or "AI-powered."
- Stock-photo-style or generic 3D-rendered hero illustrations.
- Center-aligned everything with no asymmetry or grid variation.
- Drop shadows used as the primary way to separate every card from the background
  (a 1px hairline border reads cleaner and is used throughout the reference).
- Badge pills that exist purely to say "NEW" / "AI" / "Powered by AI" with no
  information content.

## 4. Color system

**Reference palette (as shown in `ui-reference.html`):**

| Role | Value | Use |
|---|---|---|
| Canvas | `#EDEBE7` (light) / adapt to `#0c0a0d`-class near-black for dark contexts | Page background |
| Ink | `#141116` | Primary text, headlines |
| Muted ink | `#6b6570` | Body copy, secondary text |
| Accent (primary) | `#D6FA3C` (lime) | Primary CTA fill, numbered badges, highlight strokes |
| Accent (secondary) | `#8B7CF6` (soft violet) | Line-art icon strokes, small illustration accents only — never on large fills |
| Surface | `#FFFFFF` (light) / `#151217`-class panel (dark) | Card backgrounds |
| Line | `rgba(20,17,22,.10)` (light) / `rgba(255,255,255,.09)` (dark) | Hairline borders only |

Rule: **two accent colors maximum**, one dominant (used on CTAs, numbers, key
highlights) and one supporting (used sparingly, only in illustration linework). Every
other color on the page is a neutral (ink / muted / canvas / surface / line).

## 5. Typography system

- Display headline: bold grotesque sans, `clamp(34px, 7vw, 60px)`, line-height ~1.02,
  slightly negative letter-spacing. Solid ink color only.
- Section heading: same family, `clamp(26px, 4.4vw, 38px)`, weight 700.
- Body: a plain humanist sans at 16–18px, line-height 1.6–1.7, muted-ink color.
- Labels / eyebrows / numbers: monospace or a distinct condensed face, small size,
  uppercase, letter-spacing ~0.1em — used for metadata, not for headlines.
- Avoid: more than two font families on one page; gradient text; italics as emphasis
  (use weight instead).

## 6. Layout & components

- **Nav**: small logo mark + wordmark, a handful of plain text links (small dot
  bullets optional), one solid pill CTA on the right. Nothing else.
- **Hero**: big headline (max ~2 lines of large type), one short supporting sentence,
  one pill CTA, a row of small logotype/partner marks below — and a geometric
  illustration to the side, not centered beneath.
- **Feature grid**: white/surface cards on the canvas background, each with a thin
  line-art icon (not a filled gradient icon), a short title, 1–2 lines of copy. Cards
  are equal-weight — no single "hero" card unless it's genuinely the most important.
- **Numbered list**: small solid-accent circular number badges + plain text label,
  paired with a generative dot/orbit diagram beside the list, not one icon per row.
- **Footer**: a full-width solid dark panel. A single custom cutout/scallop shape at
  the top edge is an acceptable signature flourish (used once, not repeated). Link
  columns are plain text, email capture is a plain input + solid accent pill button.
- **Cards showing content (course cards, product cards, etc.)**: solid flat color
  fill (not gradient), rounded corners (12–20px), small icon-in-white-circle badge,
  rating/status pill in the opposite corner, avatar stack + count as social proof.

## 7. Applying this to the hemoglobin research site

This project's actual content (biomedical electronics research pages) is technical
and dense — unlike marketing pages, it needs to stay scannable and information-dense,
not whitespace-maximal. When migrating research pages to this taste, keep:

- The dark near-black canvas (appropriate for long technical reading sessions) —
  but drop the glow-blob hero background and the pulsing dot.
- One accent color per page (already the convention via `--accent`) — keep that,
  but restrict it strictly to CTAs/highlights/citations, not decorative gradients.
- Geometric SVG diagrams for signal chains / spectra (already the convention) — these
  already fit principle 3 well; keep building them this way.
- Hairline borders on panels instead of heavier drop shadows.
- Replace the pulsing kicker dot with a static dot, or remove the kicker treatment
  entirely in favor of a plain small-caps label.

Full migration of `pages/base.css` to this taste is a separate, larger task and has
not been done yet — this document and `ui-reference.html` are the target to migrate
toward, not a description of the current state.
