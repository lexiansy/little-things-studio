# Next steps

Current phase: accepted `v0.1.0-beta.1` public beta baseline with an owner-accepted functional baseline and reissued fictional, generic live sample; release/public readback is complete.

## Accepted-baseline checkpoint

1. Preserve this beta as the accepted public-release baseline.
2. Record any concrete, reproducible public-release issue without expanding the product scope.
3. Keep automated, browser-observed, owner-observed, and public-readback evidence distinct.
4. Require a separately authorized construction session for any future product work.

Publishing an npm package, starting a new product version, changing the import security model, and deploying anywhere beyond the documented GitHub Pages site remain separate actions and are not authorized by this release.

## Future product direction

The next bounded product direction must start from fresh `main` in a new branch and a separately authorized work session. Reasonable candidates include accessibility refinement, clearer unsupported-structure diagnostics, and broader deterministic test coverage. No next version has started.

## Safety boundaries to preserve

- Import a local copy; never overwrite the original file.
- Prefer static DOM and reject or neutralize active behavior.
- Keep the preview isolated with the restrictive iframe sandbox and CSP.
- Maintain a runtime element registry separate from source markup.
- Keep session edits independent from the immutable source string.
- Export only a new HTML copy through the explicit safe gate.
- State unsupported structures clearly instead of silently approximating them.
- Keep arbitrary websites, framework applications, multi-file/PWA projects, remote fetching, and direct writeback out of scope.
