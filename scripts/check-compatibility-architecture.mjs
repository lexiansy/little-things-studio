import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { artifactPlan } from "./lib/artifact-plan.mjs";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const moduleFiles = artifactPlan.appSources.filter(file => /src\/app\/(?:\d\d-[^/]+)\.js$/.test(file));
const moduleSources = new Map(await Promise.all(moduleFiles.map(async file => [
  file,
  await readFile(path.join(root, ...file.split("/")), "utf8")
])));
const controllerSource = await readFile(path.join(root, "src", "app", "app.js"), "utf8");
const templateSource = await readFile(path.join(root, "src", "index.template.html"), "utf8");

const expectedModules = [
  "runtime",
  "i18n",
  "import-analysis",
  "sanitization",
  "classification",
  "view-navigation",
  "selection-editing",
  "history",
  "export",
  "ui-rendering"
];

assert.deepEqual(
  moduleFiles.map(file => path.basename(file, ".js").replace(/^\d\d-/, "")).map(name => name === "runtime" ? name : name),
  expectedModules,
  "artifact plan must contain the ordered compatibility architecture modules"
);
const context = vm.createContext({
  Node: Object.freeze({ TEXT_NODE: 3 }),
  console: Object.freeze({ log() {}, warn() {}, error() {} })
});
for (const file of moduleFiles) {
  vm.runInContext(moduleSources.get(file), context, { filename: file });
}

const graph = vm.runInContext("__LTS__.graph()", context);
const graphNames = Array.from(graph, entry => entry.name);
assert.deepEqual(graphNames, expectedModules.slice(1), "runtime module registry contains an unexpected module graph");
assert.equal(new Set(graphNames).size, graphNames.length, "module graph contains duplicate names");
for (const entry of graph) {
  for (const dependency of entry.dependencies) {
    assert.ok(graphNames.includes(dependency), `${entry.name} depends on missing module ${dependency}`);
  }
}
for (const name of graphNames) vm.runInContext(`__LTS__.use(${JSON.stringify(name)})`, context);

const classification = vm.runInContext('__LTS__.use("classification")', context);
const editing = vm.runInContext('__LTS__.use("selection-editing")', context);
const analysis = vm.runInContext('__LTS__.use("import-analysis")', context);
const sanitization = vm.runInContext('__LTS__.use("sanitization")', context);
const navigation = vm.runInContext('__LTS__.use("view-navigation")', context);
const historyModule = vm.runInContext('__LTS__.use("history")', context);
const exportModule = vm.runInContext('__LTS__.use("export")', context);

function elementForClassification(tagName) {
  return { tagName: tagName.toUpperCase() };
}

const ordinary = classification.classifyElement(elementForClassification("div"));
assert.equal(ordinary.interaction.state, "safe", "ordinary static element must remain interaction-safe");
assert.equal(ordinary.visual.state, "editable", "ordinary static element must remain visually editable");

for (const tag of ["button", "a"]) {
  const result = classification.classifyElement(elementForClassification(tag));
  assert.equal(result.interaction.state, "inert", `${tag} interaction must be inert`);
  assert.equal(result.visual.state, "editable", `${tag} appearance must remain editable despite inert interaction`);
  assert.ok(result.visual.properties.includes("text"), `${tag} visible text must be an allowed visual edit`);
}

for (const tag of ["input", "select", "textarea", "audio", "video"]) {
  const result = classification.classifyElement(elementForClassification(tag));
  assert.equal(result.interaction.state, "inert", `${tag} interaction must be inert`);
  assert.equal(result.visual.state, "limited", `${tag} must expose a bounded visual surface`);
  assert.ok(result.visual.properties.includes("backgroundColor"), `${tag} must allow bounded appearance edits`);
}

for (const tag of ["canvas", "sample-widget"]) {
  const result = classification.classifyElement(elementForClassification(tag));
  assert.equal(result.visual.state, "unsupported", `${tag} internals must be explicitly unsupported`);
  assert.ok(result.visual.reasons.length > 0, `${tag} unsupported state needs a specific reason`);
}

const requiredVisualProperties = [
  "fontSize", "fontWeight", "lineHeight", "textAlign", "color", "backgroundColor",
  "borderWidth", "borderColor", "borderStyle", "radius", "shadow", "opacity",
  "width", "height", "minWidth", "maxWidth", "minHeight", "maxHeight",
  "padding", "margin", "x", "y", "justifyContent", "alignItems", "gap"
];
for (const property of requiredVisualProperties) {
  assert.ok(classification.commonProperties.includes(property), `visual property allowlist is missing ${property}`);
}
for (const behavior of ["href", "src", "action", "formaction", "target", "download", "onclick", "onsubmit"]) {
  assert.ok(classification.BEHAVIOR_ATTRIBUTES.has(behavior), `behavior attribute set is missing ${behavior}`);
  assert.equal(classification.commonProperties.includes(behavior), false, `${behavior} leaked into the visual edit allowlist`);
  assert.equal(Object.hasOwn(editing.propertySchema, behavior), false, `${behavior} leaked into the validated property schema`);
}

const nestedChildren = [
  { nodeType: 3, data: "Before " },
  { nodeType: 1, tagName: "SPAN", textContent: "icon" },
  { nodeType: 3, data: " after" },
  { nodeType: 3, data: "   " }
];
const nestedSnapshot = nestedChildren.map(node => ({ ...node }));
const textUnits = editing.directTextUnits({ childNodes: nestedChildren }, [{ element: 4 }]);
assert.equal(textUnits.length, 2, "nested-text discovery must expose each nonblank direct text node separately");
assert.deepEqual(Array.from(textUnits, unit => unit.nodePath.at(-1).childNode), [0, 2], "nested-text node paths are unstable");
assert.equal(textUnits[0].nodeKind, "text", "nested-text target must be typed as a text node");
assert.deepEqual(nestedChildren, nestedSnapshot, "nested-text discovery must not mutate sibling elements");

const targetTextNode = { data: "Before " };
const adjacentIcon = { textContent: "icon" };
exportModule.applyEdit(targetTextNode, {
  nodeKind: "text",
  active: { text: true },
  values: { text: "Updated " }
});
assert.equal(targetTextNode.data, "Updated ", "text-node export edit did not update the selected text unit");
assert.equal(adjacentIcon.textContent, "icon", "text-node export edit changed an adjacent element");

class FakeStyle {
  constructor() {
    this.values = new Map();
  }

  setProperty(name, value, priority = "") {
    this.values.set(name, { value: String(value), priority: String(priority) });
  }

  getPropertyValue(name) {
    return this.values.get(name)?.value || "";
  }

  getPropertyPriority(name) {
    return this.values.get(name)?.priority || "";
  }

  removeProperty(name) {
    this.values.delete(name);
  }
}

const styledElement = { style: new FakeStyle() };
editing.applyVisualProperty(styledElement, "fontSize", 24);
assert.deepEqual(styledElement.style.values.get("font-size"), { value: "24px", priority: "important" }, "visual override must defeat common stylesheet specificity");
editing.applyVisualProperty(styledElement, "backgroundColor", "#112233");
assert.deepEqual(styledElement.style.values.get("background-color"), { value: "#112233", priority: "important" }, "color override priority was lost");
editing.applyVisualProperty(styledElement, "x", 18, { x: 18, y: -7 });
assert.deepEqual(styledElement.style.values.get("translate"), { value: "18px -7px", priority: "important" }, "position override must preserve both axes and priority");
assert.throws(() => editing.applyVisualProperty(styledElement, "fontSize", 9999), /Invalid visual edit/, "out-of-range property value was accepted");
assert.throws(() => editing.applyVisualProperty(styledElement, "href", "https://example.invalid"), /Invalid visual edit/, "behavioral property was accepted as a visual edit");

class FakeClassList {
  constructor(names = []) {
    this.names = new Set(names);
  }

  [Symbol.iterator]() {
    return this.names[Symbol.iterator]();
  }

  remove(name) {
    this.names.delete(name);
  }

  contains(name) {
    return this.names.has(name);
  }

  get length() {
    return this.names.size;
  }
}

class FakeElement {
  constructor(tagName, { id = "", attributes = {}, classes = [], heading = "", hidden = false, authoredDisplay = "block" } = {}) {
    this.tagName = tagName.toUpperCase();
    this.id = id;
    this.hidden = hidden;
    this.attributeMap = new Map(Object.entries(attributes).map(([name, value]) => [name, String(value)]));
    this.classList = new FakeClassList(classes);
    this.style = new FakeStyle();
    this.heading = heading;
    this.authoredDisplay = authoredDisplay;
    this.removed = false;
  }

  get attributes() {
    return [...this.attributeMap].map(([name, value]) => ({ name, value }));
  }

  hasAttribute(name) {
    return this.attributeMap.has(name);
  }

  getAttribute(name) {
    return this.attributeMap.get(name) ?? null;
  }

  setAttribute(name, value) {
    this.attributeMap.set(name, String(value));
  }

  removeAttribute(name) {
    this.attributeMap.delete(name);
  }

  querySelector(selector) {
    return selector === "h1, h2" && this.heading ? { textContent: this.heading } : null;
  }

  remove() {
    this.removed = true;
  }
}

const panelOne = new FakeElement("section", { id: "panel-one", heading: "First" });
const panelTwo = new FakeElement("section", { id: "panel-two", heading: "Second", hidden: true, authoredDisplay: "grid" });
const panelThree = new FakeElement("section", { id: "panel-three", heading: "Third", attributes: { "aria-hidden": "true" }, authoredDisplay: "flex" });
const tabControl = new FakeElement("button", { attributes: { "aria-controls": "panel-two" } });
const anchorControl = new FakeElement("a", { attributes: { href: "#panel-three" } });
const panelById = new Map([[panelOne.id, panelOne], [panelTwo.id, panelTwo], [panelThree.id, panelThree]]);
const viewDocument = {
  defaultView: { getComputedStyle(element) { return { display: element.authoredDisplay }; } },
  querySelectorAll(selector) {
    if (selector === '[role="tabpanel"]') return [panelOne, panelTwo, panelThree];
    if (selector === 'a[href^="#"], [role="tab"][aria-controls]') return [tabControl, anchorControl];
    if (selector === "[hidden], [aria-hidden='true']") return [panelTwo, panelThree];
    return [];
  },
  getElementById(id) {
    return panelById.get(id) || null;
  }
};
[panelOne, panelTwo, panelThree].forEach(panel => { panel.ownerDocument = viewDocument; });
const views = navigation.discoverViews(viewDocument);
assert.equal(views.length, 3, "view navigator must discover existing tab/hidden/anchor panels");
assert.deepEqual(Array.from(views, view => view.label), ["First", "Second", "Third"], "view labels are not deterministic");
const viewHistory = [];
const viewFuture = [];
navigation.showView(views, "view-2");
assert.equal(panelOne.getAttribute("aria-hidden"), "true", "inactive view remained exposed");
assert.equal(panelTwo.getAttribute("aria-hidden"), "false", "active hidden view was not exposed");
assert.deepEqual(panelTwo.style.values.get("display"), { value: "grid", priority: "important" }, "active grid view lost its authored layout semantics");
assert.deepEqual(panelThree.style.values.get("display"), { value: "none", priority: "important" }, "inactive view override is not preview-authoritative");
assert.deepEqual(viewHistory, [], "preview-only navigation polluted edit history");
assert.deepEqual(viewFuture, [], "preview-only navigation polluted redo state");

const scriptElement = new FakeElement("script");
const buttonElement = new FakeElement("button", { attributes: { onclick: "unsafe()" } });
const externalImage = new FakeElement("img", { attributes: { src: "https://example.invalid/image.png" } });
const relativeImage = new FakeElement("img", { attributes: { src: "images/local.png" } });
const customElement = new FakeElement("sample-widget");
const styleElement = new FakeElement("style");
styleElement.textContent = '@import "https://example.invalid/theme.css"; .card::before { background: url(images/pixel.png); }';
const analysisElements = [buttonElement, externalImage, relativeImage, customElement];
const analysisDocument = {
  querySelectorAll(selector) {
    if (selector === "script") return [scriptElement];
    if (selector === "*") return analysisElements;
    if (selector === "style") return [styleElement];
    if (selector === "canvas") return [new FakeElement("canvas")];
    if (selector === "svg") return [new FakeElement("svg")];
    if (selector.includes("a, button, form")) return [buttonElement];
    return [];
  },
  querySelector(selector) {
    return this.querySelectorAll(selector)[0] || null;
  }
};
const diagnostics = analysis.analyzeDocument(analysisDocument, "document.body.appendChild(document.createElement('div'))");
for (const code of [
  "javascript-created-content-absent",
  "inline-handlers-removed",
  "external-resources-blocked",
  "relative-resources-blocked",
  "original-interactions-inert",
  "canvas-content-limited",
  "svg-editing-limited",
  "custom-element-limited",
  "pseudo-elements-limited"
]) {
  assert.ok(diagnostics.diagnostics.includes(code), `compatibility diagnostic is missing ${code}`);
}
assert.ok(diagnostics.resources.some(resource => resource.kind === "external"), "external dependency was not diagnosed");
assert.ok(diagnostics.resources.some(resource => resource.kind === "relative"), "relative dependency was not diagnosed");

const blockedCssReasons = [];
const sanitizedCss = sanitization.sanitizeCss(
  '@import "https://example.invalid/theme.css"; .a { background: url("images/a.png"); } .b { background: url("data:image/png;base64,AA=="); }',
  reason => blockedCssReasons.push(reason)
);
assert.doesNotMatch(sanitizedCss, /@import|https:\/\/example\.invalid|images\/a\.png/i, "unsafe CSS dependency survived sanitization");
assert.match(sanitizedCss, /data:image\/png;base64,AA==/i, "safe data URI was incorrectly removed");
assert.ok(blockedCssReasons.includes("CSS @import"), "CSS @import removal was not reported");
assert.ok(blockedCssReasons.includes("CSS external resource"), "CSS resource removal was not reported");

const markerStyle = new FakeElement("style", { attributes: { "data-lts-preview-style": "author-owned" } });
const markedElement = new FakeElement("div", {
  attributes: {
    id: "kept-id",
    "data-lts-runtime-id": "runtime-7",
    "data-lts-source-key": "source-4",
    "data-lts-author-note": "preserve",
    "aria-selected-view": "true"
  },
  classes: ["user-card", "lts-import-selected", "lts-import-authored-card"]
});
const markerDocument = {
  querySelectorAll(selector) {
    if (selector === "#lts-import-edit-overlay, #lts-import-resize-handle") return [];
    if (selector === "*") return [markedElement];
    return [];
  }
};
exportModule.stripRuntimeMarkers(markerDocument);
assert.equal(markerStyle.removed, false, "author element using a non-runtime data-lts attribute was deleted");
assert.equal(markedElement.hasAttribute("data-lts-runtime-id"), false, "runtime ID survived export cleanup");
assert.equal(markedElement.hasAttribute("data-lts-source-key"), false, "source mapping marker survived export cleanup");
assert.equal(markedElement.hasAttribute("aria-selected-view"), false, "view-navigation marker survived export cleanup");
assert.equal(markedElement.classList.contains("lts-import-selected"), false, "selection class survived export cleanup");
assert.equal(markedElement.classList.contains("user-card"), true, "author class was removed by export cleanup");
assert.equal(markedElement.classList.contains("lts-import-authored-card"), true, "author class sharing the lts-import prefix was removed");
assert.equal(markedElement.getAttribute("data-lts-author-note"), "preserve", "author data-lts attribute was removed");
assert.equal(markedElement.getAttribute("id"), "kept-id", "author ID was removed by export cleanup");
const valueInput = new FakeElement("input", { attributes: { value: "Before" } });
exportModule.applyEdit(valueInput, {
  nodeKind: "element",
  textAttribute: "value",
  hasLeafText: true,
  active: { text: true },
  values: { text: "After" }
});
assert.equal(valueInput.getAttribute("value"), "After", "safe visible input value was not exported as plain text");
assert.equal(exportModule.serialize({ documentElement: { outerHTML: "<html><body>safe</body></html>" } }, "<!doctype html><html></html>"), "<!doctype html>\n<html><body>safe</body></html>", "doctype-preserving serialization changed");

const history = [];
const future = [];
assert.equal(historyModule.commit(history, future, { value: 1 }, { value: 2 }, "visual edit"), true, "validated visual edit did not enter history");
assert.equal(historyModule.undo(history, future).value, 1, "undo did not restore the prior edit state");
assert.equal(historyModule.redo(history, future).value, 2, "redo did not restore the later edit state");

const allApplicationSource = [...moduleSources.values(), controllerSource].join("\n");
assert.match(templateSource, /<iframe[\s\S]*?id="importPreviewFrame"[\s\S]*?sandbox="allow-same-origin"[\s\S]*?referrerpolicy="no-referrer"/, "preview iframe isolation changed");
assert.doesNotMatch(templateSource, /sandbox="[^"]*(?:allow-scripts|allow-forms|allow-popups|allow-downloads|allow-top-navigation)/i, "preview iframe gained a prohibited permission");
for (const directive of ["default-src 'none'", "script-src 'none'", "connect-src 'none'", "form-action 'none'", "base-uri 'none'"]) {
  assert.ok(controllerSource.includes(directive), `restrictive CSP lost ${directive}`);
}
assert.doesNotMatch(allApplicationSource, /\b(?:fetch|XMLHttpRequest|WebSocket)\s*\(/, "application source added an external-network API");
assert.doesNotMatch(allApplicationSource, /\beval\s*\(|new\s+Function\s*\(/, "application source added dynamic code execution");
assert.match(controllerSource, /Object\.freeze\(\{ fileName: file\.name, source \}\)/, "immutable imported-source boundary is missing");
assert.match(controllerSource, /preventDefault\(\)/, "imported interaction blocker is missing");
assert.match(controllerSource, /"animate"[\s\S]*?"animatetransform"[\s\S]*?"set"[\s\S]*?"discard"/, "SVG declarative animation tags are not removed");
assert.match(controllerSource, /"autoplay", "controls"/, "native media autoplay and controls are not stripped");
assert.match(controllerSource, /historyCore\.commit[\s\S]*?historyCore\.undo[\s\S]*?historyCore\.redo/, "runtime import history does not consume the history module");
assert.match(controllerSource, /function resetSelectedImportTarget\(\)[\s\S]*?edit\.active = \{\}/, "selected imported edit reset is missing");
assert.match(controllerSource, /sanitizationCore\.sanitizeCss/, "runtime sanitizer does not consume the sanitization module");
assert.match(controllerSource, /uiRenderingCore\.renderList/, "compatibility summary does not consume the UI rendering module");

const persistenceCalls = [...controllerSource.matchAll(/localStorage\.(?:getItem|setItem)\(([^\n;]*)/g)];
assert.equal(persistenceCalls.length, 2, "unexpected localStorage access was added");
for (const call of persistenceCalls) {
  assert.match(call[1], /LANGUAGE_STORAGE_KEY/, "localStorage is being used for imported content rather than the UI language preference");
  assert.doesNotMatch(call[1], /(?:immutableSource|session|source|import)/i, "imported content leaked into persistence");
}

const exportSource = moduleSources.get("src/app/80-export.js");
const navigationSource = moduleSources.get("src/app/50-view-navigation.js");
assert.doesNotMatch(navigationSource, /\bhistory\b|\bexport\b/i, "preview-only view switching is coupled to history or export");
assert.doesNotMatch(exportSource, /view-navigation|showView|original\.display/, "preview-only view state is being serialized");
assert.match(exportSource, /data-lts-runtime-id[\s\S]*?data-lts-source-key[\s\S]*?aria-selected-view/, "export cleanup does not cover exact runtime/view markers");
assert.doesNotMatch(exportSource, /\^\(\?:data-lts-|\^lts-import-/, "export cleanup uses a broad prefix that can strip author content");
assert.doesNotMatch(exportSource, /\b(?:href|src|action|formaction|onclick|onsubmit)\b\s*:/i, "export edit path contains a behavioral property writer");

console.log(JSON.stringify({
  ok: true,
  checked: [
    ...moduleFiles,
    "src/index.template.html",
    "src/app/app.js"
  ],
  modules: graphNames,
  assertions: {
    deterministicModulePlan: true,
    twoAxisClassification: true,
    inertAppearanceEditing: ["button", "link", "form-controls"],
    nestedTextSiblingPreservation: true,
    importantPriorityOverrides: true,
    previewOnlyViewNavigation: true,
    diagnostics: diagnostics.diagnostics.length,
    runtimeMarkersExcludedFromExport: true,
    securityInvariants: {
      importedScripts: "not executed",
      navigationAndForms: "inert",
      externalNetwork: "blocked",
      importedContentPersistence: false,
      originalWriteback: false,
      sandbox: "allow-same-origin only"
    }
  }
}, null, 2));
