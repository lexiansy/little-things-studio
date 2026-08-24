import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { artifactPlan } from "./lib/artifact-plan.mjs";
import { renderArtifact } from "./lib/render-artifact.mjs";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const outputPath = path.join(root, artifactPlan.output);
const rendered = await renderArtifact(root);
const current = await readFile(outputPath, "utf8").catch(() => null);
if (current !== rendered) await writeFile(outputPath, rendered, "utf8");
console.log(JSON.stringify({ output: artifactPlan.output, bytes: Buffer.byteLength(rendered), changed: current !== rendered }, null, 2));
