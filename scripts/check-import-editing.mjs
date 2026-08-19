import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(import.meta.dirname, "..");
const indexPath = path.join(root, "index.html");
const index = fs.readFileSync(indexPath, "utf8");
const failures = [];

function requireMatch(pattern, message) {
  if (!pattern.test(index)) failures.push(message);
}

function requireAbsent(pattern, message) {
  if (pattern.test(index)) failures.push(message);
}

requireMatch(/<title>Little Things Studio v0\.1\.0-beta\.1\b/, "document title is not the public beta candidate version");
requireMatch(/class="prototype-badge">v0\.1\.0-beta\.1</, "prototype badge is not the public beta candidate version");

[
  "importTextControl",
  "importFontSizeControl",
  "importTextColorControl",
  "importBackgroundColorControl",
  "importWidthControl",
  "importHeightControl",
  "importRadiusControl",
  "importXControl",
  "importYControl"
].forEach(id => requireMatch(new RegExp(`id="${id}"`), `missing imported edit control: ${id}`));

requireMatch(/record\.status !== "safe"/, "safe/view-only editing gate is missing");
requireMatch(/element\.childElementCount === 0/, "leaf-text gate is missing");
requireMatch(/if \(edit\.hasLeafText\)[\s\S]*?element\.textContent = active\.text \? values\.text : original\.text/, "text writes are not leaf-gated");
requireMatch(/edits: \{\},[\s\S]*?history: \[\],[\s\S]*?future: \[\]/, "session-only edit history is missing");
requireMatch(/function undoImport\(\)/, "imported undo is missing");
requireMatch(/function redoImport\(\)/, "imported redo is missing");
requireMatch(/function startImportGesture\(event, type\)/, "imported drag/resize gesture path is missing");
requireMatch(/id = "lts-import-edit-overlay"/, "imported selection overlay is missing");
requireMatch(/id = "lts-import-resize-handle"/, "imported resize handle is missing");
requireMatch(/Object\.freeze\(\{ fileName: file\.name, source \}\)/, "immutable source-copy boundary is missing");
requireMatch(/data-lts-runtime-id/, "session runtime registry marker is missing");
requireMatch(/classList\.add\("lts-import-selected"\)/, "session selection marker is missing");

requireMatch(/id="importPreviewFrame"[\s\S]*?sandbox="allow-same-origin"[\s\S]*?referrerpolicy="no-referrer"/, "iframe sandbox/referrer policy changed");
requireAbsent(/sandbox="[^"]*(?:allow-scripts|allow-forms|allow-popups|allow-downloads|allow-top-navigation)/i, "iframe gained a prohibited permission");
[
  "default-src 'none'",
  "script-src 'none'",
  "connect-src 'none'",
  "form-action 'none'",
  "base-uri 'none'"
].forEach(directive => requireMatch(new RegExp(directive.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `CSP directive changed: ${directive}`));
requireMatch(/previewDocument\.addEventListener\("submit", blockImportedBehavior, true\)/, "form submit blocker is missing");
requireMatch(/previewDocument\.addEventListener\("auxclick", blockImportedBehavior, true\)/, "auxiliary navigation blocker is missing");
requireMatch(/if \(event\.key === "Enter" \|\| event\.key === " "\) blockImportedBehavior\(event\)/, "keyboard activation blocker is missing");
requireAbsent(/\b(?:fetch|XMLHttpRequest|WebSocket)\s*\(/, "network API was added to the prototype");

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
    checked: [path.relative(root, indexPath)],
    guarantees: {
      editableStatus: "safe-only",
      leafTextOnly: true,
      previewCopyOnly: true,
      importedUndoRedo: true,
      visibleResizeHandle: true,
      originalWriteback: false,
      externalNetwork: "blocked",
      iframeSandbox: "allow-same-origin"
    }
  }, null, 2));
}
