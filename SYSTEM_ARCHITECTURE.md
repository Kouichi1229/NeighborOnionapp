# 隔壁老洋系統架構與資料流程

本文依目前可讀取的三個 GitHub Repository 原始碼整理。此文件描述程式中可辨識的設計，不代表目前外部 API、託管服務或舊部署網址仍可正常使用。

## 1. 系統組成

```text
使用者
  |
  v
NeighborOnionapp（靜態 HTML / CSS / JavaScript）
  |                         |
  |                         +--> WeatherRisk 168hr township forecast API
  |                              （經 cors-anywhere proxy）
  |
  +--> 顯示天氣、五日圖示、農務提醒、價格資訊
                                
管理者
  |
  v
Api-Post-NeighborOnionapp（Streamlit 表單）
  |
  | HTTP POST + JSON
  v
API-client-NeighborOnionapp（FastAPI）
  |
  v
Pydantic schema 驗證
  |
  v
CRUD functions / SQLAlchemy ORM
  |
  v
SQLite（sql_app.db）
```

前端展示網站與管理端 API 是兩條不同的資料路徑：展示網站直接呼叫第三方天氣 API；Streamlit 管理端則把栽植期文字與警報文字送往自建 FastAPI。

## 2. 前端展示網站

主要檔案：
- `app.html`：頁面結構與三個主要頁籤（天氣、提醒、價格）。
- `js/w_Api.js`：天氣 API 請求、JSON 解析、圖示切換與農務提醒判斷。
- `js/app.js`：依瀏覽器日期更新星期、月份、日期及五日標籤。
- `css/`、`images/`：樣式與圖示資源。

### 天氣 API 流程

1. `getWeather()` 以 XMLHttpRequest 發送 GET 請求。
2. 請求目標為 WeatherRisk 的恆春鄉 168 小時預報端點，並經 cors-anywhere 轉送。
3. 成功回應後解析 JSON 的 `data` 陣列。
4. 以索引 30 作為目前畫面使用的預報資料，並以 30、54、78、102、126 等索引更新五個後續時段圖示。
5. 依溫度、天氣現象及降雨量選擇圖示；另依溫度、降雨機率及風向更新農務提醒文字。

**程式限制：** 目前程式使用固定陣列索引，未見對 API 回傳長度、缺漏欄位或時間序列排序進行防護；`imgChange()` 內使用了未在該函式定義的 `wx_value`，這是可由原始碼辨識的潛在錯誤。此處僅記錄，不在本次文件整理中修改歷史程式。

### 價格頁面

`app.html` 的價格區塊直接包含「2022.01」預測價格 18.47、去年同月價格、前月價格，以及兩張圖表圖片。就目前檢視到的前端 HTML／JavaScript，沒有發現價格模型推論或動態讀取預測結果的流程。因此只能描述為價格預測結果展示介面，不能將其描述為前端即時建模功能。

## 3. 管理者輸入介面

Repository：`Api-Post-NeighborOnionapp`

主要檔案：`app.py`

使用 Streamlit sidebar selectbox 切換兩個表單：

- **栽植期：** 輸入溫度注意事項及雨量注意事項，呼叫 `POST /plant`。
- **預警報：** 輸入警報文字，呼叫 `POST /aler`。

程式使用 Requests 傳送 JSON 字串，成功時顯示成功訊息並呈現 API 回應。

日期欄位由 `st.date_input` 產生，但目前組成的 payload 沒有包含 `update_time`，故不能宣稱日期已被儲存至資料庫。表單送出的欄位目前分別為 `temp`、`rain` 及 `aler`。

## 4. FastAPI 後端

Repository：`API-client-NeighborOnionapp`

主要模組：

| 檔案 | 職責 |
|---|---|
| `sql_app/main.py` | 建立 FastAPI app、註冊 CORS、定義路由與 DB dependency |
| `sql_app/database.py` | 建立 SQLite engine、SessionLocal、Base |
| `sql_app/models.py` | 定義 SQLAlchemy 資料表 |
| `sql_app/schemas.py` | 定義 Pydantic 請求與回應資料結構 |
| `sql_app/crud.py` | 封裝資料查詢、新增及預約衝突檢查 |

### 資料表

- `users`：`p_id` 主鍵、`temp`、`rain`。
- `rooms`：`a_id` 主鍵、`aler`。
- `bookings`：`booking_id` 主鍵、`p_id`、`a_id`、`booked_num`、`start_datetime`、`end_datetime`。

資料庫連線字串為 `sqlite:///./sql_app.db`，並設定 `check_same_thread=False`。應用啟動模組匯入時呼叫 `models.Base.metadata.create_all(bind=engine)` 建立資料表。

### API 路由

| Method | Path | 用途 |
|---|---|---|
| GET | `/plant` | 讀取栽植期提醒資料 |
| POST | `/plant` | 新增溫度與雨量提醒 |
| GET | `/aler` | 讀取警報資料 |
| POST | `/aler` | 新增警報文字 |
| GET | `/bookings` | 讀取預約資料 |
| POST | `/bookings` | 新增預約資料 |

讀取路由支援 `skip` 與 `limit` 分頁參數。資料庫 session 透過 FastAPI `Depends(get_db)` 注入，並在 dependency 結束時關閉。

## 5. 可辨識的資料流

### 栽植期提醒

```text
Streamlit temp / rain fields
  -> POST /plant
  -> UserCreate schema
  -> crud.create_user()
  -> SQLAlchemy User model
  -> SQLite users table
```

### 預警報

```text
Streamlit aler field
  -> POST /aler
  -> RoomCreate schema
  -> crud.create_room()
  -> SQLAlchemy Room model
  -> SQLite rooms table
```

### 預約功能

後端定義了 Booking model、schema、GET/POST routes，以及同一會議室的時間重疊檢查邏輯；但目前讀取到的管理端表單沒有呼叫 `/bookings`。此外，預約新增函式的 ORM 欄位名稱與 model 不一致（見下一節），因此不應描述為已驗證可用的預約功能。

## 6. 原始碼中辨識出的限制（未在本次修復）

1. **預約 ORM 欄位不一致：** `Booking` model 欄位是 `p_id`、`a_id`，但 `crud.create_booking()` 建立物件時傳入 `user_id`、`room_id`。這與 model 定義不一致，可能造成新增預約失敗。
2. **預約外鍵設定：** `p_id`、`a_id` 欄位宣告 `ondelete='SET NULL'`，同時設定 `nullable=False`；資料庫刪除行為與非空限制存在設計衝突。
3. **預約 schema／CRUD 型別：** CRUD 新增函式的型別標註使用回應 schema（如 `schemas.Booking`），而非專用的 Create schema；路由實際傳入的是 Create schema。這會降低型別標註的精確度。
4. **CORS allowlist：** 後端只列出數個 localhost origins，未包含 GitHub Pages 網域。這不影響 Streamlit 後端伺服器直接以 Requests 呼叫 API 的一般流程，但若改成瀏覽器直接跨網域呼叫，需重新設定。
5. **前端第三方代理依賴：** 天氣 API 經 cors-anywhere 代理；代理可用性、限制及安全性不由本專案控制。
6. **表單日期未送出：** Streamlit 表單有日期輸入，但 POST payload 未包含日期欄位。
7. **錯誤處理有限：** Streamlit 端主要檢查 HTTP 200，未見完整的 timeout、連線錯誤及非 JSON 回應處理。

## 7. 驗證界線

本文件屬原始碼考古與技術經歷整理。沒有重新部署舊 Heroku 服務、呼叫歷史第三方天氣 API、檢查雲端資料庫狀態，亦未完成端到端測試。程式碼存在某個路由或流程，只能證明曾經設計／實作該路徑，不等於目前服務仍可用。
