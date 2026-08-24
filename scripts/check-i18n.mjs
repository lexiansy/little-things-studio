import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const html = await readFile(path.join(root, "index.html"), "utf8");
const localeSource = html.match(/const LOCALES = (\{[\s\S]*?\n      \});\n\n      function interpolate/)?.[1];
assert.ok(localeSource, "centralized LOCALES dictionary is missing");

const locales = vm.runInNewContext(`(${localeSource})`);
assert.deepEqual(Object.keys(locales).sort(), ["en", "zh-TW"]);
const zhKeys = Object.keys(locales["zh-TW"]).sort();
const enKeys = Object.keys(locales.en).sort();
assert.deepEqual(enKeys, zhKeys, "Traditional Chinese and English dictionary keys differ");
for (const language of ["zh-TW", "en"]) {
  for (const [key, value] of Object.entries(locales[language])) {
    assert.equal(typeof value, "string", `${language}.${key} is not a string`);
    assert.ok(value.trim(), `${language}.${key} is blank`);
  }
}

for (const key of [
  "start.import",
  "start.demo",
  "import.replace",
  "export.download",
  "return.start",
  "action.undo",
  "action.redo",
  "action.help",
  "action.log",
  "import.safeLeaf",
  "import.safeStructure",
  "return.copy",
  "demo.title",
  "demo.starsLabel"
]) {
  assert.ok(zhKeys.includes(key), `required UI key missing: ${key}`);
}

assert.notEqual(locales.en["action.logOpen.one"], locales.en["action.logOpen.other"], "English adjustment-log plural forms are identical");
assert.notEqual(locales.en["import.editCount.one"], locales.en["import.editCount.other"], "English imported-edit plural forms are identical");
assert.match(html, /const LANGUAGE_STORAGE_KEY = "lts-interface-language"/);
assert.match(html, /searchParams\.get\("lang"\)[\s\S]*?localStorage\.getItem\(LANGUAGE_STORAGE_KEY\)[\s\S]*?navigator\.languages/);
assert.match(html, /document\.documentElement\.lang = nextLanguage/);
assert.match(html, /window\.history\.replaceState\(null, "", url\)/);
assert.match(html, /window\.localStorage\.setItem\(LANGUAGE_STORAGE_KEY, nextLanguage\)/);
assert.equal((html.match(/localStorage\.setItem\(/g) || []).length, 1, "localStorage must only persist the interface language");
assert.match(html, /id="languageButton"[^>]*>EN<\/button>/);
assert.match(html, /nextLanguage === "zh-TW" \? "EN" : "中"/);
assert.match(html, /if \(state\.mode === "demo" && buildSummaries\(\)\.length > 0\) applyDemoMetadata\(\);\s*else applyDemoLanguage\(\)/);
assert.match(html, /function applyDemoMetadata\(\)[\s\S]*?dataset\.label = elementText\(id, "label"\)/);
assert.match(html, /document\.querySelectorAll\("\[title\], \[aria-label\]"\)/);
assert.match(html, /parent\.closest\("#demoPage"\)/);
assert.match(html, /state\.importSession[\s\S]*?refreshLocalizedDynamicUi/);
assert.match(html, /@container \(max-width: 760px\)/);
assert.match(html, /@container \(max-width: 330px\)/);
assert.doesNotMatch(html, /id="safeStateLabel"|安全副本・另存下載/);

const directKeys = [...html.matchAll(/\bt\("([^"]+)"/g)].map(match => match[1]);
for (const key of directKeys) assert.ok(zhKeys.includes(key), `t() references a missing key: ${key}`);
const pluralBases = [...html.matchAll(/\btp\("([^"]+)"/g)].map(match => match[1]);
for (const key of pluralBases) {
  assert.ok(zhKeys.includes(`${key}.one`), `tp() one form missing: ${key}`);
  assert.ok(zhKeys.includes(`${key}.other`), `tp() other form missing: ${key}`);
}

console.log(JSON.stringify({
  ok: true,
  languages: Object.keys(locales),
  dictionaryKeysPerLanguage: zhKeys.length,
  directTranslationCalls: directKeys.length,
  pluralTranslationCalls: pluralBases.length,
  persistedPreference: "lts-interface-language"
}, null, 2));
