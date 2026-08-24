# Little Things Studio

**網頁版：** [立即開啟 Little Things Studio →](https://lexiansy.github.io/little-things-studio/?lang=zh-TW)

手機與電腦都不用安裝或登入。開啟後先選擇「匯入 HTML 檔」或「試玩內建範例」；右上角的 **EN** 可切換英文介面。切換 Studio 介面語言不會翻譯或改寫匯入頁面的文字。

[English](README.md)

Little Things Studio 是一個低依賴、local-first 的視覺編輯器原型，用來理解與有界調整單一、自包含的 HTML 檔案。Owner 已接受的 `v0.1.0-beta.1` 功能 baseline 完全在瀏覽器內運作，匯入後的修改只存在暫時預覽 session；內建預覽使用虛構、通用的示範內容。

Little Things Studio 由 Lexian 與 Yao 共同創作，OpenAI Codex 協助實作。

![Little Things Studio v0.1.0-beta.1 內建示範](docs/assets/little-things-studio-v0.1.0-beta.1.png)

## 這個 beta 能做什麼

> Branch note：下列相容性能力屬於 local Unreleased experiment，仍待 owner acceptance。線上版與 `main` 仍是已接受的 `v0.1.0-beta.1` baseline。

- 操作內建視覺編輯示範。
- 匯入不超過 5 MiB 的本機單檔 `.html` 或 `.htm`。
- 分開呈現互動安全狀態與外觀可編輯性；例如按鈕或連結維持 inert，同時仍可調整核准的文字與外觀，不會恢復原始互動。
- 在清理後的記憶體預覽副本中，調整獨立的巢狀文字單位，以及 allowlist 內的字體、色彩、box、間距、定位與 flex／grid 屬性。
- 拖曳與 resize 外觀可編輯的元素，並使用 session undo／redo。
- 匯入後查看雙語「相容性摘要」；若單一靜態文件偵測到多個 panel，可用 preview-only 畫面導覽器切換。
- 只有在安全匯出 gate 通過時，另存編輯後的 HTML 副本，再把副本重新匯入預覽。
- 返回內建示範；原始匯入檔永遠不被覆寫。

## 安全模型

匯入內容中的 JavaScript、inline event handler、表單、導頁、下載、巢狀瀏覽內容與外部網路資源會被封鎖或中和。預覽 iframe 不取得 script、form、popup、download 或 top-navigation 權限。編輯只作用於 sanitized preview copy 與 session state；immutable source string 僅用於安全重建，原始檔不會被寫回。

完整邊界見[匯入安全模型](docs/IMPORT_SECURITY_MODEL.md)。

## 重要限制

這不是通用網站匯入器。廣泛支援的邊界是自包含的靜態單檔 HTML。依賴匯入 JavaScript、外部或相對資源、canvas 繪圖程式、custom-element internals 或 pseudo-element 選取的頁面只屬部分／有限支援；匯入 script 永遠不執行，也不會連線補載遠端資源。Framework app、router、多檔案 project、PWA／project source 與直接寫回原檔仍不支援。無法證明安全編輯與 source mapping 時，匯出會停用。支援層級與診斷見 [HTML 相容性](docs/COMPATIBILITY.md)。

## 不懂程式也能開始

1. 使用手機或電腦瀏覽器開啟 GitHub Pages [線上版](https://lexiansy.github.io/little-things-studio/?lang=zh-TW)。不需要安裝軟體，也不需要登入。
2. 開啟後會先看到簡單的開始畫面。選「試玩內建範例」熟悉編輯器，或選「匯入 HTML 檔」處理自己的頁面；右上角 **EN** 可切換英文，完整說明則在「？」使用指南。
3. 要修改自己的頁面，請準備一個不超過 5 MiB、內容都放在同一個檔案裡的 `.html` 或 `.htm`。網址、ZIP、資料夾、React／Vue 等框架專案不能直接匯入。
4. 在開始畫面或工作臺上方按「匯入 HTML 檔」選擇檔案。Studio 只會在瀏覽器裡讀取暫時副本，不會上傳、翻譯或覆寫原始檔。
5. 選取元素後會看到兩個分開的結果：外觀能否調整，以及原始互動是否停用。例如按鈕可以保持 inert，同時開放核准的文字與外觀修改。
6. 通過安全檢查後，按「下載修改後 HTML」取得新的 `.lts-edited.html` 檔案。Studio 不會自動替你發布網站。

若遇到可重現的問題，請到 [GitHub Issues](https://github.com/lexiansy/little-things-studio/issues) 回報。若懷疑是安全漏洞，請依 [SECURITY.md](SECURITY.md) 處理，不要公開張貼細節。

## 在本機執行（貢獻者）

Repository 沒有 runtime dependencies，也不需要安裝 package。

```powershell
node scripts/serve.mjs
```

開啟 <http://127.0.0.1:4174/index.html>。也可從 repository root 使用其他 static server。

測試 fixtures：

- `fixtures/v0.6/simple-static.html`：可編輯的靜態元素，以及維持 inert、但支援安全外觀調整的按鈕。
- `fixtures/v0.6/unsafe-blocked.html`：被封鎖的 scripts、handlers、導頁、表單與外部資源。
- `fixtures/compatibility/`：涵蓋靜態、巢狀文字、多畫面、CSS cascade、資源依賴、圖形、dynamic DOM 與危險能力邊界的 generic deterministic corpus。

## 工程檢查

建議使用 Node.js 22 以上版本。

```powershell
npm run check
```

Repository 沒有 runtime dependencies，也不會安裝 packages。`npm run build` 會從 source modules deterministic 組裝 tracked standalone `index.html`；完整檢查會驗證 artifact parity、module boundaries、compatibility corpus、import sandbox 與 CSP、session-only editing、安全副本匯出、語法與 public-repository readiness。

## 目前狀態

`v0.1.0-beta.1` 仍是 `main` 上已接受的公開 beta prerelease，已於 2026-08-19 在外部採用前，以虛構、通用的內建示範重新發行。功能 baseline、通用 live sample 與 public readback 均已完成；這份 baseline 仍可從 [GitHub repository](https://github.com/lexiansy/little-things-studio)、[release 頁面](https://github.com/lexiansy/little-things-studio/releases/tag/v0.1.0-beta.1)與上方 live app 取得。Local `experiment/compatibility-architecture-v0.2` 是 Unreleased 的相容性與架構候選；它尚未改變 public baseline，也仍待 owner acceptance，且尚未決定下一個版本名稱。請見[目前狀態](docs/CURRENT_STATUS.md)、[HTML 相容性](docs/COMPATIBILITY.md)與[下一步](docs/NEXT_STEPS.md)。

## 貢獻、安全與授權

提出變更前請讀 [CONTRIBUTING.md](CONTRIBUTING.md)。懷疑有安全漏洞時，不要在 public issue 公開細節，請依 [SECURITY.md](SECURITY.md) 處理。

本專案採用 [MIT License](LICENSE)。角色與致謝見 [CONTRIBUTORS.md](CONTRIBUTORS.md)，公開視覺資產來源見[資產來源紀錄](docs/ASSET_PROVENANCE.md)。
