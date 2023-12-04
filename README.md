# [Alpha Camp] Dev C4 - 【參考練習】M1 建立餐廳清單的 CRUD 功能
此專案延伸至[Dev C3 - M3 指標作業：打造餐廳清單](https://github.com/JerryWang0122/restaurants)，主要差異在於使用MySQL資料庫取代原專案中，使用靜態JSON檔案來完成資料的取用，同時增加CRUD的功能，讓使用者可以更多樣化的操作餐廳資訊。

![home](https://github.com/JerryWang0122/restaurantsCRUD/blob/main/public/images/home.png?raw=true)
![create](https://github.com/JerryWang0122/restaurantsCRUD/blob/main/public/images/create.png?raw=true)
![edit](https://github.com/JerryWang0122/restaurantsCRUD/blob/main/public/images/edit.png?raw=true)
![delete](https://github.com/JerryWang0122/restaurantsCRUD/blob/main/public/images/delete.png?raw=true)

## Features
* List restaurants: use MySQL database
* CRUD restaurant's information
* Search for restaurants by name or category using keywords.

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
* Please check out `/config/config.json` & `createDB.js` first
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