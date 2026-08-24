# Repository working agreement

This file applies to the whole repository.

## Sources of truth

- The repository, its executable artifacts, and Git history are the engineering source of truth.
- Stable product direction may live in maintained project documentation. Chat messages are not repository truth.
- Before each work session, read `README.md`, `docs/CURRENT_STATUS.md`, `docs/NEXT_STEPS.md`, this file, and any more specific `AGENTS.md` in scope.

## Operating boundaries

- Keep orientation, construction, validation, commit, push, merge, release, and deployment as separate operations.
- A continuous instruction may authorize several of those operations; execute only the explicitly authorized sequence and stop at its stated checkpoint.
- Within one authorized scope, carry orientation, construction, bounded corrections, checks, allowed checkpoints, and the requested report through in the same session. Do not hand back an ordinary finding, a first check failure, or partial progress when it can be resolved safely inside that scope.
- Without explicit authorization for the current session, do not commit, push, merge, create a pull request, tag, release, publish, or deploy.
- Never describe an unperformed check, browser observation, owner review, or release action as passed.
- Stop when the source is uncertain, the worktree contains unexplained changes, remotes differ from the stated gate, evidence is insufficient, or safe completion requires wider scope.

## Security and public-repository hygiene

- Keep imported content local, sanitized, non-scriptable, and isolated according to `docs/IMPORT_SECURITY_MODEL.md`.
- Do not weaken the iframe sandbox, CSP, sanitizer, external-network defenses, immutable-source boundary, or safe-export gate without a separately authorized security review.
- Never commit credentials, tokens, private email addresses, local absolute paths, private collaboration transcripts, or internal-only handoff data.
- Agent reports belong in `docs/reports/`. That directory is local-only handoff output and must not be staged or committed.
- Public engineering truth belongs in README files, maintained status documents, source code, checks, and Git history.

## Validation and commits

- Preserve unrelated work and never use destructive cleanup to make a gate pass.
- Stage only the intended paths. Inspect staged names and `git diff --cached --check` before committing.
- Keep product claims separated from automated, browser-observed, and owner-observed evidence.
- The repository must remain usable without requiring contributors to inspect terminal logs they did not create.

## Handoff format

- A Coding Agent's final chat report must begin with `## For Yao` and use plain language to state: what is done, whether Yao must act, the one next step, the stop condition, and the complete report filename when a report was requested.
- The same plain-language `For Yao` requirement applies to both normal completion and hard-stop handoffs; Yao must not be asked to infer status from logs or raw diffs.
- A saved Markdown handoff must contain both `## For Yao` and `## For Lex`.
- `For Lex` must list sources read, changed files and diff summary, checks/tests, Git status, limitations/risks, and the next safe construction point.
