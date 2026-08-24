import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { artifactPlan } from "./lib/artifact-plan.mjs";
import { renderArtifact } from "./lib/render-artifact.mjs";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const trackedArtifact = await readFile(path.join(root, artifactPlan.output), "utf8");
const first = await renderArtifact(root);
const second = await renderArtifact(root);
assert.equal(first, second, "artifact build is nondeterministic");
if (trackedArtifact !== first) {
  let mismatch = 0;
  while (mismatch < trackedArtifact.length && mismatch < first.length && trackedArtifact[mismatch] === first[mismatch]) mismatch += 1;
  assert.fail(`tracked index.html differs from the deterministic build at character ${mismatch}`);
}

console.log(JSON.stringify({
  ok: true,
  output: artifactPlan.output,
  bytes: Buffer.byteLength(first),
  sha256: createHash("sha256").update(first).digest("hex"),
  deterministicRenders: 2,
  exactParity: true
}, null, 2));
