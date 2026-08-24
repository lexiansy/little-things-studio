__LTS__.define("sanitization", [], () => {
  function isSafeDataOrBlobUrl(value, purpose = "media") {
    const normalized = String(value || "").trim().replace(/[\u0000-\u001f\u007f\s]+/g, "");
    if (/^blob:/i.test(normalized)) return true;
    if (purpose === "font") {
      return /^data:(?:font\/(?:woff2?|ttf|otf)|application\/(?:font-woff|font-sfnt|vnd\.ms-fontobject));/i.test(normalized);
    }
    return /^data:image\/(?:png|jpe?g|gif|webp|avif);/i.test(normalized)
      || /^data:(?:audio|video)\/[a-z0-9.+-]+;/i.test(normalized);
  }

  function sanitizeCss(cssText, noteBlocked) {
    let cleaned = String(cssText || "");
    cleaned = cleaned.replace(/@import\s+(?:url\s*\([^)]*\)|[^;]+);?/gi, () => {
      noteBlocked("CSS @import");
      return "";
    });
    cleaned = cleaned.replace(/url\s*\(\s*(['"]?)(.*?)\1\s*\)/gi, (match, quote, rawUrl) => {
      const purpose = /(?:font-face|font-family)/i.test(cleaned) ? "font" : "media";
      if (isSafeDataOrBlobUrl(rawUrl, purpose)) return `url("${rawUrl.trim().replace(/"/g, "%22")}")`;
      noteBlocked("CSS external resource");
      return "none";
    });
    cleaned = cleaned.replace(/(['"])(?:https?:)?\/\/[^'"]*\1/gi, () => {
      noteBlocked("CSS external resource");
      return "none";
    });
    cleaned = cleaned.replace(/(?:https?:)?\/\/[^\s)'";}]+/gi, () => {
      noteBlocked("CSS external resource");
      return "none";
    });
    cleaned = cleaned.replace(/(?:expression\s*\(|-moz-binding\s*:|behavior\s*:)/gi, () => {
      noteBlocked("unsafe CSS behavior");
      return "blocked-";
    });
    cleaned = cleaned.replace(/javascript\s*:/gi, () => {
      noteBlocked("javascript URL");
      return "blocked:";
    });
    return cleaned;
  }

  return { isSafeDataOrBlobUrl, sanitizeCss };
});
