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
├── research/               ← full merged research records (topic-slug.md), one per topic
└── pages/                  ← all research pages live here
```

When the user asks to research a topic, run the full research workflow (Steps 1–8) on it. Apply the same workflow regardless of how the request is phrased.

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
- Link to the shared stylesheet: `<link rel="stylesheet" href="base.css">` (sibling file in `pages/`). Then add a small page-specific `<style>` block for overrides only — usually just `--accent` and any domain-specific semantic variables, plus any unique component classes not in the base.
- Use the **Page skeleton** and **component class names** defined in the "Page Design Conventions" section below. Do **not** reinvent class names that the base already provides.
- Do **not** link to `../style.css`. Do **not** re-embed the full base stylesheet inline.
- Every fact traces to a finding in the verified merged record — no interpolation from training data (see Gap-filling rule)

### Step 6 — Append the link to index.html

Find `<!-- NEW PAGES GO HERE -->` and insert directly below it:
```html
<li><a href="pages/topic-slug.html">Topic Title <span class="date">YYYY-MM-DD</span></a></li>
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

All shared styles live in `pages/base.css`. Each page links to it and adds only its own overrides in a small inline `<style>` block.

### Required links in `<head>`

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="base.css">
<style>
  :root { --accent: #YOUR_COLOR; /* domain semantic vars */ }
  /* unique component classes only — nothing already in base.css */
</style>
```

### Page skeleton

```html
<body>
<div id="prog"></div>

<header class="hero">
  <div class="hero-bg"></div>
  <div class="wrap">
    <a class="back-link" href="../index.html">← Index</a>
    <div class="kicker"><span class="dot"></span> TOPIC · SUBTOPIC</div>
    <h1>Page <span style="color:var(--accent)">Title</span></h1>
    <p class="lead">2–4 sentence summary for a hardware engineer.</p>
    <p class="mut">YYYY-MM-DD</p>
    <div class="scrolltip"><span class="arr">↓</span> start reading</div>
  </div>
</header>

<section id="s1">
  <div class="wrap">
    <p class="eyebrow"><span class="n">01</span> Section label</p>
    <h2>Section heading</h2>
    <!-- prose, panels, tables, spec-grids here -->
  </div>
</section>

<!-- more sections ... -->

<details class="src">
  <summary>References <span class="chev">▾</span></summary>
  <div class="srcbody">
    <ol>
      <li id="r1">[1] Author. "Title." Source, Year. <a href="...">URL</a></li>
    </ol>
  </div>
</details>

<footer><div class="wrap"><a class="back-link" href="../index.html">← Index</a></div></footer>

<script>
  window.addEventListener('scroll', () => {
    const el = document.documentElement;
    document.getElementById('prog').style.width =
      (el.scrollTop / (el.scrollHeight - el.clientHeight) * 100) + '%';
  });
  /* page-specific chart / SVG code below */
</script>
</body>
```

### Component class names — use exactly these, no alternatives

| Element | Markup |
|---|---|
| Section eyebrow | `<p class="eyebrow"><span class="n">01</span> Label</p>` |
| Dark card / diagram panel | `<div class="panel">` — inside use `.panel-hd`, `.panel-title`, `.panel-sub`, `.panel-cap` |
| Amber callout / formula box | `<div class="callout"><div class="lbl">LABEL</div>…</div>` |
| Key finding (blue) | `<div class="note"><div class="lbl">KEY FINDING</div>…</div>` |
| Warning / hard limit (red) | `<div class="warn-note"><div class="lbl">WARNING</div>…</div>` |
| Researcher conflict flag | `<div class="conflict"><div class="lbl">CONFLICT</div>…</div>` |
| Pull-quote aside | `<div class="aside">…</div>` |
| Data table | `<table class="tbl">` — use `.good`, `.bad`, `.warn` on cells |
| Spec / metric card grid | `<div class="spec-grid"><div class="spec-card"><span class="sc" style="background:COLOR"></span><div class="sv">VALUE</div><div class="sl">label</div></div></div>` |
| Inline citation marker | `<span class="ref" title="[1]">[1]</span>` |
| Reference list | `<details class="src"><summary>References <span class="chev">▾</span></summary><div class="srcbody"><ol>…</ol></div></details>` |

### JavaScript rules
- All JS inline in one `<script>` block at the bottom of `<body>`
- Always include the scroll-progress bar snippet shown in the skeleton (targets `#prog`)
- SVG charts: build SVG string, inject via `el.innerHTML = svg` into a `<div id="chartid">` inside `.panel`
- Canvas charts: `<canvas id="...">` rendered via 2D context
- Sliders: `<input type="range">` with a `<span>` label updated by `addEventListener('input', ...)`
- No external scripts, no frameworks

---

## Base Stylesheet

Copy this block verbatim at the top of every page's `<style>` block. Do not modify it — add page-specific overrides below it.

```css
/* ── tokens ── */
:root {
  --bg:    #0c0a0d;
  --bg2:   #100d11;
  --panel: #181219;
  --ink:   #f2ebe6;
  --mut:   #a8978f;
  --dim:   #7e716c;
  --line:  rgba(255,255,255,.09);
  --line2: rgba(255,255,255,.05);
  --good:  #5fd0a6;
  --warn:  #f0a24b;
  --bad:   #ff5a52;
  --accent: #5b8cff; /* override per page */
}

/* ── reset ── */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  * { animation: none !important; transition: none !important; }
}
body {
  margin: 0; background: var(--bg); color: var(--ink);
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px; line-height: 1.7;
  -webkit-font-smoothing: antialiased; overflow-x: hidden;
}

/* ── layout ── */
.wrap { max-width: 880px; margin: 0 auto; padding: 0 22px; }
section { padding: 64px 0; border-top: 1px solid var(--line2); }

/* ── typography ── */
h1, h2, h3 { font-family: 'Space Grotesk', sans-serif; letter-spacing: -.01em; }
h1 { font-size: clamp(34px,7vw,60px); font-weight: 700; line-height: 1.02; margin: 0 0 20px; }
h2 { font-size: clamp(26px,4.4vw,38px); font-weight: 700; line-height: 1.1; margin: 0 0 6px; }
h3 { font-size: 20px; font-weight: 600; margin: 36px 0 10px; }
p { margin: 14px 0; color: #e2d8d1; }
a { color: var(--accent); }
strong { color: var(--ink); }
code { font-family: 'JetBrains Mono', monospace; font-size: .88em; color: var(--mut); }
.lead { font-size: 18px; color: #ede3dc; max-width: 640px; }
.mono { font-family: 'JetBrains Mono', monospace; }
.mut { color: var(--mut); }

/* ── section eyebrow ── */
.eyebrow {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 12px; font-weight: 600;
  letter-spacing: .16em; text-transform: uppercase;
  color: var(--accent); margin: 0 0 14px;
}
.eyebrow .n { font-family: 'JetBrains Mono', monospace; color: var(--dim); font-size: 13px; margin-right: 8px; }

/* ── inline citation ── */
.ref {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; color: var(--dim);
  vertical-align: super; line-height: 0;
  margin: 0 1px; text-decoration: none; cursor: default;
}

/* ── hero ── */
.hero {
  position: relative; min-height: 100vh;
  display: flex; flex-direction: column; justify-content: center;
  overflow: hidden; padding: 0; border-top: none;
}
.hero-bg {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(800px 500px at 70% 30%, rgba(91,140,255,.10), transparent 60%),
    radial-gradient(600px 400px at 15% 75%, rgba(95,208,166,.07), transparent 60%);
}
.hero .wrap { position: relative; z-index: 2; padding-top: 80px; padding-bottom: 60px; }

/* kicker pill */
.kicker {
  display: inline-flex; align-items: center; gap: 9px;
  font-family: 'JetBrains Mono', monospace; font-size: 12px;
  color: var(--mut); border: 1px solid var(--line);
  border-radius: 100px; padding: 6px 13px; margin-bottom: 26px;
}
.kicker .dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--accent); box-shadow: 0 0 10px var(--accent);
  animation: pulse 1.6s ease-in-out infinite;
}
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }

/* ── back link & scroll tip ── */
.back-link {
  display: inline-block; font-family: 'JetBrains Mono', monospace;
  font-size: 13px; color: var(--mut); text-decoration: none; margin-bottom: 20px;
}
.back-link:hover { color: var(--ink); }
.scrolltip {
  font-family: 'JetBrains Mono', monospace; font-size: 12px;
  color: var(--dim); margin-top: 28px; display: flex; align-items: center; gap: 10px;
}
.scrolltip .arr { animation: bob 1.8s ease-in-out infinite; }
@keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }

/* ── panel (dark card) ── */
.panel {
  background: linear-gradient(180deg, var(--panel), var(--bg2));
  border: 1px solid var(--line); border-radius: 16px;
  padding: 20px; margin: 26px 0;
}
.panel-hd { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
.panel-title { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px; }
.panel-sub { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--dim); }
.panel-cap { font-size: 13px; color: var(--mut); margin-top: 12px; line-height: 1.55; }
svg { display: block; width: 100%; height: auto; overflow: visible; }

/* ── callout boxes ── */
.callout {
  background: rgba(240,162,75,.06); border: 1px solid rgba(240,162,75,.22);
  border-left: 3px solid var(--warn); border-radius: 10px;
  padding: 16px 18px; margin: 20px 0;
}
.callout .lbl, .note .lbl, .warn-note .lbl, .conflict .lbl {
  font-family: 'JetBrains Mono', monospace; font-size: 11px;
  letter-spacing: .1em; text-transform: uppercase; margin-bottom: 6px;
}
.callout .lbl { color: var(--warn); }
.note {
  background: linear-gradient(180deg,rgba(91,140,255,.07),rgba(91,140,255,.02));
  border: 1px solid rgba(91,140,255,.22); border-radius: 12px; padding: 18px 20px; margin: 24px 0;
}
.note .lbl { color: var(--accent); }
.warn-note {
  background: linear-gradient(180deg,rgba(255,90,82,.07),rgba(255,90,82,.02));
  border: 1px solid rgba(255,90,82,.22); border-radius: 12px; padding: 18px 20px; margin: 24px 0;
}
.warn-note .lbl { color: var(--bad); }
.conflict {
  background: rgba(240,162,75,.06); border: 1px solid rgba(240,162,75,.25);
  border-left: 3px solid var(--warn); border-radius: 10px; padding: 14px 18px; margin: 20px 0;
}
.conflict .lbl { color: var(--warn); font-size: 10px; }

/* ── aside ── */
.aside { border-left: 3px solid var(--line); padding: 4px 0 4px 18px; margin: 22px 0; color: var(--mut); font-size: 15px; }

/* ── table ── */
.tbl { width: 100%; border-collapse: collapse; margin: 22px 0; font-size: 14px; }
.tbl th, .tbl td { text-align: left; padding: 11px 14px; border-bottom: 1px solid var(--line); }
.tbl th { font-family: 'Space Grotesk', sans-serif; font-size: 12px; color: var(--mut); font-weight: 600; text-transform: uppercase; letter-spacing: .06em; }
.tbl tr:last-child td { border-bottom: none; }
.tbl td:first-child { color: var(--mut); font-size: 13px; font-family: 'JetBrains Mono', monospace; }
.tbl .good { color: var(--good); }
.tbl .bad  { color: var(--bad);  }
.tbl .warn { color: var(--warn); }

/* ── spec grid ── */
.spec-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(170px,1fr)); gap: 10px; margin: 22px 0; }
.spec-card { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 16px; }
.spec-card .sv { font-family: 'JetBrains Mono', monospace; font-size: 22px; font-weight: 600; color: var(--ink); line-height: 1.1; margin-bottom: 4px; }
.spec-card .sl { font-size: 12px; color: var(--mut); line-height: 1.4; }
.spec-card .sc { display: block; width: 28px; height: 3px; border-radius: 2px; margin-bottom: 10px; }

/* ── references ── */
details.src { border: 1px solid var(--line); border-radius: 12px; background: var(--panel); margin-top: 28px; }
details.src summary { cursor: pointer; padding: 16px 20px; font-family: 'Space Grotesk', sans-serif; font-weight: 600; list-style: none; display: flex; justify-content: space-between; align-items: center; }
details.src summary::-webkit-details-marker { display: none; }
details.src summary .chev { transition: .2s; color: var(--mut); }
details.src[open] summary .chev { transform: rotate(180deg); }
.srcbody { padding: 0 20px 20px; font-size: 13px; color: var(--mut); line-height: 1.75; }
.srcbody ol { padding-left: 20px; margin: 0; }
.srcbody li { margin-bottom: 6px; }
.srcbody a { word-break: break-word; color: var(--dim); }
.srcbody a:hover { color: var(--accent); }
.unverified { color: var(--dim); font-style: italic; }

/* ── read-progress bar ── */
#prog { position: fixed; top: 0; left: 0; height: 3px; width: 0; background: linear-gradient(90deg,var(--accent),var(--good)); z-index: 99; transition: width .1s; }

/* ── footer ── */
footer { padding: 50px 0 70px; text-align: center; color: var(--dim); font-size: 13px; border-top: 1px solid var(--line2); }

/* ── responsive ── */
@media (max-width:560px) {
  section { padding: 48px 0; }
  .hero .wrap { padding-top: 60px; }
}
```

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
| 7 | Page is self-contained at runtime — links only to `base.css` (sibling in `pages/`) and Google Fonts CDN; no other external CSS or scripts | BLOCKING |
| 8 | Required header block present: title, date, summary, back-to-index link | SHOULD FIX |
| 9 | All [NEEDS RESEARCH] placeholders survived the recovery loop (not skipped) | SHOULD FIX |
| 10 | Conflicts between researchers are surfaced to the user, not silently resolved | SHOULD FIX |
| 11 | [UNVERIFIED] citations are labeled as such in the reference list | SHOULD FIX |
| 12 | Inline citation markers are visually subtle — prose reads cleanly without distraction | NICE TO HAVE |
| 13 | Diagrams present where they would reduce confusion (not mandatory, but flagged if obviously missing) | NICE TO HAVE |
| 14 | Base Stylesheet copied verbatim — page uses canonical class names (`.eyebrow`, `.panel`, `.callout`, `.note`, `.warn-note`, `.conflict`, `.tbl`, `.spec-grid`, `.src`) not ad-hoc alternatives | SHOULD FIX |

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
