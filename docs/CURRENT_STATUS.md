# Current status

Last verified baseline: 2026-08-19
Local experiment prepared: 2026-08-24

## Accepted public baseline

- Phase: `v0.1.0-beta.1` public beta prerelease
- Status: functional baseline and reissued generic live sample owner accepted; release/public readback complete
- Canonical branch: `main`
- Canonical executable: `/index.html`
- Canonical repository: `https://github.com/lexiansy/little-things-studio`
- Live demo: `https://lexiansy.github.io/little-things-studio/`
- Release tag: `v0.1.0-beta.1`

The public baseline remains unchanged by the local experiment. Its built-in preview uses fictional, generic sample content. Private construction history, local reports, and collaboration data are not part of the public repository history.

## Unreleased compatibility experiment

- Branch: `experiment/compatibility-architecture-v0.2`
- Status: local engineering candidate; owner acceptance pending
- Version: still `v0.1.0-beta.1`; no next-version name has been assigned
- Publication: not merged, pushed, released, tagged, or deployed

The experiment keeps imported content static and isolated while separating two questions that were previously represented by one label:

- **Interaction safety:** whether original navigation, form, script, popup, download, or other active behavior is inert or blocked.
- **Visual editability:** whether the whole element, a bounded text unit, or allowlisted appearance properties are editable, limited, or unsupported.

This allows supported text and appearance changes on inert buttons, links, and form controls without restoring their original behavior. Nested text units can be edited without replacing neighboring elements. A preview-only navigator exposes detected panels already present in a single static DOM, and a bilingual compatibility summary explains views, visual support, inert interactions, removed scripts/handlers, and blocked dependencies. Preview-only view state is excluded from adjustment history and export.

## Architecture and compatibility evidence

- The source is divided into focused i18n, analysis, sanitization, classification, view-navigation, selection/editing, history, export, and UI-rendering modules.
- A zero-dependency deterministic build assembles the tracked standalone root `index.html`; parity and module-graph checks guard the generated artifact.
- `fixtures/compatibility/manifest.json` defines generic expected display, edit, diagnostic, network, export, and re-import outcomes for static, nested-interactive, multi-view, CSS-cascade, dependency, dynamic-DOM, graphics, and unsafe-capability fixtures.
- Automated contracts cover the corpus schema and hashes, independent interaction/visual states, nested-text preservation, preview-only navigation, CSS override validation, marker removal, and security invariants.

These are engineering artifacts, not owner evidence. The local candidate still requires owner testing with ordinary static HTML, the multi-view fixture, export/re-import, a phone viewport, and owner-chosen HTML samples. No real cross-model corpus, physical-device matrix, network/HAR capture, broad external adoption, or third-party security audit is claimed.

## Compatibility boundaries

- **Broadly supported:** self-contained single-file static HTML with present DOM, inline CSS, common text and layout elements, safe data URI images, and detected static panels.
- **Partially supported:** pages whose static shell remains useful but that depend on JavaScript-created DOM, JavaScript-controlled tabs, external or relative resources, SVG internals, pseudo-elements, canvas drawing code, or custom-element/Shadow DOM behavior. The summary explains the resulting omissions or limits.
- **Unsupported project boundary:** arbitrary live sites, SPA/framework routers, multi-file projects, PWA/project source, remote fetching, imported JavaScript execution, direct writeback, or server-side import.

See [HTML compatibility](COMPATIBILITY.md) for the user-facing matrix and [Import security model](IMPORT_SECURITY_MODEL.md) for the unchanged security boundary.

## Safety invariants

- Imported scripts do not run; inline handlers and active navigation/form/download/popup behavior remain removed or inert.
- External network and relative-resource loading remain blocked.
- The original file and immutable source string are never overwritten.
- Runtime IDs, editor markers, selection state, and preview-only navigation overrides are excluded from exported HTML.
- Export reconstructs only allowlisted text and visual changes and remains blocked when the safety gate cannot prove a bounded result.
