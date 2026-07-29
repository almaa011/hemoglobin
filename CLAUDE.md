# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

A local research documentation website focused on biomedical electronics (PPG, hemoglobin sensing, optical sensors). Pages are self-contained HTML files served statically. The audience is a hardware/electronics engineer — not a doctor, not a software developer.

## UI Design Taste — read before any visual work

**Before writing or changing any CSS, choosing a color, or designing a component, read [`UI_REFERENCE.md`](UI_REFERENCE.md) and open [`ui-reference.html`](ui-reference.html) in a browser.** They define the design system, taken directly from the reference screenshots supplied by the user — not from your own judgement. **`ui-reference.html` is the authority**; where the prose and the rendered page disagree, match the page.

In short: lavender-grey canvas `#EAE8EF`, white cards, pure-black ink, exactly two accents (lime `#D2F53C` primary, violet `#A78BFA` secondary), Inter as the single sans family, **Title Case in headings and body copy**, flat surfaces with no shadows, and illustration built only from squares, circles and dotted strokes. `UI_REFERENCE.md` §6 lists what is banned outright (glow blobs, pulsing idle animation, glassmorphism, gradient headlines, drop shadows, emoji, a third accent).

**The system ships as [`ui.css`](ui.css) at the repo root.** `index.html` links it as `ui.css`; every new page in `pages/` links it as `../ui.css`. Never paste a stylesheet block into a page.

**Pages written before the rebuild still use the legacy dark `pages/base.css`.** Leave them alone — they are not being migrated. Only `index.html` has been rebuilt so far. Do not link `base.css` or `style.css` from anything new.

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
├── UI_REFERENCE.md         ← design system spec — read before any visual/CSS work
├── ui-reference.html       ← rendered specimen of the system (the authority)
├── ui.css                  ← THE stylesheet — index.html + every new page link this
├── index.html              ← navigation hub (append new links inside the marker only)
├── style.css               ← LEGACY, unused since the index rebuild — do not link
├── vite.config.js          ← Vite build config (bundles pages into dist/ as single-file HTML)
├── dist/                   ← Build output — do not edit manually
├── package.json
└── pages/                  ← all research pages live here
```

**Merged research records are NOT stored in the repo.** The merged record is a transient working file written to the session **scratchpad directory** (the temp scratchpad path given in the environment), used during the workflow, and left there to be auto-cleaned. Never write it into the project folder.

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
- Save the full merged record to `<scratchpad>/topic-slug-research.md` in the session scratchpad directory (all findings, all sources, all flagged conflicts) — **never in the repo**
- Summarize its contents and surface any flagged conflicts to the user in-conversation. Do not leave the file in the project folder; it is a transient working artifact only.

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
- Link to the shared stylesheet: `<link rel="stylesheet" href="../ui.css">`. Then add a small page-specific `<style>` block for overrides only — layout tweaks and unique component classes, never token overrides.
- Use the **Page skeleton** and **component class names** defined in the "Page Design Conventions" section below. Do **not** reinvent class names that `ui.css` already provides.
- Do **not** link `../style.css` or `base.css`. Do **not** re-embed a stylesheet inline.
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
- Path to page (`pages/topic-slug.html`)
- Number of verified sources (fetched and confirmed in Step 3)
- Any conflicts surfaced between researchers
- Any [UNVERIFIED] citations remaining and why
- Any [NEEDS RESEARCH] placeholders that survived the recovery loop
- One sentence summary of what the page covers

### Step 9 — Commit and sync to GitHub

Once the page passes review and the Step 8 report is delivered, **always** finish by committing and pushing all changes to GitHub:
- `git add -A` then commit with a concise message describing the page/change (end the message with the `Co-Authored-By:` trailer)
- `git push` to `origin/main`
- This runs on `main` directly (this is a personal docs site — no branch/PR needed) and applies to any change that completes a website update, not only new pages
- End the final report by stating the commit hash that was pushed

**Cloud / web / mobile sessions:** if the session environment works on a branch and cannot push directly to `main` (typical for Claude Code on web or the mobile app), do NOT stop at an open PR. Finish the sync yourself:
1. Push the working branch
2. `gh pr create` (title = the commit message, body can be brief)
3. `gh pr merge --squash --delete-branch` immediately — no review wait; this is a personal docs site
4. If `gh` is unavailable or merge is blocked, say so explicitly in the final report and give the PR URL so the user can merge from their phone — never end the session with unmerged work sitting silently on a branch

The end state in every environment is the same: `main` on GitHub contains the finished change.

---

## Page Content Rules

### Required header block (top of every page)
1. **Title** — descriptive, not clickbait
2. **Date** — YYYY-MM-DD
3. **Summary** — 2–4 sentences: what the page covers and why it matters to someone building hardware
4. **Back to index** — `<a href="../index.html">← Index</a>`
5. **TL;DR panel** — immediately after the hero, a `.note` box giving the whole page's conclusion in 3–5 sentences max, before any detail. The reader should be able to stop after this box and already have the answer; everything after is the "why" and the "how deep."

### Writing style
- Audience: hardware engineer who knows op-amps, ADCs, SPI/I2C, signal chains — but has zero medical background, and has a short attention span — assume they may only read the bolded/boxed content and skim the rest
- Translate every biological or medical concept into physics or electronics terms
- Use analogies to circuits and signal chains wherever they help
- No vague hand-waving — include actual numbers (wavelengths, extinction coefficients, SNR figures, voltage levels, etc.)
- Flag explicitly when something is uncertain, proprietary, or unverified
- When a conclusion is datasheet-derived, note it as such. When it is general engineering knowledge (not tied to a specific source), say so.

### Readability rules — every page must pass this, no exceptions
These exist because dense prose loses the reader even when the content is accurate. Structure for skimming first, depth second:
- **Paragraphs: 2–3 sentences max.** If a paragraph needs a 4th sentence, split it or convert to bullets.
- **One idea per paragraph.** Don't chain an explanation, a caveat, and a number all in one block of prose.
- **Every section opens with a one-line bolded takeaway** before the supporting detail — the reader should get the point from the bold text alone, then read on only if they want the mechanism.
- **Bullets and tables over prose** whenever a section lists 3+ items, steps, failure modes, or comparisons — do not narrate a list in paragraph form.
- **One dense technical paragraph → one plain-English sentence before it**, translating what it means in practice, not just what it says.
- **Bold the single most important number or conclusion** in any paragraph that contains one — don't make the reader hunt for it in a wall of numbers.
- Every major section (not just the top of the page) should be skimmable on its own: a reader jumping straight to section 4 shouldn't need section 1–3 to get the gist.

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

All shared styles live in **`ui.css` at the repo root**, which implements the design
system defined by [`UI_REFERENCE.md`](UI_REFERENCE.md) and [`ui-reference.html`](ui-reference.html).
Every new page links it and adds only its own overrides in a small inline `<style>` block.

`pages/base.css` is the **legacy dark theme**. It belongs to pages written before the
rebuild. Do not link it from a new page and do not copy patterns out of it.

### Required links in `<head>`

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../ui.css">
<style>
  /* page-specific overrides only — nothing already in ui.css */
</style>
```

Add `&family=JetBrains+Mono:wght@400;500` to the fonts URL **only** if the page
actually renders register values, pin names or code in `<code>`.

**Do not** override `--lime`, `--violet` or any core token. The system has exactly two
accents and pages do not get their own accent color — that was the old `--accent` per-page
convention and it is retired.

### Page skeleton

```html
<body>
<div id="prog"></div>

<div class="wrap">
  <nav class="nav">
    <a class="brand" href="../index.html"><span class="mark"><i></i><i></i></span> Research Index</a>
    <div class="navlinks"><a href="../index.html">Index</a></div>
    <a class="btn btn-out" href="../ui-reference.html">Design System</a>
  </nav>
</div>

<header class="wrap hero">
  <a class="back-link" href="../index.html">← Index</a>
  <h1>Page Title In Title Case</h1>
  <p class="lead">2–4 sentence summary for a hardware engineer.</p>
  <p class="date">YYYY-MM-DD</p>
</header>

<section>
  <div class="wrap-narrow">
    <div class="note">
      <div class="lbl">TL;DR</div>
      <p>The conclusion, in 3–5 sentences, before any detail.</p>
    </div>
  </div>
</section>

<section>
  <div class="wrap-narrow">
    <p class="eyebrow"><span class="n">01</span> Section Label</p>
    <h2>Section Heading</h2>
    <p><strong>One-line takeaway.</strong> Supporting detail follows.</p>
    <!-- panels, tables, spec-grids here -->
  </div>
</section>

<!-- more sections ... -->

<div class="wrap-narrow">
  <details class="src">
    <summary>References <span class="chev">▾</span></summary>
    <div class="srcbody">
      <ol><li id="r1">[1] Author. "Title." Source, Year. <a href="...">URL</a></li></ol>
    </div>
  </details>
</div>

<footer class="foot">
  <div class="notch">
    <svg viewBox="0 0 300 56" width="300" height="56">
      <path d="M0,0 C38,1 52,54 96,54 C140,54 149,6 150,0 C151,6 160,54 204,54 C248,54 262,1 300,0 Z" fill="#EAE8EF"/>
    </svg>
  </div>
  <div class="wrap">
    <div class="footgrid">
      <div>
        <div class="brand"><span class="mark"><i></i><i></i></span> Research Index</div>
        <p>Local Research Documentation On Biomedical Electronics.</p>
      </div>
      <div><div class="fh">Navigate</div><div class="flinks"><a href="../index.html">All Pages</a></div></div>
    </div>
  </div>
  <div class="checker" id="checker"></div>
</footer>
<div class="copyright">Research Index · Biomedical Electronics · 2026</div>

<script>
  window.addEventListener('scroll', () => {
    const el = document.documentElement;
    document.getElementById('prog').style.width =
      (el.scrollTop / (el.scrollHeight - el.clientHeight) * 100) + '%';
  });
  /* footer checkerboard — copy verbatim from index.html */
  /* page-specific chart / SVG code below */
</script>
</body>
```

### Writing style inside the system

- **Title Case in headings and body copy.** This is the system's signature — sentence
  case reads as a different design. See `UI_REFERENCE.md` §2.
- Emphasis inside a heading = wrap the word in `<em>` (renders violet). Never italics.
- Body copy is `--body-2` grey at 15px. Headings are pure black.

### Component class names — use exactly these, no alternatives

| Element | Markup |
|---|---|
| Section label | `<p class="eyebrow"><span class="n">01</span> Label</p>` |
| Card | `<div class="card">` · large container `<div class="bigcard">` |
| Diagram / figure panel | `<div class="panel">` — inside use `.panel-hd`, `.panel-title`, `.panel-sub`, `.panel-cap` |
| Key finding (violet rule) | `<div class="note"><div class="lbl">KEY FINDING</div>…</div>` |
| Formula / note (lime rule) | `<div class="callout"><div class="lbl">LABEL</div>…</div>` |
| Hard limit / warning (inverted black card) | `<div class="warn-note"><div class="lbl">WARNING</div>…</div>` |
| Researcher conflict (black rule) | `<div class="conflict"><div class="lbl">CONFLICT</div>…</div>` |
| Pull-quote aside | `<div class="aside">…</div>` |
| Data table | `<table class="tbl">` — use `.good`, `.bad`, `.warn` on cells; wrap in `.tbl-scroll` |
| Spec / metric cards | `<div class="spec-grid"><div class="spec-card"><span class="sc"></span><div class="sv">VALUE</div><div class="sl">label</div></div></div>` |
| Numbered list | `<div class="nums"><div class="num"><b>1</b> Label</div></div>` |
| Buttons | `<a class="btn btn-lime">` · `btn-dark` · `btn-out` |
| Inline citation | `<span class="ref" title="[1]">[1]</span>` |
| Reference list | `<details class="src"><summary>References <span class="chev">▾</span></summary><div class="srcbody"><ol>…</ol></div></details>` |

### JavaScript rules
- All JS inline in one `<script>` block at the bottom of `<body>`
- Always include the scroll-progress bar snippet (targets `#prog`) and the footer
  checkerboard builder
- SVG charts: build SVG string, inject via `el.innerHTML = svg` into a `<div id="chartid">` inside `.panel`
- Diagram colors come from the tokens only: black linework, `--violet` for highlights,
  `--lime` for the one "on"/active element, `--dot` for dashed strokes
- Seed any randomised illustration with a fixed-seed RNG so it renders identically every load
- No external scripts, no frameworks
- No idle animation — motion only in response to scroll or input

---

## Design System Source Of Truth

`ui.css` is generated from the system documented in `UI_REFERENCE.md` and demonstrated
in `ui-reference.html`. **Do not paste a stylesheet block into a page.** If a page needs
a component that `ui.css` does not have:

1. Check `ui-reference.html` for an existing pattern that already covers it
2. If genuinely new, add it to `ui.css` using only existing tokens
3. Never introduce a new color, a third accent, or a second font family

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
| 7 | Page is self-contained at runtime — links only to `../ui.css` and Google Fonts CDN; no other external CSS or scripts, no inline stylesheet block, no `base.css`/`style.css` | BLOCKING |
| 8 | Required header block present: title, date, summary, back-to-index link | SHOULD FIX |
| 9 | All [NEEDS RESEARCH] placeholders survived the recovery loop (not skipped) | SHOULD FIX |
| 10 | Conflicts between researchers are surfaced to the user, not silently resolved | SHOULD FIX |
| 11 | [UNVERIFIED] citations are labeled as such in the reference list | SHOULD FIX |
| 12 | Inline citation markers are visually subtle — prose reads cleanly without distraction | NICE TO HAVE |
| 13 | Diagrams present where they would reduce confusion (not mandatory, but flagged if obviously missing) | NICE TO HAVE |
| 14 | Page uses the canonical `ui.css` class names (`.eyebrow`, `.panel`, `.card`, `.callout`, `.note`, `.warn-note`, `.conflict`, `.tbl`, `.spec-grid`, `.nums`, `.btn`, `.src`) not ad-hoc alternatives, and overrides no core token | SHOULD FIX |
| 15 | Nothing on the page introduces a banned pattern from `UI_REFERENCE.md` §6 — no glow blobs, pulsing idle animation, glassmorphism, gradient headlines, drop shadows, emoji, third accent color, or second font family | SHOULD FIX |
| 16 | Headings and body copy are in Title Case, per `UI_REFERENCE.md` §2 | SHOULD FIX |
| 17 | Monospace appears only inside `<code>`/`.mono` for literal machine text (register values, pin names) — never for labels, metadata or UI chrome | SHOULD FIX |
| 18 | TL;DR `.note` panel present immediately after the hero, giving the page's conclusion in 3–5 sentences before any detail | BLOCKING |
| 19 | No paragraph exceeds ~3 sentences; multi-item lists are rendered as bullets/tables, not narrated in prose | BLOCKING |
| 20 | Each major section opens with a bolded one-line takeaway before its supporting detail | SHOULD FIX |

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

One entry per finding. If a source supports multiple distinct claims, create one entry per claim. This format applies to all three researchers without exception — it is what gets saved to the transient merged record in the session scratchpad before the page is written.

**Source fetch limit per researcher:**

Each researcher fetches and reads the most relevant 2–3 sources for their angle, then stops. Depth comes from the three complementary angles, not from reading more pages per agent. If a source returns no usable findings after reading, it counts against the limit and the agent moves on.

**Prose is written exactly once:**

The main agent writes prose during page creation, working from the merged structured findings in the scratchpad research file. No other step produces prose. The researcher agents, reviewer, and gap-recovery agent produce only structured output.

---

## Hard Rules

1. **Never rewrite or reformat existing content in `index.html`** — only append inside the designated comment
2. **Never fabricate sources** — if a claim can't be verified, omit it or flag it as UNVERIFIED
3. **Never link pages to `../style.css`** — that file is for `index.html` only
4. **Always use three parallel researcher agents before writing** — do not write from memory; do not use a single researcher
5. **Always use the `page-reviewer` agent after writing** — do not declare done until it passes
6. **Use sub-agents to avoid flooding yourself** — break large tasks into delegated steps rather than trying to do everything in one shot
7. **Any claim about an electrical or electronic component must come from the official datasheet** — the datasheet is authoritative above application notes or third-party pages; cite the datasheet specifically for that claim; note in the page whether a conclusion is datasheet-derived or general engineering knowledge
