# FABLE5 Template Review Report

Date: 2026-07-11
Scope: `fable5-example.html` (improved in place) and `FABLE5.md` (reviewed, not modified).
All content in the example remains generic placeholder material — no real specs were invented or presented as sourced.

---

## 1. Changes made to `fable5-example.html`

### Rules that were stated in FABLE5.md but not demonstrated

- **"One dense technical paragraph → one plain-English sentence before it"** — the old example never showed this pattern. Section 01 now demonstrates it explicitly: a one-line plain-English sentence ("In practice this means the bus is fast enough, but only just.") followed by a dense placeholder paragraph, with an HTML comment marking the pattern.
- **"Bold the single most important number"** inside a paragraph (as distinct from the section-opening bolded takeaway) — now demonstrated in the dense paragraph (**20 ns of setup margin**) and in the in-body KEY FINDING note.
- **In-body KEY FINDING `.note`** — the old example used the `.note` box only once, as the TL;DR, so a template user couldn't see that the same component serves two roles. Section 02 now contains a section-scoped KEY FINDING note, distinct from the page-level TL;DR.
- **Inline citation in prose** — `.ref` markers previously appeared only in bullets. They now also appear in a prose paragraph and inside the CONFLICT box (where citing both disagreeing sources is exactly the point).
- **`h3` sub-heading** — base.css styles `h3` but the example never used one. Section 02 now shows one ("Headline numbers as spec cards") so the sub-structure pattern is visible.

### Structural and semantic tightening

- **TL;DR label changed from `KEY FINDING` to `TL;DR`.** FABLE5.md requires a TL;DR panel as a `.note` box, but the component table labels `.note` as "Key finding". Using `KEY FINDING` as the TL;DR label conflated a page-level verdict with a section-level finding. The example now uses `TL;DR` for the top box and `KEY FINDING` for the in-body one, and the report flags this ambiguity below (§2).
- **TL;DR content rewritten to model the rule** — it now leads with the conclusion, contains a bolded headline number, and stays within 3–5 sentences, instead of being purely meta-instructional. The meta-instruction moved into an HTML comment.
- **Annotation comments added throughout.** Since this file's job is to be a reference template, each required block (hero, TL;DR, section pattern, references, script block) now carries a short `<!-- ══ ... ══ -->` comment stating the rule it demonstrates. These comments make the file self-teaching without polluting the rendered page.
- **Path deviation documented in-file.** The example lives at the repo root, so it links `pages/base.css` and `index.html` — but real pages in `pages/` must use `base.css` and `../index.html`. A head comment now states this explicitly so nobody copies the root-relative paths into a real page.
- **Table upgraded to `<thead>`/`<tbody>`** — semantically correct HTML, no visual change, and it gives linters/screen readers a proper header row.
- **SVG accessibility** — the injected diagram now has `role="img"` and an `aria-label`; the bare `Sink` text node also got the missing `text-anchor`-consistent styling treatment (font-family was already present; alignment left as-is since it's the terminal label).
- **Callout label shortened** from `FORMULA / CALLOUT` to `FORMULA` (a label should name the content, not the component), and its text now models the FABLE5/CLAUDE convention of stating whether a formula is source-derived or general engineering knowledge.
- **Aside rewritten as an actual quotation** — the component is defined as a *pull-quote* aside, so the placeholder now looks like a quote (with quotation marks) rather than a description of itself.
- **Reference anchors** — `href="#"` (which jumps to page top when clicked) replaced with self-anchors `href="#rN"`, keeping the dummy links inert but harmless, and each entry marked `(placeholder)`.
- **Scroll-progress snippet kept verbatim** per the "always include the snippet shown in the skeleton" rule — a robustness improvement it could use is noted in §2 rather than applied, since the rule demands the exact snippet.

### What was deliberately not changed

- No slider/canvas demo was added: the JS rules describe them but the required-component list doesn't include them, and FABLE5's own "don't add a diagram just to have one" principle applies equally to demo widgets.
- The TL;DR remains wrapped in a numbered `section` (eyebrow `00`) — FABLE5.md says "immediately after the hero" but the skeleton offers no bare-`.wrap` pattern outside sections, so a section wrapper is the only markup that gets correct margins without inventing new structure. Flagged in §2.

---

## 2. Ambiguities and inconsistencies in FABLE5.md

1. **Two contradictory reference-list markups.** The skeleton and component table prescribe `<details class="src"><summary>References <span class="chev">▾</span></summary><div class="srcbody"><ol>…` — but the "Citations" section shows a plain `<details><summary>References</summary><ol class="refs">…`. A page author following the Citations section verbatim would produce unstyled markup (`details.src`/`.srcbody` styles wouldn't apply, and `.refs` is not a class base.css defines). **Recommendation:** delete the second snippet or replace it with the `.src` version.

2. **The skeleton omits the TL;DR panel entirely.** The required-header-block section mandates a `.note` TL;DR "immediately after the hero," but the skeleton jumps from `</header>` straight to `<section id="s1">`. It's also unspecified whether the TL;DR sits inside its own `<section>` (with or without an eyebrow/number) or bare between hero and first section — bare markup would lose `.wrap` margins. **Recommendation:** add the TL;DR block to the skeleton, in a `section` with eyebrow `00`.

3. **TL;DR vs KEY FINDING label collision.** The component table defines `.note` with the label `KEY FINDING`; the header-block rule says the TL;DR is a `.note` box. Should the TL;DR's `.lbl` read `TL;DR` or `KEY FINDING`? The example now uses `TL;DR` (clearer scope signal), but FABLE5.md should state a choice.

4. **Eyebrow numbering convention is implicit.** Sections use `<span class="n">01</span>` but nothing says whether numbering starts at 00 or 01, whether the TL;DR consumes a number, or whether numbers must be zero-padded and sequential. Trivial, but it's exactly the kind of thing a linter could check if it were stated.

5. **"Copy the Base Stylesheet verbatim" (Hard rule 5) is unactionable from FABLE5.md alone.** FABLE5.md never contains the base stylesheet; it lives in `pages/base.css` (and is reproduced in CLAUDE.md). Someone handed only FABLE5.md cannot comply. **Recommendation:** rephrase to "never edit `pages/base.css` as part of page work; treat it as read-only" — which appears to be the actual intent.

6. **Scroll-progress snippet divides by zero on short pages.** `el.scrollHeight - el.clientHeight` is 0 when a page doesn't scroll, producing `NaN%` (silently ignored by CSS, but still a latent bug the rule forces onto every page verbatim). **Recommendation:** bless a guarded version in the skeleton, e.g. `const max = el.scrollHeight - el.clientHeight; …width = (max > 0 ? el.scrollTop / max * 100 : 0) + '%';`.

7. **The `.ref` marker is inert.** `<span class="ref" title="[1]">[1]</span>` duplicates its own text in the `title` tooltip and isn't a link, so a reader can't jump to reference `[1]` (each `<li>` even has an `id="rN"` anchor waiting). If non-clickability is intentional (visual subtlety), FABLE5.md should say so; otherwise `<a class="ref" href="#rN">` would be strictly better. Either way the `title` attribute as specified adds nothing.

8. **"Summary" is defined twice with slightly different wording.** The hero `.lead` ("2–4 sentence summary") and required-header-block item 3 ("Summary — 2–4 sentences") are presumably the same element, but that's inferred, not stated.

9. **No `--accent` guidance.** `#YOUR_COLOR` is a free choice with no palette, no contrast floor against `--bg: #0c0a0d`, and no rule about clashing with the semantic `--good`/`--warn`/`--bad` colors. A low-contrast or red-ish accent would silently break both readability and the status-color language.

10. **Several readability rules are unlintable as written.** "One idea per paragraph," "plain-English sentence before a dense paragraph," and "skimmable on its own" are judgment calls — fine for a human/agent reviewer, but the rubric mixes them freely with mechanical rules (sentence counts, required blocks) without distinguishing which ones a tool can enforce. Splitting the list into "mechanical (CI-checkable)" and "editorial (reviewer-checked)" would make automation tractable.

11. **Table semantics unspecified.** The `.tbl` spec shows `<tr><th>…` with no `<thead>`/`<tbody>` guidance; base.css styling works either way, so pages will drift between the two forms. Pick one (the example now models `<thead>`/`<tbody>`).

---

## 3. Tooling and automation recommendations

Ordered by effort-to-value; the first three cover most of the standard.

1. **A repo-local check script (`tools/fable5-lint.mjs` or Python) run via `npm run lint:pages`.** Most FABLE5 rules are mechanical and page-specific — no off-the-shelf linter knows them. One small script can assert, per HTML file: required `<head>` links present and in order; no external scripts/styles beyond Google Fonts + `base.css`; no `../style.css`; `#prog` div + scroll snippet present; exactly one `<script>` block; hero contains back-link, kicker, `h1`, `.lead`, date in `YYYY-MM-DD`; a `.note` TL;DR before the first numbered section; every `.ref` marker `[n]` has a matching `li#rn` and vice versa; only canonical component classes used (whitelist); eyebrow numbers sequential; paragraph sentence-count heuristic (flag >3 sentences for human review rather than hard-fail). This is the single highest-value item because it encodes the *actual* standard, not a generic one.

2. **`html-validate` (npm) with a project config.** Catches malformed markup, duplicate IDs, and bad nesting that the custom script shouldn't reimplement. Its `element-required-attributes` and custom-rule API can also host some FABLE5 rules if you'd rather extend it than keep a standalone script. Alternative: W3C `vnu.jar` if you prefer zero npm config, but it can't be extended with project rules.

3. **A Claude Code project skill (e.g. `/fable5-check`) + a `PostToolUse` hook.** The repo already has a `page-reviewer` agent for the editorial rubric; a skill that (a) runs the mechanical lint script, (b) then dispatches `page-reviewer` for the judgment-call rules, gives one command covering both halves of §2 item 10. Wiring the lint script into a `PostToolUse` hook on `Write|Edit` of `pages/*.html` makes violations surface at write time instead of review time — hooks are the right mechanism because they run mechanically regardless of what the agent remembers.

4. **`lychee` (or `linkinator`) for reference URLs.** The workflow requires every citation to be fetched and confirmed; a link checker in CI at least guarantees the URLs still resolve over time (it cannot verify a source *supports* a claim — that stays with the agent workflow). Run it on `pages/**/*.html`, allowlist DOIs that block bots, and treat failures as "downgrade to UNVERIFIED" prompts rather than hard CI failures.

5. **`stylelint` scoped to inline `<style>` blocks and `pages/base.css`.** With `stylelint-config-standard` plus a `declaration-property-value-allowed-list`-style custom rule, it can flag pages that redefine base classes in their override block (Hard rule 5's real intent). Lower priority: the override blocks are small and the custom script can do a cruder version (reject any selector that matches the canonical class list).

6. **`pa11y` or `axe-core` CLI, advisory-only.** The pages are dark-theme-only with fixed colors; an accessibility pass would catch contrast regressions when someone picks a bad `--accent` (§2 item 9) and missing alt/aria on injected SVGs. Run as a non-blocking CI step so it informs rather than gates.

7. **Not recommended: Prettier on the HTML pages.** The pages embed hand-formatted SVG template literals and deliberate one-line component markup; Prettier's HTML/JS reflow would churn diffs and fight the skeleton's formatting conventions for little gain. If formatting drift becomes a problem, `.editorconfig` (indent, charset, final newline) is the lighter tool.

### Suggested wiring

```jsonc
// package.json
"scripts": {
  "lint:pages": "node tools/fable5-lint.mjs && html-validate 'pages/*.html' fable5-example.html",
  "lint:links": "lychee --no-progress 'pages/**/*.html'"
}
```

CI runs `lint:pages` as blocking and `lint:links` + `pa11y` as advisory. The Claude Code hook runs `lint:pages` on any page write, and `/fable5-check` chains lint → `page-reviewer`.

---

## 4. Summary

- `fable5-example.html` now demonstrates every FABLE5.md rule (including the previously missing plain-English-lead-in, in-paragraph bolded number, in-body KEY FINDING, prose citations, and `h3`), is annotated as a self-teaching template, and documents its own root-vs-`pages/` path deviation. All content remains placeholder.
- FABLE5.md has one outright contradiction (two reference-list markups), one omission (TL;DR missing from the skeleton), and a set of smaller ambiguities (labels, numbering, `.ref` semantics, accent color, lintable-vs-editorial rules) listed in §2 with concrete fixes.
- Enforcement is best served by a small repo-specific lint script + `html-validate` as the blocking layer, `lychee`/`pa11y` as advisory layers, and a Claude Code skill + hook to make the standard self-applying during agent sessions.
