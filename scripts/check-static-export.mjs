import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(import.meta.dirname, "..");
const indexPath = path.join(root, "index.html");
const simplePath = path.join(root, "fixtures", "v0.6", "simple-static.html");
const unsafePath = path.join(root, "fixtures", "v0.6", "unsafe-blocked.html");
const index = fs.readFileSync(indexPath, "utf8");
const simple = fs.readFileSync(simplePath);
const unsafe = fs.readFileSync(unsafePath, "utf8");
const failures = [];

function requireMatch(value, pattern, message) {
  if (!pattern.test(value)) failures.push(message);
}

function requireAbsent(value, pattern, message) {
  if (pattern.test(value)) failures.push(message);
}

requireMatch(index, /<title>Little Things Studio v0\.1\.0-beta\.1\b/, "document title is not v0.1.0-beta.1");
requireMatch(index, /class="prototype-badge">v0\.1\.0-beta\.1</, "prototype badge is not v0.1.0-beta.1");
requireMatch(index, /id="exportHtmlButton"[^>]*hidden disabled/, "export button does not start hidden and disabled");
requireMatch(index, /function getImportExportGate\(\)/, "export gate is missing");
requireMatch(index, /if \(session\.exportBlocked\)/, "critical capability export gate is missing");
requireMatch(index, /record\.visual\.state === "unsupported"/, "visual-support export gate is missing");
requireMatch(index, /sourceMappingComplete[\s\S]*?sourceMappingUnique/, "complete and unique source mapping gate is missing");
requireMatch(index, /sourcePath: sourcePaths\.get\(element\) \|\| null/, "session-only source path is missing");
requireMatch(index, /function resolveImportSourcePath\(sourceDocument, sourcePath\)/, "source path resolver is missing");
requireMatch(index, /new DOMParser\(\)\.parseFromString\(session\.sanitizedBaseHtml, "text\/html"\)/, "export is not rebuilt from the sanitized detached base copy");
requireMatch(index, /Object\.freeze\(\{ fileName: file\.name, source \}\)/, "immutable source boundary is missing");
requireMatch(index, /const IMPORT_EXPORT_PROPERTIES = new Set\(\["text", \.\.\.Object\.keys\(selectionEditingCore\.propertySchema\)\]\)/, "export property allowlist is not derived from the validated visual schema");
requireMatch(index, /function importEditValuesAreValid\(edit\)/, "export value validation is missing");
requireMatch(index, /if \(edit\.active\.text\) target\.data = String\(edit\.values\.text\)/, "exported nested text is not applied as plain text");
requireMatch(index, /edit\.textAttribute === "value"[\s\S]*?target\.setAttribute\("value", String\(edit\.values\.text\)\)/, "safe visible input value is not exported as plain text");
requireMatch(index, /function importTranslateToPixels\(value\)/, "exported px translate round-trip parser is missing");
requireMatch(index, /x: initialX,[\s\S]*?y: initialY/, "re-imported translate is not restored into edit state");
requireAbsent(index, /applyImportEditToExport[\s\S]{0,1600}\.innerHTML\s*=/, "export path parses edited text as HTML");
requireMatch(index, /sanitizedBaseHtml[\s\S]*?exportCore\.stripRuntimeMarkers\(sourceDocument\)/, "sanitized export and runtime-marker cleanup path is missing");
requireMatch(index, /IMPORT_INTERNAL_ATTRIBUTES[\s\S]*?IMPORT_INTERNAL_IDS[\s\S]*?IMPORT_INTERNAL_CLASSES/, "internal marker sets are missing");
requireMatch(index, /data-lts-runtime-id\|data-lts-source-key\|lts-import-selected\|lts-import-edit-overlay\|lts-import-resize-handle/, "serialized internal-marker assertion is missing");
requireAbsent(index, /internalAttributePattern\s*=\s*\/\^\(\?:data-lts-/, "broad runtime-marker cleanup can strip author attributes");
requireAbsent(index, /internalClassPattern\s*=\s*\/\^lts-import-/, "broad runtime-marker cleanup can strip author classes");
requireMatch(index, /function resetSelectedImportTarget\(\)[\s\S]*?edit\.active = \{\}[\s\S]*?commitImportSnapshot\(before/, "imported edit reset path is missing");
requireMatch(index, /historyCore\.commit[\s\S]*?historyCore\.undo[\s\S]*?historyCore\.redo/, "imported reset/edit history is not using the history module");
requireMatch(index, /new Blob\(\[exportedHtml\], \{ type: "text\/html;charset=utf-8" \}\)/, "HTML Blob creation is missing");
requireMatch(index, /URL\.createObjectURL\(blob\)/, "download object URL creation is missing");
requireMatch(index, /setTimeout\(\(\) => URL\.revokeObjectURL\(objectUrl\), 0\)/, "download object URL is not revoked promptly");
requireMatch(index, /`\$\{baseName\}\.lts-edited\.html`/, "safe export filename rule is missing");
requireAbsent(index, /\b(?:fetch|XMLHttpRequest|WebSocket)\s*\(/, "network API was added to the prototype");
requireMatch(index, /id="importPreviewFrame"[\s\S]*?sandbox="allow-same-origin"[\s\S]*?referrerpolicy="no-referrer"/, "iframe sandbox/referrer policy changed");
requireAbsent(index, /sandbox="[^"]*(?:allow-scripts|allow-forms|allow-popups|allow-downloads|allow-top-navigation)/i, "iframe gained a prohibited permission");
[
  "default-src 'none'",
  "script-src 'none'",
  "connect-src 'none'",
  "form-action 'none'",
  "base-uri 'none'"
].forEach(directive => requireMatch(index, new RegExp(directive.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `CSP directive changed: ${directive}`));

const simpleHash = crypto.createHash("sha256").update(simple).digest("hex");
if (simpleHash !== "19745458b5bb4c0bf9be240c4d151952f57f8a14e7d80a52f0263182f1240ef7") {
  failures.push(`simple fixture hash changed: ${simpleHash}`);
}
requireMatch(unsafe, /<script\b/i, "unsafe fixture script sentinel is missing");
requireMatch(unsafe, /\son(?:load|click|submit|error)=/i, "unsafe fixture handler sentinel is missing");
requireMatch(unsafe, /https:\/\/example\.invalid\//, "unsafe fixture external-resource sentinel is missing");

const inlineScripts = [...index.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
if (inlineScripts.length !== 1) {
  failures.push(`expected one inline application script, found ${inlineScripts.length}`);
} else {
  try {
    new Function(inlineScripts[0][1]);
  } catch (error) {
    failures.push(`inline application script does not parse: ${error.message}`);
  }
}

if (failures.length) {
  console.error(JSON.stringify({ ok: false, failures }, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({
    ok: true,
    checked: [
      path.relative(root, indexPath),
      path.relative(root, simplePath),
      path.relative(root, unsafePath)
    ],
    fixtureSha256: simpleHash,
    guarantees: {
      exportGate: "critical-capabilities-blocked-and-validated-visual-edits-only",
      sourceMapping: "stable-source-key-and-unique-target",
      exportSource: "sanitized-detached-copy",
      internalMarkers: "excluded",
      originalInteractions: "remain-removed",
      originalWriteback: false,
      externalNetwork: "blocked",
      iframeSandbox: "allow-same-origin"
    }
  }, null, 2));
}
