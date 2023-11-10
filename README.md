# [Alpha Camp] Dev C3 - M3 指標作業：打造餐廳清單
This is a web application using NodeJS and Express. The user interface structure and restaurants' information are provided by Alpha Camp. My main goal is to build the routes for the web and become familiar with the Express and express-handlebars package.


## Features
* List restaurants: use static json files
* Acquire detail restaurant information
* Search for restaurants by name or category using keywords.

# Quick Start
## Prerequisites
The environment should be equipped with `node.js` & `npm`
## Installing
1. Clone this repository
2. Use terminal and move to restaurants directory
```
cd restaurants
```
3. Install npm packages
```
npm install
```
4. Launch the application
```
npm run start
```
5. The application is working successfully if the following message is shown in the terminal.
```
express server is running on http://localhost:3000
```
## How to use
* Visit http://localhost:3000 to start using the program.
* Use `ctrl + c` in the termial to terminate the application

# Author
[JerryWang0122](https://github.com/JerryWang0122)

---

# 自我反思
1. form action所指向的頁面，曾經讓我除錯了一段時間
2. 在處理keyword為空字串時，曾經想讓路由重新導向根網站 (/)，結果發生了ERR_TOO_MANY_REDIRECTS