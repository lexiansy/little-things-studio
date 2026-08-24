__LTS__.define("import-analysis", [], () => {
  const URL_ATTRIBUTES = Object.freeze([
    "href", "src", "srcset", "poster", "action", "formaction", "data", "cite",
    "background", "longdesc", "usemap", "manifest", "profile", "xlink:href", "srcdoc"
  ]);
  const INTERACTIVE_SELECTOR = "a, button, form, fieldset, input, select, option, textarea, details, summary, dialog";

  function isExternal(value) {
    return /^(?:https?:)?\/\//i.test(String(value || "").trim());
  }

  function isRelative(value) {
    const normalized = String(value || "").trim();
    return Boolean(normalized)
      && !/^(?:data:|blob:|#|\/|[A-Za-z][A-Za-z0-9+.-]*:)/i.test(normalized);
  }

  function analyzeDocument(document, source) {
    const scripts = document.querySelectorAll("script").length;
    const eventHandlers = [...document.querySelectorAll("*")]
      .reduce((count, element) => count + [...element.attributes].filter(attribute => /^on/i.test(attribute.name)).length, 0);
    const resources = [];
    document.querySelectorAll("*").forEach(element => {
      URL_ATTRIBUTES.forEach(name => {
        if (!element.hasAttribute(name)) return;
        const value = element.getAttribute(name);
        if (isExternal(value)) resources.push({ kind: "external", tag: element.tagName.toLowerCase(), attribute: name, value });
        else if (isRelative(value)) resources.push({ kind: "relative", tag: element.tagName.toLowerCase(), attribute: name, value });
      });
    });
    document.querySelectorAll("style").forEach(style => {
      const css = style.textContent || "";
      if (/@import\b/i.test(css)) resources.push({ kind: "external", tag: "style", attribute: "@import", value: "CSS @import" });
      for (const match of css.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/gi)) {
        if (isExternal(match[2])) resources.push({ kind: "external", tag: "style", attribute: "url", value: match[2] });
        else if (isRelative(match[2])) resources.push({ kind: "relative", tag: "style", attribute: "url", value: match[2] });
      }
    });

    const diagnostics = [];
    const add = code => { if (!diagnostics.includes(code)) diagnostics.push(code); };
    if (scripts) add(/(?:createElement|innerHTML|insertAdjacentHTML|appendChild|customElements\.define|getContext\s*\()/i.test(source)
      ? "javascript-created-content-absent"
      : "imported-scripts-removed");
    if (eventHandlers) add("inline-handlers-removed");
    if (resources.some(resource => resource.kind === "external")) add("external-resources-blocked");
    if (resources.some(resource => resource.kind === "relative")) add("relative-resources-blocked");
    if (document.querySelectorAll(INTERACTIVE_SELECTOR).length) add("original-interactions-inert");
    if (document.querySelector("canvas")) add("canvas-content-limited");
    if (document.querySelector("svg")) add("svg-editing-limited");
    if ([...document.querySelectorAll("*")].some(element => element.tagName.includes("-"))) add("custom-element-limited");
    if ([...document.querySelectorAll("style")].some(style => /::(?:before|after)\b/i.test(style.textContent || ""))) add("pseudo-elements-limited");

    return Object.freeze({
      scripts,
      eventHandlers,
      resources: Object.freeze(resources),
      interactiveElements: document.querySelectorAll(INTERACTIVE_SELECTOR).length,
      diagnostics: Object.freeze(diagnostics)
    });
  }

  return { analyzeDocument, isExternal, isRelative };
});
