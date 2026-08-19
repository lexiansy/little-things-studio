# Contributing

Thank you for considering a contribution to Little Things Studio. The project is intentionally small and security-bounded, so focused proposals are easier to review than broad rewrites.

## Before opening a change

1. Read `AGENTS.md`, `README.md`, `docs/CURRENT_STATUS.md`, `docs/NEXT_STEPS.md`, and `docs/IMPORT_SECURITY_MODEL.md`.
2. Check existing issues before opening a new one.
3. Keep the proposal within the documented local-first, single-file, non-scriptable model.
4. For security concerns, do not open a public issue; follow `SECURITY.md`.

## Development

No dependency installation or build step is required.

```powershell
node scripts/serve.mjs
npm run check
```

Use the simple and unsafe fixtures for import regression checks. Clearly separate automated results, browser observations, and owner observations.

## Pull requests

- Keep each pull request bounded and explain the user-visible outcome.
- Describe changed files, safety impact, and checks actually run.
- Include screenshots for visible UI changes.
- Do not include credentials, private email addresses, local paths, generated agent reports, private conversations, or unrelated changes.
- Do not weaken the sandbox, CSP, sanitizer, immutable-source boundary, external-network defenses, or safe-export gate without an explicit security rationale and regression tests.

Submitting a change does not guarantee acceptance or a release timeline.
