import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(import.meta.dirname, "..");
const indexPath = path.join(root, "index.html");
const simplePath = path.join(root, "fixtures", "v0.6", "simple-static.html");
const unsafePath = path.join(root, "fixtures", "v0.6", "unsafe-blocked.html");
const index = fs.readFileSync(indexPath, "utf8");
const simple = fs.readFileSync(simplePath, "utf8");
const unsafe = fs.readFileSync(unsafePath, "utf8");
const failures = [];

function requireMatch(value, pattern, message) {
  if (!pattern.test(value)) failures.push(message);
}

function requireAbsent(value, pattern, message) {
  if (pattern.test(value)) failures.push(message);
}

requireMatch(index, /id="htmlImportInput"[^>]+accept="\.html,\.htm,text\/html"/, "HTML file input allowlist is missing");
requireMatch(index, /id="importPreviewFrame"[\s\S]*?sandbox="allow-same-origin"[\s\S]*?referrerpolicy="no-referrer"/, "iframe sandbox/referrer policy changed");
requireAbsent(index, /sandbox="[^"]*(?:allow-scripts|allow-forms|allow-popups|allow-downloads|allow-top-navigation)/i, "iframe gained a prohibited sandbox permission");
requireMatch(index, /const MAX_IMPORT_BYTES = 5 \* 1024 \* 1024;/, "5 MiB limit is missing");
requireMatch(index, /await file\.text\(\)/, "File.text() UTF-8 read path is missing");
requireMatch(index, /Object\.freeze\(\{ fileName: file\.name, source \}\)/, "immutable source-copy boundary is missing");
requireMatch(index, /const IMPORT_BLOCKED_TAGS = new Set\(\[[\s\S]*?"script"[\s\S]*?"iframe"[\s\S]*?"object"[\s\S]*?"embed"/, "blocked element allowlist is incomplete");
requireMatch(index, /default-src 'none'/, "CSP default-src block is missing");
requireMatch(index, /script-src 'none'/, "CSP script-src block is missing");
requireMatch(index, /connect-src 'none'/, "CSP connect-src block is missing");
requireMatch(index, /form-action 'none'/, "CSP form-action block is missing");
requireMatch(index, /base-uri 'none'/, "CSP base-uri block is missing");
requireMatch(index, /style-src 'unsafe-inline'/, "CSP inline-style permission is missing");
requireMatch(index, /img-src data: blob:/, "CSP safe image source rule is missing");
requireMatch(index, /data-lts-runtime-id/, "runtime registry marker is missing");
requireMatch(index, /CSS external resource/, "CSS external-resource neutralization is missing");
requireMatch(index, /function returnToStart\(\)/, "return-to-start cleanup path is missing");
requireAbsent(index, /\b(?:fetch|XMLHttpRequest|WebSocket)\s*\(/, "network API was added to the prototype");

requireMatch(simple, /data:image\/png;base64,/, "simple fixture needs a data URI image");
requireMatch(simple, /<h1>[\s\S]*?<\/h1>/, "simple fixture needs a heading");
requireMatch(simple, /<button[^>]*>[\s\S]*?<\/button>/, "simple fixture needs a button");
requireAbsent(simple, /https?:\/\//i, "simple fixture must be self-contained");

requireMatch(unsafe, /__LTS_UNSAFE_SENTINEL__/, "unsafe fixture script sentinel is missing");
requireMatch(unsafe, /\son(?:load|click|submit|error)=/i, "unsafe fixture inline-handler sentinel is missing");
requireMatch(unsafe, /<form[^>]+action="https:\/\/example\.invalid\/submit"/, "unsafe fixture form sentinel is missing");
requireMatch(unsafe, /<(?:iframe|object)\b/i, "unsafe fixture nested-content sentinel is missing");
requireMatch(unsafe, /https:\/\/example\.invalid\//, "unsafe fixture external-resource sentinel is missing");
requireAbsent(unsafe, /https?:\/\/(?!example\.invalid(?:\/|"|'))/i, "unsafe fixture contains a non-reserved endpoint");

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
    guarantees: {
      maxImportMiB: 5,
      iframeSandbox: "allow-same-origin",
      scripts: "blocked",
      externalNetwork: "blocked",
      originalWriteback: false,
      importedEditing: "safe-elements-session-only"
    }
  }, null, 2));
}
