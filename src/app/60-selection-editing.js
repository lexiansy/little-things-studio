__LTS__.define("selection-editing", ["classification"], classification => {
  const propertySchema = Object.freeze({
    fontSize: { css: "font-size", type: "number", min: 6, max: 240, unit: "px" },
    fontWeight: { css: "font-weight", type: "number", min: 100, max: 900, unit: "" },
    lineHeight: { css: "line-height", type: "number", min: 0.5, max: 4, unit: "" },
    textAlign: { css: "text-align", type: "enum", values: ["left", "center", "right", "justify"] },
    color: { css: "color", type: "color" },
    backgroundColor: { css: "background-color", type: "color" },
    borderWidth: { css: "border-width", type: "number", min: 0, max: 40, unit: "px" },
    borderColor: { css: "border-color", type: "color" },
    borderStyle: { css: "border-style", type: "enum", values: ["none", "solid", "dashed", "dotted", "double"] },
    radius: { css: "border-radius", type: "number", min: 0, max: 400, unit: "px" },
    shadow: { css: "box-shadow", type: "text", maxLength: 160 },
    opacity: { css: "opacity", type: "number", min: 0, max: 1, unit: "" },
    width: { css: "width", type: "number", min: 12, max: 2000, unit: "px" },
    height: { css: "height", type: "number", min: 12, max: 2000, unit: "px" },
    minWidth: { css: "min-width", type: "number", min: 0, max: 2000, unit: "px" },
    maxWidth: { css: "max-width", type: "number", min: 0, max: 4000, unit: "px" },
    minHeight: { css: "min-height", type: "number", min: 0, max: 2000, unit: "px" },
    maxHeight: { css: "max-height", type: "number", min: 0, max: 4000, unit: "px" },
    padding: { css: "padding", type: "number", min: 0, max: 400, unit: "px" },
    margin: { css: "margin", type: "number", min: -400, max: 400, unit: "px" },
    x: { css: "translate", type: "offset" },
    y: { css: "translate", type: "offset" },
    justifyContent: { css: "justify-content", type: "enum", values: ["start", "center", "end", "space-between", "space-around", "space-evenly"] },
    alignItems: { css: "align-items", type: "enum", values: ["stretch", "start", "center", "end", "baseline"] },
    gap: { css: "gap", type: "number", min: 0, max: 400, unit: "px" }
  });

  function directTextUnits(element, sourcePath) {
    return [...element.childNodes].flatMap((node, childIndex) => {
      if (node.nodeType !== Node.TEXT_NODE || !node.data.trim()) return [];
      return [{
        nodeKind: "text",
        nodePath: [...sourcePath, { childNode: childIndex }],
        label: node.data.replace(/\s+/g, " ").trim().slice(0, 80),
        text: node.data
      }];
    });
  }

  function validateValue(property, value) {
    const schema = propertySchema[property];
    if (!schema) return false;
    if (schema.type === "color") return /^#[0-9a-f]{6}$/i.test(String(value));
    if (schema.type === "enum") return schema.values.includes(String(value));
    if (schema.type === "text") return typeof value === "string" && value.length <= schema.maxLength;
    if (schema.type === "offset") return Number.isFinite(Number(value)) && Number(value) >= -1000 && Number(value) <= 1000;
    const number = Number(value);
    return Number.isFinite(number) && number >= schema.min && number <= schema.max;
  }

  function applyVisualProperty(element, property, value, values = {}) {
    if (!validateValue(property, value)) throw new Error(`Invalid visual edit: ${property}`);
    if (property === "x" || property === "y") {
      const x = Number(property === "x" ? value : values.x || 0);
      const y = Number(property === "y" ? value : values.y || 0);
      element.style.setProperty("translate", `${x}px ${y}px`, "important");
      return;
    }
    const schema = propertySchema[property];
    element.style.setProperty(schema.css, `${value}${schema.unit ?? ""}`, "important");
  }

  return { propertySchema, directTextUnits, validateValue, applyVisualProperty, classifyElement: classification.classifyElement };
});
