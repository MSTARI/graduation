# graduation
## 实验室预约管理系统APP，纯自主开发，借助阿里云服务器进行数据交互

### 使用代码，系统运行方式
1. clone代码后，分别对gui和server进行npm install
2. 创建mongodb数据库graduation，接着在数据库中分别创建集合laboratory，notice和personInfo，然后在数据库中添加一条管理员数据，否则无法正常登录，如下栗子：
```
{
  "id": "201406060318",
  
  "name": "MSTARI",
  
  "email": "12939@qq.com",
  
  "phone": "10000000000",
  
  "address": "1b-429",
  
  "authority": 1,
  
  "password": "1234"
}
```
3. 在server中执行node server.js
4. 在react-scripts中配置sass-loader，接着在GUI下执行yarn start 或者 npm start
5. 命令行会自动打开浏览器，进入登录界面，然后输入自己在数据库定义的id和password即可进入系统
6. app目录下config.xml和image.png是使用phonegap build打包的文件

### 设计基本遵循原则
1. 全面使用ES6语法
2. 基于React进行开发
3. 使用express搭建node服务器
4. 数据库使用MongoDB
5. 前后端数据交互使用JSON数据格式，请求头与响应头的Content-Type均使用application/json
6. 使用phonegap build进行Web App的打包工作