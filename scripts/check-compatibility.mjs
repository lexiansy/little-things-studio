import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { lstat, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const corpusRoot = path.join(root, "fixtures", "compatibility");
const manifestPath = path.join(corpusRoot, "manifest.json");

const REQUIRED_CATEGORY_UNION = [
  "static-dom",
  "inline-css",
  "nested-text",
  "mixed-inline-content",
  "button",
  "link",
  "input",
  "select",
  "textarea",
  "tabs",
  "tabpanel",
  "hidden-panel",
  "aria-hidden",
  "anchor-target",
  "display-none",
  "css-variables",
  "specificity",
  "important",
  "flexbox",
  "grid",
  "data-uri-image",
  "external-stylesheet",
  "external-font",
  "external-image",
  "relative-resource",
  "css-url",
  "javascript-created-dom",
  "javascript-tabs",
  "svg",
  "pseudo-element",
  "canvas",
  "overlap",
  "fixed",
  "transform",
  "custom-element",
  "shadow-dom",
  "unsafe-script",
  "event-handler",
  "form-submit",
  "navigation",
  "popup",
  "download",
  "iframe"
];

const INTERACTION_STATES = new Set(["safe", "inert", "blocked"]);
const VISUAL_STATES = new Set(["editable", "limited", "unsupported"]);
const TEXT_MODES = new Set(["none", "leaf", "nested", "value"]);
const PREVIEW_PRESENCE = new Set(["present", "removed"]);
const EXPORT_GATES = new Set(["allowed-after-validated-edit", "blocked"]);
const REIMPORT_EXPECTATIONS = new Set(["allowed-edits-preserved", "not-applicable"]);
const BLOCKED_CAPABILITIES = new Set([
  "script-execution",
  "inline-handler",
  "meta-refresh",
  "form-submission",
  "navigation",
  "popup",
  "download",
  "embedded-frame",
  "external-resource",
  "relative-resource",
  "script-created-dom",
  "script-controlled-view",
  "canvas-script-rendering",
  "shadow-dom-script"
]);

function exactKeys(value, keys, label) {
  assert.ok(value && typeof value === "object" && !Array.isArray(value), `${label} must be an object`);
  assert.deepEqual(Object.keys(value).sort(), [...keys].sort(), `${label} has unexpected or missing fields`);
}

function nonBlank(value, label) {
  assert.equal(typeof value, "string", `${label} must be a string`);
  assert.ok(value.trim(), `${label} must not be blank`);
}

function uniqueStrings(values, label, { allowEmpty = false } = {}) {
  assert.ok(Array.isArray(values), `${label} must be an array`);
  if (!allowEmpty) assert.ok(values.length > 0, `${label} must not be empty`);
  for (const [index, value] of values.entries()) nonBlank(value, `${label}[${index}]`);
  assert.equal(new Set(values).size, values.length, `${label} must contain unique strings`);
}

async function walkNoSymlinks(directory, relative = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const childRelative = path.posix.join(relative, entry.name);
    const child = path.join(directory, entry.name);
    const stat = await lstat(child);
    assert.equal(stat.isSymbolicLink(), false, `compatibility corpus symlink is forbidden: ${childRelative}`);
    if (entry.isDirectory()) files.push(...await walkNoSymlinks(child, childRelative));
    else files.push(childRelative);
  }
  return files;
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function parseStartTags(html) {
  const tags = [];
  for (const match of html.matchAll(/<([A-Za-z][A-Za-z0-9:-]*)([^<>]*?)\s*\/?\s*>/g)) {
    const attributes = new Map();
    const source = match[2] || "";
    for (const attribute of source.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
      const name = attribute[1].toLowerCase();
      const value = attribute[2] ?? attribute[3] ?? attribute[4] ?? "";
      attributes.set(name, value);
    }
    tags.push({ name: match[1].toLowerCase(), attributes });
  }
  return tags;
}

function selectorExists(tags, selector, label) {
  const match = /^(?:([a-z][a-z0-9:-]*))?(?:#([A-Za-z][\w:-]*))?(?:\.([A-Za-z][\w:-]*))?(?:\[([A-Za-z_:][\w:.-]*)(?:="([^"]*)")?\])?$/i.exec(selector);
  assert.ok(match && selector, `${label} uses an unsupported marker selector: ${selector}`);
  const [, tagName, id, className, attributeName, attributeValue] = match;
  assert.ok(tagName || id || className || attributeName, `${label} marker selector must identify an element`);

  return tags.some(tag => {
    if (tagName && tag.name !== tagName.toLowerCase()) return false;
    if (id && tag.attributes.get("id") !== id) return false;
    if (className && !(tag.attributes.get("class") || "").split(/\s+/).includes(className)) return false;
    if (attributeName) {
      const key = attributeName.toLowerCase();
      if (!tag.attributes.has(key)) return false;
      if (attributeValue !== undefined && tag.attributes.get(key) !== attributeValue) return false;
    }
    return true;
  });
}

function normalizedSourceText(html) {
  return html
    .replace(/<!--[^]*?-->/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function assertPublicSafeText(text, label) {
  const sensitivePatterns = [
    { name: "Windows absolute path", pattern: /\b[A-Za-z]:[\\/]/ },
    { name: "home absolute path", pattern: /\/(?:Users|home)\//i },
    { name: "file URL", pattern: /file:\/{2,}/i },
    { name: "private runtime metadata", pattern: new RegExp("\\." + "codex(?:[\\\\/]|\\b)", "i") },
    { name: "credential-like token", pattern: /\b(?:ghp|github_pat|sk-proj)-?[A-Za-z0-9_-]{16,}\b/ },
    { name: "private key", pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
    { name: "secret assignment", pattern: /\b(?:api[_-]?key|access[_-]?token|password)\s*[:=]\s*["'][^"']+["']/i },
    { name: "email address", pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i }
  ];
  const retiredPrivateMarkers = [
    ["魔", "魔"].join(""),
    ["MO", "MO"].join(""),
    ["瑤", "記錄"].join(""),
    ["在窗邊", "曬著肚子", "睡覺"].join(""),
    ["雙", "腳印"].join("")
  ];

  for (const { name, pattern } of sensitivePatterns) assert.doesNotMatch(text, pattern, `${name} found in ${label}`);
  for (const marker of retiredPrivateMarkers) {
    const escaped = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.doesNotMatch(text, new RegExp(escaped, "i"), `retired private marker found in ${label}`);
  }
}

function assertExternalUrlsAreReserved(html, label) {
  assert.doesNotMatch(html, /(?:href|src|action)\s*=\s*["']\/\//i, `protocol-relative URL is forbidden in ${label}`);
  assert.doesNotMatch(html, /url\(\s*["']?\/\//i, `protocol-relative CSS URL is forbidden in ${label}`);
  for (const match of html.matchAll(/https?:\/\/[^\s"'<>`)]+/gi)) {
    const url = new URL(match[0]);
    assert.equal(url.protocol, "https:", `external fixture URL must use HTTPS: ${label}`);
    assert.equal(url.hostname, "example.invalid", `external fixture URL must use example.invalid: ${label}`);
    assert.equal(url.username, "", `external fixture URL must not contain credentials: ${label}`);
    assert.equal(url.password, "", `external fixture URL must not contain credentials: ${label}`);
  }
}

const corpusStat = await lstat(corpusRoot);
assert.equal(corpusStat.isSymbolicLink(), false, "compatibility corpus directory must not be a symlink");
assert.equal(corpusStat.isDirectory(), true, "compatibility corpus directory is missing");
const corpusFiles = await walkNoSymlinks(corpusRoot);
assert.ok(corpusFiles.includes("manifest.json"), "compatibility manifest is missing");

const manifestText = await readFile(manifestPath, "utf8");
assertPublicSafeText(manifestText, "fixtures/compatibility/manifest.json");
const manifest = JSON.parse(manifestText);
exactKeys(manifest, ["schemaVersion", "description", "requiredCategoryUnion", "fixtures"], "manifest");
assert.equal(manifest.schemaVersion, 2, "unsupported compatibility manifest schema");
nonBlank(manifest.description, "manifest.description");
uniqueStrings(manifest.requiredCategoryUnion, "manifest.requiredCategoryUnion");
assert.deepEqual(
  [...manifest.requiredCategoryUnion].sort(),
  [...REQUIRED_CATEGORY_UNION].sort(),
  "manifest requiredCategoryUnion does not cover the authorized compatibility categories"
);
assert.ok(Array.isArray(manifest.fixtures), "manifest.fixtures must be an array");
assert.ok(manifest.fixtures.length >= 8, "compatibility corpus must contain at least eight fixtures");

const ids = new Set();
const fixtureFiles = new Set();
const actualCategoryUnion = new Set();
const observedInteractionStates = new Set();
const observedVisualStates = new Set();
const observedTextModes = new Set();
const fixtureResults = [];

for (const [fixtureIndex, fixture] of manifest.fixtures.entries()) {
  const label = `manifest.fixtures[${fixtureIndex}]`;
  exactKeys(fixture, ["id", "file", "sha256", "categories", "requiredMarkers", "expected"], label);
  nonBlank(fixture.id, `${label}.id`);
  assert.match(fixture.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${label}.id must be lowercase kebab-case`);
  assert.equal(ids.has(fixture.id), false, `duplicate fixture id: ${fixture.id}`);
  ids.add(fixture.id);

  nonBlank(fixture.file, `${label}.file`);
  assert.match(fixture.file, /^[a-z0-9]+(?:-[a-z0-9]+)*\.html$/, `${label}.file must be a flat lowercase HTML filename`);
  assert.equal(path.basename(fixture.file), fixture.file, `${label}.file must not contain a path`);
  assert.equal(fixtureFiles.has(fixture.file), false, `duplicate fixture file: ${fixture.file}`);
  fixtureFiles.add(fixture.file);

  assert.match(fixture.sha256, /^[a-f0-9]{64}$/, `${label}.sha256 must be lowercase SHA-256`);
  uniqueStrings(fixture.categories, `${label}.categories`);
  for (const category of fixture.categories) {
    assert.ok(REQUIRED_CATEGORY_UNION.includes(category), `unknown category ${category} in ${fixture.id}`);
    actualCategoryUnion.add(category);
  }

  exactKeys(fixture.requiredMarkers, ["selectors", "texts"], `${label}.requiredMarkers`);
  uniqueStrings(fixture.requiredMarkers.selectors, `${label}.requiredMarkers.selectors`);
  uniqueStrings(fixture.requiredMarkers.texts, `${label}.requiredMarkers.texts`);

  exactKeys(
    fixture.expected,
    ["viewCount", "elementStates", "diagnosticCodes", "blockedCapabilities", "networkRequests", "export"],
    `${label}.expected`
  );
  assert.ok(Number.isInteger(fixture.expected.viewCount) && fixture.expected.viewCount >= 1, `${label}.expected.viewCount must be a positive integer`);
  assert.ok(Array.isArray(fixture.expected.elementStates) && fixture.expected.elementStates.length > 0, `${label}.expected.elementStates must not be empty`);
  uniqueStrings(fixture.expected.diagnosticCodes, `${label}.expected.diagnosticCodes`, { allowEmpty: true });
  for (const code of fixture.expected.diagnosticCodes) assert.match(code, /^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*$/, `invalid diagnostic code: ${code}`);
  uniqueStrings(fixture.expected.blockedCapabilities, `${label}.expected.blockedCapabilities`, { allowEmpty: true });
  for (const capability of fixture.expected.blockedCapabilities) assert.ok(BLOCKED_CAPABILITIES.has(capability), `unknown blocked capability ${capability}`);
  assert.equal(fixture.expected.networkRequests, 0, `${fixture.id} must expect zero network requests`);

  exactKeys(
    fixture.expected.export,
    ["gate", "reimport", "previewOnlyStateSerialized", "runtimeMarkersSerialized", "blockedCapabilitiesRestored"],
    `${label}.expected.export`
  );
  assert.ok(EXPORT_GATES.has(fixture.expected.export.gate), `invalid export gate for ${fixture.id}`);
  assert.ok(REIMPORT_EXPECTATIONS.has(fixture.expected.export.reimport), `invalid re-import expectation for ${fixture.id}`);
  if (fixture.expected.export.gate === "blocked") assert.equal(fixture.expected.export.reimport, "not-applicable", `blocked export cannot claim re-import evidence: ${fixture.id}`);
  else assert.equal(fixture.expected.export.reimport, "allowed-edits-preserved", `allowed export must define re-import preservation: ${fixture.id}`);
  assert.equal(fixture.expected.export.previewOnlyStateSerialized, false, `preview-only view state must not be serialized: ${fixture.id}`);
  assert.equal(fixture.expected.export.runtimeMarkersSerialized, false, `runtime markers must not be serialized: ${fixture.id}`);
  assert.equal(fixture.expected.export.blockedCapabilitiesRestored, false, `blocked capabilities must not be restored: ${fixture.id}`);

  const fixturePath = path.resolve(corpusRoot, fixture.file);
  const relative = path.relative(corpusRoot, fixturePath);
  assert.ok(relative && !relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative), `fixture path escapes corpus: ${fixture.file}`);
  const fixtureStat = await lstat(fixturePath);
  assert.equal(fixtureStat.isSymbolicLink(), false, `fixture must not be a symlink: ${fixture.file}`);
  assert.equal(fixtureStat.isFile(), true, `fixture is not a regular file: ${fixture.file}`);
  const bytes = await readFile(fixturePath);
  assert.equal(sha256(bytes), fixture.sha256, `fixture hash drift: ${fixture.file}`);
  const html = bytes.toString("utf8");
  assert.match(html, /^<!doctype html>/i, `fixture must start with an HTML doctype: ${fixture.file}`);
  assert.match(html, /<html\b/i, `fixture is missing html root: ${fixture.file}`);
  assert.match(html, /<title>[^<]+<\/title>/i, `fixture is missing a nonblank title: ${fixture.file}`);
  assertPublicSafeText(html, `fixtures/compatibility/${fixture.file}`);
  assertExternalUrlsAreReserved(html, `fixtures/compatibility/${fixture.file}`);

  const tags = parseStartTags(html);
  const normalizedText = normalizedSourceText(html);
  for (const selector of fixture.requiredMarkers.selectors) {
    assert.equal(selectorExists(tags, selector, fixture.file), true, `required selector marker missing in ${fixture.file}: ${selector}`);
  }
  for (const marker of fixture.requiredMarkers.texts) {
    assert.ok(html.includes(marker) || normalizedText.includes(marker), `required text marker missing in ${fixture.file}: ${marker}`);
  }

  const stateSelectors = new Set();
  for (const [stateIndex, state] of fixture.expected.elementStates.entries()) {
    const stateLabel = `${label}.expected.elementStates[${stateIndex}]`;
    exactKeys(state, ["selector", "previewPresence", "interaction", "visual", "textMode"], stateLabel);
    nonBlank(state.selector, `${stateLabel}.selector`);
    assert.equal(stateSelectors.has(state.selector), false, `duplicate expected selector state in ${fixture.id}: ${state.selector}`);
    stateSelectors.add(state.selector);
    assert.ok(fixture.requiredMarkers.selectors.includes(state.selector), `state selector must also be a required marker in ${fixture.id}: ${state.selector}`);
    assert.equal(selectorExists(tags, state.selector, fixture.file), true, `state selector missing in ${fixture.file}: ${state.selector}`);
    assert.ok(PREVIEW_PRESENCE.has(state.previewPresence), `invalid previewPresence in ${stateLabel}`);
    assert.ok(INTERACTION_STATES.has(state.interaction), `invalid interaction state in ${stateLabel}`);
    assert.ok(VISUAL_STATES.has(state.visual), `invalid visual state in ${stateLabel}`);
    assert.ok(TEXT_MODES.has(state.textMode), `invalid text mode in ${stateLabel}`);
    if (state.previewPresence === "removed") {
      assert.equal(state.interaction, "blocked", `removed source element must be blocked: ${fixture.id} ${state.selector}`);
      assert.equal(state.visual, "unsupported", `removed source element must be visually unsupported: ${fixture.id} ${state.selector}`);
      assert.equal(state.textMode, "none", `removed source element must not expose text editing: ${fixture.id} ${state.selector}`);
    }
    observedInteractionStates.add(state.interaction);
    observedVisualStates.add(state.visual);
    observedTextModes.add(state.textMode);
  }

  if (fixture.categories.some(category => ["tabs", "tabpanel", "hidden-panel", "display-none"].includes(category))) {
    assert.ok(fixture.expected.viewCount > 1, `multi-view fixture must expect more than one view: ${fixture.id}`);
    assert.ok(fixture.expected.diagnosticCodes.includes("MULTI_VIEW_DETECTED"), `multi-view fixture needs MULTI_VIEW_DETECTED: ${fixture.id}`);
  }
  if (fixture.categories.includes("unsafe-script")) {
    assert.ok(fixture.expected.blockedCapabilities.includes("script-execution"), `unsafe-script fixture must block script execution: ${fixture.id}`);
    assert.ok(fixture.expected.diagnosticCodes.includes("SCRIPT_REMOVED"), `unsafe-script fixture needs SCRIPT_REMOVED: ${fixture.id}`);
  }
  if (fixture.categories.some(category => category.startsWith("external-") || category === "relative-resource")) {
    assert.equal(fixture.expected.networkRequests, 0, `dependency fixture must expect zero requests: ${fixture.id}`);
  }

  fixtureResults.push({
    id: fixture.id,
    file: fixture.file,
    sha256: fixture.sha256,
    categories: fixture.categories.length,
    selectors: fixture.requiredMarkers.selectors.length,
    expectedViews: fixture.expected.viewCount,
    exportGate: fixture.expected.export.gate
  });
}

const htmlFilesOnDisk = corpusFiles.filter(file => file.endsWith(".html")).sort();
assert.deepEqual(htmlFilesOnDisk, [...fixtureFiles].sort(), "manifest must list every compatibility HTML fixture exactly once");
assert.deepEqual([...actualCategoryUnion].sort(), [...REQUIRED_CATEGORY_UNION].sort(), "fixture categories do not cover the required category union");
assert.deepEqual([...observedInteractionStates].sort(), [...INTERACTION_STATES].sort(), "corpus must exercise every interaction state");
assert.deepEqual([...observedVisualStates].sort(), [...VISUAL_STATES].sort(), "corpus must exercise every visual state");
assert.deepEqual([...observedTextModes].sort(), [...TEXT_MODES].sort(), "corpus must exercise every text mode");

for (const file of corpusFiles.filter(file => file.endsWith(".json"))) {
  const text = await readFile(path.join(corpusRoot, ...file.split("/")), "utf8");
  assertPublicSafeText(text, `fixtures/compatibility/${file}`);
}

console.log(JSON.stringify({
  ok: true,
  schemaVersion: manifest.schemaVersion,
  fixtures: fixtureResults,
  fixtureCount: fixtureResults.length,
  categoryCount: actualCategoryUnion.size,
  expectedNetworkRequestsPerFixture: 0,
  symlinks: 0,
  unlistedHtmlFixtures: 0
}, null, 2));
