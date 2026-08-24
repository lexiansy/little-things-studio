# Little Things Studio

**Live app:** [Open Little Things Studio →](https://lexiansy.github.io/little-things-studio/?lang=en)

No installation or sign-in is required on phone or desktop. On the start screen, choose **Import HTML file** or **Try the built-in demo**; use the top-right **中** switch for Traditional Chinese. Changing the Studio interface language never translates or rewrites imported page text.

[繁體中文](README.zh-TW.md)

Little Things Studio is a dependency-light, local-first visual editor prototype for learning from and making bounded adjustments to a single self-contained HTML file. The owner-accepted `v0.1.0-beta.1` functional baseline runs entirely in the browser and keeps imported work in a temporary preview session. Its built-in preview uses fictional, generic sample content.

Little Things Studio was created together by Lexian & Yao, with implementation assistance from OpenAI Codex.

![Little Things Studio v0.1.0-beta.1 built-in demo](docs/assets/little-things-studio-v0.1.0-beta.1.png)

## What this beta can do

> Branch note: the compatibility capabilities below are part of the local Unreleased experiment and still await owner acceptance. The live app and `main` remain the accepted `v0.1.0-beta.1` baseline.

- Open the built-in visual editing demo.
- Import a local, single-file `.html` or `.htm` document up to 5 MiB.
- Report interaction safety separately from visual editability, so an inert button or link can still have supported text and appearance adjusted without restoring its original behavior.
- Adjust approved content in a sanitized, in-memory preview, including independent nested text units and a bounded allowlist of typography, color, box, spacing, positioning, and flex/grid properties.
- Drag and resize visually editable elements, with session undo and redo.
- Inspect a bilingual compatibility summary after import and use the preview-only view navigator when a single static document contains multiple detected panels.
- Export an edited HTML copy only when the export safety gate passes, then reopen that copy for another local preview.
- Return to the built-in demo without changing the original imported file.

## Safety model

Imported JavaScript, inline event handlers, forms, navigation, downloads, embedded browsing contexts, and external network resources are blocked or neutralized. The preview iframe does not receive script, form, popup, download, or top-navigation permissions. Imported editing is limited to the sanitized preview copy and its session state. The immutable source string is retained for safe reconstruction; the original file is never overwritten.

See [Import security model](docs/IMPORT_SECURITY_MODEL.md) for the detailed boundaries.

## Important limitations

This beta is not a general-purpose website importer. Self-contained static HTML is the broadly supported boundary. Pages that depend on imported JavaScript, external or relative resources, canvas drawing code, custom-element internals, or pseudo-element selection are partial or limited; imported scripts never run and remote resources are not fetched. Framework applications, routers, multi-file projects, PWA or project source, and direct writeback remain unsupported. Export is unavailable whenever the candidate cannot prove the bounded safe-edit and source-mapping rules. See [HTML compatibility](docs/COMPATIBILITY.md) for the support levels and diagnostics.

## Start without coding

1. Open the GitHub Pages [live app](https://lexiansy.github.io/little-things-studio/?lang=en) in a phone or computer browser. There is nothing to install and no account is required.
2. The app opens on a simple start screen. Choose **Try the built-in demo** to explore the editor, or **Import HTML file** to work with your own page. Use the top-right **中** language switch or open the `?` guide whenever needed.
3. To edit your own page, prepare one self-contained `.html` or `.htm` file no larger than 5 MiB. A live URL, ZIP, folder, or framework project such as React or Vue cannot be imported directly.
4. Choose **Import HTML file** on the start screen or above the workbench, then select the file. Studio reads a temporary copy in your browser; it does not upload, translate, or overwrite the original.
5. Select an element to see two separate results: whether its appearance can be changed and whether its original interaction is disabled. For example, a button may remain inert while supported text and appearance edits are available.
6. When the safety checks pass, choose **下載修改後 HTML (Download edited HTML)** to receive a new `.lts-edited.html` file. Studio does not publish the site for you.

If you run into a reproducible problem, report it in [GitHub Issues](https://github.com/lexiansy/little-things-studio/issues). For a suspected security vulnerability, follow [SECURITY.md](SECURITY.md) instead of posting details publicly.

## Run locally (contributors)

The repository has no runtime dependencies and requires no package installation.

```powershell
node scripts/serve.mjs
```

Open <http://127.0.0.1:4174/index.html>. You may also use another static server from the repository root.

Try the fixtures:

- `fixtures/v0.6/simple-static.html` demonstrates editable static elements and an inert button with supported visual editing.
- `fixtures/v0.6/unsafe-blocked.html` demonstrates blocked scripts, handlers, navigation, forms, and external resources.
- `fixtures/compatibility/` is the generic deterministic corpus for static, nested-text, multi-view, cascade, dependency, graphics, dynamic-DOM, and unsafe-capability boundaries.

## Checks

Node.js 22 or newer is recommended.

```powershell
npm run check
```

The repository has no runtime dependencies and installs no packages. `npm run build` deterministically assembles the tracked standalone `index.html` from the source modules; the full check verifies artifact parity, module boundaries, the compatibility corpus, import sandbox and CSP boundaries, session-only editing, safe-copy export, syntax, and public-repository readiness.

## Project status

`v0.1.0-beta.1` remains the accepted public beta prerelease on `main`, reissued on 2026-08-19 with a generic fictional built-in sample before external adoption. The functional baseline and reissued generic live sample are owner accepted, and release/public readback is complete. That baseline remains available from the [GitHub repository](https://github.com/lexiansy/little-things-studio), [release page](https://github.com/lexiansy/little-things-studio/releases/tag/v0.1.0-beta.1), and live app above. The local `experiment/compatibility-architecture-v0.2` branch is an Unreleased compatibility and architecture candidate; it has not changed the public baseline and still requires owner acceptance. No next version has been assigned. See [Current status](docs/CURRENT_STATUS.md), [HTML compatibility](docs/COMPATIBILITY.md), and [Next steps](docs/NEXT_STEPS.md).

## Contributing and security

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing a change. Do not disclose suspected security vulnerabilities in a public issue; follow [SECURITY.md](SECURITY.md).

## License and credits

The project is available under the [MIT License](LICENSE). Project roles and acknowledgements are listed in [CONTRIBUTORS.md](CONTRIBUTORS.md), and public visual assets are documented in [Asset provenance](docs/ASSET_PROVENANCE.md).
