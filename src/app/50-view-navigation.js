__LTS__.define("view-navigation", [], () => {
  function inferActiveDisplay(element) {
    const inlineDisplay = element.style.getPropertyValue("display");
    const inlinePriority = element.style.getPropertyPriority("display");
    const wasHidden = element.hidden;
    const ariaHidden = element.getAttribute("aria-hidden");
    element.hidden = false;
    element.removeAttribute("aria-hidden");
    element.style.removeProperty("display");
    const computedDisplay = element.ownerDocument.defaultView?.getComputedStyle(element).display;
    element.hidden = wasHidden;
    if (ariaHidden == null) element.removeAttribute("aria-hidden");
    else element.setAttribute("aria-hidden", ariaHidden);
    if (inlineDisplay) element.style.setProperty("display", inlineDisplay, inlinePriority);
    else element.style.removeProperty("display");
    return computedDisplay && computedDisplay !== "none" ? computedDisplay : "block";
  }

  function discoverViews(document) {
    const candidates = new Set([...document.querySelectorAll('[role="tabpanel"]')]);
    document.querySelectorAll('a[href^="#"], [role="tab"][aria-controls]').forEach(control => {
      const targetId = control.getAttribute("aria-controls") || control.getAttribute("href")?.slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target && /^(?:SECTION|ARTICLE|MAIN|DIV)$/.test(target.tagName)) candidates.add(target);
    });
    document.querySelectorAll("[hidden], [aria-hidden='true']").forEach(element => {
      if (/^(?:SECTION|ARTICLE|MAIN|DIV)$/.test(element.tagName)) candidates.add(element);
    });
    const views = [...candidates].filter(element => !element.id.startsWith("lts-import-")
      && (element.id || element.getAttribute("aria-label") || element.querySelector("h1, h2")));
    if (views.length < 2) return [];
    return views.map((element, index) => ({
      id: `view-${index + 1}`,
      element,
      runtimeId: element.getAttribute("data-lts-runtime-id"),
      label: element.getAttribute("aria-label") || element.querySelector("h1, h2")?.textContent?.trim() || element.id || `View ${index + 1}`,
      activeDisplay: inferActiveDisplay(element),
      original: {
        hidden: element.hidden,
        ariaHidden: element.getAttribute("aria-hidden"),
        display: element.style.getPropertyValue("display"),
        displayPriority: element.style.getPropertyPriority("display")
      }
    }));
  }

  function showView(views, activeId) {
    views.forEach(view => {
      const active = view.id === activeId;
      view.element.hidden = false;
      view.element.setAttribute("aria-hidden", String(!active));
      view.element.style.setProperty("display", active ? view.activeDisplay : "none", "important");
    });
  }

  return { discoverViews, showView };
});
