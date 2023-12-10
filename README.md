# [Alpha Camp] Dev C4 後端 - 餐廳清單
此專案延伸至[Dev C3 - M3 指標作業：打造餐廳清單](https://github.com/JerryWang0122/restaurants)，主要差異在於使用MySQL資料庫取代原專案中，使用靜態JSON檔案來完成資料的取用，同時增加CRUD的功能，讓使用者可以更多樣化的操作餐廳資訊。

![home](https://github.com/JerryWang0122/restaurantsCRUD/blob/main/public/images/home.png?raw=true)


## Features
* Dev C4 後端 M1
  * List restaurants: use MySQL database
  * CRUD restaurant's information
  * Search for restaurants by name or category using keywords.
* Dev C4 後端 M2
  * 點擊圖片取得進一步資訊
  * 使用 Express Router 建立路由器
  * 增加排序功能，同時將資料搜索及篩選轉移到資料庫，提升程式效率
  * 分頁功能
  * 使用 Middleware 實作 UI/UX 使用提示訊息
  
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
5. Launch the application
```
npm run start
```
6. The application is working successfully if the following message is shown in the terminal.
```
express server is running on http://localhost:3000
```
## How to use
* Visit http://localhost:3000 to start using the program.
* Use `ctrl + c` in the termial to terminate the application

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