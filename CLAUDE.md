# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

A local research documentation website focused on biomedical electronics (PPG, hemoglobin sensing, optical sensors). Pages are self-contained HTML files served statically. The audience is a hardware/electronics engineer — not a doctor, not a software developer.

## Serve locally

```bash
python -m http.server 8000
# Open http://localhost:8000

npm run build   # Bundles pages into dist/ as self-contained single-file HTML (vite-plugin-singlefile)
```

## Project Structure

```
hemoglobin/
├── CLAUDE.md               ← this file
├── index.html              ← navigation hub (append new links here only)
├── style.css               ← styles for index.html only
├── vite.config.js          ← Vite build config (bundles pages into dist/ as single-file HTML)
├── dist/                   ← Build output — do not edit manually
├── package.json
└── pages/                  ← all research pages live here
```

---

## Agents Available

Two sub-agents must be used during the research-and-publish workflow:

| Agent | When to use |
|---|---|
| **researcher** | Before writing any page — always delegate research to this agent first |
| **page-reviewer** | After writing the page — always run this before declaring the job done |

Never write a page from memory. Never skip the review step.

---

## Research Workflow — Follow This Every Time

When the user asks to research a topic and create a page, execute these steps in order.

### Step 0 — Clarify before doing anything
Before touching any tools, ask the user multiple-choice questions to nail down exactly what they want. Do not skip this step, even if the topic seems obvious.

Ask questions across these dimensions — but only what is genuinely ambiguous:
- **Scope**: Is this a broad overview or a deep-dive on one specific aspect (e.g. just the IC signal chain, just the biology, just the math)?
- **Angle**: Are you trying to understand how to *build* something, how to *debug* something, or just *understand* how it works conceptually?
- **Depth on hardware**: Should I go into specific ICs / components, or keep it at the architecture level?
- **Depth on biology/medicine**: How much of the underlying biology do you want — just enough context to make the hardware make sense, or do you want the full mechanism?
- **Visuals**: Any specific diagrams you know you want (signal chain block diagram, absorption spectra, timing diagram, etc.)?

Use the `AskUserQuestion` tool to present these as multiple-choice options. Keep each question to 2–4 choices. Ask up to 4 questions at once. Wait for the user's answers before proceeding.

Only fire the researcher once you have enough answers to write a clear brief.

### Step 1 — Delegate research to the `researcher` agent
- Hand off the topic with full context: what the user wants to understand, their background (hardware engineer, no medical knowledge), and any specific angle they mentioned
- Do not start writing until the researcher returns its summary

### Step 2 — Create the page file
- Filename: `pages/YYYY-MM-DD_topic-slug.html` (use today's actual date)
- Slug: short, lowercase, hyphenated (e.g. `2026-06-12_afe4490-signal-chain.html`)
- Base it on the structure of existing pages in `pages/`
- All styling must be self-contained — inline `<style>` block and/or CDN links in `<head>` are both fine. Do **not** link to `../style.css`

### Step 3 — Append the link to index.html
Find `<!-- NEW PAGES GO HERE -->` and insert directly below it:
```html
<li><a href="pages/YYYY-MM-DD_topic-slug.html">Topic Title <span class="date">YYYY-MM-DD</span></a></li>
```
Never rewrite or reformat anything else in `index.html`.

### Step 4 — Run the `page-reviewer` agent
- Pass it the file path of the page just created
- If it returns BLOCKING issues → fix them, then run the reviewer again
- If it returns SHOULD FIX issues → fix them
- Only proceed to Step 5 when the reviewer returns PASS or only NICE TO HAVE items remain

### Step 5 — Report to the user
- Filename created
- Number of verified sources cited
- Any UNVERIFIED sources flagged by the reviewer
- One sentence summary of what the page covers

---

## Page Content Rules

### Required header block (top of every page)
1. **Title** — descriptive, not clickbait
2. **Date** — YYYY-MM-DD
3. **Summary** — 2–4 sentences: what the page covers and why it matters to someone building hardware
4. **Back to index** — `<a href="../index.html">← Index</a>`

### Writing style
- Audience: hardware engineer who knows op-amps, ADCs, SPI/I2C, signal chains — but has zero medical background
- Translate every biological or medical concept into physics or electronics terms
- Use analogies to circuits and signal chains wherever they help
- No vague hand-waving — include actual numbers (wavelengths, extinction coefficients, SNR figures, voltage levels, etc.)
- Flag explicitly when something is uncertain, proprietary, or unverified

### Citations
- Every specific factual claim gets an inline superscript: `<sup><a href="#r1">[1]</a></sup>`
- References section at the bottom, numbered list, inside a collapsible block:
  ```html
  <details>
    <summary>References</summary>
    <ol class="refs">
      <li id="r1">[1] Author(s). "Title." Source, Year. <a href="...">URL</a></li>
    </ol>
  </details>
  ```
- Unverified: `[N] — UNVERIFIED LEAD — description`
- Do not fabricate citations

### Gap-filling rule — no silent interpolation
When writing any page from the researcher summary:
- Every specific fact (wavelength, register value, extinction coefficient, timing value, standard reference, IC behavior) MUST trace to a FINDING in the researcher's output.
- If a fact you want to include is NOT in the researcher summary, do NOT write it. Instead insert a visible placeholder: `[NEEDS RESEARCH: <describe the missing fact>]`
- Never interpolate values from training data. If you are uncertain whether a value came from research or memory, treat it as unverified and use the placeholder.
- Placeholders are not failures — they are honest gaps the user can act on.

### Visuals — use them when concepts are complex
Include inline SVG diagrams, charts, or tables when:
- There is a signal chain or data flow that is easier to follow visually
- There are multiple wavelengths, spectra, or absorption curves being compared
- A concept has spatial or physical structure (e.g. tissue layers, optical paths)
- A table would make a set of specs dramatically easier to scan

Do not add a diagram just to have one — add it when it genuinely reduces confusion.

---

## Page Design Conventions

Follow the visual style of existing pages:

- **Dark background** — `#0c0a0d` or similar near-black
- **Fonts** — `Space Grotesk` for headings, `Inter` for body text, `JetBrains Mono` for code, labels, numbers
- **Load fonts via Google Fonts** `<link>` tags in `<head>` (fine for local serving)
- **Color palette** defined as CSS custom properties in `:root`
- **Layout** — max-width ~880px, centered, generous padding
- **Hero section** — full-viewport intro with radial gradient background
- **Sections** — numbered, separated by subtle borders
- **Panels** — dark card background for charts/diagrams/callouts
- **SVG charts** — rendered inline, no external chart libraries
- **JavaScript** — all JS is inline in a `<script>` block at the bottom of `<body>`; no external scripts
  - Charts are drawn by JS into `<div id="chartid">` placeholders inside `.panel` containers
  - Sliders: `<input type="range">` with a live label updated via `addEventListener('input', ...)`
  - Toggles: `.active` class toggled via `classList.toggle`, driving visual state through CSS

---

## Hard Rules

1. **Never rewrite or reformat existing content in `index.html`** — only append inside the designated comment
2. **Never fabricate sources** — if a claim can't be verified, omit it or flag it as UNVERIFIED LEAD
3. **Never link pages to `../style.css`** — that file is for `index.html` only
4. **Always use the `researcher` agent before writing** — do not write from memory
5. **Always use the `page-reviewer` agent after writing** — do not declare done until it passes
6. **Use sub-agents to avoid flooding yourself** — break large tasks into delegated steps rather than trying to do everything in one shot
