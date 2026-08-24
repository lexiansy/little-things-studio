# Next steps

Current phase: accepted `v0.1.0-beta.1` public baseline plus an Unreleased local compatibility/architecture experiment awaiting owner acceptance.

## Experiment acceptance checkpoint

1. Preserve the accepted `main` and public release baseline; do not treat the experiment as a released next version.
2. Have the owner open the Traditional Chinese and English previews, import an ordinary static HTML file, and confirm the compatibility summary is understandable.
3. Import the public multi-view fixture, switch to another detected panel, edit it, and confirm view switching does not appear in the adjustment history.
4. Change supported text or appearance on an inert button or link, confirm the original interaction stays disabled, then export and re-import the safe copy.
5. Check the navigator, summary, inspector states, and primary actions on a phone viewport.
6. Try owner-chosen HTML files and record each reproducible success or limitation without attributing results to a model brand.

Automated, browser-observed, and owner-observed evidence must remain distinct. Real phone touch and owner-owned HTML compatibility are still owner acceptance tasks.

## If the experiment is accepted

Lexian may then decide whether to integrate the experiment and whether a future prerelease should be named `v0.2.0-beta.1`. That decision requires a separate scope. Integration, push, release, deployment, and version changes are not implied by this candidate.

## If the experiment is not accepted

Record the exact fixture or owner sample, visible symptom, expected result, selected element/state, and export outcome. Keep the recoverable bilingual checkpoint and experiment commits intact; do not widen the security boundary to make a dynamic page appear complete.

## Safety boundaries to preserve

- Import a local copy; never overwrite the original file or persist imported content.
- Keep imported JavaScript unexecuted and active interactions inert or blocked.
- Keep the restrictive iframe sandbox, CSP, sanitizer, and external-network defenses.
- Maintain separate runtime mapping, immutable source, allowlisted session edits, and preview-only state.
- Export only a new HTML copy through the explicit safety gate.
- Diagnose unsupported structures instead of silently approximating them.
- Keep arbitrary websites, SPA/framework routers, multi-file/PWA projects, remote fetching, direct writeback, and server-side import out of scope.
