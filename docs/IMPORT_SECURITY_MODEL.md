# Import security model

This document describes the bounded security contract for local single-file HTML preview, session editing, and safe-copy export in `v0.1.0-beta.1`. It is a design boundary, not a claim that arbitrary HTML can be made safe.

## Threat model

An imported file may contain scripts, event handlers, forms, navigation, downloads, external URLs, CSS resource loads, embedded documents, deceptive controls, or malformed/unsupported structure. The application therefore treats all imported content as hostile and does not execute it as a normal webpage.

## Input and immutable source

- Only a user-selected `.html` or `.htm` file with an HTML MIME type or expected extension is accepted.
- The size limit is 5 MiB.
- The file is read locally with `File.text()`; the app has no upload or remote-fetch path.
- The original text is stored as a frozen session value and is never written back.
- Every preview, edit, and export action operates on a separate parsed or sanitized copy.

## Sanitization and classification

- Active or embedding elements such as `script`, `iframe`, `object`, and `embed` are blocked.
- Inline event handlers, active URLs, forms, navigation, downloads, and external resource references are removed, neutralized, or classified out of the editable path.
- CSS external-resource forms are neutralized.
- Remaining elements are classified as `safe`, `view-only`, or `blocked`.
- `safe` means eligible for the bounded edit surface; it does not mean the original input is generally trusted.
- `view-only` may be inspected but its edit controls remain disabled with a reason.
- `blocked` prevents safe-copy export.

## Preview isolation

The sanitized document is displayed in an iframe with `sandbox="allow-same-origin"` and `referrerpolicy="no-referrer"`. The sandbox deliberately omits scripts, forms, popups, downloads, and top navigation.

An injected CSP uses, among other directives:

- `default-src 'none'`
- `script-src 'none'`
- `connect-src 'none'`
- `form-action 'none'`
- `base-uri 'none'`
- `style-src 'unsafe-inline'`
- `img-src data: blob:`

The parent application also blocks activation, auxiliary clicks, keyboard activation, and form submission in the preview. No `fetch`, `XMLHttpRequest`, or `WebSocket` path exists in the application.

## Session-only editing

- A runtime registry assigns internal IDs after sanitization; those IDs are not source content.
- Only registered `safe` elements can enter the edit path.
- Text editing is limited to elements with no child elements, preventing accidental deletion of card structure.
- Style, position, drag, and resize values live in session edit state and apply to the preview copy.
- Undo/redo stores session edit snapshots.
- Runtime IDs, selection classes, overlays, resize handles, and edit metadata are excluded from serialization.

## Safe-copy export gate

Export is disabled unless all of the following are true:

- The import contains zero blocked elements.
- Every edited record is still classified `safe`.
- Source mapping is complete and unique.
- Every edited property is in the allowlist and every value validates.
- View-only markup remains unchanged.
- No internal marker would be serialized.

When the gate passes, the app parses the immutable original into a detached document, resolves allowlisted source paths, applies plain-text and allowlisted style changes, asserts the invariants, and downloads a new `<original-name>.lts-edited.html` Blob. The original file is not overwritten and no file-system write API is used.

## Explicit non-goals

- No arbitrary live-site, framework, multi-file, project, or PWA import.
- No imported JavaScript execution.
- No remote fetch, external-network access, direct writeback, server storage, or deployment.
- No editing or export mutation of `view-only` or `blocked` elements.
- No guarantee for structures outside the documented bounded slice.

Any change to these boundaries requires explicit security review and new regression evidence.
