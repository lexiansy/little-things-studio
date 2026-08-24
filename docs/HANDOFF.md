# Engineering handoff

## Read order

1. `AGENTS.md`
2. `README.md` and `README.zh-TW.md`
3. `docs/CURRENT_STATUS.md`
4. `docs/NEXT_STEPS.md`
5. `docs/COMPATIBILITY.md`
6. `docs/IMPORT_SECURITY_MODEL.md`
7. `fixtures/compatibility/manifest.json`
8. Applicable source modules and checks

## Current implementation

`main` and the public site remain the accepted `v0.1.0-beta.1` baseline. The local `experiment/compatibility-architecture-v0.2` branch is an Unreleased engineering candidate awaiting owner acceptance. It does not assign or publish a new version.

The experiment keeps the local-first single-file boundary and adds a two-axis element model: original interaction is `safe` or `inert`, while visual editing is `editable`, `limited`, or `unsupported`. Supported appearance editing no longer implies that imported interaction may execute. Buttons, links, and form controls can remain inert while their allowlisted text or appearance is adjusted. Blocked scripts, handlers, navigation, forms, downloads, popups, embedded contexts, and network targets are never restored by export.

Nested text editing targets independent text units instead of replacing a parent element's complete `textContent`. The inspector distinguishes text, inner element, and outer container selection. Imported edits remain session-only, use validated allowlisted properties, participate in undo/redo, and are reconstructed into a new safe copy without runtime markers.

## Architecture landmarks

- `src/index.template.html` and `src/styles/app.css`: app shell and styles.
- `src/app/00-runtime.js` through `src/app/90-ui-rendering.js`: focused runtime, i18n, analysis, sanitization, classification, view navigation, selection/editing, history, export, and UI modules.
- `src/app/app.js`: application controller and DOM integration.
- `scripts/build.mjs`: zero-dependency deterministic assembler for root `index.html`.
- `scripts/check-build-parity.mjs` and `scripts/check-module-graph.mjs`: generated-artifact and source-boundary contracts.
- `fixtures/compatibility/manifest.json`: generic compatibility expectations and exact fixture hashes.
- `scripts/check-compatibility.mjs` and `scripts/check-compatibility-architecture.mjs`: corpus and architecture contracts.
- `index.html`: tracked standalone deployment/download artifact generated from source; do not hand-edit it independently.

## Compatibility behavior

- The import analysis runs before sanitization so the UI can explain scripts, handlers, dependencies, static panels, and limited graphics that sanitization removes or neutralizes.
- The compatibility summary reports detected views, visually editable and limited/unsupported elements, inert interactions, removed scripts/handlers, and blocked external or relative resources.
- The view navigator only appears when multiple reasonable views already exist in the static DOM. It can expose `tabpanel`, hidden/`aria-hidden`, anchor-target, or sibling panel candidates without running the source page's JavaScript.
- Navigator overrides are preview-only: switching views does not enter history or export, while actual edits inside each view persist.
- JavaScript-created DOM, framework routing, remote dependencies, canvas drawing code, Shadow DOM internals, and directly selectable pseudo-elements remain limited or unsupported and must receive specific diagnostics.

See [HTML compatibility](COMPATIBILITY.md) for the maintained support matrix.

## Non-negotiable safety model

- Treat imported input as hostile; do not execute imported scripts or handlers.
- Do not add iframe script, form, popup, download, or top-navigation permissions.
- Do not loosen CSP, sanitizer, external-network neutralization, or immutable-source rules.
- Keep behavior attributes such as `href`, `src`, `action`, event handlers, and network targets outside the edit allowlist.
- Keep runtime IDs, selection classes, overlays, edit metadata, and preview-only navigation state out of export.
- Rebuild export from the sanitized detached base and apply only validated text/visual session edits.
- Keep export blocked whenever removed capabilities, uncertain mapping, or invalid values prevent a bounded result.

## Next safe point

Stop at owner acceptance of the local experiment. Owner checks should cover both languages, a normal static file, public tabs and unsafe fixtures, inert-button visual editing, actual export/re-import, phone layout, and owner-chosen HTML samples. Do not merge, push, rename the version, release, deploy, or widen the security model without a separate authorization.
