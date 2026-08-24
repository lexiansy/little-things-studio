# HTML compatibility

Little Things Studio is designed for local, self-contained, single-file static HTML. It does not identify which model or tool produced a document; compatibility depends on the document's DOM, CSS, resources, and runtime behavior.

## Support levels

| Page pattern | Preview | Visual editing | Interaction | Export |
| --- | --- | --- | --- | --- |
| Static DOM with inline CSS and safe data URI images | Broadly supported | Allowlisted text, typography, color, box, spacing, position, and flex/grid adjustments | Non-interactive elements remain static | Available after the safety gate passes |
| Buttons, links, and form controls already present in the DOM | Displayed | Supported text/visible label and appearance are editable or limited by element type | Navigation, submit, change side effects, popups, and downloads stay inert | Only allowlisted visual/text changes are reconstructed |
| Static tabs, hidden panels, `role="tabpanel"`, or same-document anchor sections | Detected views can be opened with the preview-only navigator | Elements in the active view can be selected and edited | Source tab/navigation scripts do not run | View switching itself is never serialized |
| JavaScript-created DOM or JavaScript-controlled views | Static shell only; generated content may be absent | Present static content only | Imported scripts never run | Blocked when removed behavior makes reconstruction unsafe |
| External stylesheet/font/image or relative local resources | Static content remains where possible; resources are blocked | Present static elements may remain editable | No network or local-path fetching | Blocked when dependencies make the result uncertain |
| SVG, pseudo-elements, canvas, custom elements, or Shadow DOM | May display a static/light-DOM fallback | SVG internals and pseudo-elements are limited; canvas/script-created internals and Shadow DOM are unsupported | Component/drawing scripts do not run | Subject to the same safety gate and diagnostics |
| Multi-file site, SPA/framework router, PWA, or project source | Unsupported project boundary | Unsupported | Runtime/project behavior is not executed | Unsupported |

`Broadly supported` does not mean arbitrary website compatibility. It means the useful page content and structure are already present in one HTML document and do not require executing imported code or fetching more files.

## Two independent results

The inspector reports two separate axes:

- **Visual editing:** `editable`, `limited`, or `unsupported` describes the safe text and appearance controls available for the selected content.
- **Original interaction:** `safe` or `inert` describes whether the imported element had active behavior that Studio disabled.

An inert button can therefore remain impossible to click, submit, navigate, download, or open a popup while supported text, color, border, radius, spacing, or size changes remain available. Visual editing never re-enables behavior attributes such as `href`, `src`, `action`, or event handlers.

Each selected imported target has a session-only reset that participates in undo/redo. Native audio and video are reported as limited and inert; autoplay and native controls are removed. SVG can remain visible at a limited support level, while declarative animation elements that could change behavior are removed.

Nested text is exposed as independent text units where possible. Editing one unit does not replace sibling icons, `span`, `strong`, badges, or other child elements. Unsupported internals receive a specific support reason instead of a generic view-only label.

## Compatibility summary and view navigator

After import, the collapsible compatibility summary explains:

- detected view count;
- visually editable and limited/unsupported element counts;
- original interactions made inert;
- removed scripts and inline handlers;
- blocked external or relative resources; and
- major reasons the static preview may be incomplete.

When multiple reasonable views already exist in the static DOM, the view navigator can expose them without running imported tab code. A switch only changes preview visibility: it does not add an adjustment-log entry and is excluded from export. Edits made inside each view remain part of the current session.

If a screen would only be created after JavaScript runs, Studio cannot invent it. The summary reports that limitation instead.

## Export and re-import

Studio keeps the original source immutable and never writes it back. A safe export is rebuilt from a sanitized detached copy plus validated, allowlisted text and visual session edits. Runtime IDs, editor classes, overlays, selection state, and preview-only navigation styles are removed. Removed scripts, handlers, navigation, forms, downloads, popups, embedded frames, or network behavior are not restored.

The exported copy can be re-imported when the same safety rules pass. If source mapping, values, removed capabilities, or resource dependencies make the result uncertain, download remains disabled.

## Security boundary

- Imported JavaScript and inline event handlers do not execute.
- Form submission, navigation, popups, downloads, and embedded browsing behavior remain blocked or inert.
- External and relative resources are not fetched; data images are accepted only within the documented safe policy.
- The restrictive iframe sandbox, CSP, sanitizer, immutable-source boundary, and safe-export gate remain in force.
- Imported content is not written to the original file, local storage, analytics, or a remote service.

For the full threat model, see [Import security model](IMPORT_SECURITY_MODEL.md).

---

## 繁體中文摘要

Little Things Studio 依 HTML 的結構、資源與 runtime pattern 判斷相容性，不會也無法依產生工具或模型品牌分類。

- **廣泛支援：** 內容已存在於 DOM、使用 inline CSS 與安全 data URI 圖片的自包含靜態單檔 HTML。
- **部分支援：** 依賴 JavaScript 建立內容或控制分頁、外部／相對資源、SVG internals、pseudo-elements、canvas、custom elements 或 Shadow DOM 的頁面；靜態部分可能可用，但摘要會明示缺少內容與限制。
- **不支援：** 多檔案網站、SPA／framework router、PWA／project source、remote fetching、執行匯入 JavaScript 與直接寫回原檔。

Inspector 會分開顯示「外觀能否修改」與「原始互動是否停用」。因此 inert 按鈕或連結仍可調整核准的文字與外觀，但絕不恢復導頁、submit、popup、download 或其他互動。匯入 script 永遠不執行。

匯入後的「相容性摘要」會說明畫面數、可修改與有限／不支援元素、停用互動、移除的 scripts／handlers，以及封鎖的外部或相對資源。只有單檔靜態 DOM 已存在多個合理畫面時才顯示畫面導覽器；切換是 preview-only，不會進 adjustment history，也不會寫進匯出檔。

每個選取的匯入目標都有只作用於本次 session 的重設，且可 undo／redo。原生 audio／video 會標示為 limited＋inert，autoplay 與原生 controls 會被移除；SVG 可有限顯示，但可能改變行為的宣告式 animation elements 會被移除。

安全匯出只會套用 allowlist 內、已驗證的文字與外觀 session edits，並排除 runtime markers 與 preview-only state。無法證明結果安全時，下載會保持停用。
