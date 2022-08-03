# 我的餐廳清單

## 產品功能

1. 使用者可以查看餐廳相關資訊（可查看餐廳位置、詳細資訊、電話等）
2. 使用者可以輸入關鍵字並依照自訂條件搜尋
3. 使用者可以新增餐廳
4. 使用者新增餐廳輸入名稱可以看到 google 自動推薦
5. 使用自動推薦可以自動填入相關資訊
6. 使用者可以編輯餐廳資料
7. 使用者可以刪除餐廳資料


## 環境建置

1. node.js
2. Express.js
3. google map api
4. google place api
6. handlebars
7. bootstraps

## 專案安裝

1. 將此專案 clone 至本機  
   `git clone https://github.com/art787472/2-3_A1Q1_Restaurants.git`
2. 進入存放專案的資料夾  
   `cd 2-3_A1Q1_Restaurants`
3. 安裝 npm 套件  
   `npm install`
4. 在目錄中建立 .env 檔案，根據 .env.example 格式，將 api 金鑰及 mogonDB 相關資訊填入。注意不須中括號也不用引號。  
   `假設 API 金鑰為：sdna31451lkfut2hnHIHwerulg3`  
   `API_KEY=sdna31451lkfut2hnHIHwerulg3`
5. 終端機輸入 npm run dev  
   `npm run dev`
6. 若要瀏覽種子資料在終端機輸入  
   `npm run dev`
7. 在瀏覽器輸入 http://localhost:3000
