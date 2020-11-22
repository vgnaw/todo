const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const router = require('./routes/index.js')

// 中间件，解析post请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// 路由
app.use('/', router)

// 配置静态路径
app.use(express.static(path.join(__dirname, 'public')))


app.listen(3000, () => console.log('服务器已启动，访问 http://localhost:3000'))