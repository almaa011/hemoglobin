# FABLE5.md

Guidance for improving the HTML/CSS reporting quality of pages in `pages/`. This file is scoped narrowly to page structure, styling, and prose craft — not to research or content workflow.

## Serve locally

```bash
python -m http.server 8000
# Open http://localhost:8000

npm run build   # Bundles pages into dist/ as self-contained single-file HTML
```

## Scope of this work

- Improve how existing pages in `pages/` are structured, styled, and formatted.
- Do not change the factual content of a page — only its presentation, structure, markup, and readability.
- Do not touch `index.html` link entries, page content, or citations — only layout/formatting.
- All shared styles live in `pages/base.css`. Each page links to it and adds only its own overrides in a small inline `<style>` block.

## Required links in `<head>`

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="base.css">
<style>
  :root { --accent: #YOUR_COLOR; }
  /* unique component classes only — nothing already in base.css */
</style>
```

Do **not** link to `../style.css`. Do **not** re-embed the full base stylesheet inline. Do **not** add any other external CSS or scripts — pages must stay self-contained at runtime (only `base.css` and the Google Fonts CDN).

## Page skeleton

```html
<body>
<div id="prog"></div>

<header class="hero">
  <div class="hero-bg"></div>
  <div class="wrap">
    <a class="back-link" href="../index.html">← Index</a>
    <div class="kicker"><span class="dot"></span> KICKER TEXT</div>
    <h1>Page <span style="color:var(--accent)">Title</span></h1>
    <p class="lead">2–4 sentence summary.</p>
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

## Component class names — use exactly these, no alternatives

| Element | Markup |
|---|---|
| Section eyebrow | `<p class="eyebrow"><span class="n">01</span> Label</p>` |
| Dark card / diagram panel | `<div class="panel">` — inside use `.panel-hd`, `.panel-title`, `.panel-sub`, `.panel-cap` |
| Amber callout / formula box | `<div class="callout"><div class="lbl">LABEL</div>…</div>` |
| Key finding (blue) | `<div class="note"><div class="lbl">KEY FINDING</div>…</div>` |
| Warning / hard limit (red) | `<div class="warn-note"><div class="lbl">WARNING</div>…</div>` |
| Conflict flag | `<div class="conflict"><div class="lbl">CONFLICT</div>…</div>` |
| Pull-quote aside | `<div class="aside">…</div>` |
| Data table | `<table class="tbl">` — use `.good`, `.bad`, `.warn` on cells |
| Spec / metric card grid | `<div class="spec-grid"><div class="spec-card"><span class="sc" style="background:COLOR"></span><div class="sv">VALUE</div><div class="sl">label</div></div></div>` |
| Inline citation marker | `<span class="ref" title="[1]">[1]</span>` |
| Reference list | `<details class="src"><summary>References <span class="chev">▾</span></summary><div class="srcbody"><ol>…</ol></div></details>` |

## JavaScript rules

- All JS inline in one `<script>` block at the bottom of `<body>`.
- Always include the scroll-progress bar snippet shown in the skeleton (targets `#prog`).
- SVG charts: build SVG string, inject via `el.innerHTML = svg` into a `<div id="chartid">` inside `.panel`.
- Canvas charts: `<canvas id="...">` rendered via 2D context.
- Sliders: `<input type="range">` with a `<span>` label updated by `addEventListener('input', ...)`.
- No external scripts, no frameworks.

## Readability rules — every page must pass this, no exceptions

- **Paragraphs: 2–3 sentences max.** If a paragraph needs a 4th sentence, split it or convert to bullets.
- **One idea per paragraph.** Don't chain an explanation, a caveat, and a number in one block.
- **Every section opens with a one-line bolded takeaway** before the supporting detail.
- **Bullets and tables over prose** whenever a section lists 3+ items, steps, or comparisons.
- **One dense technical paragraph → one plain-English sentence before it.**
- **Bold the single most important number or conclusion** in any paragraph that contains one.
- Every major section should be skimmable on its own — a reader jumping to a middle section shouldn't need earlier ones to get the gist.

## Required header block (top of every page)

1. Title — descriptive, not clickbait.
2. Date — YYYY-MM-DD.
3. Summary — 2–4 sentences on what the page covers.
4. Back-to-index link — `<a href="../index.html">← Index</a>`.
5. TL;DR panel — a `.note` box immediately after the hero giving the page's conclusion in 3–5 sentences, before any detail.

## Citations — inline markers and reference list

```html
<span class="ref" title="[1]">[1]</span>
```

Keep this visually subtle — small, muted color, no underline. The reference list stays only at the bottom, inside the collapsible block:

```html
<details>
  <summary>References</summary>
  <ol class="refs">
    <li id="r1">[1] Author(s). "Title." Source, Year. <a href="...">URL or DOI</a></li>
  </ol>
</details>
```

Do not alter what a reference cites or add new claims — only fix formatting/markup of existing citations.

## Hard rules

1. Never rewrite or reformat existing content in `index.html` beyond its designated insertion point.
2. Never link pages to `../style.css` — that file is for `index.html` only.
3. Never introduce external scripts, external stylesheets, or CDN dependencies beyond Google Fonts + `base.css`.
4. Never change factual claims, numbers, or citations while doing formatting work — presentation only.
5. Copy the Base Stylesheet verbatim in `pages/base.css`; page-level `<style>` blocks should only add overrides, never redefine base classes.
