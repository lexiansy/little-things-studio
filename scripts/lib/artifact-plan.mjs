export const artifactPlan = Object.freeze({
  template: "src/index.template.html",
  styleMarker: "/*__LTS_STYLE__*/",
  styleSources: Object.freeze([
    "src/styles/app.css"
  ]),
  appMarker: "/*__LTS_APP__*/",
  appSources: Object.freeze([
    "src/app/00-runtime.js",
    "src/app/10-i18n.js",
    "src/app/20-import-analysis.js",
    "src/app/30-sanitization.js",
    "src/app/40-classification.js",
    "src/app/50-view-navigation.js",
    "src/app/60-selection-editing.js",
    "src/app/70-history.js",
    "src/app/80-export.js",
    "src/app/90-ui-rendering.js",
    "src/app/app.js"
  ]),
  output: "index.html"
});
