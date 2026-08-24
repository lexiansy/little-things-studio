__LTS__.define("history", [], () => {
  const clone = value => JSON.parse(JSON.stringify(value));

  function commit(history, future, before, after, description, limit = 80) {
    if (JSON.stringify(before) === JSON.stringify(after)) return false;
    history.push({ before: clone(before), after: clone(after), description });
    if (history.length > limit) history.shift();
    future.length = 0;
    return true;
  }

  function undo(history, future) {
    const entry = history.pop();
    if (!entry) return null;
    future.push(entry);
    return clone(entry.before);
  }

  function redo(history, future) {
    const entry = future.pop();
    if (!entry) return null;
    history.push(entry);
    return clone(entry.after);
  }

  return { clone, commit, undo, redo };
});
