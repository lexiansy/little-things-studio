__LTS__.define("ui-rendering", [], () => {
  function renderList(container, items, emptyText) {
    container.replaceChildren();
    if (!items.length) {
      const item = document.createElement("li");
      item.textContent = emptyText;
      container.appendChild(item);
      return;
    }
    items.forEach(text => {
      const item = document.createElement("li");
      item.textContent = text;
      container.appendChild(item);
    });
  }

  function setDisclosureCount(summary, count) {
    summary.dataset.count = String(count);
  }

  return { renderList, setDisclosureCount };
});
