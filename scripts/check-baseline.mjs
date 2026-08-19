import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const defaultFile = fileURLToPath(new URL("../index.html", import.meta.url));
const file = process.argv[2] || defaultFile;
const html = await readFile(file, "utf8");

assert.match(html, /^<!doctype html>/i);
assert.match(html, /<html lang="zh-Hant">/);
assert.match(html, /Little Things Studio/);
assert.match(html, /@media \(min-width: 700px\) and \(max-height: 759px\)/);

const editableIds = [...html.matchAll(/data-editable="([^"]+)"/g)].map(match => match[1]);
assert.ok(editableIds.length >= 19);
assert.equal(new Set(editableIds).size, editableIds.length);

const domIds = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
const duplicateIds = [...new Set(domIds.filter((id, index) => domIds.indexOf(id) !== index))];
assert.deepEqual(duplicateIds, []);

const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
assert.equal(scripts.length, 1);
for (const [, source] of scripts) new vm.Script(source, { filename: "index.inline.js" });

assert.doesNotMatch(html, /<script[^>]+\ssrc=/i);
assert.doesNotMatch(html, /<link[^>]+\shref=/i);
assert.doesNotMatch(html, /\bfetch\s*\(/);
assert.doesNotMatch(html, /\bXMLHttpRequest\b/);
assert.doesNotMatch(html, /\bWebSocket\b/);

const summaryActions = html.match(
  /<div class="modal-actions">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>\s*<\/div>/
);
assert.ok(summaryActions);
assert.equal((summaryActions[1].match(/<button\b/g) || []).length, 1);

const requiredAnchors = [
  "workbench",
  "canvasSizer",
  "demoPage",
  "selectionOverlay",
  "undoButton",
  "redoButton",
  "summaryButton",
  "imageUpload",
  "summaryModal"
];
for (const id of requiredAnchors) assert.ok(domIds.includes(id), `Missing #${id}`);

console.log(
  JSON.stringify(
    {
      file,
      sha256: createHash("sha256").update(html).digest("hex"),
      bytes: Buffer.byteLength(html),
      lines: html.split("\n").length,
      editableElements: editableIds.length,
      uniqueDomIds: domIds.length,
      inlineScriptsParsed: scripts.length,
      externalScriptOrStylesheetRefs: 0,
      networkWriteApis: 0
    },
    null,
    2
  )
);
