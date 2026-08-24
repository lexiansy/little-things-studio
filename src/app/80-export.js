__LTS__.define("export", ["selection-editing"], editing => {
  const internalAttributes = new Set(["data-lts-runtime-id", "data-lts-source-key", "aria-selected-view"]);
  const internalClasses = new Set(["lts-import-selected"]);

  function stripRuntimeMarkers(document) {
    document.querySelectorAll("#lts-import-edit-overlay, #lts-import-resize-handle").forEach(element => element.remove());
    document.querySelectorAll("*").forEach(element => {
      [...element.attributes].forEach(attribute => {
        if (internalAttributes.has(attribute.name.toLowerCase())) element.removeAttribute(attribute.name);
      });
      [...element.classList].filter(name => internalClasses.has(name)).forEach(name => element.classList.remove(name));
      if (!element.classList.length) element.removeAttribute("class");
    });
  }

  function applyEdit(target, edit) {
    if (edit.nodeKind === "text") {
      if (edit.active.text) target.data = String(edit.values.text);
      return;
    }
    Object.keys(edit.active).forEach(property => {
      if (property === "text") {
        if (edit.textAttribute === "value") target.setAttribute("value", String(edit.values.text));
        else if (edit.hasLeafText) target.textContent = String(edit.values.text);
        return;
      }
      editing.applyVisualProperty(target, property, edit.values[property], edit.values);
    });
  }

  function serialize(document, source) {
    const doctype = source.match(/^\s*(<!doctype[^>]*>)/i)?.[1] || "";
    return `${doctype}${doctype ? "\n" : ""}${document.documentElement.outerHTML}`;
  }

  return { stripRuntimeMarkers, applyEdit, serialize };
});
