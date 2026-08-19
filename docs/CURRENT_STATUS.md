# Current status

Last verified: 2026-08-19

## Public beta prerelease

- Phase: `v0.1.0-beta.1` public beta prerelease
- Status: functional baseline and reissued generic live sample owner accepted; release/public readback complete
- Canonical executable: `/index.html`
- Canonical repository: `https://github.com/lexiansy/little-things-studio`
- Live demo: `https://lexiansy.github.io/little-things-studio/`
- Release tag: `v0.1.0-beta.1`
- Distribution: source repository plus a standalone HTML application; no package installation or build step
- Release state: public GitHub repository, GitHub prerelease, standalone HTML release asset, and GitHub Pages site

The release is based on the owner-accepted pre-public product baseline and a clean single-root public repository history. Its built-in preview uses fictional, generic sample content. Private construction branches, local handoff paths, collaboration transcripts, and private engineering history are intentionally not part of this public repository history.

## Implemented product slice

- Fictional, generic built-in visual editing demo with selection, inspector controls, drag, resize, undo/redo, viewport switching, and a change summary.
- Local single-file HTML import with a 5 MiB limit and explicit `safe`, `view-only`, and `blocked` classification.
- Session-only editing of approved `safe` elements: leaf text, font size, colors, width, height, radius, x/y position, drag, resize, undo, and redo.
- Safe-copy HTML export only after blocked-count, safe-edit, source-mapping, value-validation, and serialization gates pass.
- Reopening the exported copy and returning to the built-in demo.
- A non-scriptable iframe preview with restrictive CSP, external-resource neutralization, and interaction blocking.

## Evidence kept in this repository

- Automated checks cover the standalone baseline, import security, imported editing, safe export, syntax, public documentation, and repository hygiene.
- Browser smoke covers the built-in demo, simple and unsafe fixtures, safe edits, drag/resize, undo/redo, safe export/reopen, disabled unsafe controls, console state, and horizontal-overflow regression.
- Owner-observed evidence: Yao inspected the reissued generic live sample and accepted `LITTLE THINGS DEMO` / `一頁小日常`, the selectable `雙星光`, the LTS header mark, the fox footer mark, and the full `Created together by Lexian & Yao` credit; no horizontal overflow or bottom black-line regression was observed.
- Release/public readback evidence: Lexian independently read back the unauthenticated public repository and profile, prerelease page, standalone asset, and cache-busted GitHub Pages deployment; generic markers were present and retired/private-demo markers were absent.

Automated checks, browser observations, owner observations, and release/public readback are distinct evidence. This record does not claim an unperformed physical-device matrix, network/HAR capture, broad external adoption, or third-party security audit.

## Known limits

- This is not an arbitrary website, framework, or multi-file project importer.
- Imported JavaScript and active behaviors do not run.
- `view-only` and `blocked` content cannot enter the editing or export write path.
- The original file is never overwritten; export creates a new `.lts-edited.html` copy.
- PWA, project mode, direct writeback, remote fetching, collaboration, and deployment are out of scope.
