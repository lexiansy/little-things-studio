__LTS__.define("i18n", [], () => {
  const supportedLanguages = Object.freeze(["zh-TW", "en"]);

  function interpolate(message, values = {}) {
    return String(message).replace(/\{([A-Za-z0-9_]+)\}/g, (_, key) => String(values[key] ?? ""));
  }

  function normalizeLanguage(value) {
    if (value === "zh-TW" || value === "en") return value;
    const normalized = String(value || "").toLowerCase();
    if (normalized.startsWith("zh")) return "zh-TW";
    if (normalized.startsWith("en")) return "en";
    return null;
  }

  function pluralSuffix(language, count) {
    return language === "en" && Number(count) === 1 ? "one" : "other";
  }

  return { supportedLanguages, interpolate, normalizeLanguage, pluralSuffix };
});
