import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { lstat, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const requiredPaths = [
  ".github/ISSUE_TEMPLATE/bug_report.yml",
  ".github/ISSUE_TEMPLATE/config.yml",
  ".github/ISSUE_TEMPLATE/feature_request.yml",
  ".github/PULL_REQUEST_TEMPLATE.md",
  ".github/workflows/ci.yml",
  ".gitignore",
  ".nojekyll",
  "AGENTS.md",
  "CHANGELOG.md",
  "CONTRIBUTING.md",
  "CONTRIBUTORS.md",
  "LICENSE",
  "README.md",
  "README.zh-TW.md",
  "SECURITY.md",
  "docs/ASSET_PROVENANCE.md",
  "docs/COMPATIBILITY.md",
  "docs/CURRENT_STATUS.md",
  "docs/HANDOFF.md",
  "docs/IMPORT_SECURITY_MODEL.md",
  "docs/NEXT_STEPS.md",
  "docs/ROADMAP.md",
  "docs/assets/little-things-studio-v0.1.0-beta.1.png",
  "fixtures/compatibility/checkpoint-baseline.json",
  "fixtures/compatibility/css-cascade.html",
  "fixtures/compatibility/dependencies.html",
  "fixtures/compatibility/dynamic-dom.html",
  "fixtures/compatibility/graphics-layout.html",
  "fixtures/compatibility/manifest.json",
  "fixtures/compatibility/matrix-v0.2-experiment.json",
  "fixtures/compatibility/media-inert.html",
  "fixtures/compatibility/multi-view.html",
  "fixtures/compatibility/nested-interactive.html",
  "fixtures/compatibility/static-inline.html",
  "fixtures/compatibility/unsafe-capabilities.html",
  "index.html",
  "package.json",
  "scripts/build.mjs",
  "scripts/check-build-parity.mjs",
  "scripts/check-compatibility.mjs",
  "scripts/check-compatibility-architecture.mjs",
  "scripts/check-i18n.mjs",
  "scripts/check-import-editing.mjs",
  "scripts/check-import-safety.mjs",
  "scripts/check-module-graph.mjs",
  "scripts/check-public-readiness.mjs",
  "scripts/check-static-export.mjs",
  "scripts/lib/artifact-plan.mjs",
  "scripts/lib/render-artifact.mjs",
  "scripts/serve.mjs",
  "src/app/00-runtime.js",
  "src/app/10-i18n.js",
  "src/app/20-import-analysis.js",
  "src/app/30-sanitization.js",
  "src/app/40-classification.js",
  "src/app/50-view-navigation.js",
  "src/app/60-selection-editing.js",
  "src/app/70-history.js",
  "src/app/80-export.js",
  "src/app/90-ui-rendering.js",
  "src/app/app.js",
  "src/index.template.html",
  "src/styles/app.css"
];

async function walk(directory, relative = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (!relative && entry.name === ".git") continue;
    const childRelative = path.posix.join(relative, entry.name);
    if (childRelative === "docs/reports") continue;
    const child = path.join(directory, entry.name);
    const stat = await lstat(child);
    assert.equal(stat.isSymbolicLink(), false, `symlink is not allowed: ${childRelative}`);
    if (entry.isDirectory()) files.push(...await walk(child, childRelative));
    else files.push(childRelative);
  }
  return files;
}

const files = (await walk(root)).sort();
for (const required of requiredPaths) assert.ok(files.includes(required), `missing public file: ${required}`);
assert.equal(files.some(file => file === "docs/reports" || file.startsWith("docs/reports/")), false, "local reports entered the candidate");

const gitignore = await readFile(path.join(root, ".gitignore"), "utf8");
assert.match(gitignore, /(?:^|\n)docs\/reports\/(?:\r?\n|$)/, "local reports must remain ignored");

const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
assert.equal(packageJson.version, "0.1.0-beta.1");
assert.equal(packageJson.private, true);
assert.equal(packageJson.license, "MIT");
assert.equal(packageJson.author, "Lexian & Yao");
assert.equal(packageJson.repository?.url, "https://github.com/lexiansy/little-things-studio.git");
assert.equal(packageJson.homepage, "https://lexiansy.github.io/little-things-studio/");
assert.equal(packageJson.bugs?.url, "https://github.com/lexiansy/little-things-studio/issues");
assert.equal("dependencies" in packageJson, false);
assert.equal("devDependencies" in packageJson, false);

const noJekyll = await readFile(path.join(root, ".nojekyll"));
assert.equal(noJekyll.length, 0, ".nojekyll must remain empty");

const index = await readFile(path.join(root, "index.html"), "utf8");
assert.match(index, /<title>Little Things Studio v0\.1\.0-beta\.1\b/);
assert.match(index, /class="prototype-badge">v0\.1\.0-beta\.1</);
assert.match(index, />LITTLE THINGS DEMO</);
assert.match(index, />一頁小日常</);
assert.match(index, /data-editable="stars"[^>]+data-label="雙星光"/);
assert.match(index, />午後的光落在桌角</);
assert.match(index, /Created together by Lexian &amp; Yao/);
assert.match(index, /<div class="brand-mark" aria-hidden="true">\s*<span class="project-mark" aria-hidden="true">LTS<\/span>/);
const inlinePngs = [...index.matchAll(/<img\b[^>]*\bsrc="data:image\/png;base64,([A-Za-z0-9+/=]+)"[^>]*>/gi)];
assert.equal(inlinePngs.length, 1, "only the approved footer collaboration mark may be an inline PNG");
assert.match(inlinePngs[0][0], /class="collaboration-mark"/);
assert.match(index, /<footer class="signature">\s*<img class="collaboration-mark"[^>]*>\s*<span>✦ Created together by Lexian &amp; Yao ✦<\/span>/);
const footerMark = Buffer.from(inlinePngs[0][1], "base64");
assert.deepEqual([...footerMark.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], "footer collaboration mark is not PNG data");
assert.equal(footerMark.readUInt32BE(16), 48, "footer collaboration mark width changed");
assert.equal(footerMark.readUInt32BE(20), 48, "footer collaboration mark height changed");
assert.equal(footerMark.length, 4033, "footer collaboration mark bytes changed");
assert.equal(createHash("sha256").update(footerMark).digest("hex"), "50c22d2d0be21760bf274d354421fd875b37ad2c6daf47547c99b8efc6713348", "footer collaboration mark hash changed");

const readme = await readFile(path.join(root, "README.md"), "utf8");
assert.match(readme, /Little Things Studio was created together by Lexian & Yao, with implementation assistance from OpenAI Codex\./);
assert.match(readme, /^# Little Things Studio\s+\*\*Use it online:\*\* \[Open Little Things Studio\]\(https:\/\/lexiansy\.github\.io\/little-things-studio\/\) — no installation or account required\./);
assert.match(readme, /choose \*\*Import HTML file\*\*[^\n]+\*\*Try the built-in demo\*\*/);
assert.match(readme, /top-right \*\*中\*\* switch/);
assert.match(readme, /never translates or rewrites imported page text/);
assert.match(readme, /docs\/assets\/little-things-studio-v0\.1\.0-beta\.1\.png/);
assert.match(readme, /docs\/ASSET_PROVENANCE\.md/);
assert.match(readme, /https:\/\/lexiansy\.github\.io\/little-things-studio\//);
assert.match(readme, /https:\/\/github\.com\/lexiansy\/little-things-studio\/releases\/tag\/v0\.1\.0-beta\.1/);

const readmeZh = await readFile(path.join(root, "README.zh-TW.md"), "utf8");
assert.match(readmeZh, /^# Little Things Studio\s+\*\*網頁版：\*\* \[立即開啟 Little Things Studio\]\(https:\/\/lexiansy\.github\.io\/little-things-studio\/\)——免安裝、免登入。/);
assert.match(readmeZh, /不用安裝或登入。[\s\S]*?「匯入 HTML 檔」[\s\S]*?「試玩內建範例」/);
assert.match(readmeZh, /右上角的 \*\*EN\*\*/);
assert.match(readmeZh, /不會翻譯或改寫匯入頁面的文字/);

const provenance = await readFile(path.join(root, "docs/ASSET_PROVENANCE.md"), "utf8");
assert.match(provenance, /Project-authored CSS\/text product mark/);
assert.match(provenance, /Original project-owned collaboration mark/);
assert.match(provenance, /Project-created screenshot/);
assert.match(provenance, /Deterministic technical test asset/);

const screenshot = await readFile(path.join(root, "docs/assets/little-things-studio-v0.1.0-beta.1.png"));
assert.deepEqual([...screenshot.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], "README screenshot is not PNG data");
assert.equal(screenshot.readUInt32BE(16), 1280, "README screenshot width changed");
assert.equal(screenshot.readUInt32BE(20), 720, "README screenshot height changed");
assert.ok(screenshot.length < 750_000, "README screenshot is unexpectedly large");
assert.equal(createHash("sha256").update(screenshot).digest("hex"), "0507e1d07fd8e1aaaedd6248a3b4e6bc75fc378afad77c62183d924fe5463e82", "generic README screenshot changed");

const workflow = await readFile(path.join(root, ".github/workflows/ci.yml"), "utf8");
assert.match(workflow, /actions\/checkout@[0-9a-f]{40} # v\d+\.\d+\.\d+/);
assert.match(workflow, /actions\/setup-node@[0-9a-f]{40} # v\d+\.\d+\.\d+/);
assert.match(workflow, /permissions:\s*\n  contents: read/);
assert.doesNotMatch(workflow, /npm (?:ci|install)|permissions:\s*write|deploy/i);

const textExtensions = new Set([".css", ".html", ".js", ".json", ".md", ".mjs", ".yml", ".yaml", ""]);
const sensitivePatterns = [
  { name: "Windows absolute path", pattern: /\b[A-Za-z]:[\\/]/ },
  { name: "home absolute path", pattern: /\/(?:Users|home)\// },
  { name: "private Codex metadata", pattern: new RegExp("\\." + "codex(?:[\\\\/]|\\b)", "i") },
  { name: "credential-like token", pattern: /\b(?:ghp|github_pat|sk-proj)-[A-Za-z0-9_-]{16,}/ },
  { name: "private email", pattern: /\b[A-Z0-9._%+-]+@(?!users\.noreply\.github\.com\b)[A-Z0-9.-]+\.[A-Z]{2,}\b/i }
];
const retiredDemoTerms = [
  { name: "retired repeated-title token", value: ["魔", "魔"].join("") },
  { name: "retired English sample token", value: ["MO", "MO"].join("") },
  { name: "retired owner-record token", value: ["瑤", "記錄"].join("") },
  { name: "retired sample sentence", value: ["在窗邊", "曬著肚子", "睡覺"].join("") },
  { name: "retired decoration label", value: ["雙", "腳印"].join("") },
  { name: "retired recent-item label", value: ["最近", "照片"].join("") },
  { name: "retired CSS decoration token", value: ["pa", "w"].join("") }
];

for (const file of files) {
  const extension = path.extname(file);
  if (!textExtensions.has(extension) || file.endsWith(".png") || file === "LICENSE") continue;
  const text = await readFile(path.join(root, ...file.split("/")), "utf8");
  assert.doesNotMatch(text, new RegExp("little-things-studio-" + "public-prep", "i"), `obsolete preparation repository reference: ${file}`);
  for (const { name, pattern } of sensitivePatterns) assert.doesNotMatch(text, pattern, `${name}: ${file}`);
  for (const { name, value } of retiredDemoTerms) {
    const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.doesNotMatch(text, new RegExp(escaped, "i"), `${name}: ${file}`);
  }

  if (!file.endsWith(".md")) continue;
  for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].trim().replace(/^<|>$/g, "").split("#", 1)[0];
    if (!target || /^(?:https?:|mailto:)/i.test(target)) continue;
    const resolved = path.resolve(path.dirname(path.join(root, ...file.split("/"))), decodeURIComponent(target));
    assert.ok(resolved === root || resolved.startsWith(`${root}${path.sep}`), `link escapes repository: ${file} -> ${target}`);
    await lstat(resolved);
  }
}

console.log(JSON.stringify({
  ok: true,
  filesChecked: files.length,
  requiredPublicFiles: requiredPaths.length,
  dependencyCount: 0,
  screenshot: { format: "PNG", width: 1280, height: 720, bytes: screenshot.length },
  reportsCommitted: 0,
  symlinks: 0,
  version: packageJson.version
}, null, 2));
