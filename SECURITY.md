# Security policy

## Supported version

`v0.1.0-beta.1` is the current public beta prerelease. Security fixes, if required, will be scoped to the documented local-first import, editing, and export boundaries.

## Reporting a vulnerability

Please do not disclose suspected vulnerabilities, exploit details, or unsafe fixture variants in a public issue.

Use GitHub's private vulnerability reporting feature when it is available in the repository Security tab. If that feature is unavailable, open a public issue containing only a request for a private contact channel and no vulnerability details.

Include the affected version, a minimal reproduction, expected impact, and whether imported content or export is involved. Please allow time for acknowledgement and investigation before any disclosure.

## Scope reminders

Imported HTML is treated as hostile. The intended boundary blocks scripts, active handlers, forms, navigation, downloads, embedded contexts, and external-network resources; editing remains session-only and export requires explicit safety gates. A bypass of those boundaries is security-relevant.
