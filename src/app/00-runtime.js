const __LTS__ = (() => {
  const definitions = new Map();
  const instances = new Map();
  const resolving = [];

  function define(name, dependencies, factory) {
    if (definitions.has(name)) throw new Error(`Duplicate LTS source module: ${name}`);
    definitions.set(name, { dependencies: [...dependencies], factory });
  }

  function use(name) {
    if (instances.has(name)) return instances.get(name);
    const definition = definitions.get(name);
    if (!definition) throw new Error(`Missing LTS source module: ${name}`);
    if (resolving.includes(name)) throw new Error(`Circular LTS source module: ${[...resolving, name].join(" -> ")}`);
    resolving.push(name);
    try {
      const dependencies = definition.dependencies.map(use);
      const instance = Object.freeze(definition.factory(...dependencies));
      instances.set(name, instance);
      return instance;
    } finally {
      resolving.pop();
    }
  }

  function graph() {
    return [...definitions.entries()].map(([name, definition]) => ({
      name,
      dependencies: [...definition.dependencies]
    }));
  }

  return Object.freeze({ define, use, graph });
})();
