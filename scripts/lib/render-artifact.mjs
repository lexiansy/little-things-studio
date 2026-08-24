import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { artifactPlan } from "./artifact-plan.mjs";

function countOccurrences(value, needle) {
  return value.split(needle).length - 1;
}

async function readSource(root, relativePath) {
  const absolutePath = path.resolve(root, relativePath);
  assert.ok(absolutePath.startsWith(`${root}${path.sep}`), `source escapes repository: ${relativePath}`);
  const source = await readFile(absolutePath, "utf8");
  assert.equal(source.startsWith("\uFEFF"), false, `source contains a BOM: ${relativePath}`);
  assert.doesNotMatch(source, /\b[A-Za-z]:[\\/]|\/(?:Users|home)\//, `source contains an absolute local path: ${relativePath}`);
  return source;
}

export async function renderArtifact(root) {
  const template = await readSource(root, artifactPlan.template);
  assert.equal(countOccurrences(template, artifactPlan.styleMarker), 1, "style build marker must appear exactly once");
  assert.equal(countOccurrences(template, artifactPlan.appMarker), 1, "app build marker must appear exactly once");

  const styles = (await Promise.all(artifactPlan.styleSources.map(file => readSource(root, file)))).join("\n");
  const app = (await Promise.all(artifactPlan.appSources.map(file => readSource(root, file)))).join("\n");
  assert.doesNotMatch(app, /<\/script/i, "application source contains a closing script tag");

  return template
    .replace(artifactPlan.styleMarker, styles)
    .replace(artifactPlan.appMarker, app);
}
