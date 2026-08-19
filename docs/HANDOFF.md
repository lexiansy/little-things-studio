# Engineering handoff

## Read order

1. `AGENTS.md`
2. `README.md`
3. `docs/CURRENT_STATUS.md`
4. `docs/NEXT_STEPS.md`
5. `docs/IMPORT_SECURITY_MODEL.md`
6. Applicable source and checks

## Current implementation

The repository contains the accepted `v0.1.0-beta.1` public beta checkpoint with an owner-accepted functional baseline and reissued fictional, generic live sample. Release/public readback is complete. The application is a standalone `index.html` with local fixtures and dependency-free Node.js checks. The canonical repository is `https://github.com/lexiansy/little-things-studio`, and the live demo is `https://lexiansy.github.io/little-things-studio/`.

The pre-public baseline includes the built-in visual editor, safe single-file import preview, session-only editing of `safe` imported elements, and gated safe-copy export/reopen. The original source is never overwritten. The workbench vignette is a `.workbench` background layer; there is no active `.workbench::before` vignette layer.

## Architecture landmarks

- `index.html`: application markup, styles, sanitizer, runtime element registry, editing state, history, export reconstruction, and UI.
- `fixtures/v0.6/simple-static.html`: self-contained positive fixture with an intentionally tiny embedded test pixel.
- `fixtures/v0.6/unsafe-blocked.html`: reserved `.invalid` sentinels for scripts, handlers, forms, navigation, nested contexts, and external-resource blocking.
- `scripts/check-*.mjs`: static safety and regression contracts.
- `scripts/serve.mjs`: dependency-free loopback-only static preview.

## Non-negotiable safety model

- Treat imported input as hostile.
- Do not add iframe script, form, popup, download, or top-navigation permissions.
- Do not loosen CSP or external-network neutralization.
- Edit only registered `safe` elements in the sanitized preview/session state.
- Apply text changes only to safe leaf-text elements.
- Keep runtime IDs, selection classes, overlays, and edit metadata out of exported source.
- Rebuild export from a detached parse of the immutable original and allowlisted session edits.
- Keep `view-only` content unchanged and disable export whenever blocked content or uncertain mapping exists.

## Next bounded direction

Preserve the accepted public-beta baseline and record any concrete, reproducible issue without widening scope. Any product work requires fresh `main`, a new branch, and explicit scope. PWA, project mode, arbitrary website import, direct writeback, npm publication, additional deployment targets, and the next product version remain out of scope.
