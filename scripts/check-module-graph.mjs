import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { artifactPlan } from "./lib/artifact-plan.mjs";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const runtimeSource = "src/app/00-runtime.js";
const controllerSource = "src/app/app.js";

assert.equal(artifactPlan.appSources[0], runtimeSource, "module runtime must be the first application source");
assert.equal(artifactPlan.appSources.at(-1), controllerSource, "application controller must be the final application source");
assert.equal(new Set(artifactPlan.appSources).size, artifactPlan.appSources.length, "application source plan contains duplicates");

const moduleSources = artifactPlan.appSources.slice(1, -1);
assert.ok(moduleSources.length > 0, "application source plan has no source modules");
for (const [index, source] of moduleSources.entries()) {
  assert.match(source, /^src\/app\/[1-9][0-9]-[a-z0-9-]+\.js$/, `invalid ordered module source path: ${source}`);
  if (index > 0) assert.ok(moduleSources[index - 1] < source, `module sources are not in deterministic lexical order: ${source}`);
}

const context = vm.createContext(Object.create(null), {
  name: "little-things-studio-module-graph",
  codeGeneration: { strings: false, wasm: false }
});
for (const source of [runtimeSource, ...moduleSources]) {
  const code = await readFile(path.join(root, ...source.split("/")), "utf8");
  assert.doesNotMatch(code, /^\s*(?:import|export)\b/m, `browser-concatenated source must not use ESM syntax: ${source}`);
  assert.doesNotMatch(code, /\b[A-Za-z]:[\\/]|\/(?:Users|home)\//, `source contains an absolute local path: ${source}`);
  if (source !== runtimeSource) {
    const definitions = [...code.matchAll(/__LTS__\.define\(\s*["']([^"']+)["']/g)];
    assert.equal(definitions.length, 1, `each source module must register exactly one module: ${source}`);
    const expectedName = path.basename(source, ".js").replace(/^\d+-/, "");
    assert.equal(definitions[0][1], expectedName, `source filename and registered module name differ: ${source}`);
  }
  new vm.Script(code, { filename: source }).runInContext(context, { timeout: 1000 });
}

const graph = JSON.parse(vm.runInContext("JSON.stringify(__LTS__.graph())", context, { timeout: 1000 }));
assert.equal(graph.length, moduleSources.length, "every planned module source must register exactly one module");
const moduleNames = graph.map(entry => entry.name);
assert.equal(new Set(moduleNames).size, moduleNames.length, "module registry contains duplicate names");

const indexes = new Map(moduleNames.map((name, index) => [name, index]));
for (const entry of graph) {
  assert.match(entry.name, /^[a-z][a-z0-9-]*$/, `invalid module name: ${entry.name}`);
  assert.ok(Array.isArray(entry.dependencies), `module dependencies must be an array: ${entry.name}`);
  assert.equal(new Set(entry.dependencies).size, entry.dependencies.length, `module repeats a dependency: ${entry.name}`);
  for (const dependency of entry.dependencies) {
    assert.ok(indexes.has(dependency), `module dependency is not registered: ${entry.name} -> ${dependency}`);
    assert.ok(indexes.get(dependency) < indexes.get(entry.name), `dependency must precede its consumer: ${entry.name} -> ${dependency}`);
  }
}

for (const name of moduleNames) {
  vm.runInContext(`__LTS__.use(${JSON.stringify(name)})`, context, { timeout: 1000 });
}

const controller = await readFile(path.join(root, ...controllerSource.split("/")), "utf8");
assert.match(controller, /^\s*\(\(\)\s*=>\s*\{/, "application controller must remain an isolated IIFE");
assert.doesNotMatch(controller, /__LTS__\.define\s*\(/, "application controller must not register a source module");
for (const moduleName of moduleNames) {
  assert.ok(controller.includes(`__LTS__.use("${moduleName}")`), `planned module is not consumed by the runtime controller: ${moduleName}`);
}

console.log(JSON.stringify({
  ok: true,
  runtime: runtimeSource,
  controller: controllerSource,
  moduleCount: graph.length,
  modules: graph,
  dependencyOrder: "acyclic-and-before-consumer"
}, null, 2));
