# Next steps

Current phase: `v0.1.0-beta.1` public beta prerelease with an owner-accepted functional baseline and a fictional, generic built-in sample.

## Immediate checkpoint

1. Let the owner and release steward inspect the reissued public repository, prerelease asset, generic screenshot, and live GitHub Pages demo.
2. Record owner visual acceptance only after the generic live sample is actually inspected.
3. Record any concrete, reproducible public-release issue without expanding the product scope.
4. Keep this beta as the accepted functional baseline until a separately authorized construction session begins.

Publishing an npm package, starting a new product version, changing the import security model, and deploying anywhere beyond the documented GitHub Pages site remain separate actions and are not authorized by this release.

## Product direction after acceptance

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
