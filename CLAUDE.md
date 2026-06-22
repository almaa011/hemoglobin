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
├── RESEARCH_TOPICS.md      ← queue of topics to research (work this when asked)
├── index.html              ← navigation hub (append new links here only)
├── style.css               ← styles for index.html only
├── vite.config.js          ← Vite build config (bundles pages into dist/ as single-file HTML)
├── dist/                   ← Build output — do not edit manually
├── package.json
├── research/               ← full merged research records (topic-slug.md), one per topic
└── pages/                  ← all research pages live here
```

When the user asks to add a topic, append it as a new list item to `RESEARCH_TOPICS.md`. When the user asks to research a topic from that file, run the full research workflow on it.

When the user asks for a "random research page" on any topic, create an HTML file in `pages/` following the standard page design conventions. Apply the same research workflow (Steps 1–8) regardless of how the request is phrased.

---

## Agents Available

Four sub-agents are used during the research-and-publish workflow:

| Agent | When to use |
|---|---|
| **researcher** (×3, parallel) | Before writing any page — dispatch three in parallel with distinct mandates (see Step 1) |
| **page-reviewer** | After writing the page — always run this before declaring the job done |

Never write a page from memory. Never skip the review step.

---

## Research Workflow — Follow This Every Time

When the user asks to research a topic and create a page, execute these steps in order.

### Step 0 — Clarify only when the brief is genuinely ambiguous

**Skip this step entirely** if the user's brief already specifies scope, angle, and depth. Go straight to Step 1 and state your assumptions at the top of the Step 5 report instead of asking.

**Ask only when something material is genuinely unclear** — for example, if it's ambiguous whether they want IC-level detail versus architecture overview, or whether they want the full biological mechanism versus just enough context to make the hardware make sense.

When questions are warranted, use `AskUserQuestion` with multiple-choice options (2–4 choices per question, up to 4 questions at once). Possible dimensions:
- **Scope**: Broad overview or deep-dive on one specific aspect (e.g. just the IC signal chain, just the math)?
- **Angle**: Build something, debug something, or understand it conceptually?
- **Depth on hardware**: Specific ICs / components, or architecture level?
- **Depth on biology/medicine**: Just enough context, or the full mechanism?
- **Visuals**: Any specific diagrams you know you want?

Only fire the researchers once you have enough to write a clear brief.

### Step 1 — Dispatch three researcher agents in parallel

Launch all three simultaneously in a single message. Each has a distinct, non-overlapping mandate:

**Researcher A — Primary sources**
Find official datasheets, peer-reviewed papers (with DOIs), and ratified standards. Return FULL findings, not a summary. Every finding must be paired with its source URL or DOI and a short verbatim supporting quote.

**Researcher B — Implementation**
Find application notes, reference designs, teardowns, and real-world measured numbers. Same format: full findings, source URL per finding, verbatim quote per finding.

**Researcher C — Adversarial**
Find failure modes, contradicting findings, known inaccuracies in common sources, and gaps where information is proprietary or simply unknown. Same format: full findings, source URL per finding, verbatim quote per finding.

Do not start writing until all three return.

### Step 2 — Merge, de-duplicate, flag conflicts

Merge all three outputs:
- De-duplicate overlapping findings (keep the higher-authority source)
- Where Researcher A, B, or C contradict each other, **do not silently pick a winner** — surface the conflict explicitly as a flagged item for the user
- Save the full merged record to `research/topic-slug.md` (all findings, all sources, all flagged conflicts)
- Report this file to the user — this is the full record they actually read

### Step 3 — Verify every citation

For every source URL or DOI in the merged record:
1. Fetch the URL and confirm it (a) exists and (b) actually supports the specific claim attached to it
2. Any citation that cannot be resolved, or whose content doesn't support its claim, is downgraded to [UNVERIFIED]
3. Drop or flag in the page any claim whose only support is an [UNVERIFIED] citation

"Number of verified sources" in the Step 8 report means sources that were fetched and confirmed in this step — not merely listed by the researchers.

### Step 4 — Gap recovery loop

For every `[NEEDS RESEARCH: ...]` gap that would appear in the page:
1. Dispatch one targeted re-search for that specific gap
2. If it resolves the gap, incorporate the finding and its verified citation
3. Only if the second pass also fails does the placeholder remain in the page

### Step 5 — Create the page file

- Filename: `pages/topic-slug.html` — short, lowercase, hyphenated, no date prefix (e.g. `afe4490-signal-chain.html`)
- Base it on the structure of existing pages in `pages/`
- All styling must be self-contained — inline `<style>` block and/or CDN links in `<head>` are both fine. Do **not** link to `../style.css`
- Every fact traces to a finding in the verified merged record — no interpolation from training data (see Gap-filling rule)

### Step 6 — Append the link to index.html

Find `<!-- NEW PAGES GO HERE -->` and insert directly below it:
```html
<li><a href="pages/YYYY-MM-DD_topic-slug.html">Topic Title <span class="date">YYYY-MM-DD</span></a></li>
```
Never rewrite or reformat anything else in `index.html`.

### Step 7 — Run the `page-reviewer` agent

- Pass it the file path of the page just created
- If it returns BLOCKING issues → fix them, then run the reviewer again
- If it returns SHOULD FIX issues → fix them
- Only proceed to Step 8 when the reviewer returns PASS or only NICE TO HAVE items remain

The reviewer checks against the rubric defined in the **Page-Reviewer Rubric** section below.

### Step 8 — Report to the user

- Assumptions made (if Step 0 was skipped)
- Path to merged research record (`research/topic-slug.md`)
- Path to page (`pages/topic-slug.html`)
- Number of verified sources (fetched and confirmed in Step 3)
- Any conflicts surfaced between researchers
- Any [UNVERIFIED] citations remaining and why
- Any [NEEDS RESEARCH] placeholders that survived the recovery loop
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
- When a conclusion is datasheet-derived, note it as such. When it is general engineering knowledge (not tied to a specific source), say so.

### Citations — inline markers and reference list

Every specific factual claim is marked inline with a low-visual-weight tag so the prose reads cleanly without pulling the eye to the bottom:

```html
<span class="ref" title="[1]">[1]</span>
```

Style this tag so it is visually subtle — small, muted color, no underline — readable as prose but findable when scanning. The actual reference list stays only at the bottom, inside the collapsible block:

```html
<details>
  <summary>References</summary>
  <ol class="refs">
    <li id="r1">[1] Author(s). "Title." Source, Year. <a href="...">URL or DOI</a></li>
  </ol>
</details>
```

Unverified entries in the list: `[N] — UNVERIFIED — description of what could not be confirmed`

Do not fabricate citations.

### Gap-filling rule — no silent interpolation
When writing any page from the merged verified record:
- Every specific fact (wavelength, register value, extinction coefficient, timing value, standard reference, IC behavior) MUST trace to a verified finding in the merged record
- If a fact you want to include is NOT in the merged record, do NOT write it — run the recovery loop (Step 4) first; only if that fails, insert: `[NEEDS RESEARCH: <describe the missing fact>]`
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

## Page-Reviewer Rubric

The `page-reviewer` agent checks every page against these criteria before passing it. Each issue is classified as BLOCKING, SHOULD FIX, or NICE TO HAVE.

| # | Check | Severity |
|---|---|---|
| 1 | Every specific fact traces to a verified finding in the merged research record | BLOCKING |
| 2 | Every inline citation resolves to an entry in the reference list | BLOCKING |
| 3 | Every reference list URL/DOI was fetched and confirmed to exist and support its claim | BLOCKING |
| 4 | No values or claims interpolated from training data without a source | BLOCKING |
| 5 | Any claim about an electrical/electronic component cites the official datasheet specifically | BLOCKING |
| 6 | Scope matches the user's brief (no silent scope creep, no missing areas) | BLOCKING |
| 7 | Page is self-contained and works fully offline (no external script or CSS dependencies at runtime) | BLOCKING |
| 8 | Required header block present: title, date, summary, back-to-index link | SHOULD FIX |
| 9 | All [NEEDS RESEARCH] placeholders survived the recovery loop (not skipped) | SHOULD FIX |
| 10 | Conflicts between researchers are surfaced to the user, not silently resolved | SHOULD FIX |
| 11 | [UNVERIFIED] citations are labeled as such in the reference list | SHOULD FIX |
| 12 | Inline citation markers are visually subtle — prose reads cleanly without distraction | NICE TO HAVE |
| 13 | Diagrams present where they would reduce confusion (not mandatory, but flagged if obviously missing) | NICE TO HAVE |

---

## Agent Configuration

**Model assignments** — set these explicitly on every agent spawn, no exceptions:

- Researcher A, B, C → `model: "haiku"`
- Page reviewer → `model: "haiku"`
- Gap recovery re-search → `model: "haiku"`
- Page writer (main agent) → no override, inherits default
- Never use Opus unless the user explicitly requests it

**Researcher output format** — structured entries only, no prose:

Each researcher returns a flat list of findings in this exact format, nothing else. No introductions, no transitions, no narrative, no restating the topic:

```
SOURCE: [URL or DOI]
CLAIM: [one sentence — the specific fact being cited]
QUOTE: [verbatim excerpt from the source, 40 words max]
CONFIDENCE: verified | unverified | conflicting
```

One entry per finding. If a source supports multiple distinct claims, create one entry per claim. This format applies to all three researchers without exception — it is what gets saved to `research/topic-slug.md` before the page is written.

**Source fetch limit per researcher:**

Each researcher fetches and reads the most relevant 2–3 sources for their angle, then stops. Depth comes from the three complementary angles, not from reading more pages per agent. If a source returns no usable findings after reading, it counts against the limit and the agent moves on.

**Prose is written exactly once:**

The main agent writes prose during page creation, working from the merged structured findings in `research/topic-slug.md`. No other step produces prose. The researcher agents, reviewer, and gap-recovery agent produce only structured output.

---

## Hard Rules

1. **Never rewrite or reformat existing content in `index.html`** — only append inside the designated comment
2. **Never fabricate sources** — if a claim can't be verified, omit it or flag it as UNVERIFIED
3. **Never link pages to `../style.css`** — that file is for `index.html` only
4. **Always use three parallel researcher agents before writing** — do not write from memory; do not use a single researcher
5. **Always use the `page-reviewer` agent after writing** — do not declare done until it passes
6. **Use sub-agents to avoid flooding yourself** — break large tasks into delegated steps rather than trying to do everything in one shot
7. **Any claim about an electrical or electronic component must come from the official datasheet** — the datasheet is authoritative above application notes or third-party pages; cite the datasheet specifically for that claim; note in the page whether a conclusion is datasheet-derived or general engineering knowledge
