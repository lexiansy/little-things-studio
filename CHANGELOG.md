# Changelog

All notable public changes will be documented in this file.

## [Unreleased]

- Improved first-visit clarity with a prominent live-app link, a two-choice start screen, clearer own-HTML import wording, and one consolidated adjustment log.
- Added an in-app Traditional Chinese / English interface switch and a responsive editor action bar that keeps import, safe download, and return actions readable at narrow widths.
- Added an experimental compatibility model that separates disabled original interaction from supported visual editing, including bounded appearance controls for inert buttons, links, and form controls.
- Added structure-preserving nested-text editing, preview-only navigation for detected panels, and a bilingual compatibility summary for JavaScript, resource, graphics, and multi-view limits.
- Added a generic compatibility corpus and a deterministic zero-dependency source build with tracked standalone-artifact parity checks.
- Published the compatibility architecture from `main` as a public review candidate after automated and controlled browser checks; Yao's phone, owner-chosen HTML, and final owner acceptance remain pending.

## [0.1.0-beta.1] - 2026-08-19

First public beta prerelease:

- Standalone local-first visual editor demo.
- Reissued before external adoption with a fictional, generic built-in sample and a clean single-root public history.
- Safe, view-only, and blocked classification for local single-file HTML preview.
- Session-only editing of approved safe elements with undo/redo, drag, and resize.
- Gated export of an edited HTML copy and local reopen flow.
- Restrictive preview sandbox, CSP, sanitizer, and external-network defenses.
- English and Traditional Chinese project documentation, MIT license, community templates, and dependency-free CI checks.
