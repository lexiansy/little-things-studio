# Little Things Studio

[English](README.md)

Little Things Studio 是一個低依賴、local-first 的視覺編輯器原型，用來理解與有界調整單一、自包含的 HTML 檔案。Owner 已接受的 `v0.1.0-beta.1` 功能 baseline 完全在瀏覽器內運作，匯入後的修改只存在暫時預覽 session；內建預覽使用虛構、通用的示範內容。

Little Things Studio 由 Lexian 與 Yao 共同創作，OpenAI Codex 協助實作。

![Little Things Studio v0.1.0-beta.1 內建示範](docs/assets/little-things-studio-v0.1.0-beta.1.png)

想直接使用：開啟 [Little Things Studio 線上版](https://lexiansy.github.io/little-things-studio/)，不需要安裝或登入；右上角「？」有完整使用指南。

## 這個 beta 能做什麼

- 操作內建視覺編輯示範。
- 匯入不超過 5 MiB 的本機單檔 `.html` 或 `.htm`。
- 將匯入元素分類為 `safe`、`view-only` 或 `blocked`。
- 在清理後的記憶體預覽副本中，調整核准的 `safe` 元素：leaf text、字級、文字色、背景色、寬高、圓角與 x/y 位置。
- 拖曳與 resize 核准的 `safe` 元素，並使用 session undo／redo。
- 只有在安全匯出 gate 通過時，另存編輯後的 HTML 副本，再把副本重新匯入預覽。
- 返回內建示範；原始匯入檔永遠不被覆寫。

## 安全模型

匯入內容中的 JavaScript、inline event handler、表單、導頁、下載、巢狀瀏覽內容與外部網路資源會被封鎖或中和。預覽 iframe 不取得 script、form、popup、download 或 top-navigation 權限。編輯只作用於 sanitized preview copy 與 session state；immutable source string 僅用於安全重建，原始檔不會被寫回。

完整邊界見[匯入安全模型](docs/IMPORT_SECURITY_MODEL.md)。

## 重要限制

這不是通用網站匯入器。目前不支援任意線上網站、framework app、多檔案 project、PWA／project source、執行匯入 JavaScript、直接寫回原檔，或編輯 `view-only`／`blocked` 元素。無法證明安全編輯與 source mapping 時，匯出會停用；不支援的結構會明示，不會猜測處理。

## 不懂程式也能開始

1. 使用手機或電腦瀏覽器開啟 GitHub Pages [線上版](https://lexiansy.github.io/little-things-studio/)。不需要安裝軟體，也不需要登入。
2. 第一次使用時，先按右上角的「？」查看使用指南，或直接操作內建示範。
3. 要修改自己的頁面，請準備一個不超過 5 MiB、內容都放在同一個檔案裡的 `.html` 或 `.htm`。網址、ZIP、資料夾、React／Vue 等框架專案不能直接匯入。
4. 按工作臺上方的「修改 HTML」選擇檔案。Studio 只會在瀏覽器裡讀取暫時副本，不會上傳，也不會覆寫原始檔。
5. 選取「可修改 safe」元素後調整文字與外觀。「僅查看 view-only」只能查看；「已封鎖 blocked」代表危險或不支援的能力已停用。
6. 通過安全檢查後，按「下載修改後 HTML」取得新的 `.lts-edited.html` 檔案。Studio 不會自動替你發布網站。

若遇到可重現的問題，請到 [GitHub Issues](https://github.com/lexiansy/little-things-studio/issues) 回報。若懷疑是安全漏洞，請依 [SECURITY.md](SECURITY.md) 處理，不要公開張貼細節。

## 在本機執行（貢獻者）

Repository 沒有 runtime dependencies，也不需要安裝 package。

```powershell
node scripts/serve.mjs
```

開啟 <http://127.0.0.1:4174/index.html>。也可從 repository root 使用其他 static server。

測試 fixtures：

- `fixtures/v0.6/simple-static.html`：可編輯的 safe 元素與 view-only 按鈕。
- `fixtures/v0.6/unsafe-blocked.html`：被封鎖的 scripts、handlers、導頁、表單與外部資源。

## 工程檢查

建議使用 Node.js 22 以上版本。

```powershell
npm run check
```

Repository 沒有 runtime dependencies，也不會安裝 packages。檢查涵蓋 standalone baseline、import sandbox 與 CSP、session-only safe editing、安全副本匯出、語法與 public-repository readiness。

## 目前狀態

`v0.1.0-beta.1` 是公開 beta prerelease，已於 2026-08-19 在外部採用前，以虛構、通用的內建示範重新發行。功能 baseline 與重新發行的通用 live sample 均已由 owner 接受，release 與未登入 public readback 也已完成。可從 [GitHub repository](https://github.com/lexiansy/little-things-studio)、[release 頁面](https://github.com/lexiansy/little-things-studio/releases/tag/v0.1.0-beta.1)與上述線上示範取得。這不代表支援未列出的 HTML 結構。請見[目前狀態](docs/CURRENT_STATUS.md)、[下一步](docs/NEXT_STEPS.md)與[roadmap](docs/ROADMAP.md)。

## 貢獻、安全與授權

提出變更前請讀 [CONTRIBUTING.md](CONTRIBUTING.md)。懷疑有安全漏洞時，不要在 public issue 公開細節，請依 [SECURITY.md](SECURITY.md) 處理。

本專案採用 [MIT License](LICENSE)。角色與致謝見 [CONTRIBUTORS.md](CONTRIBUTORS.md)，公開視覺資產來源見[資產來源紀錄](docs/ASSET_PROVENANCE.md)。
