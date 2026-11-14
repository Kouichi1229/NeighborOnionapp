# 隔壁老洋（NeighborOnionapp）

**數位之星競賽第三名｜農業氣象資訊與洋蔥栽培提醒應用**

線上展示：[NeighborOnionapp](https://kouichi1229.github.io/NeighborOnionapp/app.html)

「隔壁老洋」的原始構想並非作者提出；作者是在專案後期加入，主要參與既有構想的技術實作，嘗試將團隊已有的方向轉化為可使用的資訊應用。專案以屏東恆春洋蔥栽培情境為背景，將天氣預報、栽培提醒、特殊警報及洋蔥價格資訊整合在手機友善的網頁介面中。專案由三個 Repository 組成：靜態前端、FastAPI 資料 API，以及 Streamlit 管理輸入介面。

## 競賽背景與成果

依作者補充，這個專案也曾以「隔壁老洋」參與民生公共物聯網黑客松提案，並通過提案階段；作者並非原始構想提出者，而是在後續加入並參與實作。另依作者提供的獎狀資訊，團隊後續以「天好運」參與 2022 年第二屆 T 大使「數位之星」競賽，獲得實作組「最佳實踐家獎」第三名。獎狀列出的團隊成員為王意淇、邱宣文、許珮嘉、葉素芳、蔣承翰，指導單位為天氣風險與管理開發有限公司。此處記錄的是團隊競賽成果，不代表將所有系統程式工作歸於單一成員。

## 系統功能

- **天氣資訊：** 串接 WeatherRisk 的恆春鄉 168 小時天氣預報 API，呈現目前天氣及未來五個時段的天氣圖示。
- **農務提醒：** 依預報資料中的溫度、降雨機率與風向，產生溫度、雨量及風向提醒文字。
- **栽植期資訊：** 提供洋蔥栽培期間的溫度與雨量提醒內容。
- **特殊警報：** 以頁籤呈現農務警報資訊。
- **洋蔥價格資訊：** 以表格及圖片呈現價格預測與歷史價格視覺資料。現有 HTML 顯示的是寫定的數值與圖片，不能據此認定瀏覽器會即時計算價格預測模型。

## 三個 Repository 的分工

| Repository | 職責 | 技術 |
|---|---|---|
| [NeighborOnionapp](https://github.com/Kouichi1229/NeighborOnionapp) | 使用者端展示網站 | HTML、CSS、JavaScript、jQuery、Bootstrap、Google Charts loader |
| [API-client-NeighborOnionapp](https://github.com/Kouichi1229/API-client-NeighborOnionapp) | REST API、資料驗證及資料庫存取 | Python、FastAPI、Pydantic、SQLAlchemy、SQLite |
| [Api-Post-NeighborOnionapp](https://github.com/Kouichi1229/Api-Post-NeighborOnionapp) | 管理者輸入栽植提醒與警報 | Python、Streamlit、Requests |

系統架構及 API 資料流詳見 [SYSTEM_ARCHITECTURE.md](SYSTEM_ARCHITECTURE.md)；技術經歷與可佐證能力詳見 [PROJECT_RETROSPECTIVE.md](PROJECT_RETROSPECTIVE.md)。

## 技術經驗

本專案可呈現的實作經驗包括：

- 以 HTML、CSS、JavaScript 建置響應式網頁資訊介面。
- 使用 JavaScript XMLHttpRequest 與 jQuery AJAX 串接第三方天氣 API，解析 JSON 並更新 DOM。
- 依天氣數值與條件判斷切換溫度、天氣圖示及農務提醒文字。
- 使用 Python、FastAPI 建立 GET／POST API。
- 使用 Pydantic schema 驗證請求資料，並以 SQLAlchemy ORM 操作 SQLite。
- 使用 Streamlit 建立資料輸入表單，透過 HTTP POST 將管理資料送至後端。

## 專案範圍與已知限制

本 Repository 及相關子專案是歷史作品紀錄，文件依目前可讀取的原始碼整理，並未宣稱已重新部署或完成現況端到端測試。

- 前端天氣請求透過公開的 CORS proxy（cors-anywhere）轉送，存在第三方服務可用性與安全性依賴；不應視為正式部署的穩定代理架構。
- 天氣判斷程式有變數名稱不一致等潛在執行問題，且尚未以完整預報資料重新驗證。
- 價格頁面中的預測數字與圖表以靜態 HTML 資料呈現；目前讀取的前端程式沒有證據顯示它會即時執行價格預測模型。
- 管理輸入表單中的日期欄位目前沒有放入 POST payload。
- API 後端的預約資料 CRUD 路徑存在欄位名稱與 ORM model 不一致的問題；目前前端管理表單也沒有呼叫預約端點。
- API 的 CORS allowlist 僅列出 localhost 網址；管理介面目前以伺服器端 Requests 呼叫 API，並非瀏覽器跨網域請求。

## 歷史展示畫面

以下圖片保留原始 README 的專案截圖：

![系統畫面 1](https://user-images.githubusercontent.com/24285484/159661346-7d0cc7de-f405-474f-8831-6b47e7a2c617.png)

![系統畫面 2](https://user-images.githubusercontent.com/24285484/159661380-83844e0c-5382-4f6a-b908-50738796fab5.png)

![系統畫面 3](https://user-images.githubusercontent.com/24285484/159661420-8fc4af54-b6d1-49f4-bf32-2d7cfdf9c7cc.png)

![系統畫面 4](https://user-images.githubusercontent.com/24285484/159661442-52eb0616-70ec-4c8e-bc87-0e02b39a9f38.png)

![系統畫面 5](https://user-images.githubusercontent.com/24285484/159661469-795ac2c7-b8ba-4dc5-bb44-f3ec98e0c688.png)

![系統畫面 6](https://user-images.githubusercontent.com/24285484/159661506-f6fdc42c-ae0b-4ff0-a9cd-5aae7aeceb2a.png)

---

**專案定位：** 農業氣象資訊整合、前端 API 串接、Python REST API 與管理端資料輸入應用。
