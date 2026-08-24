__LTS__.define("classification", [], () => {
  const INERT_TAGS = new Set(["a", "area", "button", "form", "fieldset", "input", "select", "option", "textarea", "details", "summary", "dialog", "audio", "video", "source", "track"]);
  const LIMITED_TAGS = new Set(["input", "select", "option", "textarea", "svg", "math", "audio", "video", "source", "track", "details", "summary", "dialog"]);
  const UNSUPPORTED_TAGS = new Set(["canvas", "map", "area"]);
  const BEHAVIOR_ATTRIBUTES = new Set(["href", "src", "srcset", "action", "formaction", "target", "download", "ping", "onclick", "onsubmit"]);

  const commonProperties = Object.freeze([
    "fontSize", "fontWeight", "lineHeight", "textAlign", "color", "backgroundColor",
    "borderWidth", "borderColor", "borderStyle", "radius", "shadow", "opacity",
    "width", "height", "minWidth", "maxWidth", "minHeight", "maxHeight",
    "padding", "margin", "x", "y", "justifyContent", "alignItems", "gap"
  ]);

  function classifyElement(element) {
    const tag = element.tagName.toLowerCase();
    const isCustom = tag.includes("-");
    const interaction = INERT_TAGS.has(tag)
      ? { state: "inert", reasons: [tag === "a" || tag === "area" ? "navigation-disabled" : "interaction-disabled"] }
      : { state: "safe", reasons: [] };
    let visual = { state: "editable", reasons: [], properties: [...commonProperties, "text"] };
    if (UNSUPPORTED_TAGS.has(tag) || isCustom) {
      visual = { state: "unsupported", reasons: [isCustom ? "custom-element-internals-unavailable" : `${tag}-content-unavailable`], properties: ["width", "height", "opacity", "x", "y"] };
    } else if (LIMITED_TAGS.has(tag)) {
      visual = { state: "limited", reasons: [`${tag}-editing-limited`], properties: [...commonProperties] };
    }
    return { interaction, visual };
  }

  return { INERT_TAGS, BEHAVIOR_ATTRIBUTES, commonProperties, classifyElement };
});
