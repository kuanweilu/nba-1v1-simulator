# NBA 1v1 模擬器 - 產品需求規格 (PRP)

## 專案概述
建立一個網站，讓使用者可以選擇兩位 NBA 歷史球員進行 1v1 模擬對決 100 場，並展示預測結果與詳細分析。

## 技術選型
- **前端**: React + TypeScript + Vite
- **UI框架**: Tailwind CSS
- **數據**: 內建 50 位 NBA 歷史傳奇球員數據
- **模擬引擎**: Monte Carlo 模擬法

---

## 核心功能

### 1. 球員選擇介面
- 左右兩側各有一個球員選擇下拉選單
- 顯示球員基本資訊（姓名、位置、年代）
- 選擇後顯示球員詳細數據卡片

### 2. 球員數據卡片
顯示以下屬性（1-99評分）：
- **進攻能力 (Offense)**: 得分技巧、進攻手段多樣性
- **防守能力 (Defense)**: 單防能力、防守意識
- **運動能力 (Athleticism)**: 速度、彈跳、爆發力
- **技術 (Skill)**: 控球、腳步、假動作
- **身體素質 (Physical)**: 身高、體重、力量
- **心理素質 (Clutch)**: 關鍵時刻表現

### 3. 模擬引擎
使用 Monte Carlo 方法模擬 100 場 1v1 對決：

#### 單場模擬邏輯
- 每場比賽打到 11 分（需贏 2 分）
- 交替進攻，進攻方有得分機會
- 得分機率計算：
  ```
  進攻成功率 = (進攻方攻擊力 * 0.4 + 技術 * 0.3 + 身體 * 0.2 + clutch * 0.1)
               / (進攻方攻擊力 + 防守方防守力)
  ```
- 考慮身高差異加成（每英寸 ±1.5%）

### 4. 結果展示
- **勝負比例**: Player A 贏 X 場 vs Player B 贏 Y 場
- **勝率圓餅圖**: 視覺化勝負比例
- **詳細分析**: 為什麼這位球員會贏的原因分析
  - 優勢對比
  - 關鍵差異點
  - 模擬細節統計

### 5. 分析報告生成
自動產生文字分析，包含：
- 兩位球員的優劣勢比較
- 關鍵制勝因素
- 模擬數據統計（平均得分、最大勝分等）

---

## 球員數據庫 (50位傳奇球員)

包含各年代頂尖球員：
- 60-70s: Wilt Chamberlain, Bill Russell, Kareem Abdul-Jabbar, Jerry West, Oscar Robertson
- 80s: Magic Johnson, Larry Bird, Isiah Thomas, Moses Malone, Dominique Wilkins
- 90s: Michael Jordan, Scottie Pippen, Hakeem Olajuwon, Charles Barkley, John Stockton, Karl Malone, David Robinson, Patrick Ewing, Gary Payton, Reggie Miller
- 2000s: Kobe Bryant, Shaquille O'Neal, Tim Duncan, Allen Iverson, Kevin Garnett, Dirk Nowitzki, Steve Nash, Jason Kidd, Tracy McGrady, Vince Carter, Ray Allen, Paul Pierce
- 2010s: LeBron James, Kevin Durant, Stephen Curry, James Harden, Russell Westbrook, Chris Paul, Kawhi Leonard, Anthony Davis, Dwyane Wade, Kyrie Irving
- 2020s: Giannis Antetokounmpo, Luka Doncic, Jayson Tatum, Joel Embiid, Nikola Jokic

---

## UI/UX 設計

### 頁面佈局
```
+------------------------------------------+
|            NBA 1v1 模擬器                 |
+------------------------------------------+
|  [球員A選擇]            [球員B選擇]       |
|  +----------+          +----------+      |
|  | 球員卡片A |    VS    | 球員卡片B |      |
|  | 照片     |          | 照片     |      |
|  | 數據條   |          | 數據條   |      |
|  +----------+          +----------+      |
+------------------------------------------+
|         [ 開始模擬 100 場 ]               |
+------------------------------------------+
|              模擬結果                     |
|  +------------------------------------+  |
|  | 勝負比例圖 | 詳細分析               |  |
|  +------------------------------------+  |
+------------------------------------------+
```

### 配色方案
- 主色: 深藍 (#1a365d) - NBA 官方色調
- 強調色: 橘紅 (#ed8936) - 籃球色
- 背景: 深灰 (#1a202c) - 運動風格
- 文字: 白色 (#ffffff)

---

## 檔案結構
```
nba-1v1-simulator/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── components/
│   │   ├── PlayerSelector.tsx
│   │   ├── PlayerCard.tsx
│   │   ├── SimulationResult.tsx
│   │   └── AnalysisReport.tsx
│   ├── data/
│   │   └── players.ts
│   ├── utils/
│   │   └── simulation.ts
│   └── types/
│       └── index.ts
```

---

## 驗收標準
1. ✅ 可以選擇任意兩位球員
2. ✅ 點擊按鈕後執行 100 場模擬
3. ✅ 顯示勝負比例與視覺化圖表
4. ✅ 生成合理的分析報告說明勝負原因
5. ✅ 響應式設計，支援手機與桌面
6. ✅ 網站可正常啟動運行
