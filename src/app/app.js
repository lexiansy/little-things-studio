    (() => {
      "use strict";

      const LANGUAGE_STORAGE_KEY = "lts-interface-language";
      const SUPPORTED_LANGUAGES = new Set(["zh-TW", "en"]);
      const LOCALES = {
        "zh-TW": {
          "brand.subtitle": "可試玩內建範例，也能匯入自己的 HTML",
          "device.phone": "手機",
          "device.tablet": "平板",
          "device.desktop": "電腦",
          "header.deviceZoom": "預覽裝置與縮放",
          "header.deviceGroup": "預覽裝置",
          "header.canvasZoom": "畫布縮放",
          "header.fitCanvas": "適合畫布",
          "action.undo": "復原",
          "action.redo": "重做",
          "action.help": "使用指南",
          "action.log": "調整紀錄",
          "action.logOpen.one": "開啟調整紀錄，目前 {count} 項",
          "action.logOpen.other": "開啟調整紀錄，目前 {count} 項",
          "language.switchLabel": "切換介面語言為 English",
          "start.title": "想從哪裡開始？",
          "start.copy": "匯入自己的 HTML 檔，或先用內建範例試玩。",
          "start.import": "匯入 HTML 檔",
          "start.importHint": "從手機或電腦選擇單一 .html 檔案",
          "start.demo": "試玩內建範例",
          "start.demoHint": "看看可以調整哪些畫面元素",
          "workspace.label": "預覽工作臺",
          "mode.demo": "試玩範例",
          "mode.import": "匯入預覽",
          "project.demoHome": "Little Things Demo・首頁",
          "actions.group": "編輯器檔案操作",
          "import.open": "匯入 HTML 檔",
          "import.replace": "更換 HTML 檔",
          "import.hint": "選擇手機或電腦裡的單檔 HTML 副本；檔案只會在瀏覽器中開啟，不會上傳。",
          "export.download": "下載修改後 HTML",
          "return.start": "回到開始",
          "import.previewLabel": "隔離的匯入 HTML 預覽",
          "import.noFile": "尚未匯入 HTML",
          "import.recognized.one": "可辨認元素 {count}",
          "import.recognized.other": "可辨認元素 {count}",
          "import.securityBadge": "腳本停用・外部連線封鎖",
          "import.statusSummary": "元素支援狀態摘要",
          "import.safeCount.one": "外觀可修改 {count}",
          "import.safeCount.other": "外觀可修改 {count}",
          "import.viewOnlyCount.one": "有限／不支援 {count}",
          "import.viewOnlyCount.other": "有限／不支援 {count}",
          "import.blockedCount.one": "已封鎖 blocked {count}",
          "import.blockedCount.other": "已封鎖 blocked {count}",
          "import.safetyDefault": "選取本機 HTML 副本後，這裡會列出被停用或移除的能力。",
          "import.editCount.one": "{count} 個匯入元素有調整",
          "import.editCount.other": "{count} 個匯入元素有調整",
          "import.editEmpty": "尚未修改；所有變更只留在這次的清理後預覽副本。",
          "import.safeDownload": "安全靜態下載",
          "import.exportNeedsEdit": "匯入並完成一項允許的外觀調整後，才能下載新的安全 HTML 副本。",
          "import.previewIsolated": "隔離預覽",
          "import.modeNoticeStrong": "可另存一份修改後的 HTML。",
          "import.modeNotice": "外觀能否修改，和原始互動是否停用，會分開顯示；原始檔永遠不會被覆寫。",
          "import.detailName": "名稱／文字",
          "import.detailStatus": "支援狀態",
          "import.detailReason": "說明",
          "import.selectPrompt": "請點選預覽中的元素",
          "import.selectableReason": "偵測到的元素都可以選取查看；外觀與互動限制會分開顯示。",
          "import.safeControls": "Safe 元素調整",
          "import.selectSafe": "請先選取預覽中的元素。",
          "import.control.text": "文字內容",
          "import.control.fontSize": "字體大小（px）",
          "import.control.radius": "圓角（px）",
          "import.control.width": "寬度（px）",
          "import.control.height": "高度（px）",
          "import.control.x": "X 位移（px）",
          "import.control.y": "Y 位移（px）",
          "import.control.color": "文字顏色",
          "import.control.background": "背景色",
          "import.resetTarget": "重設目前匯入調整",
          "import.safeLeaf": "可修改文字與外觀；也可在預覽中直接拖曳，或拉右下角控制點 resize。",
          "import.safeStructure": "這個 safe 元素含有子結構；為避免刪除內容，只開放外觀、位移、拖曳與 resize。",
          "import.disabledReason": "此元素是 {status}：{reason}",
          "import.copy": "匯入副本",
          "import.previewOnly": "預覽限定",
          "inspector.label": "元素調整面板",
          "inspector.current": "目前選取",
          "inspector.applyTo": "套用到",
          "inspector.scope": "調整套用範圍",
          "inspector.currentSize": "目前{device}尺寸",
          "inspector.allSizes": "所有尺寸",
          "inspector.scopeAll": "接下來的調整會同步套用到手機、平板與電腦預覽。",
          "inspector.scopeOne": "接下來的移動與外觀調整，只會套用到{device}預覽。",
          "inspector.positionSize": "位置與大小",
          "inspector.resetElement": "重設此元素",
          "inspector.x": "左右位置",
          "inspector.y": "上下位置",
          "inspector.scale": "整體大小",
          "inspector.left": "向左移動 1 像素",
          "inspector.right": "向右移動 1 像素",
          "inspector.up": "向上移動 1 像素",
          "inspector.down": "向下移動 1 像素",
          "inspector.text": "文字",
          "inspector.color": "顏色",
          "inspector.fontSize": "字級",
          "inspector.fontStyle": "字體氣質",
          "font.clear": "清楚俐落",
          "font.round": "柔和圓潤",
          "font.serif": "安靜典雅",
          "inspector.foreground": "文字／圖形顏色",
          "inspector.surface": "外觀",
          "inspector.background": "底色",
          "inspector.radius": "圓角",
          "inspector.shadow": "柔和陰影",
          "inspector.shadowHint": "讓元素與背景稍微分開",
          "inspector.image": "圖片",
          "inspector.currentImage": "目前圖片",
          "inspector.noImage": "尚未選擇圖片",
          "inspector.uploadImage": "上傳／更換圖片",
          "inspector.remove": "移除",
          "inspector.imageFit": "圖片顯示方式",
          "inspector.cover": "填滿框格",
          "inspector.contain": "完整顯示",
          "inspector.imageSession": "圖片只留在這次預覽裡；重新開啟檔案就會消失。",
          "inspector.resetAll": "清除這一輪全部調整",
          "selection.drag": "{label} · 拖曳移動",
          "selection.resize": "拖曳縮放選取元素",
          "selection.tip": "已選中雙星光：直接拖動，或拉右下角縮放。也可以點其他元素。",
          "summary.title": "本次調整紀錄",
          "summary.copy": "整理目前這次編輯中做過的調整。",
          "summary.sessionStrong": "這是暫時工作階段。",
          "summary.session": "回到開始後，這次的調整紀錄會一起清除。",
          "summary.continue": "繼續調整",
          "summary.empty": "還沒有調整",
          "summary.import": "匯入",
          "return.title": "要回到開始嗎？",
          "return.pending": "目前這次調整還沒有保留下來。",
          "return.copy": "回到開始會清除目前的暫時文件與這次調整；原始 HTML 檔案不受影響。",
          "return.continue": "繼續編輯",
          "help.title": "從開始畫面選擇",
          "help.intro": "匯入自己的單檔 HTML，或先用內建範例熟悉調整方式。",
          "help.demoTitle": "試玩內建範例",
          "help.demoCopy": "在開始畫面選「試玩內建範例」，熟悉點選、拖曳與右側調整面板。",
          "help.demo1": "點畫面上的文字、區塊、雙星光、摘要卡、按鈕或導覽項目。",
          "help.demo2": "直接拖動選中的元素；拉選取框右下角，可以等比例放大或縮小。",
          "help.demo3": "右側可以微調位置、大小、顏色、圓角與陰影；不同元素只顯示適合它的項目。",
          "help.demo4": "用復原／重做回頭；右上角「調整紀錄」會把 CSS 數字翻成容易理解的變更。",
          "help.importTitle": "匯入 HTML 檔",
          "help.importCopy": "需要一個不超過 5 MiB、內容都放在同一個檔案裡的",
          "help.importCopyEnd": "。網址、ZIP、資料夾與框架專案不能直接匯入。",
          "help.import1": "在開始畫面按「匯入 HTML 檔」，或在工作臺使用同名按鈕，選擇手機或電腦裡的單檔 HTML 副本。",
          "help.import2": "檔案只會在瀏覽器中開啟，不會上傳，也不會覆寫原始檔。",
          "help.import3": "在預覽裡點選元素；右側會分開顯示外觀能否修改，以及原始互動是否停用。",
          "help.import4": "完成後按「下載修改後 HTML」。若按鈕沒有開放，畫面會說明尚未通過哪一項安全檢查。",
          "help.import5": "下載的是新的",
          "help.import5End": "檔案；Studio 不會自動替你發布網站。",
          "help.safe": "外觀可修改：",
          "help.safeCopy": "可安全調整文字或允許的 CSS 外觀。",
          "help.viewOnly": "互動已停用：",
          "help.viewOnlyCopy": "按鈕、連結與表單不會執行原始行為，但支援的外觀仍可修改。",
          "help.blocked": "已封鎖 blocked：",
          "help.blockedCopy": "危險或不支援的能力已停用，並且不能下載修改後的 HTML。",
          "help.support": "遇到問題？請到",
          "help.supportEnd": "回報。",
          "help.close": "回到畫面",
          "toast.returned": "已回到開始，這次調整已清除。",
          "error.extension": "請選擇 .html 或 .htm 檔案。",
          "error.empty": "這個 HTML 檔案是空的。",
          "error.size": "HTML 檔案必須小於或等於 5 MiB。",
          "error.utf8": "檔案不是可安全讀取的 UTF-8 HTML。",
          "error.structure": "找不到可辨認的 HTML 結構。",
          "error.read": "無法讀取這個 HTML 檔案。",
          "toast.imported": "已建立「{file}」的隔離安全預覽。",
          "toast.downloaded": "已下載「{file}」；原始檔案沒有被覆寫。",
          "error.export": "無法建立安全的 HTML 副本。",
          "export.noSession": "請先匯入 HTML 副本。",
          "export.blocked": "來源含有已被安全清理的能力，不能匯出 active HTML 副本。",
          "export.mapping": "來源元素無法完整且唯一對應，不能安全匯出。",
          "export.noEdits": "尚未修改 safe 元素。",
          "export.marker": "來源含有 Studio 保留標記，不能安全匯出。",
          "export.invalid": "調整包含非 safe 元素或未通過驗證的值。",
          "export.editMapping": "調整無法完整且唯一映射回來源元素。",
          "export.allowed.one": "可下載 {count} 個 safe 元素的靜態修改副本。",
          "export.allowed.other": "可下載 {count} 個 safe 元素的靜態修改副本。",
          "export.viewOnlyChanged": "view-only 元素在匯出時發生非預期變更。",
          "export.internalMarker": "匯出內容含有 Studio internal marker。",
          "security.clean": "未偵測到需要移除的危險能力；預覽仍套用隔離 sandbox 與嚴格 CSP。",
          "security.cssImport": "已移除 CSS @import", "security.externalCss": "已封鎖 CSS 外部資源", "security.unsafeCss": "已封鎖不安全的 CSS 行為",
          "security.javascriptUrl": "已封鎖 javascript URL", "security.reservedMarker": "已移除 Studio 保留標記", "security.redirectMeta": "已移除 redirect 或 policy meta",
          "security.inlineHandler": "已移除 inline event handler", "security.externalResource": "已封鎖導頁或外部資源", "security.formConfig": "已停用表單設定",
          "security.removedTag": "已移除 <{tag}>",
          "security.disabledAttribute": "已停用 {name} attribute",
          "security.reasonCount": "{reason} × {count}",
          "classify.complex": "複雜或互動結構只提供唯讀辨識。",
          "classify.link": "連結導向已移除，只提供唯讀辨識。",
          "classify.form": "表單與控制行為已停用，只提供唯讀辨識。",
          "classify.custom": "自訂元素不執行元件程式，只提供唯讀辨識。",
          "classify.editable": "contenteditable 已停用，只提供唯讀辨識。",
          "classify.safe": "靜態 DOM 元素，可在隔離預覽中選取查看。",
          "compat.title": "相容性摘要", "compat.headline": "匯入後顯示頁面、編輯與安全限制", "compat.views": "畫面", "compat.editable": "外觀可修改", "compat.limited": "有限／不支援", "compat.inert": "互動已停用", "compat.navigator": "畫面導覽",
          "compat.noIssues": "未偵測到影響靜態頁面完整性的主要限制。", "compat.multipleViews": "找到多個畫面，可使用畫面導覽器切換編輯。", "compat.jsAbsent": "此頁面的部分內容由 JavaScript 建立；安全預覽不執行匯入腳本，因此這些內容目前不存在。", "compat.scriptsRemoved": "匯入的 JavaScript 已移除且不會執行。", "compat.handlersRemoved": "Inline event handlers 已移除。", "compat.externalBlocked": "找到外部資源；安全預覽未連線載入。", "compat.relativeBlocked": "找到相對路徑資源；單檔安全預覽不會從磁碟或網路補載。", "compat.interactionsInert": "原始按鈕、連結或表單互動已停用；可支援的外觀仍能調整。", "compat.canvasLimited": "Canvas 繪圖內容無法在不執行腳本的情況下重建。", "compat.svgLimited": "SVG 可顯示，但內部圖形編輯目前有限。", "compat.customLimited": "Custom element 的元件程式不執行，內部內容可能不完整。", "compat.pseudoLimited": "Pseudo-element 可顯示，但不能直接選取。",
          "import.targetLevel": "選取層級", "import.location": "位置", "import.visualStatus": "外觀編輯", "import.interactionStatus": "原始互動", "import.targetAria": "選取文字、內層元素或容器", "import.visualControls": "安全外觀調整", "import.reasonSplit": "選取元素後，這裡會分開說明外觀與互動限制。", "import.elementTarget": "整個元素", "import.directTextTarget": "文字：{text}", "import.ancestorTarget": "外層 <{tag}>：{text}", "import.editableState": "可修改", "import.limitedState": "有限", "import.unsupportedState": "不支援", "import.safeInteraction": "無原始互動", "import.inertInteraction": "互動已停用", "import.interactionDisabledReason": "原始互動已停用，但允許的文字與外觀仍可調整。", "import.visualUnsupportedReason": "此類內容只能選取查看或調整外框，不能安全編輯內部內容。", "import.textUnitHint": "目前選到獨立文字單位；修改文字不會刪除旁邊的 icon、span 或其他子元素。",
          "import.control.fontWeight": "字重", "import.control.lineHeight": "行高", "import.control.textAlign": "文字對齊", "import.control.borderWidth": "邊框寬度（px）", "import.control.borderStyle": "邊框樣式", "import.control.borderColor": "邊框顏色", "import.control.shadow": "陰影", "import.control.opacity": "透明度", "import.control.padding": "內距（px）", "import.control.margin": "外距（px）", "import.control.minWidth": "最小寬度（px）", "import.control.maxWidth": "最大寬度（px）", "import.control.minHeight": "最小高度（px）", "import.control.maxHeight": "最大高度（px）", "import.control.justify": "Flex／Grid 水平", "import.control.align": "Flex／Grid 垂直", "import.control.gap": "間距（px）",
          "option.left": "靠左", "option.center": "置中", "option.right": "靠右", "option.justify": "左右對齊", "option.none": "無", "option.solid": "實線", "option.dashed": "虛線", "option.dotted": "點線", "option.double": "雙線", "option.start": "起點", "option.end": "終點", "option.spaceBetween": "平均分散", "option.spaceAround": "環繞間距", "option.stretch": "延展", "option.baseline": "基線",
          "toast.undoImport": "已復原匯入調整：{description}",
          "toast.redoImport": "已重做匯入調整：{description}",
          "toast.undo": "已復原：{description}",
          "toast.redo": "已重做：{description}",
          "toast.undoGeneric": "已復原上一項調整。", "toast.redoGeneric": "已重做下一項調整。",
          "toast.resetImport": "已重設目前選取項目的匯入調整。", "toast.importNothingToReset": "目前選取項目沒有需要重設的調整。",
          "toast.resetOne": "{label}已恢復原樣。",
          "toast.nothingToReset": "這一輪目前沒有需要清除的調整。",
          "toast.resetAll": "全部示範調整已清除。",
          "toast.notImage": "這個檔案不是可顯示的圖片。",
          "toast.imageSize": "圖片超過 20 MB，請先選一張小一點的圖片。",
          "toast.imageChanged": "已在預覽中換成「{file}」。",
          "toast.imageRemoved": "已從目前預覽移除圖片。",
          "image.uploadedAlt": "已上傳的圖片：{file}",
          "image.unnamed": "未命名圖片",
          "summary.moveLeft": "向左 {value}px",
          "summary.moveRight": "向右 {value}px",
          "summary.moveUp": "向上 {value}px",
          "summary.moveDown": "向下 {value}px",
          "summary.scale": "{direction}至 {value}%",
          "summary.enlarge": "放大",
          "summary.shrink": "縮小",
          "summary.fontSize": "字級改為 {value}px",
          "summary.font": "字體改為「{value}」",
          "summary.color": "文字／圖形顏色改為 {value}",
          "summary.background": "底色改為 {value}",
          "summary.radius": "圓角改為 {value}px",
          "summary.shadowOn": "開啟柔和陰影",
          "summary.shadowOff": "移除柔和陰影",
          "summary.imageChanged": "圖片更換為「{file}」",
          "summary.imageRemoved": "移除圖片",
          "summary.imageContain": "圖片改為完整顯示",
          "summary.imageCover": "圖片改為填滿框格",
          "summary.adjust": "{device}・{label}：調整{changes}",
          "summary.appearance": "外觀",
          "summary.nudge": "{device}・{label}：微調位置",
          "summary.drag": "拖動位置",
          "summary.resize": "調整大小",
          "summary.gesture": "{device}・{label}：{action}",
          "summary.restore": "{device}・{label}：恢復原樣",
          "summary.clearAll": "清除這一輪全部調整",
          "import.editFallback": "匯入元素調整",
          "import.elementFallback": "匯入元素",
          "import.drag": "拖曳",
          "import.resize": "resize",
          "edit.text": "文字",
          "edit.fontSize": "字級",
          "edit.color": "文字色",
          "edit.background": "背景",
          "edit.width": "寬度",
          "edit.height": "高度",
          "edit.radius": "圓角",
          "edit.x": "X 位移",
          "edit.y": "Y 位移",
          "element.header.label": "頁首區塊", "element.header.kind": "區塊", "element.header.help": "這是整個頁首區塊。點空白處就能選中它，調整整區位置、大小或背景色。",
          "element.kicker.label": "英文眉題", "element.kicker.kind": "文字", "element.kicker.help": "這是標題上方的小字。可以單獨移動、縮放，也能調字級、字體與顏色。",
          "element.title.label": "標題", "element.title.kind": "文字", "element.title.help": "這是主標題。可以拖動、縮放，也能在右側改字級、字體氣質與顏色。",
          "element.subtitle.label": "副標文字", "element.subtitle.kind": "文字", "element.subtitle.help": "這是主標題下方的說明文字，可以單獨調整位置、大小、字體與顏色。",
          "element.stars.label": "雙星光", "element.stars.kind": "裝飾", "element.stars.help": "這是一組裝飾。拖動畫面會改位置，拉右下角會等比例縮放；鍵盤方向鍵也能微調。",
          "element.helloTitle.label": "今日標題", "element.helloTitle.kind": "文字", "element.helloTitle.help": "這是內容區的小標題，可以單獨移動、縮放與換色。",
          "element.updateTime.label": "更新時間", "element.updateTime.kind": "文字", "element.updateTime.help": "這是更新時間文字，可以單獨調整，不會連帶移動旁邊的標題。",
          "element.note.label": "最新紀錄卡", "element.note.kind": "卡片", "element.note.help": "這是整張最新紀錄卡。可以調位置、大小、底色、圓角和陰影；卡內文字也能分開選。",
          "element.noteLabel.label": "紀錄標籤", "element.noteLabel.kind": "文字", "element.noteLabel.help": "這是紀錄卡上方的小標籤，可以獨立調整。",
          "element.noteMain.label": "紀錄標題", "element.noteMain.kind": "文字", "element.noteMain.help": "這是紀錄卡的主要文字，可以單獨改大小、字體與顏色。",
          "element.noteMeta.label": "紀錄內容", "element.noteMeta.kind": "文字", "element.noteMeta.help": "這是紀錄卡內的補充內容，可以獨立移動、縮放與換色。",
          "element.waterCard.label": "閱讀摘要卡", "element.waterCard.kind": "卡片", "element.waterCard.help": "這是一張摘要卡，可以單獨移動、縮放並調整卡片外觀。",
          "element.activityCard.label": "活動摘要卡", "element.activityCard.kind": "卡片", "element.activityCard.help": "這是一張摘要卡，可以單獨移動、縮放並調整卡片外觀。",
          "element.photo.label": "最近片段卡", "element.photo.kind": "圖片", "element.photo.help": "這是圖片卡。除了位置與外觀，還能在右側上傳自己的圖片，或切換填滿與完整顯示。",
          "element.record.label": "新增紀錄按鈕", "element.record.kind": "按鈕", "element.record.help": "這是主要按鈕。可以調位置、大小、文字與底色；這版不會觸發按鈕原本的功能。",
          "element.nav.label": "底部導覽列", "element.nav.kind": "導覽", "element.nav.help": "這是整組底部導覽。點空白處會選整組；裡面的三個項目也能分開選。",
          "element.navHome.label": "首頁導覽項目", "element.navHome.kind": "導覽項目", "element.navHome.help": "這是首頁導覽項目，可以單獨調位置、大小與文字顏色。",
          "element.navWiki.label": "靈感導覽項目", "element.navWiki.kind": "導覽項目", "element.navWiki.help": "這是靈感導覽項目，可以單獨調位置、大小與文字顏色。",
          "element.navRecords.label": "記錄導覽項目", "element.navRecords.kind": "導覽項目", "element.navRecords.help": "這是記錄導覽項目，可以單獨調位置、大小與文字顏色。",
          "demo.kicker": "LITTLE THINGS DEMO", "demo.title": "一頁小日常", "demo.subtitle": "把今天的一件小事，留成可以慢慢看的頁面。",
          "demo.hello": "今天的小事", "demo.time": "示範時間 15:20", "demo.cardLabel": "範例卡片", "demo.cardTitle": "午後的光落在桌角",
          "demo.meta1": "窗邊角落 · 示範紀錄", "demo.meta2": "翻過一頁書，杯子裡的茶還有一點溫度。",
          "demo.reading": "閱讀", "demo.readingValue": "20 分鐘", "demo.walk": "散步", "demo.walkValue": "天氣很好",
          "demo.recent": "最近片段", "demo.photoHint": "點右側上傳更換", "demo.cta": "新增一筆小事",
          "demo.home": "首頁", "demo.inspiration": "靈感", "demo.records": "記錄",
          "demo.pageLabel": "Little Things 通用示範頁", "demo.starsLabel": "雙星光裝飾", "demo.quickSummary": "今日摘要", "demo.navLabel": "示範底部導覽"
        },
        "en": {
          "brand.subtitle": "Try the built-in demo or import your own HTML",
          "device.phone": "Phone", "device.tablet": "Tablet", "device.desktop": "Desktop",
          "header.deviceZoom": "Preview device and zoom", "header.deviceGroup": "Preview device", "header.canvasZoom": "Canvas zoom", "header.fitCanvas": "Fit canvas",
          "action.undo": "Undo", "action.redo": "Redo", "action.help": "Guide", "action.log": "Adjustment log",
          "action.logOpen.one": "Open adjustment log, {count} item", "action.logOpen.other": "Open adjustment log, {count} items",
          "language.switchLabel": "將介面切換為繁體中文",
          "start.title": "How would you like to start?", "start.copy": "Import your own HTML file, or try the built-in demo first.",
          "start.import": "Import HTML file", "start.importHint": "Choose one .html file from your phone or computer",
          "start.demo": "Try the built-in demo", "start.demoHint": "Explore which page elements you can adjust",
          "workspace.label": "Preview workbench", "mode.demo": "Demo", "mode.import": "Imported preview", "project.demoHome": "Little Things Demo · Home",
          "actions.group": "Editor file actions", "import.open": "Import HTML file", "import.replace": "Replace HTML file",
          "import.hint": "Choose a single-file HTML copy from your phone or computer. It opens only in this browser and is never uploaded.",
          "export.download": "Download edited HTML", "return.start": "Back to start", "import.previewLabel": "Isolated imported HTML preview",
          "import.noFile": "No HTML imported", "import.recognized.one": "{count} recognized element", "import.recognized.other": "{count} recognized elements",
          "import.securityBadge": "Scripts disabled · external connections blocked", "import.statusSummary": "Element support summary",
          "import.safeCount.one": "{count} visually editable", "import.safeCount.other": "{count} visually editable",
          "import.viewOnlyCount.one": "{count} limited / unsupported", "import.viewOnlyCount.other": "{count} limited / unsupported",
          "import.blockedCount.one": "{count} blocked", "import.blockedCount.other": "{count} blocked",
          "import.safetyDefault": "After you choose a local HTML copy, disabled or removed capabilities appear here.",
          "import.editCount.one": "{count} imported element adjusted", "import.editCount.other": "{count} imported elements adjusted",
          "import.editEmpty": "No changes yet. All changes stay in this sanitized preview copy for this session.",
          "import.safeDownload": "Safe static download", "import.exportNeedsEdit": "Make one allowed visual edit before downloading a new safe HTML copy.",
          "import.previewIsolated": "Isolated preview", "import.modeNoticeStrong": "Save a separate edited HTML copy.",
          "import.modeNotice": "Visual editability and disabled original interaction are shown separately. The original file is never overwritten.",
          "import.detailName": "Name / text", "import.detailStatus": "Support status", "import.detailReason": "Explanation",
          "import.selectPrompt": "Select an element in the preview", "import.selectableReason": "Detected elements can be selected for inspection; visual and interaction limits are shown separately.",
          "import.safeControls": "Safe element adjustments", "import.selectSafe": "Select an element in the preview first.",
          "import.control.text": "Text content", "import.control.fontSize": "Font size (px)", "import.control.radius": "Corner radius (px)",
          "import.control.width": "Width (px)", "import.control.height": "Height (px)", "import.control.x": "X offset (px)", "import.control.y": "Y offset (px)",
          "import.control.color": "Text color", "import.control.background": "Background color",
          "import.resetTarget": "Reset selected imported edits",
          "import.safeLeaf": "Edit text and appearance, drag directly in the preview, or resize from the lower-right handle.",
          "import.safeStructure": "This safe element contains child structure. To preserve it, only appearance, offset, drag, and resize are available.",
          "import.disabledReason": "This element is {status}: {reason}", "import.copy": "Imported copy", "import.previewOnly": "Preview only",
          "inspector.label": "Element adjustment panel", "inspector.current": "Selected", "inspector.applyTo": "Apply to", "inspector.scope": "Adjustment scope",
          "inspector.currentSize": "Current {device} size", "inspector.allSizes": "All sizes",
          "inspector.scopeAll": "New adjustments apply to phone, tablet, and desktop previews.", "inspector.scopeOne": "New position and appearance adjustments apply only to the {device} preview.",
          "inspector.positionSize": "Position and size", "inspector.resetElement": "Reset element", "inspector.x": "Horizontal position", "inspector.y": "Vertical position", "inspector.scale": "Overall size",
          "inspector.left": "Move left 1 pixel", "inspector.right": "Move right 1 pixel", "inspector.up": "Move up 1 pixel", "inspector.down": "Move down 1 pixel",
          "inspector.text": "Text", "inspector.color": "Color", "inspector.fontSize": "Font size", "inspector.fontStyle": "Font style",
          "font.clear": "Clean", "font.round": "Soft and rounded", "font.serif": "Quiet serif", "inspector.foreground": "Text / shape color",
          "inspector.surface": "Appearance", "inspector.background": "Background", "inspector.radius": "Corner radius", "inspector.shadow": "Soft shadow", "inspector.shadowHint": "Separate the element gently from the background",
          "inspector.image": "Image", "inspector.currentImage": "Current image", "inspector.noImage": "No image selected", "inspector.uploadImage": "Upload / replace image", "inspector.remove": "Remove",
          "inspector.imageFit": "Image fit", "inspector.cover": "Fill frame", "inspector.contain": "Show full image", "inspector.imageSession": "The image stays only in this preview session and disappears after reopening the file.",
          "inspector.resetAll": "Clear all session adjustments", "selection.drag": "{label} · Drag to move", "selection.resize": "Drag to resize selected element",
          "selection.tip": "Twinkle pair selected: drag to move, use the lower-right handle to resize, or select another element.",
          "summary.title": "Session adjustment log", "summary.copy": "A readable list of adjustments made in this editing session.",
          "summary.sessionStrong": "This is a temporary session.", "summary.session": "Returning to start clears this adjustment log.", "summary.continue": "Continue editing", "summary.empty": "No adjustments yet", "summary.import": "Imported",
          "return.title": "Return to start?", "return.pending": "Current adjustments have not been saved.", "return.copy": "Returning to start clears the temporary document and session changes. The original HTML file is unaffected.", "return.continue": "Keep editing",
          "help.title": "Choose from the start screen", "help.intro": "Import your own single-file HTML or learn the controls with the built-in demo.",
          "help.demoTitle": "Try the built-in demo", "help.demoCopy": "Choose Try the built-in demo on the start screen to explore selection, drag, and the adjustment panel.",
          "help.demo1": "Select text, sections, the twinkle pair, summary cards, the button, or navigation items.",
          "help.demo2": "Drag the selected element directly, or resize proportionally from the lower-right handle.",
          "help.demo3": "Use the right panel for position, size, color, radius, and shadow. Each element shows only relevant controls.",
          "help.demo4": "Use undo and redo to step back and forward. The Adjustment log turns CSS values into readable changes.",
          "help.importTitle": "Import an HTML file", "help.importCopy": "Use one self-contained", "help.importCopyEnd": "file no larger than 5 MiB. URLs, ZIP files, folders, and framework projects cannot be imported directly.",
          "help.import1": "Choose Import HTML file on the start screen or above the workbench, then select a single-file HTML copy from your phone or computer.",
          "help.import2": "The file opens only in your browser. It is never uploaded or written back to the original.",
          "help.import3": "Select an element in the preview. The panel shows visual editability separately from disabled original interaction.",
          "help.import4": "Choose Download edited HTML when finished. If it stays disabled, the screen explains which safety check is not yet satisfied.",
          "help.import5": "The download is a new", "help.import5End": "file. Studio does not publish the page for you.",
          "help.safe": "Visually editable:", "help.safeCopy": "Text or allowed CSS appearance can be adjusted safely.", "help.viewOnly": "Interaction disabled:", "help.viewOnlyCopy": "Buttons, links, and forms do not run original behavior, while supported appearance remains editable.",
          "help.blocked": "Blocked:", "help.blockedCopy": "Unsafe or unsupported capabilities are disabled and prevent edited-HTML download.",
          "help.support": "Need help? Report a reproducible issue in", "help.supportEnd": ".", "help.close": "Back to screen",
          "toast.returned": "Returned to start and cleared this session's adjustments.", "error.extension": "Choose an .html or .htm file.", "error.empty": "This HTML file is empty.",
          "error.size": "The HTML file must be 5 MiB or smaller.", "error.utf8": "The file is not readable as safe UTF-8 HTML.", "error.structure": "No recognizable HTML structure was found.", "error.read": "This HTML file could not be read.",
          "toast.imported": "Created an isolated safe preview of “{file}”.", "toast.downloaded": "Downloaded “{file}”; the original file was not overwritten.", "error.export": "A safe HTML copy could not be created.",
          "export.noSession": "Import an HTML copy first.", "export.blocked": "The source contained capabilities removed for safety, so an active HTML copy cannot be exported.",
          "export.mapping": "Source elements do not map completely and uniquely, so export is disabled.", "export.noEdits": "No safe element has been edited.",
          "export.marker": "The source contains a reserved Studio marker and cannot be exported safely.", "export.invalid": "An edit targets a non-safe element or contains an invalid value.",
          "export.editMapping": "An edit cannot be mapped completely and uniquely back to its source element.",
          "export.allowed.one": "Download a static edited copy with {count} safe element change.", "export.allowed.other": "Download a static edited copy with {count} safe element changes.",
          "export.viewOnlyChanged": "A view-only element changed unexpectedly during export.", "export.internalMarker": "The export contains a Studio internal marker.",
          "security.clean": "No dangerous capability needed removal. The preview still uses an isolated sandbox and strict CSP.",
          "security.cssImport": "Removed CSS @import", "security.externalCss": "Blocked external CSS resource", "security.unsafeCss": "Blocked unsafe CSS behavior",
          "security.javascriptUrl": "Blocked javascript URL", "security.reservedMarker": "Removed reserved Studio marker", "security.redirectMeta": "Removed redirect or policy meta",
          "security.inlineHandler": "Removed inline event handler", "security.externalResource": "Blocked navigation or external resource", "security.formConfig": "Disabled form configuration",
          "security.removedTag": "Removed <{tag}>", "security.disabledAttribute": "Disabled {name} attribute", "security.reasonCount": "{reason} × {count}",
          "classify.complex": "Complex or interactive structure is available for view-only inspection.", "classify.link": "Link navigation was removed; the element is view-only.",
          "classify.form": "Form and control behavior is disabled; the element is view-only.", "classify.custom": "Custom-element code does not run; the element is view-only.",
          "classify.editable": "contenteditable is disabled; the element is view-only.", "classify.safe": "Static DOM element available for selection in the isolated preview.",
          "compat.title": "Compatibility summary", "compat.headline": "Views, editing, and safety limits after import", "compat.views": "Views", "compat.editable": "Visually editable", "compat.limited": "Limited / unsupported", "compat.inert": "Interaction disabled", "compat.navigator": "View navigator",
          "compat.noIssues": "No major limit affecting static-page completeness was detected.", "compat.multipleViews": "Multiple views found. Use the view navigator to switch and edit them.", "compat.jsAbsent": "Some content is created by JavaScript. Safe preview does not run imported scripts, so that content is currently absent.", "compat.scriptsRemoved": "Imported JavaScript was removed and does not run.", "compat.handlersRemoved": "Inline event handlers were removed.", "compat.externalBlocked": "External resources were found. Safe preview did not connect to load them.", "compat.relativeBlocked": "Relative resources were found. Single-file safe preview does not load them from disk or network.", "compat.interactionsInert": "Original button, link, or form interactions are disabled; supported appearance remains adjustable.", "compat.canvasLimited": "Canvas drawing content cannot be reconstructed without running scripts.", "compat.svgLimited": "SVG can display, but internal shape editing is limited.", "compat.customLimited": "Custom-element code does not run, so internal content may be incomplete.", "compat.pseudoLimited": "Pseudo-elements can display but cannot be selected directly.",
          "import.targetLevel": "Selection level", "import.location": "Location", "import.visualStatus": "Visual editing", "import.interactionStatus": "Original interaction", "import.targetAria": "Choose text, inner element, or container", "import.visualControls": "Safe visual adjustments", "import.reasonSplit": "Select an element to see visual and interaction limits separately.", "import.elementTarget": "Whole element", "import.directTextTarget": "Text: {text}", "import.ancestorTarget": "Outer <{tag}>: {text}", "import.editableState": "Editable", "import.limitedState": "Limited", "import.unsupportedState": "Unsupported", "import.safeInteraction": "No original interaction", "import.inertInteraction": "Interaction disabled", "import.interactionDisabledReason": "Original interaction is disabled, while allowed text and appearance edits remain available.", "import.visualUnsupportedReason": "This content can be inspected or have its outer box adjusted, but its internals cannot be edited safely.", "import.textUnitHint": "An independent text unit is selected. Editing it will not remove neighboring icons, spans, or child elements.",
          "import.control.fontWeight": "Font weight", "import.control.lineHeight": "Line height", "import.control.textAlign": "Text alignment", "import.control.borderWidth": "Border width (px)", "import.control.borderStyle": "Border style", "import.control.borderColor": "Border color", "import.control.shadow": "Shadow", "import.control.opacity": "Opacity", "import.control.padding": "Padding (px)", "import.control.margin": "Margin (px)", "import.control.minWidth": "Minimum width (px)", "import.control.maxWidth": "Maximum width (px)", "import.control.minHeight": "Minimum height (px)", "import.control.maxHeight": "Maximum height (px)", "import.control.justify": "Flex / Grid horizontal", "import.control.align": "Flex / Grid vertical", "import.control.gap": "Gap (px)",
          "option.left": "Left", "option.center": "Center", "option.right": "Right", "option.justify": "Justify", "option.none": "None", "option.solid": "Solid", "option.dashed": "Dashed", "option.dotted": "Dotted", "option.double": "Double", "option.start": "Start", "option.end": "End", "option.spaceBetween": "Space between", "option.spaceAround": "Space around", "option.stretch": "Stretch", "option.baseline": "Baseline",
          "toast.undoImport": "Undid imported adjustment: {description}", "toast.redoImport": "Redid imported adjustment: {description}",
          "toast.undo": "Undid: {description}", "toast.redo": "Redid: {description}", "toast.resetOne": "Restored {label}.",
          "toast.undoGeneric": "Undid the previous adjustment.", "toast.redoGeneric": "Redid the next adjustment.",
          "toast.resetImport": "Reset the selected imported edits.", "toast.importNothingToReset": "The selected item has no edits to reset.",
          "toast.nothingToReset": "There are no demo adjustments to clear.", "toast.resetAll": "Cleared all demo adjustments.",
          "toast.notImage": "This file is not a supported image.", "toast.imageSize": "The image is larger than 20 MB. Choose a smaller image.",
          "toast.imageChanged": "Preview image changed to “{file}”.", "toast.imageRemoved": "Removed the image from the current preview.",
          "image.uploadedAlt": "Uploaded image: {file}", "image.unnamed": "Unnamed image",
          "summary.moveLeft": "Left {value}px", "summary.moveRight": "Right {value}px", "summary.moveUp": "Up {value}px", "summary.moveDown": "Down {value}px",
          "summary.scale": "{direction} to {value}%", "summary.enlarge": "Scale up", "summary.shrink": "Scale down", "summary.fontSize": "Font size to {value}px", "summary.font": "Font to “{value}”",
          "summary.color": "Text / shape color to {value}", "summary.background": "Background to {value}", "summary.radius": "Corner radius to {value}px",
          "summary.shadowOn": "Enable soft shadow", "summary.shadowOff": "Remove soft shadow", "summary.imageChanged": "Image changed to “{file}”", "summary.imageRemoved": "Remove image",
          "summary.imageContain": "Show full image", "summary.imageCover": "Fill image frame", "summary.adjust": "{device} · {label}: adjust {changes}", "summary.appearance": "appearance",
          "summary.nudge": "{device} · {label}: nudge position", "summary.drag": "drag position", "summary.resize": "resize", "summary.gesture": "{device} · {label}: {action}",
          "summary.restore": "{device} · {label}: restore", "summary.clearAll": "Clear all session adjustments",
          "import.editFallback": "Imported element adjustment", "import.elementFallback": "Imported element", "import.drag": "drag", "import.resize": "resize",
          "edit.text": "text", "edit.fontSize": "font size", "edit.color": "text color", "edit.background": "background", "edit.width": "width", "edit.height": "height", "edit.radius": "corner radius", "edit.x": "X offset", "edit.y": "Y offset",
          "element.header.label": "Header section", "element.header.kind": "Section", "element.header.help": "Select empty space in the header to move, resize, or recolor the whole section.",
          "element.kicker.label": "Eyebrow", "element.kicker.kind": "Text", "element.kicker.help": "Move, resize, or adjust the font size, style, and color of this small eyebrow text.",
          "element.title.label": "Title", "element.title.kind": "Text", "element.title.help": "Drag or resize the main title, or adjust its font size, style, and color in the panel.",
          "element.subtitle.label": "Subtitle", "element.subtitle.kind": "Text", "element.subtitle.help": "Adjust the subtitle's position, size, font, and color independently.",
          "element.stars.label": "Twinkle pair", "element.stars.kind": "Decoration", "element.stars.help": "Drag this decoration to move it, resize proportionally from the handle, or nudge it with arrow keys.",
          "element.helloTitle.label": "Section title", "element.helloTitle.kind": "Text", "element.helloTitle.help": "Move, resize, or recolor this content-section title independently.",
          "element.updateTime.label": "Update time", "element.updateTime.kind": "Text", "element.updateTime.help": "Adjust this time label without moving the nearby title.",
          "element.note.label": "Feature card", "element.note.kind": "Card", "element.note.help": "Adjust the whole card's position, size, background, radius, and shadow. Its text remains separately selectable.",
          "element.noteLabel.label": "Card label", "element.noteLabel.kind": "Text", "element.noteLabel.help": "Adjust the small label above the card title independently.",
          "element.noteMain.label": "Card title", "element.noteMain.kind": "Text", "element.noteMain.help": "Adjust the card title's size, font, and color independently.",
          "element.noteMeta.label": "Card details", "element.noteMeta.kind": "Text", "element.noteMeta.help": "Move, resize, or recolor the supporting card details independently.",
          "element.waterCard.label": "Reading summary card", "element.waterCard.kind": "Card", "element.waterCard.help": "Move, resize, and adjust this summary card's appearance independently.",
          "element.activityCard.label": "Walk summary card", "element.activityCard.kind": "Card", "element.activityCard.help": "Move, resize, and adjust this summary card's appearance independently.",
          "element.photo.label": "Recent moment card", "element.photo.kind": "Image", "element.photo.help": "Adjust position and appearance, upload your own image, or switch between fill and full-image display.",
          "element.record.label": "Add-item button", "element.record.kind": "Button", "element.record.help": "Adjust this main button's position, size, text style, and background. Its original action does not run in this beta.",
          "element.nav.label": "Bottom navigation", "element.nav.kind": "Navigation", "element.nav.help": "Select empty space to adjust the full navigation, or select its three items individually.",
          "element.navHome.label": "Home navigation item", "element.navHome.kind": "Navigation item", "element.navHome.help": "Adjust this navigation item's position, size, and text color independently.",
          "element.navWiki.label": "Inspiration navigation item", "element.navWiki.kind": "Navigation item", "element.navWiki.help": "Adjust this navigation item's position, size, and text color independently.",
          "element.navRecords.label": "Notes navigation item", "element.navRecords.kind": "Navigation item", "element.navRecords.help": "Adjust this navigation item's position, size, and text color independently.",
          "demo.kicker": "LITTLE THINGS DEMO", "demo.title": "One small page", "demo.subtitle": "Keep one small moment from today on a page you can revisit slowly.",
          "demo.hello": "Today's small thing", "demo.time": "Demo time 15:20", "demo.cardLabel": "Sample card", "demo.cardTitle": "Afternoon light reaches the corner of the desk",
          "demo.meta1": "Window corner · sample note", "demo.meta2": "A page turns, and the tea in the cup is still a little warm.",
          "demo.reading": "Reading", "demo.readingValue": "20 minutes", "demo.walk": "Walk", "demo.walkValue": "Clear weather",
          "demo.recent": "Recent moment", "demo.photoHint": "Use the panel to replace it", "demo.cta": "Add one small thing",
          "demo.home": "Home", "demo.inspiration": "Ideas", "demo.records": "Notes",
          "demo.pageLabel": "Little Things generic demo page", "demo.starsLabel": "Twinkle-pair decoration", "demo.quickSummary": "Today's summary", "demo.navLabel": "Demo bottom navigation"
        }
      };

      const i18nCore = __LTS__.use("i18n");
      const importAnalysisCore = __LTS__.use("import-analysis");
      const sanitizationCore = __LTS__.use("sanitization");
      const classificationCore = __LTS__.use("classification");
      const viewNavigationCore = __LTS__.use("view-navigation");
      const selectionEditingCore = __LTS__.use("selection-editing");
      const historyCore = __LTS__.use("history");
      const exportCore = __LTS__.use("export");
      const uiRenderingCore = __LTS__.use("ui-rendering");

      function interpolate(message, values = {}) {
        return i18nCore.interpolate(message, values);
      }

      function t(key, values) {
        const language = state?.language || initialLanguage;
        return interpolate(LOCALES[language]?.[key] ?? LOCALES["zh-TW"][key] ?? key, values);
      }

      function tp(key, count, values = {}) {
        const form = count === 1 ? "one" : "other";
        return t(`${key}.${form}`, { ...values, count });
      }

      function normalizeLanguage(value) {
        return i18nCore.normalizeLanguage(value, SUPPORTED_LANGUAGES);
      }

      function resolveInitialLanguage() {
        const queryLanguage = normalizeLanguage(new URL(window.location.href).searchParams.get("lang"));
        if (queryLanguage) return queryLanguage;
        try {
          const savedLanguage = normalizeLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY));
          if (savedLanguage) return savedLanguage;
        } catch {}
        const browserLanguages = Array.isArray(navigator.languages) && navigator.languages.length
          ? navigator.languages
          : [navigator.language];
        return browserLanguages.some(language => /^zh(?:-|$)/i.test(language || "")) ? "zh-TW" : "en";
      }

      const initialLanguage = resolveInitialLanguage();

      document.querySelectorAll('img[src^="data:image/png;base64,"]').forEach(image => {
        image.src = image.src.replace("HnByCnhyB", "HnByCnByB");
      });

      const DEVICE_KEYS = {
        phone: "device.phone",
        tablet: "device.tablet",
        desktop: "device.desktop"
      };

      const DEVICE_SIZES = {
        phone: { width: 390, height: 780 },
        tablet: { width: 768, height: 880 },
        desktop: { width: 1120, height: 720 }
      };

      const FONT_STACKS = {
        clear: '"Microsoft JhengHei", "PingFang TC", system-ui, sans-serif',
        round: '"Arial Rounded MT Bold", "Microsoft JhengHei", "PingFang TC", system-ui, sans-serif',
        serif: '"Iowan Old Style", "Noto Serif TC", "Songti TC", serif'
      };

      const makeProps = extra => ({ x: 0, y: 0, scale: 1, ...extra });
      const sameDefaults = extra => ({
        phone: makeProps(extra),
        tablet: makeProps(extra),
        desktop: makeProps(extra)
      });
      const responsiveDefaults = (phone, tablet = phone, desktop = tablet) => ({
        phone: makeProps(phone),
        tablet: makeProps(tablet),
        desktop: makeProps(desktop)
      });

      const ELEMENTS = {
        header: {
          nodeId: "demo-header",
          controls: ["background"],
          defaults: sameDefaults({ background: "#f5e4c3" })
        },
        kicker: {
          nodeId: "demo-kicker",
          controls: ["fontSize", "fontFamily", "color"],
          defaults: sameDefaults({ fontSize: 11, fontFamily: "clear", color: "#a27757" })
        },
        title: {
          nodeId: "demo-title",
          controls: ["fontSize", "fontFamily", "color"],
          defaults: responsiveDefaults(
            { fontSize: 31, fontFamily: "round", color: "#49392f" },
            { fontSize: 38, fontFamily: "round", color: "#49392f" },
            { fontSize: 42, fontFamily: "round", color: "#49392f" }
          )
        },
        subtitle: {
          nodeId: "demo-subtitle",
          controls: ["fontSize", "fontFamily", "color"],
          defaults: responsiveDefaults(
            { fontSize: 12, fontFamily: "clear", color: "#8a705c" },
            { fontSize: 14, fontFamily: "clear", color: "#8a705c" },
            { fontSize: 14, fontFamily: "clear", color: "#8a705c" }
          )
        },
        stars: {
          nodeId: "demo-stars",
          controls: ["color"],
          defaults: sameDefaults({ color: "#8a6a49" })
        },
        helloTitle: {
          nodeId: "demo-hello-title",
          controls: ["fontSize", "fontFamily", "color"],
          defaults: sameDefaults({ fontSize: 15, fontFamily: "round", color: "#56483f" })
        },
        updateTime: {
          nodeId: "demo-update-time",
          controls: ["fontSize", "fontFamily", "color"],
          defaults: sameDefaults({ fontSize: 10, fontFamily: "clear", color: "#a48c78" })
        },
        note: {
          nodeId: "demo-note",
          controls: ["background", "radius", "shadow"],
          shadowStyle: "0 13px 30px rgba(106, 80, 50, 0.11)",
          defaults: responsiveDefaults(
            { background: "#fff0b8", radius: 22, shadow: true },
            { background: "#fff0b8", radius: 22, shadow: true },
            { background: "#fff0b8", radius: 24, shadow: true }
          )
        },
        noteLabel: {
          nodeId: "demo-note-label",
          controls: ["fontSize", "fontFamily", "color"],
          defaults: sameDefaults({ fontSize: 10, fontFamily: "clear", color: "#9b7450" })
        },
        noteMain: {
          nodeId: "demo-note-main",
          controls: ["fontSize", "fontFamily", "color"],
          defaults: responsiveDefaults(
            { fontSize: 20, fontFamily: "round", color: "#5d4a36" },
            { fontSize: 20, fontFamily: "round", color: "#5d4a36" },
            { fontSize: 27, fontFamily: "round", color: "#5d4a36" }
          )
        },
        noteMeta: {
          nodeId: "demo-note-meta",
          controls: ["fontSize", "fontFamily", "color"],
          defaults: sameDefaults({ fontSize: 11, fontFamily: "clear", color: "#806b58" })
        },
        waterCard: {
          nodeId: "demo-water-card",
          controls: ["color", "background", "radius", "shadow"],
          shadowStyle: "0 10px 24px rgba(80, 62, 45, 0.10)",
          defaults: sameDefaults({ color: "#69594d", background: "#fffdf8", radius: 18, shadow: false })
        },
        activityCard: {
          nodeId: "demo-activity-card",
          controls: ["color", "background", "radius", "shadow"],
          shadowStyle: "0 10px 24px rgba(80, 62, 45, 0.10)",
          defaults: sameDefaults({ color: "#69594d", background: "#fffdf8", radius: 18, shadow: false })
        },
        photo: {
          nodeId: "demo-photo-card",
          controls: ["background", "radius", "shadow", "image"],
          shadowStyle: "0 10px 24px rgba(80, 62, 45, 0.10)",
          defaults: sameDefaults({
            background: "#fffdf8",
            radius: 18,
            shadow: false,
            imageSrc: "",
            imageName: "",
            imageFit: "cover"
          })
        },
        record: {
          nodeId: "demo-record",
          controls: ["fontSize", "fontFamily", "color", "background", "radius", "shadow"],
          shadowStyle: "0 12px 24px rgba(151, 78, 52, 0.20)",
          defaults: responsiveDefaults(
            { fontSize: 15, fontFamily: "round", color: "#fffaf4", background: "#c96f50", radius: 27, shadow: true },
            { fontSize: 16, fontFamily: "round", color: "#fffaf4", background: "#c96f50", radius: 29, shadow: true },
            { fontSize: 16, fontFamily: "round", color: "#fffaf4", background: "#c96f50", radius: 27, shadow: true }
          )
        },
        nav: {
          nodeId: "demo-nav",
          controls: ["background", "radius", "shadow"],
          shadowStyle: "0 12px 35px rgba(84, 62, 45, 0.13)",
          defaults: sameDefaults({ background: "#fffaf1", radius: 28, shadow: true })
        },
        navHome: {
          nodeId: "demo-nav-home",
          controls: ["fontSize", "fontFamily", "color"],
          defaults: sameDefaults({ fontSize: 9, fontFamily: "clear", color: "#9b583f" })
        },
        navWiki: {
          nodeId: "demo-nav-wiki",
          controls: ["fontSize", "fontFamily", "color"],
          defaults: sameDefaults({ fontSize: 9, fontFamily: "clear", color: "#8e7968" })
        },
        navRecords: {
          nodeId: "demo-nav-records",
          controls: ["fontSize", "fontFamily", "color"],
          defaults: sameDefaults({ fontSize: 9, fontFamily: "clear", color: "#8e7968" })
        }
      };

      const dom = {
        startScreen: document.getElementById("startScreen"),
        workspace: document.getElementById("workspace"),
        editorHeaderCenter: document.getElementById("editorHeaderCenter"),
        brandSubtitle: document.getElementById("brandSubtitle"),
        startImportButton: document.getElementById("startImportButton"),
        startDemoButton: document.getElementById("startDemoButton"),
        workbench: document.getElementById("workbench"),
        canvasSizer: document.getElementById("canvasSizer"),
        projectModeLabel: document.getElementById("projectModeLabel"),
        projectNameLabel: document.getElementById("projectNameLabel"),
        editorActions: document.getElementById("editorActions"),
        htmlImportInput: document.getElementById("htmlImportInput"),
        editorImportButton: document.getElementById("editorImportButton"),
        exportHtmlButton: document.getElementById("exportHtmlButton"),
        returnStartButton: document.getElementById("returnStartButton"),
        confirmReturnStartButton: document.getElementById("confirmReturnStartButton"),
        importPreviewShell: document.getElementById("importPreviewShell"),
        importPreviewFrame: document.getElementById("importPreviewFrame"),
        importFileName: document.getElementById("importFileName"),
        importRecognizedCount: document.getElementById("importRecognizedCount"),
        importSafeCount: document.getElementById("importSafeCount"),
        importViewOnlyCount: document.getElementById("importViewOnlyCount"),
        importBlockedCount: document.getElementById("importBlockedCount"),
        importSafetySummary: document.getElementById("importSafetySummary"),
        compatibilitySummary: document.getElementById("compatibilitySummary"),
        compatibilitySummaryHeadline: document.getElementById("compatibilitySummaryHeadline"),
        compatibilityViewCount: document.getElementById("compatibilityViewCount"),
        compatibilityEditableCount: document.getElementById("compatibilityEditableCount"),
        compatibilityLimitedCount: document.getElementById("compatibilityLimitedCount"),
        compatibilityInertCount: document.getElementById("compatibilityInertCount"),
        compatibilityDiagnostics: document.getElementById("compatibilityDiagnostics"),
        viewNavigator: document.getElementById("viewNavigator"),
        viewNavigatorActions: document.getElementById("viewNavigatorActions"),
        importEditCountLabel: document.getElementById("importEditCountLabel"),
        importEditSummary: document.getElementById("importEditSummary"),
        importExportReason: document.getElementById("importExportReason"),
        importInspector: document.getElementById("importInspector"),
        importSelectedTag: document.getElementById("importSelectedTag"),
        importSelectedLabel: document.getElementById("importSelectedLabel"),
        importSelectedRuntimeId: document.getElementById("importSelectedRuntimeId"),
        importSelectedStatus: document.getElementById("importSelectedStatus"),
        importSelectedInteraction: document.getElementById("importSelectedInteraction"),
        importSelectedReason: document.getElementById("importSelectedReason"),
        importTargetControl: document.getElementById("importTargetControl"),
        importSelectionBreadcrumb: document.getElementById("importSelectionBreadcrumb"),
        importEditGate: document.getElementById("importEditGate"),
        importEditControls: document.getElementById("importEditControls"),
        importTextControl: document.getElementById("importTextControl"),
        importFontSizeControl: document.getElementById("importFontSizeControl"),
        importTextColorControl: document.getElementById("importTextColorControl"),
        importTextColorOutput: document.getElementById("importTextColorOutput"),
        importBackgroundColorControl: document.getElementById("importBackgroundColorControl"),
        importBackgroundColorOutput: document.getElementById("importBackgroundColorOutput"),
        importWidthControl: document.getElementById("importWidthControl"),
        importHeightControl: document.getElementById("importHeightControl"),
        importRadiusControl: document.getElementById("importRadiusControl"),
        importXControl: document.getElementById("importXControl"),
        importYControl: document.getElementById("importYControl"),
        importResetTargetButton: document.getElementById("importResetTargetButton"),
        inspector: document.getElementById("inspector"),
        page: document.getElementById("demoPage"),
        overlay: document.getElementById("selectionOverlay"),
        selectionLabel: document.getElementById("selectionLabel"),
        resizeHandle: document.getElementById("resizeHandle"),
        canvasTip: document.getElementById("canvasTip"),
        deviceDimensions: document.getElementById("deviceDimensions"),
        zoomSelect: document.getElementById("zoomSelect"),
        undoButton: document.getElementById("undoButton"),
        redoButton: document.getElementById("redoButton"),
        summaryButton: document.getElementById("summaryButton"),
        headerChangeCount: document.getElementById("headerChangeCount"),
        selectedName: document.getElementById("selectedName"),
        selectedKind: document.getElementById("selectedKind"),
        selectedHelp: document.getElementById("selectedHelp"),
        currentDeviceScope: document.getElementById("currentDeviceScope"),
        scopeMessage: document.getElementById("scopeMessage"),
        resetElementButton: document.getElementById("resetElementButton"),
        resetAllButton: document.getElementById("resetAllButton"),
        xControl: document.getElementById("xControl"),
        yControl: document.getElementById("yControl"),
        scaleControl: document.getElementById("scaleControl"),
        fontSizeControl: document.getElementById("fontSizeControl"),
        fontFamilyControl: document.getElementById("fontFamilyControl"),
        colorControl: document.getElementById("colorControl"),
        backgroundControl: document.getElementById("backgroundControl"),
        radiusControl: document.getElementById("radiusControl"),
        shadowControl: document.getElementById("shadowControl"),
        imageFitControl: document.getElementById("imageFitControl"),
        imageUpload: document.getElementById("imageUpload"),
        removeImageButton: document.getElementById("removeImageButton"),
        imageFileName: document.getElementById("imageFileName"),
        photoImage: document.getElementById("demo-photo-image"),
        photoPlaceholder: document.getElementById("photoPlaceholder"),
        photoCaption: document.getElementById("photoCaption"),
        xOutput: document.getElementById("xOutput"),
        yOutput: document.getElementById("yOutput"),
        scaleOutput: document.getElementById("scaleOutput"),
        fontSizeOutput: document.getElementById("fontSizeOutput"),
        radiusOutput: document.getElementById("radiusOutput"),
        colorValue: document.getElementById("colorValue"),
        backgroundValue: document.getElementById("backgroundValue"),
        textSection: document.getElementById("textSection"),
        textSectionTitle: document.getElementById("textSectionTitle"),
        surfaceSection: document.getElementById("surfaceSection"),
        imageSection: document.getElementById("imageSection"),
        fontSizeControlRow: document.getElementById("fontSizeControlRow"),
        fontFamilyControlRow: document.getElementById("fontFamilyControlRow"),
        textColorControlRow: document.getElementById("textColorControlRow"),
        backgroundControlRow: document.getElementById("backgroundControlRow"),
        radiusControlRow: document.getElementById("radiusControlRow"),
        shadowControlRow: document.getElementById("shadowControlRow"),
        summaryModal: document.getElementById("summaryModal"),
        returnConfirmModal: document.getElementById("returnConfirmModal"),
        helpModal: document.getElementById("helpModal"),
        summaryContent: document.getElementById("summaryContent"),
        languageButton: document.getElementById("languageButton"),
        helpButton: document.getElementById("helpButton"),
        toast: document.getElementById("toast")
      };

      const clone = historyCore.clone;
      const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
      const objectUrls = new Set();
      let canvasTipTimer = null;

      const defaults = {};
      Object.entries(ELEMENTS).forEach(([id, config]) => {
        defaults[id] = clone(config.defaults);
      });

      const state = {
        language: initialLanguage,
        mode: "start",
        importSession: null,
        device: "phone",
        zoom: 1,
        fitScale: 1,
        renderScale: 1,
        scope: "current",
        selected: "stars",
        edits: clone(defaults),
        history: [],
        future: [],
        controlStart: null,
        gesture: null,
        lastModalTrigger: null
      };

      function elementText(id, part) {
        return t(`element.${id}.${part}`);
      }

      function localizedElementConfig(id) {
        const config = ELEMENTS[id];
        return config ? {
          ...config,
          label: elementText(id, "label"),
          kind: elementText(id, "kind"),
          help: elementText(id, "help")
        } : null;
      }

      function localizeStaticUi() {
        const valueToKey = new Map();
        Object.values(LOCALES).forEach(dictionary => {
          Object.entries(dictionary).forEach(([key, value]) => {
            if (typeof value === "string" && !value.includes("{") && !valueToKey.has(value)) valueToKey.set(value, key);
          });
        });

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(node => {
          const parent = node.parentElement;
          if (!parent || parent.closest("#demoPage") || parent.closest("script, style")) return;
          const trimmed = node.nodeValue.trim();
          const key = valueToKey.get(trimmed);
          if (!key) return;
          node.nodeValue = node.nodeValue.replace(trimmed, t(key));
        });

        document.querySelectorAll("[title], [aria-label]").forEach(element => {
          if (element.closest("#demoPage")) return;
          ["title", "aria-label"].forEach(attribute => {
            if (!element.hasAttribute(attribute)) return;
            const key = valueToKey.get(element.getAttribute(attribute));
            if (key) element.setAttribute(attribute, t(key));
          });
        });
      }

      const DEMO_TEXT_BINDINGS = Object.freeze({
        "#demo-kicker": "demo.kicker",
        "#demo-title": "demo.title",
        "#demo-subtitle": "demo.subtitle",
        "#demo-hello-title": "demo.hello",
        "#demo-update-time": "demo.time",
        "#demo-note-label": "demo.cardLabel",
        "#demo-note-main": "demo.cardTitle",
        "#demo-water-card strong": "demo.reading",
        "#demo-water-card span": "demo.readingValue",
        "#demo-activity-card strong": "demo.walk",
        "#demo-activity-card span": "demo.walkValue",
        "#demo-photo-card figcaption strong": "demo.recent",
        "#photoCaption": "demo.photoHint",
        "#demo-record": "demo.cta",
        "#demo-nav-home > span:last-child": "demo.home",
        "#demo-nav-wiki > span:last-child": "demo.inspiration",
        "#demo-nav-records > span:last-child": "demo.records"
      });

      function applyDemoLanguage() {
        Object.entries(DEMO_TEXT_BINDINGS).forEach(([selector, key]) => {
          const element = document.querySelector(selector);
          if (element) element.textContent = t(key);
        });
        const noteMeta = document.getElementById("demo-note-meta");
        if (noteMeta) {
          noteMeta.replaceChildren(document.createTextNode(t("demo.meta1")), document.createElement("br"), document.createTextNode(t("demo.meta2")));
        }
        applyDemoMetadata();
        if (!getSelectedProps("phone")?.imageSrc && !getSelectedProps("tablet")?.imageSrc && !getSelectedProps("desktop")?.imageSrc) {
          dom.photoCaption.textContent = t("demo.photoHint");
        }
      }

      function applyDemoMetadata() {
        Object.keys(ELEMENTS).forEach(id => {
          const target = getTarget(id);
          if (target) target.dataset.label = elementText(id, "label");
        });
        dom.page.setAttribute("aria-label", t("demo.pageLabel"));
        document.getElementById("demo-stars")?.setAttribute("aria-label", t("demo.starsLabel"));
        document.querySelector(".quick-grid")?.setAttribute("aria-label", t("demo.quickSummary"));
        document.getElementById("demo-nav")?.setAttribute("aria-label", t("demo.navLabel"));
      }

      function localizeBlockedReason(reason) {
        const removedTag = String(reason).match(/^removed <([^>]+)>$/);
        if (removedTag) return t("security.removedTag", { tag: removedTag[1] });
        const disabledAttribute = String(reason).match(/^disabled (.+) attribute$/);
        if (disabledAttribute) return t("security.disabledAttribute", { name: disabledAttribute[1] });
        const keys = {
          "CSS @import": "security.cssImport",
          "CSS external resource": "security.externalCss",
          "unsafe CSS behavior": "security.unsafeCss",
          "javascript URL": "security.javascriptUrl",
          "reserved Studio marker": "security.reservedMarker",
          "redirect or policy meta": "security.redirectMeta",
          "inline event handler": "security.inlineHandler",
          "navigation or external resource": "security.externalResource",
          "disabled form configuration": "security.formConfig"
        };
        if (keys[reason]) return t(keys[reason]);
        return reason;
      }

      function refreshLocalizedDynamicUi() {
        dom.brandSubtitle.textContent = t("brand.subtitle");
        dom.editorActions.setAttribute("aria-label", t("actions.group"));
        dom.editorImportButton.title = t("import.hint");
        dom.exportHtmlButton.textContent = t("export.download");
        dom.returnStartButton.textContent = t("return.start");
        dom.confirmReturnStartButton.textContent = t("return.start");
        dom.resizeHandle.setAttribute("aria-label", t("selection.resize"));
        updateAdjustmentLogButton(state.mode === "import" ? importEditedRecords().length : buildSummaries().length);
        if (state.mode === "demo") {
          dom.projectModeLabel.textContent = t("mode.demo");
          dom.projectNameLabel.textContent = t("project.demoHome");
          dom.editorImportButton.textContent = t("import.open");
          dom.htmlImportInput.setAttribute("aria-label", t("import.open"));
          renderInspector();
          renderChangeSummary();
        } else if (state.mode === "import" && state.importSession) {
          const session = state.importSession;
          session.resizeHandle?.setAttribute("aria-label", t("selection.resize"));
          session.registry.forEach(record => {
            const visualReason = record.visual.state === "unsupported"
              ? t("import.visualUnsupportedReason")
              : t(`import.${record.visual.state}State`);
            const interactionReason = t(record.interaction.state === "inert"
              ? "import.interactionDisabledReason"
              : "import.safeInteraction");
            record.reason = `${visualReason} · ${interactionReason}`;
          });
          dom.projectModeLabel.textContent = t("mode.import");
          dom.editorImportButton.textContent = t("import.replace");
          dom.htmlImportInput.setAttribute("aria-label", t("import.replace"));
          dom.deviceDimensions.textContent = t("import.previewIsolated");
          dom.importRecognizedCount.textContent = tp("import.recognized", session.registry.size);
          dom.importSafeCount.textContent = tp("import.safeCount", session.visualCounts.editable);
          dom.importViewOnlyCount.textContent = tp("import.viewOnlyCount", session.visualCounts.limited + session.visualCounts.unsupported);
          dom.importBlockedCount.textContent = tp("import.blockedCount", session.blockedCount);
          dom.importSafetySummary.textContent = importSafetySummary(session.blockedReasons);
          const record = session.selectedRuntimeId ? session.registry.get(session.selectedRuntimeId) : null;
          const element = session.selectedRuntimeId ? getImportElement(session.selectedRuntimeId) : null;
          renderImportSelection(record, element);
          renderImportChangeSummary();
          renderCompatibilitySummary();
          renderViewNavigator();
        } else {
          dom.htmlImportInput.setAttribute("aria-label", t("import.open"));
          dom.editorImportButton.textContent = t("import.open");
        }
      }

      function applyLanguage(language, options = {}) {
        const nextLanguage = normalizeLanguage(language) || "zh-TW";
        state.language = nextLanguage;
        document.documentElement.lang = nextLanguage;
        localizeStaticUi();
        dom.languageButton.textContent = nextLanguage === "zh-TW" ? "EN" : "中";
        dom.languageButton.title = t("language.switchLabel");
        dom.languageButton.setAttribute("aria-label", t("language.switchLabel"));
        if (state.mode === "demo" && buildSummaries().length > 0) applyDemoMetadata();
        else applyDemoLanguage();
        refreshLocalizedDynamicUi();

        if (options.persist !== false) {
          try { window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage); } catch {}
        }
        if (options.syncUrl !== false) {
          const url = new URL(window.location.href);
          url.searchParams.set("lang", nextLanguage);
          window.history.replaceState(null, "", url);
        }
      }

      const MAX_IMPORT_BYTES = 5 * 1024 * 1024;
      const IMPORT_CSP = [
        "default-src 'none'",
        "script-src 'none'",
        "connect-src 'none'",
        "object-src 'none'",
        "frame-src 'none'",
        "form-action 'none'",
        "base-uri 'none'",
        "style-src 'unsafe-inline'",
        "img-src data: blob:",
        "font-src data: blob:",
        "media-src data: blob:",
        "worker-src 'none'",
        "child-src 'none'",
        "navigate-to 'none'"
      ].join("; ");
      const IMPORT_BLOCKED_TAGS = new Set([
        "script", "iframe", "frame", "frameset", "object", "embed", "applet",
        "portal", "fencedframe", "link", "base", "template", "animate",
        "animatecolor", "animatemotion", "animatetransform", "set", "discard"
      ]);
      const IMPORT_EXCLUDED_TAGS = new Set(["html", "head", "body", "meta", "style", "title"]);
      const IMPORT_VIEW_ONLY_TAGS = new Set([
        "a", "button", "form", "fieldset", "input", "select", "option", "textarea",
        "canvas", "svg", "math", "audio", "video", "source", "track", "details",
        "summary", "dialog", "map", "area"
      ]);
      const IMPORT_URL_ATTRIBUTES = new Set([
        "href", "src", "srcset", "poster", "action", "formaction", "data", "cite",
        "background", "longdesc", "usemap", "manifest", "profile", "xlink:href", "srcdoc"
      ]);
      const IMPORT_EXPORT_PROPERTIES = new Set(["text", ...Object.keys(selectionEditingCore.propertySchema)]);
      const IMPORT_EXPORT_RANGES = Object.freeze({
        fontSize: [6, 240],
        width: [12, 1600],
        height: [12, 1600],
        radius: [0, 400],
        x: [-800, 800],
        y: [-800, 800]
      });
      const IMPORT_INTERNAL_ATTRIBUTES = new Set(["data-lts-runtime-id", "data-lts-source-key"]);
      const IMPORT_INTERNAL_IDS = new Set(["lts-import-edit-overlay", "lts-import-resize-handle"]);
      const IMPORT_INTERNAL_CLASSES = new Set(["lts-import-selected"]);
      const IMPORT_PREVIEW_STYLE = `
        :root { color-scheme: light; }
        html { min-height: 100%; background: #fffdf8; }
        body { min-height: 100%; margin: 0; }
        [data-lts-runtime-id] { cursor: pointer !important; }
        .lts-import-selected {
          outline: 3px solid #d86a4a !important;
          outline-offset: 2px !important;
          box-shadow: 0 0 0 2px rgba(255, 253, 248, 0.92) !important;
        }
        #lts-import-edit-overlay {
          position: absolute;
          z-index: 2147483646;
          display: none;
          pointer-events: none;
          border: 2px solid #d86a4a;
          border-radius: 5px;
          box-shadow: 0 0 0 2px rgba(255, 253, 248, 0.9);
        }
        #lts-import-resize-handle {
          position: absolute;
          right: -9px;
          bottom: -9px;
          width: 18px;
          height: 18px;
          padding: 0;
          pointer-events: auto;
          border: 2px solid white;
          border-radius: 5px;
          background: #d86a4a;
          box-shadow: 0 3px 10px rgba(61, 35, 25, 0.35);
          cursor: nwse-resize;
        }
      `;

      function isSafeDataOrBlobUrl(value, purpose = "media") {
        return sanitizationCore.isSafeDataOrBlobUrl(value, purpose);
      }

      function importElementLabel(element) {
        const explicit = element.getAttribute("aria-label")
          || element.getAttribute("alt")
          || element.getAttribute("title")
          || element.getAttribute("name");
        const text = (explicit || element.textContent || "").replace(/\s+/g, " ").trim();
        return (text || `<${element.tagName.toLowerCase()}>`).slice(0, 80);
      }

      function classifyImportedElement(element) {
        const classification = classificationCore.classifyElement(element);
        if (classification.interaction.state === "safe" && element.parentElement?.closest(
          "a, button, form, fieldset, input, select, option, textarea, details, summary, dialog"
        )) {
          classification.interaction = { state: "inert", reasons: ["inert-ancestor"] };
        }
        const interactionReason = classification.interaction.state === "inert"
          ? t("import.interactionDisabledReason")
          : t("import.safeInteraction");
        const visualReason = classification.visual.state === "unsupported"
          ? t("import.visualUnsupportedReason")
          : classification.visual.state === "limited"
            ? t("import.limitedState")
            : t("import.editableState");
        return {
          ...classification,
          reasonKey: null,
          reason: `${visualReason} · ${interactionReason}`
        };
      }

      function sanitizeImportedHtml(sourceCopy) {
        const parser = new DOMParser();
        const previewDocument = parser.parseFromString(sourceCopy, "text/html");
        const analysis = importAnalysisCore.analyzeDocument(previewDocument, sourceCopy);
        const blockedReasons = new Map();
        const noteBlocked = (reason, count = 1) => {
          blockedReasons.set(reason, (blockedReasons.get(reason) || 0) + count);
        };

        const sourcePaths = new WeakMap();
        const recordSourcePaths = (element, path = []) => {
          sourcePaths.set(element, path);
          [...element.children].forEach((child, index) => recordSourcePaths(child, [...path, index]));
        };
        if (previewDocument.documentElement) recordSourcePaths(previewDocument.documentElement);

        previewDocument.querySelectorAll("*").forEach(element => {
          [...element.attributes].forEach(attribute => {
            if (IMPORT_INTERNAL_ATTRIBUTES.has(attribute.name.toLowerCase())) {
              element.removeAttribute(attribute.name);
              noteBlocked("reserved Studio marker");
            }
          });
          if (IMPORT_INTERNAL_IDS.has(element.id)) {
            element.removeAttribute("id");
            noteBlocked("reserved Studio marker");
          }
          const reservedClasses = [...element.classList].filter(name => IMPORT_INTERNAL_CLASSES.has(name));
          reservedClasses.forEach(name => element.classList.remove(name));
          if (reservedClasses.length) noteBlocked("reserved Studio marker", reservedClasses.length);
          if (!element.classList.length) element.removeAttribute("class");
        });

        previewDocument.querySelectorAll("*").forEach(element => {
          const tag = element.tagName.toLowerCase();
          if (IMPORT_BLOCKED_TAGS.has(tag)) {
            noteBlocked(`removed <${tag}>`);
            element.remove();
          }
        });

        previewDocument.querySelectorAll('meta[http-equiv]').forEach(meta => {
          noteBlocked("redirect or policy meta");
          meta.remove();
        });

        previewDocument.querySelectorAll("*").forEach(element => {
          [...element.attributes].forEach(attribute => {
            const name = attribute.name.toLowerCase();
            const value = attribute.value.trim();
            if (name.startsWith("on")) {
              element.removeAttribute(attribute.name);
              noteBlocked("inline event handler");
              return;
            }
            if (["download", "target", "ping", "autofocus", "autoplay", "controls"].includes(name)) {
              element.removeAttribute(attribute.name);
              noteBlocked(`disabled ${name} attribute`);
              return;
            }
            if (IMPORT_URL_ATTRIBUTES.has(name)) {
              const tag = element.tagName.toLowerCase();
              const resourceMayRemain = name === "src"
                && ["img", "audio", "video", "source", "track"].includes(tag)
                && isSafeDataOrBlobUrl(value);
              const localSvgReference = (name === "href" || name === "xlink:href")
                && tag === "use"
                && /^#[A-Za-z][\w:.-]*$/.test(value);
              if (!resourceMayRemain && !localSvgReference) {
                element.removeAttribute(attribute.name);
                noteBlocked(/^javascript\s*:/i.test(value) ? "javascript URL" : "navigation or external resource");
              }
            }
          });

          if (element.hasAttribute("style")) {
            const cleanedStyle = sanitizationCore.sanitizeCss(element.getAttribute("style"), noteBlocked);
            if (cleanedStyle.trim()) element.setAttribute("style", cleanedStyle);
            else element.removeAttribute("style");
          }
          if (element.hasAttribute("contenteditable")) element.setAttribute("contenteditable", "false");
          if (element.tagName.toLowerCase() === "form") {
            ["action", "method", "enctype", "accept-charset", "target"].forEach(name => {
              if (element.hasAttribute(name)) {
                element.removeAttribute(name);
                noteBlocked("disabled form configuration");
              }
            });
          }
          if (["input", "select", "textarea", "option", "fieldset"].includes(element.tagName.toLowerCase())) {
            element.setAttribute("disabled", "");
          }
          if (["audio", "video"].includes(element.tagName.toLowerCase())) {
            element.setAttribute("preload", "none");
            element.setAttribute("aria-disabled", "true");
          }
          if (element.tagName.toLowerCase() === "button") element.setAttribute("type", "button");
          if (["a", "area", "button", "form"].includes(element.tagName.toLowerCase())) {
            element.setAttribute("aria-disabled", "true");
          }
        });

        previewDocument.querySelectorAll("style").forEach(style => {
          style.textContent = sanitizationCore.sanitizeCss(style.textContent, noteBlocked);
        });

        const registry = new Map();
        let runtimeIndex = 0;
        previewDocument.querySelectorAll("*").forEach(element => {
          const tag = element.tagName.toLowerCase();
          if (IMPORT_EXCLUDED_TAGS.has(tag)) return;
          runtimeIndex += 1;
          const runtimeId = `lts-runtime-${String(runtimeIndex).padStart(4, "0")}`;
          const sourceKey = `lts-source-${String(runtimeIndex).padStart(4, "0")}`;
          const classification = classifyImportedElement(element);
          element.setAttribute("data-lts-runtime-id", runtimeId);
          element.setAttribute("data-lts-source-key", sourceKey);
          registry.set(runtimeId, {
            runtimeId,
            sourceKey,
            tag,
            label: importElementLabel(element),
            interaction: classification.interaction,
            visual: classification.visual,
            reason: classification.reason,
            reasonKey: classification.reasonKey,
            sourcePath: sourcePaths.get(element) || null
          });
        });

        const sanitizedBaseDocument = parser.parseFromString(
          `<!doctype html>\n${previewDocument.documentElement.outerHTML}`,
          "text/html"
        );
        sanitizedBaseDocument.querySelectorAll("[data-lts-runtime-id]").forEach(element => {
          element.removeAttribute("data-lts-runtime-id");
        });
        const sanitizedBaseHtml = `<!doctype html>\n${sanitizedBaseDocument.documentElement.outerHTML}`;

        let head = previewDocument.head;
        if (!head) {
          head = previewDocument.createElement("head");
          previewDocument.documentElement.prepend(head);
        }
        const csp = previewDocument.createElement("meta");
        csp.setAttribute("http-equiv", "Content-Security-Policy");
        csp.setAttribute("content", IMPORT_CSP);
        head.prepend(csp);
        const previewStyle = previewDocument.createElement("style");
        previewStyle.setAttribute("data-lts-preview-style", "");
        previewStyle.textContent = IMPORT_PREVIEW_STYLE;
        csp.after(previewStyle);

        const visualCounts = { editable: 0, limited: 0, unsupported: 0 };
        let inertCount = 0;
        registry.forEach(record => {
          visualCounts[record.visual.state] += 1;
          if (record.interaction.state === "inert") inertCount += 1;
        });
        const blockedCount = [...blockedReasons.values()].reduce((sum, count) => sum + count, 0);
        const sourcePathKeys = [...registry.values()].map(record => JSON.stringify(record.sourcePath));
        return {
          sanitizedHtml: `<!doctype html>\n${previewDocument.documentElement.outerHTML}`,
          sanitizedBaseHtml,
          registry,
          visualCounts,
          inertCount,
          analysis,
          exportBlocked: analysis.scripts > 0 || analysis.eventHandlers > 0 || analysis.resources.length > 0,
          blockedReasons,
          blockedCount,
          sourceMappingComplete: sourcePathKeys.every(key => key !== "null"),
          sourceMappingUnique: new Set(sourcePathKeys).size === sourcePathKeys.length
        };
      }

      function importSafetySummary(blockedReasons) {
        if (!blockedReasons.size) return t("security.clean");
        return [...blockedReasons.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([reason, count]) => t("security.reasonCount", { reason: localizeBlockedReason(reason), count }))
          .join(state.language === "en" ? "; " : "；");
      }

      const COMPATIBILITY_DIAGNOSTIC_KEYS = Object.freeze({
        "javascript-created-content-absent": "compat.jsAbsent",
        "imported-scripts-removed": "compat.scriptsRemoved",
        "inline-handlers-removed": "compat.handlersRemoved",
        "external-resources-blocked": "compat.externalBlocked",
        "relative-resources-blocked": "compat.relativeBlocked",
        "original-interactions-inert": "compat.interactionsInert",
        "canvas-content-limited": "compat.canvasLimited",
        "svg-editing-limited": "compat.svgLimited",
        "custom-element-limited": "compat.customLimited",
        "pseudo-elements-limited": "compat.pseudoLimited"
      });

      function renderCompatibilitySummary() {
        const session = state.importSession;
        if (!session) return;
        const viewCount = Math.max(1, session.views.length || 0);
        dom.compatibilitySummary.querySelector("summary span").textContent = t("compat.title");
        const statTerms = dom.compatibilitySummary.querySelectorAll("dt");
        ["compat.views", "compat.editable", "compat.limited", "compat.inert"].forEach((key, index) => {
          if (statTerms[index]) statTerms[index].textContent = t(key);
        });
        dom.compatibilitySummaryHeadline.textContent = t("compat.headline");
        dom.compatibilityViewCount.textContent = String(viewCount);
        dom.compatibilityEditableCount.textContent = String(session.visualCounts.editable);
        dom.compatibilityLimitedCount.textContent = String(session.visualCounts.limited + session.visualCounts.unsupported);
        dom.compatibilityInertCount.textContent = String(session.inertCount);
        const codes = [...session.analysis.diagnostics];
        if (session.views.length > 1) codes.unshift("multiple-views");
        const messages = codes.length
          ? codes.map(code => code === "multiple-views" ? t("compat.multipleViews") : t(COMPATIBILITY_DIAGNOSTIC_KEYS[code] || code))
          : [t("compat.noIssues")];
        uiRenderingCore.renderList(dom.compatibilityDiagnostics, messages, t("compat.noIssues"));
        uiRenderingCore.setDisclosureCount(dom.compatibilitySummary, messages.length);
      }

      function activateImportView(viewId) {
        const session = state.importSession;
        if (!session || !session.views.some(view => view.id === viewId)) return;
        session.currentViewId = viewId;
        viewNavigationCore.showView(session.views, viewId);
        renderViewNavigator();
        requestAnimationFrame(updateImportOverlay);
      }

      function renderViewNavigator() {
        const session = state.importSession;
        if (!session) return;
        dom.viewNavigator.hidden = session.views.length < 2;
        dom.viewNavigator.querySelector("strong").textContent = t("compat.navigator");
        dom.viewNavigatorActions.replaceChildren();
        session.views.forEach(view => {
          const button = document.createElement("button");
          button.type = "button";
          button.textContent = view.label;
          button.dataset.viewId = view.id;
          if (view.id === session.currentViewId) button.setAttribute("aria-current", "page");
          button.addEventListener("click", () => activateImportView(view.id));
          dom.viewNavigatorActions.appendChild(button);
        });
      }

      function importColorToHex(value, fallback = "#000000") {
        const normalized = String(value || "").trim();
        if (/^#[0-9a-f]{6}$/i.test(normalized)) return normalized.toUpperCase();
        const match = normalized.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
        if (!match) return fallback;
        return `#${match.slice(1, 4).map(part => Number(part).toString(16).padStart(2, "0")).join("")}`.toUpperCase();
      }

      function importTranslateToPixels(value) {
        const match = String(value || "").trim().match(/^(-?\d+(?:\.\d+)?)px(?:\s+(-?\d+(?:\.\d+)?)px)?$/i);
        return match ? [Math.round(Number(match[1])), Math.round(Number(match[2] || 0))] : [0, 0];
      }

      function getImportElement(runtimeId) {
        const previewDocument = dom.importPreviewFrame.contentDocument;
        return previewDocument?.querySelector(`[data-lts-runtime-id="${runtimeId}"]`) || null;
      }

      function currentImportTarget(record, element) {
        const session = state.importSession;
        const textIndex = Number.isInteger(session?.selectedTextIndex) ? session.selectedTextIndex : null;
        if (textIndex != null) {
          const node = element.childNodes[textIndex];
          if (node?.nodeType === Node.TEXT_NODE && node.data.trim()) {
            return {
              editKey: `${record.runtimeId}:text:${textIndex}`,
              nodeKind: "text",
              textIndex,
              node,
              label: node.data.replace(/\s+/g, " ").trim().slice(0, 80)
            };
          }
        }
        return { editKey: record.runtimeId, nodeKind: "element", textIndex: null, node: element, label: record.label };
      }

      function getOrCreateImportEdit(record, element) {
        const session = state.importSession;
        if (!session || !record || !element) return null;
        const target = currentImportTarget(record, element);
        if (session.edits[target.editKey]) return session.edits[target.editKey];
        const computed = element.ownerDocument.defaultView.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const textAttribute = target.nodeKind === "element"
          && element.matches('input:not([type="file"]):not([type="hidden"]):not([type="password"])')
          ? "value"
          : null;
        const hasLeafText = target.nodeKind === "text"
          || Boolean(textAttribute)
          || (element.childElementCount === 0 && element.textContent.trim().length > 0);
        const initialText = target.nodeKind === "text"
          ? target.node.data
          : textAttribute === "value"
            ? element.getAttribute("value") || element.value || ""
            : element.textContent;
        const [initialX, initialY] = importTranslateToPixels(element.style.translate || computed.translate);
        const values = {
          text: initialText,
          fontSize: Math.round(parseFloat(computed.fontSize) || 16),
          fontWeight: Math.round(parseFloat(computed.fontWeight) || 400),
          lineHeight: Number.isFinite(parseFloat(computed.lineHeight) / parseFloat(computed.fontSize))
            ? Math.max(0.5, Math.min(4, Number((parseFloat(computed.lineHeight) / parseFloat(computed.fontSize)).toFixed(2))))
            : 1.5,
          textAlign: ["left", "center", "right", "justify"].includes(computed.textAlign) ? computed.textAlign : "left",
          color: importColorToHex(computed.color),
          backgroundColor: importColorToHex(computed.backgroundColor, "#FFFFFF"),
          borderWidth: Math.max(0, Math.round(parseFloat(computed.borderWidth) || 0)),
          borderColor: importColorToHex(computed.borderColor),
          borderStyle: ["none", "solid", "dashed", "dotted", "double"].includes(computed.borderStyle) ? computed.borderStyle : "none",
          radius: Math.max(0, Math.round(parseFloat(computed.borderRadius) || 0)),
          shadow: computed.boxShadow === "none" ? "" : computed.boxShadow.slice(0, 160),
          opacity: Math.max(0, Math.min(1, Number(computed.opacity) || 1)),
          width: Math.max(12, Math.round(rect.width)),
          height: Math.max(12, Math.round(rect.height)),
          minWidth: Math.max(0, Math.round(parseFloat(computed.minWidth) || 0)),
          maxWidth: Math.max(0, Math.min(4000, Math.round(parseFloat(computed.maxWidth) || 4000))),
          minHeight: Math.max(0, Math.round(parseFloat(computed.minHeight) || 0)),
          maxHeight: Math.max(0, Math.min(4000, Math.round(parseFloat(computed.maxHeight) || 4000))),
          padding: Math.max(0, Math.round(parseFloat(computed.paddingTop) || 0)),
          margin: Math.max(-400, Math.min(400, Math.round(parseFloat(computed.marginTop) || 0))),
          x: initialX,
          y: initialY,
          justifyContent: ["start", "center", "end", "space-between", "space-around", "space-evenly"].includes(computed.justifyContent) ? computed.justifyContent : "start",
          alignItems: ["stretch", "start", "center", "end", "baseline"].includes(computed.alignItems) ? computed.alignItems : "stretch",
          gap: Math.max(0, Math.round(parseFloat(computed.gap) || 0))
        };
        const originalStyles = {};
        Object.entries(selectionEditingCore.propertySchema).forEach(([property, schema]) => {
          if (property === "x" || property === "y") return;
          originalStyles[property] = {
            value: element.style.getPropertyValue(schema.css),
            priority: element.style.getPropertyPriority(schema.css)
          };
        });
        session.edits[target.editKey] = {
          editKey: target.editKey,
          runtimeId: record.runtimeId,
          sourceKey: record.sourceKey,
          nodeKind: target.nodeKind,
          textIndex: target.textIndex,
          textAttribute,
          label: target.label,
          hasLeafText,
          original: {
            text: initialText,
            textAttributePresent: textAttribute ? element.hasAttribute(textAttribute) : false,
            styles: originalStyles,
            translate: {
              value: element.style.getPropertyValue("translate"),
              priority: element.style.getPropertyPriority("translate")
            },
            boxSizing: {
              value: element.style.getPropertyValue("box-sizing"),
              priority: element.style.getPropertyPriority("box-sizing")
            }
          },
          values,
          active: {}
        };
        return session.edits[target.editKey];
      }

      function applyImportEdit(edit) {
        if (!edit || !state.importSession) return;
        const element = getImportElement(edit.runtimeId);
        const record = state.importSession.registry.get(edit.runtimeId);
        if (!element || !record || record.visual.state === "unsupported") return;
        const { active, original, values } = edit;
        if (edit.hasLeafText) {
          const textTarget = edit.nodeKind === "text" ? element.childNodes[edit.textIndex] : element;
          if (edit.nodeKind === "text" && textTarget?.nodeType === Node.TEXT_NODE) {
            textTarget.data = active.text ? values.text : original.text;
          } else if (edit.textAttribute === "value") {
            const nextText = active.text ? values.text : original.text;
            if (active.text || original.textAttributePresent) element.setAttribute("value", nextText);
            else element.removeAttribute("value");
            element.value = nextText;
          } else if (edit.nodeKind === "element" && element.childElementCount === 0) {
            element.textContent = active.text ? values.text : original.text;
          }
        }
        Object.entries(selectionEditingCore.propertySchema).forEach(([property, schema]) => {
          if (property === "x" || property === "y") return;
          if (active[property]) selectionEditingCore.applyVisualProperty(element, property, values[property], values);
          else {
            const baseline = original.styles[property];
            if (baseline?.value) element.style.setProperty(schema.css, baseline.value, baseline.priority);
            else element.style.removeProperty(schema.css);
          }
        });
        if (active.x || active.y) selectionEditingCore.applyVisualProperty(element, "x", values.x, values);
        else if (original.translate.value) element.style.setProperty("translate", original.translate.value, original.translate.priority);
        else element.style.removeProperty("translate");
        if (active.width || active.height) element.style.setProperty("box-sizing", "border-box", "important");
        else if (original.boxSizing.value) element.style.setProperty("box-sizing", original.boxSizing.value, original.boxSizing.priority);
        else element.style.removeProperty("box-sizing");
        record.label = importElementLabel(element);
      }

      function updateImportOverlay() {
        const session = state.importSession;
        if (!session?.overlay) return;
        const { overlay, resizeHandle } = session;
        const element = session.selectedRuntimeId ? getImportElement(session.selectedRuntimeId) : null;
        const record = session.selectedRuntimeId ? session.registry.get(session.selectedRuntimeId) : null;
        if (!element || !record) {
          overlay.style.display = "none";
          return;
        }
        const rect = element.getBoundingClientRect();
        const view = element.ownerDocument.defaultView;
        overlay.style.display = "block";
        overlay.style.left = `${rect.left + view.scrollX}px`;
        overlay.style.top = `${rect.top + view.scrollY}px`;
        overlay.style.width = `${rect.width}px`;
        overlay.style.height = `${rect.height}px`;
        resizeHandle.hidden = record.visual.state === "unsupported";
      }

      function applyAllImportEdits() {
        const session = state.importSession;
        if (!session) return;
        Object.values(session.edits).forEach(applyImportEdit);
        const selectedRecord = session.selectedRuntimeId
          ? session.registry.get(session.selectedRuntimeId)
          : null;
        const selectedElement = session.selectedRuntimeId
          ? getImportElement(session.selectedRuntimeId)
          : null;
        if (selectedRecord && selectedElement) renderImportEditor(selectedRecord, selectedElement);
        requestAnimationFrame(updateImportOverlay);
      }

      function importEditedRecords() {
        const session = state.importSession;
        if (!session) return [];
        return Object.values(session.edits).filter(edit => Object.keys(edit.active).length > 0);
      }

      function resolveImportSourcePath(sourceDocument, sourcePath) {
        if (!sourceDocument.documentElement || !Array.isArray(sourcePath)) return null;
        let element = sourceDocument.documentElement;
        for (const childIndex of sourcePath) {
          element = element.children[childIndex];
          if (!element) return null;
        }
        return element;
      }

      function sourceHasImportInternalMarkers(sourceDocument) {
        return [...sourceDocument.querySelectorAll("*")].some(element => {
          const hasAttribute = [...element.attributes]
            .some(attribute => IMPORT_INTERNAL_ATTRIBUTES.has(attribute.name.toLowerCase()));
          const hasClass = [...element.classList].some(name => IMPORT_INTERNAL_CLASSES.has(name));
          return hasAttribute || hasClass || IMPORT_INTERNAL_IDS.has(element.id);
        });
      }

      function importEditValuesAreValid(edit) {
        const activeKeys = Object.keys(edit.active);
        if (!activeKeys.length || activeKeys.some(key => !IMPORT_EXPORT_PROPERTIES.has(key))) return false;
        if (edit.active.text && (!edit.hasLeafText || typeof edit.values.text !== "string")) return false;
        return activeKeys.every(key => key === "text" || selectionEditingCore.validateValue(key, edit.values[key]));
      }

      function getImportExportGate() {
        const session = state.importSession;
        if (!session) return { allowed: false, reason: t("export.noSession") };
        if (session.exportBlocked) {
          return { allowed: false, reason: t("export.blocked") };
        }
        if (!session.sourceMappingComplete || !session.sourceMappingUnique) {
          return { allowed: false, reason: t("export.mapping") };
        }
        const edits = importEditedRecords();
        if (!edits.length) return { allowed: false, reason: t("export.noEdits") };
        const sourceDocument = new DOMParser().parseFromString(session.sanitizedBaseHtml, "text/html");
        if (sourceHasImportInternalMarkers(new DOMParser().parseFromString(session.immutableSource.source, "text/html"))) {
          return { allowed: false, reason: t("export.marker") };
        }
        const mappedTargets = new Set();
        for (const edit of edits) {
          const record = session.registry.get(edit.runtimeId);
          if (!record || record.visual.state === "unsupported" || !importEditValuesAreValid(edit)) {
            return { allowed: false, reason: t("export.invalid") };
          }
          const targetKey = `${record.sourceKey}:${edit.nodeKind}:${edit.textIndex ?? "element"}`;
          const sourceElement = sourceDocument.querySelector(`[data-lts-source-key="${record.sourceKey}"]`);
          const targetExists = edit.nodeKind === "text"
            ? sourceElement?.childNodes[edit.textIndex]?.nodeType === Node.TEXT_NODE
            : Boolean(sourceElement);
          if (!sourceElement || sourceElement.tagName.toLowerCase() !== record.tag || !targetExists || mappedTargets.has(targetKey)) {
            return { allowed: false, reason: t("export.editMapping") };
          }
          mappedTargets.add(targetKey);
        }
        return { allowed: true, reason: tp("export.allowed", edits.length) };
      }

      function renderImportExportGate() {
        const gate = getImportExportGate();
        dom.exportHtmlButton.disabled = !gate.allowed;
        dom.exportHtmlButton.title = gate.reason;
        dom.exportHtmlButton.setAttribute("aria-label", gate.allowed ? t("export.download") : `${t("export.download")}: ${gate.reason}`);
        dom.importExportReason.textContent = gate.reason;
      }

      function applyImportEditToExport(sourceElement, edit) {
        const target = edit.nodeKind === "text" ? sourceElement.childNodes[edit.textIndex] : sourceElement;
        exportCore.applyEdit(target, edit);
        if (edit.active.width || edit.active.height) sourceElement.style.setProperty("box-sizing", "border-box", "important");
      }

      function serializeImportExport(sourceDocument, source) {
        const doctype = source.match(/^\s*(<!doctype[^>]*>)/i)?.[1] || "";
        return `${doctype}${doctype ? "\n" : ""}${sourceDocument.documentElement.outerHTML}`;
      }

      function buildImportStaticExport() {
        const session = state.importSession;
        const gate = getImportExportGate();
        if (!session || !gate.allowed) throw new Error(gate.reason);
        const sourceDocument = new DOMParser().parseFromString(session.sanitizedBaseHtml, "text/html");
        importEditedRecords().forEach(edit => {
          const record = session.registry.get(edit.runtimeId);
          const sourceElement = sourceDocument.querySelector(`[data-lts-source-key="${record.sourceKey}"]`);
          applyImportEditToExport(sourceElement, edit);
        });
        exportCore.stripRuntimeMarkers(sourceDocument);
        const exportedHtml = exportCore.serialize(sourceDocument, session.immutableSource.source);
        if (/(?:data-lts-runtime-id|data-lts-source-key|lts-import-selected|lts-import-edit-overlay|lts-import-resize-handle)/i.test(exportedHtml)) {
          throw new Error(t("export.internalMarker"));
        }
        const baseName = session.fileName.replace(/\.html?$/i, "") || "edited";
        return { exportedHtml, downloadName: `${baseName}.lts-edited.html` };
      }

      function downloadImportStaticExport() {
        try {
          const { exportedHtml, downloadName } = buildImportStaticExport();
          const blob = new Blob([exportedHtml], { type: "text/html;charset=utf-8" });
          const objectUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = objectUrl;
          link.download = downloadName;
          link.hidden = true;
          document.body.appendChild(link);
          link.click();
          link.remove();
          setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
          state.importSession.lastDownloadedEdits = JSON.stringify(state.importSession.edits);
          showToast(t("toast.downloaded", { file: downloadName }));
        } catch (error) {
          showToast(error instanceof Error ? error.message : t("error.export"));
        }
      }

      const IMPORT_EDIT_LABELS = Object.freeze({
        text: "edit.text",
        fontSize: "edit.fontSize",
        fontWeight: "import.control.fontWeight",
        lineHeight: "import.control.lineHeight",
        textAlign: "import.control.textAlign",
        color: "edit.color",
        backgroundColor: "edit.background",
        borderWidth: "import.control.borderWidth",
        borderColor: "import.control.borderColor",
        borderStyle: "import.control.borderStyle",
        shadow: "import.control.shadow",
        opacity: "import.control.opacity",
        width: "edit.width",
        height: "edit.height",
        minWidth: "import.control.minWidth",
        maxWidth: "import.control.maxWidth",
        minHeight: "import.control.minHeight",
        maxHeight: "import.control.maxHeight",
        padding: "import.control.padding",
        margin: "import.control.margin",
        radius: "edit.radius",
        x: "edit.x",
        y: "edit.y",
        justifyContent: "import.control.justify",
        alignItems: "import.control.align",
        gap: "import.control.gap"
      });

      function importEditLabel(key) {
        return IMPORT_EDIT_LABELS[key] ? t(IMPORT_EDIT_LABELS[key]) : "";
      }

      function buildImportSummaries() {
        return importEditedRecords().map(edit => ({
          device: "import",
          label: edit.label,
          text: Object.keys(edit.active).map(importEditLabel).filter(Boolean).join(state.language === "en" ? ", " : "、")
        }));
      }

      function renderImportChangeSummary() {
        const session = state.importSession;
        if (!session) return;
        const edits = importEditedRecords();
        dom.importEditCountLabel.textContent = tp("import.editCount", edits.length);
        dom.importEditSummary.textContent = edits.length
          ? edits.slice(0, 3).map(edit => {
              const changed = Object.keys(edit.active).map(importEditLabel).filter(Boolean).join(state.language === "en" ? ", " : "、");
              return `${edit.label}${state.language === "en" ? ": " : "："}${changed}`;
            }).join(state.language === "en" ? "; " : "；")
          : t("import.editEmpty");
        updateAdjustmentLogButton(edits.length);
        dom.undoButton.disabled = session.history.length === 0;
        dom.redoButton.disabled = session.future.length === 0;
        renderImportExportGate();
      }

      function commitImportSnapshot(before, description) {
        const session = state.importSession;
        if (!session) return;
        const after = clone(session.edits);
        if (!historyCore.commit(session.history, session.future, before, after, description, 80)) return;
        renderImportChangeSummary();
      }

      function undoImport() {
        const session = state.importSession;
        if (!session) return;
        const snapshot = historyCore.undo(session.history, session.future);
        if (!snapshot) return;
        session.edits = snapshot;
        applyAllImportEdits();
        renderImportChangeSummary();
        showToast(t("toast.undoGeneric"));
      }

      function redoImport() {
        const session = state.importSession;
        if (!session) return;
        const snapshot = historyCore.redo(session.history, session.future);
        if (!snapshot) return;
        session.edits = snapshot;
        applyAllImportEdits();
        renderImportChangeSummary();
        showToast(t("toast.redoGeneric"));
      }

      function renderImportEditor(record, element) {
        const canEdit = record && record.visual.state !== "unsupported";
        dom.importEditControls.disabled = !canEdit;
        dom.importResetTargetButton.disabled = true;
        if (!canEdit || !element) {
          dom.importEditGate.textContent = record
            ? t("import.disabledReason", { status: record.visual.state, reason: record.reason })
            : t("import.selectSafe");
          dom.importTextControl.disabled = true;
          return;
        }
        const edit = getOrCreateImportEdit(record, element);
        dom.importResetTargetButton.disabled = Object.keys(edit.active).length === 0;
        dom.importEditGate.textContent = edit.nodeKind === "text"
          ? t("import.textUnitHint")
          : edit.hasLeafText
          ? t("import.safeLeaf")
          : t("import.safeStructure");
        dom.importEditControls.querySelectorAll("[data-import-control]").forEach(control => {
          const property = control.dataset.importControl;
          const allowed = property === "text" ? edit.hasLeafText : record.visual.properties.includes(property);
          control.disabled = !allowed;
          if (property === "text") control.value = edit.values.text;
          else if (edit.values[property] != null) control.value = String(edit.values[property]);
        });
        dom.importTextColorControl.value = edit.values.color.toLowerCase();
        dom.importTextColorOutput.textContent = edit.values.color;
        dom.importBackgroundColorControl.value = edit.values.backgroundColor.toLowerCase();
        dom.importBackgroundColorOutput.textContent = edit.values.backgroundColor;
      }

      function resetSelectedImportTarget() {
        const session = state.importSession;
        const record = session?.selectedRuntimeId ? session.registry.get(session.selectedRuntimeId) : null;
        const element = session?.selectedRuntimeId ? getImportElement(session.selectedRuntimeId) : null;
        if (!session || !record || !element) return;
        const edit = getOrCreateImportEdit(record, element);
        if (!Object.keys(edit.active).length) {
          showToast(t("toast.importNothingToReset"));
          return;
        }
        const before = clone(session.edits);
        edit.active = {};
        applyImportEdit(edit);
        commitImportSnapshot(before, t("import.resetTarget"));
        renderImportEditor(record, element);
        renderImportChangeSummary();
        requestAnimationFrame(updateImportOverlay);
        showToast(t("toast.resetImport"));
      }

      function beginImportControlChange() {
        const session = state.importSession;
        if (!session || session.controlStart) return;
        session.controlStart = clone(session.edits);
      }

      function handleImportControlInput(event) {
        const session = state.importSession;
        const record = session?.selectedRuntimeId ? session.registry.get(session.selectedRuntimeId) : null;
        const element = session?.selectedRuntimeId ? getImportElement(session.selectedRuntimeId) : null;
        if (!session || !record || record.visual.state === "unsupported" || !element) return;
        const edit = getOrCreateImportEdit(record, element);
        const prop = event.currentTarget.dataset.importControl;
        if ((prop === "text" && !edit.hasLeafText)
          || (prop !== "text" && !record.visual.properties.includes(prop))) return;
        beginImportControlChange();
        let value = event.currentTarget.value;
        if (event.currentTarget.type === "number" || ["fontSize", "width", "height", "radius", "x", "y"].includes(prop)) {
          const min = Number(event.currentTarget.min);
          const max = Number(event.currentTarget.max);
          value = clamp(Number(value), min, max);
        }
        if (prop !== "text" && !selectionEditingCore.validateValue(prop, value)) return;
        edit.values[prop] = value;
        edit.active[prop] = true;
        applyImportEdit(edit);
        renderImportEditor(record, element);
        renderImportChangeSummary();
        requestAnimationFrame(updateImportOverlay);
      }

      function finishImportControlChange() {
        const session = state.importSession;
        if (!session?.controlStart) return;
        const before = session.controlStart;
        session.controlStart = null;
        const record = session.selectedRuntimeId ? session.registry.get(session.selectedRuntimeId) : null;
        commitImportSnapshot(before, record?.label || t("import.editFallback"));
      }

      function startImportGesture(event, type) {
        const session = state.importSession;
        const record = session?.selectedRuntimeId ? session.registry.get(session.selectedRuntimeId) : null;
        const element = session?.selectedRuntimeId ? getImportElement(session.selectedRuntimeId) : null;
        if (!session || !record || record.visual.state === "unsupported" || !element) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        const edit = getOrCreateImportEdit(record, element);
        session.gesture = {
          type,
          pointerId: event.pointerId,
          startClientX: event.clientX,
          startClientY: event.clientY,
          startX: edit.values.x,
          startY: edit.values.y,
          startWidth: edit.values.width,
          startHeight: edit.values.height,
          before: clone(session.edits),
          editKey: edit.editKey,
          moved: false
        };
        const previewDocument = element.ownerDocument;
        previewDocument.addEventListener("pointermove", moveImportGesture, { passive: false });
        previewDocument.addEventListener("pointerup", finishImportGesture, { once: true });
        previewDocument.addEventListener("pointercancel", finishImportGesture, { once: true });
      }

      function moveImportGesture(event) {
        const session = state.importSession;
        const gesture = session?.gesture;
        if (!gesture || event.pointerId !== gesture.pointerId) return;
        event.preventDefault();
        const dx = event.clientX - gesture.startClientX;
        const dy = event.clientY - gesture.startClientY;
        if (Math.abs(dx) + Math.abs(dy) > 1) gesture.moved = true;
        const edit = session.edits[gesture.editKey];
        if (gesture.type === "drag") {
          edit.values.x = clamp(Math.round(gesture.startX + dx), -800, 800);
          edit.values.y = clamp(Math.round(gesture.startY + dy), -800, 800);
          edit.active.x = true;
          edit.active.y = true;
        } else {
          edit.values.width = clamp(Math.round(gesture.startWidth + dx), 12, 1600);
          edit.values.height = clamp(Math.round(gesture.startHeight + dy), 12, 1600);
          edit.active.width = true;
          edit.active.height = true;
        }
        applyImportEdit(edit);
        const record = session.registry.get(session.selectedRuntimeId);
        const element = getImportElement(session.selectedRuntimeId);
        if (record && element) renderImportEditor(record, element);
        renderImportChangeSummary();
        requestAnimationFrame(updateImportOverlay);
      }

      function finishImportGesture(event) {
        const session = state.importSession;
        const gesture = session?.gesture;
        if (!gesture || (event?.pointerId != null && event.pointerId !== gesture.pointerId)) return;
        const previewDocument = dom.importPreviewFrame.contentDocument;
        previewDocument?.removeEventListener("pointermove", moveImportGesture);
        session.gesture = null;
        if (gesture.moved) {
          const record = session.registry.get(session.selectedRuntimeId);
          const separator = state.language === "en" ? ": " : "：";
          commitImportSnapshot(gesture.before, `${record?.label || t("import.elementFallback")}${separator}${t(gesture.type === "drag" ? "import.drag" : "import.resize")}`);
        }
      }

      function importSelectionBreadcrumb(element) {
        const parts = [];
        let current = element;
        while (current && current !== current.ownerDocument.documentElement && parts.length < 5) {
          const tag = current.tagName.toLowerCase();
          parts.unshift(`${tag}${current.id ? `#${current.id}` : ""}`);
          current = current.parentElement;
        }
        return parts.join(" › ");
      }

      function renderImportTargetOptions(record, element) {
        const selectedValue = Number.isInteger(state.importSession?.selectedTextIndex)
          ? `text:${state.importSession.selectedTextIndex}`
          : "element";
        dom.importTargetControl.replaceChildren();
        const elementOption = document.createElement("option");
        elementOption.value = "element";
        elementOption.textContent = t("import.elementTarget");
        dom.importTargetControl.appendChild(elementOption);
        if (record && element && record.visual.state !== "unsupported") {
          [...element.childNodes].forEach((node, index) => {
            if (node.nodeType !== Node.TEXT_NODE || !node.data.trim()) return;
            const option = document.createElement("option");
            option.value = `text:${index}`;
            option.textContent = t("import.directTextTarget", { text: node.data.replace(/\s+/g, " ").trim().slice(0, 42) });
            dom.importTargetControl.appendChild(option);
          });
          let ancestor = element.parentElement?.closest("[data-lts-runtime-id]");
          let ancestorDepth = 0;
          while (ancestor && ancestorDepth < 4) {
            const ancestorRecord = state.importSession.registry.get(ancestor.dataset.ltsRuntimeId);
            if (ancestorRecord) {
              const option = document.createElement("option");
              option.value = `ancestor:${ancestorRecord.runtimeId}`;
              option.textContent = t("import.ancestorTarget", { tag: ancestorRecord.tag, text: ancestorRecord.label });
              dom.importTargetControl.appendChild(option);
            }
            ancestor = ancestor.parentElement?.closest("[data-lts-runtime-id]");
            ancestorDepth += 1;
          }
        }
        dom.importTargetControl.disabled = !record;
        dom.importTargetControl.value = [...dom.importTargetControl.options].some(option => option.value === selectedValue)
          ? selectedValue
          : "element";
      }

      function renderImportSelection(record, selectedElement, options = {}) {
        const previewDocument = dom.importPreviewFrame.contentDocument;
        if (previewDocument) {
          previewDocument.querySelectorAll(".lts-import-selected").forEach(element => {
            element.classList.remove("lts-import-selected");
          });
        }
        if (selectedElement) selectedElement.classList.add("lts-import-selected");
        if (state.importSession) {
          const changedElement = state.importSession.selectedRuntimeId !== (record?.runtimeId || null);
          state.importSession.selectedRuntimeId = record?.runtimeId || null;
          if (changedElement && options.preserveTarget !== true) state.importSession.selectedTextIndex = null;
        }
        renderImportTargetOptions(record, selectedElement);
        const target = record && selectedElement ? currentImportTarget(record, selectedElement) : null;
        dom.selectedName.textContent = record ? record.label : t("import.copy");
        dom.selectedKind.textContent = record ? record.visual.state : t("import.previewOnly");
        dom.importSelectedTag.textContent = record ? `<${record.tag}>` : "—";
        dom.importSelectedLabel.textContent = target ? target.label : t("import.selectPrompt");
        dom.importSelectedRuntimeId.textContent = record ? record.runtimeId : "—";
        dom.importSelectionBreadcrumb.textContent = selectedElement ? importSelectionBreadcrumb(selectedElement) : "—";
        dom.importSelectedStatus.textContent = record ? t(`import.${record.visual.state}State`) : "—";
        dom.importSelectedStatus.className = `import-support-chip${record ? ` is-${record.visual.state}` : ""}`;
        dom.importSelectedInteraction.textContent = record
          ? t(record.interaction.state === "inert" ? "import.inertInteraction" : "import.safeInteraction")
          : "—";
        dom.importSelectedInteraction.className = `import-support-chip${record ? ` is-${record.interaction.state}` : ""}`;
        dom.importSelectedReason.textContent = record
          ? target?.nodeKind === "text"
            ? t("import.textUnitHint")
            : record.reason
          : t("import.selectableReason");
        renderImportEditor(record, selectedElement);
        requestAnimationFrame(updateImportOverlay);
      }

      function blockImportedBehavior(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }

      function connectImportPreview() {
        if (state.mode !== "import" || !state.importSession) return;
        const previewDocument = dom.importPreviewFrame.contentDocument;
        if (!previewDocument) return;
        const overlay = previewDocument.createElement("div");
        overlay.id = "lts-import-edit-overlay";
        overlay.setAttribute("aria-hidden", "true");
        const resizeHandle = previewDocument.createElement("button");
        resizeHandle.id = "lts-import-resize-handle";
        resizeHandle.type = "button";
        resizeHandle.setAttribute("aria-label", t("selection.resize"));
        overlay.appendChild(resizeHandle);
        previewDocument.body.appendChild(overlay);
        state.importSession.overlay = overlay;
        state.importSession.resizeHandle = resizeHandle;
        state.importSession.views = viewNavigationCore.discoverViews(previewDocument);
        state.importSession.currentViewId = state.importSession.views[0]?.id || null;
        if (state.importSession.currentViewId) {
          viewNavigationCore.showView(state.importSession.views, state.importSession.currentViewId);
        }
        renderCompatibilitySummary();
        renderViewNavigator();
        previewDocument.addEventListener("pointerdown", event => {
          if (event.target === resizeHandle) {
            startImportGesture(event, "resize");
            return;
          }
          const selectedElement = event.target.closest("[data-lts-runtime-id]");
          if (!selectedElement) return;
          const record = state.importSession?.registry.get(selectedElement.dataset.ltsRuntimeId);
          if (!record) return;
          renderImportSelection(record, selectedElement);
          if (record.visual.state !== "unsupported") startImportGesture(event, "drag");
        }, true);
        previewDocument.addEventListener("click", event => {
          event.preventDefault();
          event.stopImmediatePropagation();
          const selectedElement = event.target.closest("[data-lts-runtime-id]");
          if (!selectedElement) return;
          const record = state.importSession.registry.get(selectedElement.dataset.ltsRuntimeId);
          if (record) renderImportSelection(record, selectedElement);
        }, true);
        previewDocument.addEventListener("submit", blockImportedBehavior, true);
        previewDocument.addEventListener("auxclick", blockImportedBehavior, true);
        previewDocument.addEventListener("dragstart", blockImportedBehavior, true);
        previewDocument.addEventListener("beforeinput", blockImportedBehavior, true);
        previewDocument.addEventListener("keydown", event => {
          if (event.key === "Enter" || event.key === " ") blockImportedBehavior(event);
        }, true);
        previewDocument.addEventListener("scroll", () => requestAnimationFrame(updateImportOverlay), true);
        previewDocument.defaultView.addEventListener("resize", () => requestAnimationFrame(updateImportOverlay));
        renderImportSelection(null, null);
        renderImportChangeSummary();
      }

      function setDemoControlsDisabled(disabled) {
        document.querySelectorAll("[data-device-button]").forEach(button => { button.disabled = disabled; });
        dom.zoomSelect.disabled = disabled;
      }

      function setEditorVisible(visible) {
        dom.startScreen.hidden = visible;
        dom.workspace.hidden = !visible;
        dom.editorHeaderCenter.hidden = !visible;
        dom.brandSubtitle.hidden = !visible;
        dom.undoButton.hidden = !visible;
        dom.redoButton.hidden = !visible;
        dom.summaryButton.hidden = !visible;
      }

      function updateAdjustmentLogButton(count) {
        const label = tp("action.logOpen", count);
        dom.headerChangeCount.textContent = String(count);
        dom.summaryButton.title = label;
        dom.summaryButton.setAttribute("aria-label", label);
      }

      function resetTemporarySession() {
        objectUrls.forEach(url => URL.revokeObjectURL(url));
        objectUrls.clear();
        state.importSession = null;
        state.device = "phone";
        state.zoom = 1;
        state.fitScale = 1;
        state.renderScale = 1;
        state.scope = "current";
        state.selected = "stars";
        state.edits = clone(defaults);
        state.history = [];
        state.future = [];
        state.controlStart = null;
        state.gesture = null;
        dom.page.dataset.device = "phone";
        dom.zoomSelect.value = "1";
        document.querySelectorAll("[data-device-button]").forEach(button => {
          button.setAttribute("aria-pressed", String(button.dataset.deviceButton === "phone"));
        });
        document.querySelectorAll('input[name="scope"]').forEach(input => {
          input.checked = input.value === "current";
        });
      }

      function prepareDemoEditor() {
        dom.importPreviewFrame.srcdoc = "";
        dom.importPreviewShell.hidden = true;
        dom.importInspector.hidden = true;
        [...dom.inspector.querySelectorAll(":scope > .inspector-section")].forEach(section => {
          section.hidden = false;
        });
        dom.canvasSizer.hidden = false;
        dom.canvasTip.hidden = false;
        dom.exportHtmlButton.hidden = false;
        dom.exportHtmlButton.disabled = true;
        dom.exportHtmlButton.title = t("import.exportNeedsEdit");
        dom.exportHtmlButton.setAttribute("aria-label", `${t("export.download")}: ${t("import.exportNeedsEdit")}`);
        dom.importExportReason.textContent = t("import.exportNeedsEdit");
        dom.projectModeLabel.textContent = t("mode.demo");
        dom.projectNameLabel.textContent = t("project.demoHome");
        dom.editorImportButton.textContent = t("import.open");
        dom.htmlImportInput.setAttribute("aria-label", t("import.open"));
        dom.importEditControls.disabled = true;
        dom.importEditGate.textContent = t("import.selectSafe");
        applyDemoLanguage();
        setDemoControlsDisabled(false);
      }

      function enterSampleMode() {
        resetTemporarySession();
        state.mode = "demo";
        prepareDemoEditor();
        setEditorVisible(true);
        applyAllStyles();
        renderInspector();
        renderChangeSummary();
        fitCanvas();
        window.clearTimeout(canvasTipTimer);
        dom.canvasTip.classList.remove("is-dismissed");
        canvasTipTimer = window.setTimeout(() => dom.canvasTip.classList.add("is-dismissed"), 7000);
        requestAnimationFrame(() => dom.page.focus({ preventScroll: true }));
      }

      function enterImportMode(immutableSource, sanitized) {
        const fileName = immutableSource.fileName;
        state.mode = "import";
        state.importSession = {
          fileName,
          immutableSource,
          sanitizedBaseHtml: sanitized.sanitizedBaseHtml,
          registry: sanitized.registry,
          blockedReasons: sanitized.blockedReasons,
          visualCounts: sanitized.visualCounts,
          inertCount: sanitized.inertCount,
          analysis: sanitized.analysis,
          exportBlocked: sanitized.exportBlocked,
          blockedCount: sanitized.blockedCount,
          sourceMappingComplete: sanitized.sourceMappingComplete,
          sourceMappingUnique: sanitized.sourceMappingUnique,
          edits: {},
          history: [],
          future: [],
          controlStart: null,
          gesture: null,
          lastDownloadedEdits: null,
          selectedRuntimeId: null,
          selectedTextIndex: null,
          views: [],
          currentViewId: null,
          overlay: null,
          resizeHandle: null
        };
        setEditorVisible(true);
        dom.canvasSizer.hidden = true;
        dom.canvasTip.hidden = true;
        dom.importPreviewShell.hidden = false;
        dom.importInspector.hidden = false;
        [...dom.inspector.querySelectorAll(":scope > .inspector-section")].forEach(section => {
          section.hidden = true;
        });
        dom.exportHtmlButton.hidden = false;
        dom.editorImportButton.textContent = t("import.replace");
        dom.htmlImportInput.setAttribute("aria-label", t("import.replace"));
        dom.projectModeLabel.textContent = t("mode.import");
        dom.projectNameLabel.textContent = fileName;
        dom.deviceDimensions.textContent = t("import.previewIsolated");
        dom.importFileName.textContent = fileName;
        dom.importRecognizedCount.textContent = tp("import.recognized", sanitized.registry.size);
        dom.importSafeCount.textContent = tp("import.safeCount", sanitized.visualCounts.editable);
        dom.importViewOnlyCount.textContent = tp("import.viewOnlyCount", sanitized.visualCounts.limited + sanitized.visualCounts.unsupported);
        dom.importBlockedCount.textContent = tp("import.blockedCount", sanitized.blockedCount);
        dom.importSafetySummary.textContent = importSafetySummary(sanitized.blockedReasons);
        renderCompatibilitySummary();
        renderViewNavigator();
        setDemoControlsDisabled(true);
        renderImportChangeSummary();
        dom.importPreviewFrame.srcdoc = sanitized.sanitizedHtml;
      }

      function hasPendingAdjustments() {
        if (state.mode === "import") {
          const session = state.importSession;
          if (!session || importEditedRecords().length === 0) return false;
          return JSON.stringify(session.edits) !== session.lastDownloadedEdits;
        }
        if (state.mode === "demo") return buildSummaries().length > 0;
        return false;
      }

      function returnToStart() {
        const hadEditor = state.mode !== "start";
        window.clearTimeout(canvasTipTimer);
        resetTemporarySession();
        state.mode = "start";
        dom.importPreviewFrame.srcdoc = "";
        dom.importPreviewShell.hidden = true;
        dom.importInspector.hidden = true;
        [...dom.inspector.querySelectorAll(":scope > .inspector-section")].forEach(section => {
          section.hidden = false;
        });
        dom.canvasSizer.hidden = false;
        dom.canvasTip.hidden = false;
        dom.exportHtmlButton.hidden = true;
        dom.exportHtmlButton.disabled = true;
        dom.htmlImportInput.value = "";
        dom.htmlImportInput.setAttribute("aria-label", t("import.open"));
        dom.editorImportButton.textContent = t("import.open");
        applyDemoLanguage();
        updateAdjustmentLogButton(0);
        setEditorVisible(false);
        applyAllStyles();
        renderInspector();
        renderChangeSummary();
        if (hadEditor) showToast(t("toast.returned"));
      }

      function requestReturnToStart(event) {
        if (hasPendingAdjustments()) {
          openModal(dom.returnConfirmModal, event?.currentTarget || dom.returnStartButton);
          return;
        }
        returnToStart();
      }

      async function handleHtmlImport(event) {
        const [file] = event.currentTarget.files;
        if (!file) return;
        try {
          if (!/\.html?$/i.test(file.name)) throw new Error(t("error.extension"));
          if (file.size === 0) throw new Error(t("error.empty"));
          if (file.size > MAX_IMPORT_BYTES) throw new Error(t("error.size"));
          const source = await file.text();
          if (source.includes("\uFFFD") || source.includes("\u0000")) {
            throw new Error(t("error.utf8"));
          }
          if (!/(?:<!doctype\s+html|<html\b|<body\b|<[a-z][^>]*>)/i.test(source)) {
            throw new Error(t("error.structure"));
          }
          const immutableSource = Object.freeze({ fileName: file.name, source });
          const sanitized = sanitizeImportedHtml(immutableSource.source);
          enterImportMode(immutableSource, sanitized);
          showToast(t("toast.imported", { file: file.name }));
        } catch (error) {
          event.currentTarget.value = "";
          showToast(error instanceof Error ? error.message : t("error.read"));
        }
      }

      const shallowEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

      function getSelectedConfig() {
        return localizedElementConfig(state.selected);
      }

      function getSelectedProps(device = state.device) {
        return state.edits[state.selected][device];
      }

      function getTarget(id = state.selected) {
        return document.getElementById(ELEMENTS[id].nodeId);
      }

      function getScopedDevices() {
        return state.scope === "all" ? Object.keys(DEVICE_SIZES) : [state.device];
      }

      function applyProperty(prop, value) {
        getScopedDevices().forEach(device => {
          state.edits[state.selected][device][prop] = value;
        });
      }

      function styleTarget(id) {
        const target = getTarget(id);
        const props = state.edits[id][state.device];
        const config = ELEMENTS[id];
        const baseline = defaults[id][state.device];

        target.style.transform = `translate(${props.x}px, ${props.y}px) scale(${props.scale})`;
        target.style.fontSize = props.fontSize == null ? "" : `${props.fontSize}px`;
        target.style.fontFamily = props.fontFamily ? FONT_STACKS[props.fontFamily] : "";
        target.style.color = props.color || "";
        target.style.background = props.background && props.background !== baseline.background ? props.background : "";
        target.style.borderRadius = props.radius == null ? "" : `${props.radius}px`;

        if (config.controls.includes("shadow")) {
          if (props.shadow) {
            target.style.boxShadow = config.shadowStyle || "0 13px 30px rgba(65, 71, 91, 0.13)";
          } else {
            target.style.boxShadow = "none";
          }
        }

        if (config.controls.includes("image")) {
          const hasImage = Boolean(props.imageSrc);
          dom.photoImage.hidden = !hasImage;
          dom.photoPlaceholder.hidden = hasImage;
          if (hasImage) dom.photoImage.src = props.imageSrc;
          else dom.photoImage.removeAttribute("src");
          dom.photoImage.alt = hasImage ? t("image.uploadedAlt", { file: props.imageName || t("image.unnamed") }) : "";
          dom.photoImage.style.objectFit = props.imageFit || "cover";
          dom.photoCaption.textContent = hasImage ? props.imageName : t("demo.photoHint");
        }
      }

      function applyAllStyles() {
        Object.keys(ELEMENTS).forEach(styleTarget);
        requestAnimationFrame(updateOverlay);
      }

      function selectElement(id, options = {}) {
        if (!ELEMENTS[id]) return;
        state.selected = id;
        dom.selectionLabel.textContent = t("selection.drag", { label: elementText(id, "label") });
        dom.canvasTip.classList.add("is-dismissed");
        renderInspector();
        applyAllStyles();

        if (options.focusInspector) {
          dom.selectedName.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }
      }

      function updateOverlay() {
        const target = getTarget();
        if (!target || !state.renderScale) return;

        const targetRect = target.getBoundingClientRect();
        const pageRect = dom.page.getBoundingClientRect();
        const scale = state.renderScale;
        const inset = 3;

        dom.overlay.style.left = `${(targetRect.left - pageRect.left) / scale - inset}px`;
        dom.overlay.style.top = `${(targetRect.top - pageRect.top) / scale - inset}px`;
        dom.overlay.style.width = `${targetRect.width / scale + inset * 2}px`;
        dom.overlay.style.height = `${targetRect.height / scale + inset * 2}px`;
      }

      let overlaySettleTimer = 0;

      function fitCanvas() {
        const size = DEVICE_SIZES[state.device];
        const workbenchStyle = window.getComputedStyle(dom.workbench);
        const horizontalPadding =
          parseFloat(workbenchStyle.paddingLeft) + parseFloat(workbenchStyle.paddingRight);
        const verticalPadding =
          parseFloat(workbenchStyle.paddingTop) + parseFloat(workbenchStyle.paddingBottom);
        const availableWidth = Math.max(160, dom.workbench.clientWidth - horizontalPadding - 18);
        const availableHeight = Math.max(220, dom.workbench.clientHeight - verticalPadding - 18);
        const shortDockedLayout =
          window.matchMedia("(min-width: 700px) and (max-height: 759px)").matches;
        const widthFit = availableWidth / size.width;
        const heightFit = availableHeight / size.height;
        const fit = shortDockedLayout
          ? Math.min(1, widthFit, Math.max(0.62, heightFit))
          : Math.min(1, widthFit, heightFit);

        state.fitScale = fit;
        state.renderScale = fit * state.zoom;

        dom.page.style.width = `${size.width}px`;
        dom.page.style.height = `${size.height}px`;
        dom.page.style.transform = `scale(${state.renderScale})`;
        dom.canvasSizer.style.width = `${size.width * state.renderScale}px`;
        dom.canvasSizer.style.height = `${size.height * state.renderScale}px`;
        dom.deviceDimensions.textContent = `${size.width} × ${size.height}`;
        requestAnimationFrame(updateOverlay);
        window.clearTimeout(overlaySettleTimer);
        overlaySettleTimer = window.setTimeout(updateOverlay, 240);
      }

      function deviceLabel() {
        return t(DEVICE_KEYS[state.device]);
      }

      function renderInspector() {
        const config = getSelectedConfig();
        const props = getSelectedProps();
        const controls = config.controls;

        dom.selectedName.textContent = config.label;
        dom.selectedKind.textContent = config.kind;
        dom.selectedHelp.textContent = config.help;
        dom.currentDeviceScope.textContent = t("inspector.currentSize", { device: deviceLabel() });
        dom.scopeMessage.textContent = state.scope === "all"
          ? t("inspector.scopeAll")
          : t("inspector.scopeOne", { device: deviceLabel() });

        dom.xControl.value = props.x;
        dom.yControl.value = props.y;
        dom.scaleControl.value = Math.round(props.scale * 100);
        dom.xOutput.textContent = `${Math.round(props.x)} px`;
        dom.yOutput.textContent = `${Math.round(props.y)} px`;
        dom.scaleOutput.textContent = `${Math.round(props.scale * 100)}%`;

        const hasTextControls = controls.some(item => ["fontSize", "fontFamily", "color"].includes(item));
        const hasSurfaceControls = controls.some(item => ["background", "radius", "shadow"].includes(item));
        const hasImageControls = controls.includes("image");
        dom.textSection.hidden = !hasTextControls;
        dom.textSectionTitle.textContent = controls.some(item => ["fontSize", "fontFamily"].includes(item)) ? t("inspector.text") : t("inspector.color");
        dom.surfaceSection.hidden = !hasSurfaceControls;
        dom.imageSection.hidden = !hasImageControls;

        dom.fontSizeControlRow.hidden = !controls.includes("fontSize");
        dom.fontFamilyControlRow.hidden = !controls.includes("fontFamily");
        dom.textColorControlRow.hidden = !controls.includes("color");
        dom.backgroundControlRow.hidden = !controls.includes("background");
        dom.radiusControlRow.hidden = !controls.includes("radius");
        dom.shadowControlRow.hidden = !controls.includes("shadow");

        if (controls.includes("fontSize")) {
          dom.fontSizeControl.value = props.fontSize;
          dom.fontSizeOutput.textContent = `${props.fontSize} px`;
        }
        if (controls.includes("fontFamily")) {
          dom.fontFamilyControl.value = props.fontFamily;
        }
        if (controls.includes("color")) {
          dom.colorControl.value = props.color;
          dom.colorValue.textContent = props.color.toUpperCase();
        }
        if (controls.includes("background")) {
          dom.backgroundControl.value = props.background;
          dom.backgroundValue.textContent = props.background.toUpperCase();
        }
        if (controls.includes("radius")) {
          dom.radiusControl.value = props.radius;
          dom.radiusOutput.textContent = `${props.radius} px`;
        }
        if (controls.includes("shadow")) {
          dom.shadowControl.checked = props.shadow;
        }
        if (hasImageControls) {
          dom.imageFitControl.value = props.imageFit || "cover";
          dom.imageFileName.textContent = props.imageName || t("inspector.noImage");
          dom.removeImageButton.disabled = !props.imageSrc;
        }
      }

      function changedProps(id, device) {
        const now = state.edits[id][device];
        const base = defaults[id][device];
        return Object.keys(now).filter(prop => now[prop] !== base[prop]);
      }

      function movementParts(now, base) {
        const parts = [];
        const dx = Math.round(now.x - base.x);
        const dy = Math.round(now.y - base.y);
        if (dx < 0) parts.push(t("summary.moveLeft", { value: Math.abs(dx) }));
        if (dx > 0) parts.push(t("summary.moveRight", { value: dx }));
        if (dy < 0) parts.push(t("summary.moveUp", { value: Math.abs(dy) }));
        if (dy > 0) parts.push(t("summary.moveDown", { value: dy }));
        return parts;
      }

      function buildSummaries() {
        const rows = [];
        Object.entries(ELEMENTS).forEach(([id, config]) => {
          Object.keys(DEVICE_SIZES).forEach(device => {
            const now = state.edits[id][device];
            const base = defaults[id][device];
            const changed = changedProps(id, device);
            if (!changed.length) return;

            const parts = movementParts(now, base);
            if (changed.includes("scale")) parts.push(t("summary.scale", { direction: t(now.scale >= 1 ? "summary.enlarge" : "summary.shrink"), value: Math.round(now.scale * 100) }));
            if (changed.includes("fontSize")) parts.push(t("summary.fontSize", { value: now.fontSize }));
            if (changed.includes("fontFamily")) {
              const fontName = t(`font.${now.fontFamily}`);
              parts.push(t("summary.font", { value: fontName }));
            }
            if (changed.includes("color")) parts.push(t("summary.color", { value: now.color.toUpperCase() }));
            if (changed.includes("background")) parts.push(t("summary.background", { value: now.background.toUpperCase() }));
            if (changed.includes("radius")) parts.push(t("summary.radius", { value: now.radius }));
            if (changed.includes("shadow")) parts.push(t(now.shadow ? "summary.shadowOn" : "summary.shadowOff"));
            if (changed.includes("imageSrc")) {
              parts.push(now.imageSrc ? t("summary.imageChanged", { file: now.imageName || t("image.unnamed") }) : t("summary.imageRemoved"));
            }
            if (changed.includes("imageFit")) {
              parts.push(t(now.imageFit === "contain" ? "summary.imageContain" : "summary.imageCover"));
            }

            rows.push({
              id,
              device,
              label: elementText(id, "label"),
              text: parts.join(state.language === "en" ? ", " : "、")
            });
          });
        });
        return rows;
      }

      function renderChangeSummary() {
        const summaries = buildSummaries();
        updateAdjustmentLogButton(summaries.length);
        dom.undoButton.disabled = state.history.length === 0;
        dom.redoButton.disabled = state.future.length === 0;
      }

      function describeLatestChange(id, before, after) {
        const config = localizedElementConfig(id);
        const devices = getScopedDevices();
        const deviceText = devices.length === 3 ? t("inspector.allSizes") : t(DEVICE_KEYS[devices[0]]);
        const changedLabels = [];
        const labelMap = {
          x: "inspector.x",
          y: "inspector.y",
          scale: "inspector.scale",
          fontSize: "inspector.fontSize",
          fontFamily: "inspector.fontStyle",
          color: "inspector.color",
          background: "inspector.background",
          radius: "inspector.radius",
          shadow: "inspector.shadow",
          imageSrc: "inspector.image",
          imageFit: "inspector.imageFit"
        };

        Object.keys(after[id][devices[0]]).forEach(prop => {
          const didChange = devices.some(device => before[id][device][prop] !== after[id][device][prop]);
          if (didChange && labelMap[prop]) changedLabels.push(t(labelMap[prop]));
        });
        return t("summary.adjust", {
          device: deviceText,
          label: config.label,
          changes: changedLabels.join(state.language === "en" ? ", " : "、") || t("summary.appearance")
        });
      }

      function commitSnapshot(before, description) {
        const after = clone(state.edits);
        if (shallowEqual(before, after)) return;
        state.history.push({ before, after, description });
        if (state.history.length > 80) state.history.shift();
        state.future = [];
        renderChangeSummary();
      }

      function undo() {
        if (state.mode === "start") return;
        if (state.mode === "import") {
          undoImport();
          return;
        }
        const entry = state.history.pop();
        if (!entry) return;
        state.future.push(entry);
        state.edits = clone(entry.before);
        applyAllStyles();
        renderInspector();
        renderChangeSummary();
        showToast(t("toast.undoGeneric"));
      }

      function redo() {
        if (state.mode === "start") return;
        if (state.mode === "import") {
          redoImport();
          return;
        }
        const entry = state.future.pop();
        if (!entry) return;
        state.history.push(entry);
        state.edits = clone(entry.after);
        applyAllStyles();
        renderInspector();
        renderChangeSummary();
        showToast(t("toast.redoGeneric"));
      }

      function beginControlChange() {
        if (!state.controlStart) state.controlStart = clone(state.edits);
      }

      function handleControlInput(event) {
        const control = event.currentTarget;
        const prop = control.dataset.control;
        beginControlChange();

        let value;
        if (control.type === "checkbox") value = control.checked;
        else if (prop === "scale") value = Number(control.value) / 100;
        else if (["x", "y", "fontSize", "radius"].includes(prop)) value = Number(control.value);
        else value = control.value;

        applyProperty(prop, value);
        applyAllStyles();
        renderInspector();
        renderChangeSummary();
      }

      function finishControlChange() {
        if (!state.controlStart) return;
        const before = state.controlStart;
        state.controlStart = null;
        commitSnapshot(before, describeLatestChange(state.selected, before, state.edits));
      }

      function nudge(prop, amount) {
        const before = clone(state.edits);
        getScopedDevices().forEach(device => {
          const current = state.edits[state.selected][device][prop];
          state.edits[state.selected][device][prop] = clamp(current + amount, -100, 100);
        });
        commitSnapshot(before, t("summary.nudge", {
          device: state.scope === "all" ? t("inspector.allSizes") : deviceLabel(),
          label: getSelectedConfig().label
        }));
        applyAllStyles();
        renderInspector();
      }

      function startGesture(event, type) {
        if (event.button != null && event.button !== 0) return;
        event.preventDefault();
        event.stopPropagation();

        const devices = getScopedDevices();
        const startValues = {};
        devices.forEach(device => {
          startValues[device] = clone(state.edits[state.selected][device]);
        });

        state.gesture = {
          type,
          pointerId: event.pointerId,
          startClientX: event.clientX,
          startClientY: event.clientY,
          devices,
          startValues,
          before: clone(state.edits),
          moved: false
        };

        dom.page.classList.add("is-manipulating");
        window.addEventListener("pointermove", moveGesture, { passive: false });
        window.addEventListener("pointerup", finishGesture, { once: true });
        window.addEventListener("pointercancel", finishGesture, { once: true });
      }

      function moveGesture(event) {
        const gesture = state.gesture;
        if (!gesture || event.pointerId !== gesture.pointerId) return;
        event.preventDefault();

        const dx = (event.clientX - gesture.startClientX) / state.renderScale;
        const dy = (event.clientY - gesture.startClientY) / state.renderScale;
        if (Math.abs(dx) + Math.abs(dy) > 1) gesture.moved = true;

        gesture.devices.forEach(device => {
          const start = gesture.startValues[device];
          const props = state.edits[state.selected][device];
          if (gesture.type === "drag") {
            props.x = clamp(Math.round(start.x + dx), -100, 100);
            props.y = clamp(Math.round(start.y + dy), -100, 100);
          } else {
            const delta = (dx + dy) / 210;
            props.scale = clamp(Math.round((start.scale + delta) * 100) / 100, 0.6, 1.7);
          }
        });

        applyAllStyles();
        renderInspector();
        renderChangeSummary();
      }

      function finishGesture(event) {
        const gesture = state.gesture;
        if (!gesture) return;
        if (event && event.pointerId != null && event.pointerId !== gesture.pointerId) return;

        window.removeEventListener("pointermove", moveGesture);
        dom.page.classList.remove("is-manipulating");
        state.gesture = null;

        if (gesture.moved) {
          const action = t(gesture.type === "drag" ? "summary.drag" : "summary.resize");
          commitSnapshot(
            gesture.before,
            t("summary.gesture", {
              device: gesture.devices.length === 3 ? t("inspector.allSizes") : deviceLabel(),
              label: getSelectedConfig().label,
              action
            })
          );
        }
      }

      function resetSelected() {
        const before = clone(state.edits);
        getScopedDevices().forEach(device => {
          state.edits[state.selected][device] = clone(defaults[state.selected][device]);
        });
        commitSnapshot(
          before,
          t("summary.restore", {
            device: state.scope === "all" ? t("inspector.allSizes") : deviceLabel(),
            label: getSelectedConfig().label
          })
        );
        applyAllStyles();
        renderInspector();
        showToast(t("toast.resetOne", { label: getSelectedConfig().label }));
      }

      function resetAll() {
        if (shallowEqual(state.edits, defaults)) {
          showToast(t("toast.nothingToReset"));
          return;
        }
        const before = clone(state.edits);
        state.edits = clone(defaults);
        commitSnapshot(before, t("summary.clearAll"));
        applyAllStyles();
        renderInspector();
        showToast(t("toast.resetAll"));
      }

      function handleImageUpload(event) {
        const file = event.currentTarget.files && event.currentTarget.files[0];
        event.currentTarget.value = "";
        if (!file) return;

        if (!file.type.startsWith("image/")) {
          showToast(t("toast.notImage"));
          return;
        }
        if (file.size > 20 * 1024 * 1024) {
          showToast(t("toast.imageSize"));
          return;
        }

        const before = clone(state.edits);
        const objectUrl = URL.createObjectURL(file);
        objectUrls.add(objectUrl);
        getScopedDevices().forEach(device => {
          state.edits.photo[device].imageSrc = objectUrl;
          state.edits.photo[device].imageName = file.name;
        });

        commitSnapshot(
          before,
          t("summary.gesture", {
            device: state.scope === "all" ? t("inspector.allSizes") : deviceLabel(),
            label: elementText("photo", "label"),
            action: t("summary.imageChanged", { file: file.name })
          })
        );
        applyAllStyles();
        renderInspector();
        showToast(t("toast.imageChanged", { file: file.name }));
      }

      function removeImage() {
        const before = clone(state.edits);
        getScopedDevices().forEach(device => {
          state.edits.photo[device].imageSrc = "";
          state.edits.photo[device].imageName = "";
        });
        commitSnapshot(
          before,
          t("summary.gesture", {
            device: state.scope === "all" ? t("inspector.allSizes") : deviceLabel(),
            label: elementText("photo", "label"),
            action: t("summary.imageRemoved")
          })
        );
        applyAllStyles();
        renderInspector();
        showToast(t("toast.imageRemoved"));
      }

      function switchDevice(device) {
        if (state.mode !== "demo") return;
        if (!DEVICE_SIZES[device]) return;
        state.device = device;
        dom.page.dataset.device = device;
        document.querySelectorAll("[data-device-button]").forEach(button => {
          button.setAttribute("aria-pressed", String(button.dataset.deviceButton === device));
        });
        applyAllStyles();
        renderInspector();
        fitCanvas();
      }

      function renderSummaryModal() {
        const summaries = state.mode === "import" ? buildImportSummaries() : buildSummaries();
        dom.summaryContent.replaceChildren();

        if (!summaries.length) {
          const empty = document.createElement("div");
          empty.className = "empty-summary";
          empty.textContent = t("summary.empty");
          dom.summaryContent.appendChild(empty);
          return;
        }

        const list = document.createElement("ul");
        list.className = "summary-list";
        summaries.forEach(summary => {
          const item = document.createElement("li");
          item.className = "summary-item";
          const device = document.createElement("span");
          device.className = "summary-device";
          device.textContent = summary.device === "import" ? t("summary.import") : t(DEVICE_KEYS[summary.device]);
          const text = document.createElement("span");
          text.textContent = `${summary.label}${state.language === "en" ? ": " : "："}${summary.text}`;
          item.append(device, text);
          list.appendChild(item);
        });
        dom.summaryContent.appendChild(list);
      }

      function openModal(modal, trigger) {
        if (modal === dom.summaryModal) renderSummaryModal();
        state.lastModalTrigger = trigger || document.activeElement;
        modal.hidden = false;
        document.body.style.overflow = "hidden";
        const dialog = modal.querySelector('[role="dialog"]');
        requestAnimationFrame(() => {
          if (!dialog) return;
          dialog.focus({ preventScroll: true });
          dialog.scrollTop = 0;
        });
      }

      function closeModal(modal) {
        modal.hidden = true;
        document.body.style.overflow = "";
        if (state.lastModalTrigger && typeof state.lastModalTrigger.focus === "function") {
          state.lastModalTrigger.focus();
        }
        state.lastModalTrigger = null;
      }

      let toastTimer = null;
      function showToast(message) {
        clearTimeout(toastTimer);
        dom.toast.textContent = message;
        dom.toast.classList.add("is-visible");
        toastTimer = setTimeout(() => dom.toast.classList.remove("is-visible"), 2200);
      }

      function handleEditablePointerDown(event) {
        const editable = event.target.closest("[data-editable]");
        if (!editable || !dom.page.contains(editable)) return;
        const id = editable.dataset.editable;
        selectElement(id);
        startGesture(event, "drag");
      }

      function handleEditableKeyDown(event) {
        const editable = event.target.closest("[data-editable]");
        if (!editable) return;
        const keyMap = {
          ArrowLeft: ["x", -1],
          ArrowRight: ["x", 1],
          ArrowUp: ["y", -1],
          ArrowDown: ["y", 1]
        };
        if (!keyMap[event.key]) return;
        event.preventDefault();
        selectElement(editable.dataset.editable);
        const [prop, baseAmount] = keyMap[event.key];
        nudge(prop, baseAmount * (event.shiftKey ? 8 : 1));
      }

      const controlElements = [
        dom.xControl,
        dom.yControl,
        dom.scaleControl,
        dom.fontSizeControl,
        dom.fontFamilyControl,
        dom.colorControl,
        dom.backgroundControl,
        dom.radiusControl,
        dom.shadowControl,
        dom.imageFitControl
      ];

      controlElements.forEach(control => {
        control.addEventListener("focus", beginControlChange);
        control.addEventListener("pointerdown", beginControlChange);
        control.addEventListener("input", handleControlInput);
        control.addEventListener("change", finishControlChange);
        control.addEventListener("blur", finishControlChange);
      });

      const importControlElements = [...dom.importEditControls.querySelectorAll("[data-import-control]")];

      importControlElements.forEach(control => {
        control.addEventListener("focus", beginImportControlChange);
        control.addEventListener("pointerdown", beginImportControlChange);
        control.addEventListener("input", handleImportControlInput);
        control.addEventListener("change", finishImportControlChange);
        control.addEventListener("blur", finishImportControlChange);
      });

      dom.importResetTargetButton.addEventListener("click", resetSelectedImportTarget);

      dom.importTargetControl.addEventListener("change", () => {
        const session = state.importSession;
        const record = session?.selectedRuntimeId ? session.registry.get(session.selectedRuntimeId) : null;
        const element = session?.selectedRuntimeId ? getImportElement(session.selectedRuntimeId) : null;
        if (!session || !record || !element) return;
        if (dom.importTargetControl.value.startsWith("ancestor:")) {
          const ancestorRuntimeId = dom.importTargetControl.value.slice(9);
          const ancestorRecord = session.registry.get(ancestorRuntimeId);
          const ancestorElement = getImportElement(ancestorRuntimeId);
          if (ancestorRecord && ancestorElement) renderImportSelection(ancestorRecord, ancestorElement);
          return;
        }
        session.selectedTextIndex = dom.importTargetControl.value.startsWith("text:")
          ? Number(dom.importTargetControl.value.slice(5))
          : null;
        renderImportSelection(record, element, { preserveTarget: true });
      });

      document.querySelectorAll("[data-nudge]").forEach(button => {
        button.addEventListener("click", () => {
          nudge(button.dataset.nudge, Number(button.dataset.amount));
        });
      });

      document.querySelectorAll("[data-device-button]").forEach(button => {
        button.addEventListener("click", () => switchDevice(button.dataset.deviceButton));
      });

      document.querySelectorAll('input[name="scope"]').forEach(input => {
        input.addEventListener("change", () => {
          state.scope = input.value;
          renderInspector();
        });
      });

      dom.zoomSelect.addEventListener("change", () => {
        state.zoom = Number(dom.zoomSelect.value);
        fitCanvas();
      });

      dom.page.addEventListener("pointerdown", handleEditablePointerDown);
      dom.page.addEventListener("keydown", handleEditableKeyDown);
      dom.page.addEventListener("click", event => {
        if (event.target.closest("button, nav")) event.preventDefault();
      });

      dom.resizeHandle.addEventListener("pointerdown", event => startGesture(event, "resize"));
      dom.imageUpload.addEventListener("change", handleImageUpload);
      dom.removeImageButton.addEventListener("click", removeImage);
      dom.photoImage.addEventListener("load", () => requestAnimationFrame(updateOverlay));
      dom.startImportButton.addEventListener("click", () => dom.htmlImportInput.click());
      dom.htmlImportInput.addEventListener("change", handleHtmlImport);
      dom.exportHtmlButton.addEventListener("click", downloadImportStaticExport);
      dom.startDemoButton.addEventListener("click", enterSampleMode);
      dom.returnStartButton.addEventListener("click", requestReturnToStart);
      dom.confirmReturnStartButton.addEventListener("click", () => {
        closeModal(dom.returnConfirmModal);
        returnToStart();
      });
      dom.importPreviewFrame.addEventListener("load", connectImportPreview);
      dom.undoButton.addEventListener("click", undo);
      dom.redoButton.addEventListener("click", redo);
      dom.resetElementButton.addEventListener("click", resetSelected);
      dom.resetAllButton.addEventListener("click", resetAll);
      dom.summaryButton.addEventListener("click", event => openModal(dom.summaryModal, event.currentTarget));
      dom.languageButton.addEventListener("click", () => {
        applyLanguage(state.language === "zh-TW" ? "en" : "zh-TW");
      });
      dom.helpButton.addEventListener("click", event => openModal(dom.helpModal, event.currentTarget));

      document.querySelectorAll("[data-close-modal]").forEach(button => {
        button.addEventListener("click", () => {
          const modal = document.getElementById(button.dataset.closeModal);
          if (modal) closeModal(modal);
        });
      });

      [dom.summaryModal, dom.returnConfirmModal, dom.helpModal].forEach(modal => {
        modal.addEventListener("pointerdown", event => {
          if (event.target === modal) closeModal(modal);
        });
      });

      document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
          const openModalElement = [dom.summaryModal, dom.returnConfirmModal, dom.helpModal].find(modal => !modal.hidden);
          if (openModalElement) closeModal(openModalElement);
        }
        if ((event.ctrlKey || event.metaKey) && !event.shiftKey && event.key.toLowerCase() === "z") {
          event.preventDefault();
          undo();
        }
        if ((event.ctrlKey || event.metaKey) && (event.key.toLowerCase() === "y" || (event.shiftKey && event.key.toLowerCase() === "z"))) {
          event.preventDefault();
          redo();
        }
      });

      let resizeFrame = 0;
      let lastWorkbenchBorderBox = { width: 0, height: 0 };
      const resizeObserver = new ResizeObserver(entries => {
        const entry = entries[0];
        const borderBox = Array.isArray(entry.borderBoxSize)
          ? entry.borderBoxSize[0]
          : entry.borderBoxSize;
        const rect = borderBox
          ? { width: borderBox.inlineSize, height: borderBox.blockSize }
          : entry.target.getBoundingClientRect();

        if (
          Math.abs(rect.width - lastWorkbenchBorderBox.width) < 0.5 &&
          Math.abs(rect.height - lastWorkbenchBorderBox.height) < 0.5
        ) {
          return;
        }

        lastWorkbenchBorderBox = { width: rect.width, height: rect.height };
        window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(fitCanvas);
      });
      resizeObserver.observe(dom.workbench);
      window.addEventListener("resize", () => {
        window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(() => {
          fitCanvas();
          updateOverlay();
        });
      });
      window.addEventListener("beforeunload", () => {
        objectUrls.forEach(url => URL.revokeObjectURL(url));
      });

      returnToStart();
      applyLanguage(initialLanguage);
    })();
