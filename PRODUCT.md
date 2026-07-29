# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary user is the site's own author: a hardware/electronics engineer working on
biomedical electronics (PPG, hemoglobin sensing, optical sensors), reading their own
research notes back later. There is no other audience — this is a local, personal
documentation site, not a public product, and pages assume zero medical/biology
background but real electronics fluency (op-amps, ADCs, SPI/I2C, signal chains).

## Product Purpose

A local research documentation site: self-contained HTML pages recording verified
findings (datasheets, peer-reviewed papers, application notes) about biomedical
electronics topics, organized behind a single navigable index. Success is a fast,
trustworthy reference the author can skim later without re-deriving the research.

## Positioning

Not a public-facing product, so there is no competitor to differentiate against. Its
defining trait is the verified-citation discipline built into the authoring workflow
(three parallel researcher passes, then a citation-verification pass that fetches and
confirms every source before it ships) — a generic wiki or note-taking tool does not
enforce this.

## Operating Context

Pages are authored by an AI agent (Claude Code) running a fixed research-and-publish
workflow, not hand-coded page by page. Served locally via `python -m http.server` for
viewing, and bundled with Vite (`npm run build`) into self-contained single-file HTML
under `dist/`.

## Capabilities and Constraints

- Every new page links only `../ui.css` and the Google Fonts CDN — no other external
  CSS/JS, no inline stylesheet blocks beyond page-specific overrides.
- Legacy pages under `pages/` still use the old dark `pages/base.css` theme and are
  explicitly **not** being migrated — leave them as-is; only new pages use `ui.css`.
- No CMS, no backend, no accounts, no build-time personalization — flat HTML files
  plus one shared stylesheet (`ui.css`) and one shared design spec (`UI_REFERENCE.md`).
- The visual system is externally specified and closed: exactly two accent colors,
  one font family, flat surfaces, no shadows. New pages fit the system; they do not
  extend or evolve it.

## Brand Commitments

Displayed name in nav/footer: "Research Index". No logo asset beyond the existing
two-bar `.mark` glyph already built in `ui.css` / `index.html`.

## Evidence on Hand

The rendered pages (`index.html`, everything under `pages/`) and the design specimen
`ui-reference.html` are real, load-bearing evidence — not placeholders or mockups.
State absence of anything else (no user research, no analytics, no stakeholders):
none exists, and none should be fabricated.

## Product Principles

- Verified-citation discipline overrides speed: no specific fact ships without a
  fetched, confirmed source; unverifiable claims are flagged, never silently dropped
  or silently included.
- One reader, so every surface is **Read** mode (comprehension) — never **Persuade**
  (marketing/conversion). No onboarding, no CTAs beyond navigation.
- The design system is fixed and externally documented in `UI_REFERENCE.md` /
  `ui-reference.html`; design work here is refinement within that system, never a
  new visual world.

## Accessibility & Inclusion

No accessibility requirement beyond ordinary legibility (contrast, keyboard focus,
readable type) has been established — the audience is a single engineer, not the
general public.
