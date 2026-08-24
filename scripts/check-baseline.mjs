import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const defaultFile = fileURLToPath(new URL("../index.html", import.meta.url));
const file = process.argv[2] || defaultFile;
const html = await readFile(file, "utf8");

assert.match(html, /^<!doctype html>/i);
assert.match(html, /<html lang="zh-TW">/);
assert.match(html, /Little Things Studio/);
assert.match(html, /@media \(min-width: 700px\) and \(max-height: 759px\)/);
assert.match(html, /id="startScreen"[\s\S]*?想從哪裡開始？[\s\S]*?匯入 HTML 檔[\s\S]*?試玩內建範例[\s\S]*?<\/main>/);
assert.match(html, /id="workspace" hidden/);
assert.match(html, /id="editorHeaderCenter"[^>]+hidden/);
assert.match(html, /id="undoButton"[^>]+hidden disabled/);
assert.match(html, /id="redoButton"[^>]+hidden disabled/);
assert.match(html, /id="summaryButton"[^>]+aria-label="開啟調整紀錄，目前 0 項" hidden/);
assert.match(html, /id="languageButton"[^>]+>EN<\/button>/);
assert.match(html, /id="htmlImportInput"[^>]+aria-label="匯入 HTML 檔"/);
assert.doesNotMatch(html, new RegExp(["修改", "HTML"].join(" ")));
assert.match(html, /id="projectModeLabel">試玩範例<\/span>/);
assert.match(html, /id="editorActions"[^>]+aria-label="編輯器檔案操作"/);
assert.match(html, /id="exportHtmlButton"[^>]+hidden disabled>下載修改後 HTML<\/button>/);
assert.match(html, /@container \(max-width: 760px\)[\s\S]*?editor-download-button[\s\S]*?grid-column: 1 \/ -1/);
assert.match(html, /@container \(max-width: 330px\)/);
assert.doesNotMatch(html, /id="safeStateLabel"|安全副本・另存下載/);
assert.match(html, /mode: "start"/);
assert.match(html, /async function handleHtmlImport\(event\) \{[\s\S]*?if \(!file\) return;[\s\S]*?enterImportMode\(immutableSource, sanitized\)/);
assert.match(html, /dom\.startDemoButton\.addEventListener\("click", enterSampleMode\)/);
assert.match(html, /function requestReturnToStart\(event\) \{[\s\S]*?hasPendingAdjustments\(\)[\s\S]*?returnConfirmModal[\s\S]*?returnToStart\(\)/);
assert.match(html, /function returnToStart\(\) \{[\s\S]*?resetTemporarySession\(\)[\s\S]*?setEditorVisible\(false\)/);
assert.doesNotMatch(html, /id="changeDock"|class="change-dock"/);
assert.match(html, /<span class="action-label">調整紀錄<\/span>/);
assert.match(html, /<h2 id="summaryTitle">本次調整紀錄<\/h2>/);
assert.match(html, /empty\.textContent = t\("summary\.empty"\)/);
assert.doesNotMatch(html, new RegExp(["查看調整", "摘要"].join("")));
assert.doesNotMatch(html, new RegExp(["調整", "摘要"].join("")));

const startScreenMarkup = html.match(/<main class="start-screen"[\s\S]*?<\/main>/)?.[0] || "";
assert.doesNotMatch(startScreenMarkup, /不讀寫檔案|不覆寫原檔|不會上傳/);

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
  "summaryModal",
  "returnConfirmModal",
  "startScreen",
  "startImportButton",
  "startDemoButton",
  "htmlImportInput",
  "languageButton",
  "editorActions",
  "exportHtmlButton",
  "returnStartButton"
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
