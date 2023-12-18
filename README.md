# [Alpha Camp] Dev C4 後端 - 餐廳清單
此專案延伸至[Dev C3 - M3 指標作業：打造餐廳清單](https://github.com/JerryWang0122/restaurants)，主要差異在於使用MySQL資料庫取代原專案中，使用靜態JSON檔案來完成資料的取用，同時增加CRUD的功能，讓使用者可以更多樣化的操作餐廳資訊。

![login](https://github.com/JerryWang0122/restaurantsCRUD/blob/main/public/images/login.png?raw=true)

![home](https://github.com/JerryWang0122/restaurantsCRUD/blob/main/public/images/home.png?raw=true)


## Features
* Dev C4 後端 M1 (`f009c4b`)
  * List restaurants: use MySQL database
  * CRUD restaurant's information
  * Search for restaurants by name or category using keywords.
* Dev C4 後端 M2 (`6132785`)
  * 點擊圖片取得進一步資訊
  * 使用 Express Router 建立路由器
  * 增加排序功能，同時將資料搜索及篩選轉移到資料庫，提升程式效率
  * 分頁功能
  * 使用 Middleware 實作 UI/UX 使用提示訊息
* Dev C4 後端 M3 (`目前版本`)
  * 新增本地端及Facebook(OAuth2)的註冊、登入功能
  * 建立使用者資料庫，並連結restaurants資訊
  * 使用bcrypt加密使用者密碼
  * 使用Passport套件，檢測使用者權限
  * 使用dotenv建立環境變數
  * 在新增/修改restaurant時，在後端部分檢查資料正確性
  
# Quick Start
## Prerequisites
The environment should be equipped with `node.js` & `npm` & `MySQL`
## Installing
1. Clone this repository
2. Use terminal and move to restaurants directory
```
cd restaurantsCRUD
```
3. Install npm packages
```
npm install
```
4. Create a new database and seed initial data
* Please check out `/config/config.json` first
* Make sure database related information is correct
* Execute below command
```
npm run seed
```
5. Set environment variables
* 請參照根目錄下的 `.env.example` 檔，於根目錄下新增 `.env` 檔並進行相關設定
* `FACEBOOK_CLIENT_XXX` 資料可於[Facebook for developers](https://developers.facebook.com/)申請，同時請在設定相關設置時，開啟email存取權限：
```
SESSION_SECRET= 【 請自行設定 】
FACEBOOK_CLIENT_ID= 【 請自行設定 】
FACEBOOK_CLIENT_SECRET= 【 請自行設定 】

FACEBOOK_CALLBACK_URL=http://localhost:3000/oauth2/redirect/facebook
```

6. Launch the application
* 啟動伺服器前，請先設置環境變數 NODE_ENV=development，再執行以下指令以啟動伺服器：
```
npm run start
```
* mac/linux 系統，亦可直接透過以下指令設置環境變數並啟動伺服器：
```
npm run start:dev
```
7. The application is working successfully if the following message is shown in the terminal.
```
express server is running on http://localhost:3000
```
## How to use
* Visit http://localhost:3000 to start using the program.
* Use `ctrl + c` in the termial to terminate the application
* Default user accounts are shown below 
```
User1
  email: user1@example.com
  password: 12345678

User2
  email: user2@example.com
  password: 12345678
```
# Author
[JerryWang0122](https://github.com/JerryWang0122)

---

# 學習歷程 What I Learned
1. ... 解構運算子也可以用於Object
2. methodOverride，Query String 的位置
3. 利用 [variable] 完成 Object key 名稱的定義
4. Sequelize 的 findAndCountAll
5. 使用 handlebars.registerHelper 自定義 isEqual function，擴充handlebars判斷
6. 參考[letitia](https://github.com/letitia-chiu/restaurant-list)學姊，實作分頁和使用者提示訊息
7. req.isAuthenticated是透過檢查req.user是否存在來判斷，因此在普通passport就可以實現，不用特別引用到自己定義的passport