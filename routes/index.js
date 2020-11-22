const express = require('express')
const router = express.Router()
const mysql = require('mysql');
const session = require('express-session');

const db = require('../config/db');
const q = db.q;

// 数据库
let connection = mysql.createConnection(db.todo);
connection.connect();

// session
router.use(session({
  secret: 'secret', // 对session id 相关的cookie 进行签名
  resave: true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie: {
    maxAge: 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  },
}));

// 主页
router.get('/', function (req, res) {
  if (req.session.userName) {
    res.sendFile(__dirname.replace(/routes/, '') + '/views/main.html')
  } else {
    res.redirect('/login');
  }
}).post('/', (req, res) => {
  const data = req.body;
  const username = req.session.userName;
  const selSqlParams = [username, data.todo];
  if (data.aim === 'addToDo') {
    connection.query(q.addToDo, selSqlParams, function (err, result) {
      if (err) {
        console.log(err.message)
      }
    });
    res.end('add success')
  }
})
// 登录
router.get('/login', function (req, res) {
  res.sendFile(__dirname.replace(/routes/, '') + '/views/login.html')
}).post('/login', (req, res) => {
  const data = req.body;
  console.log(data)
  const username = data.username;
  const password = data.password;
  const selSqlParams = [username, password];
  connection.query(q.login, selSqlParams, function (err, result) {
    if (result[0]) {
      console.log('登录成功')
      req.session.userName = username; // 登录成功，设置 session
      console.log(data)
      res.send('loginSuccess');
    } else {
      res.send('username or password error')
    };
  });
})

// 注册
router.get('/register', function (req, res) {
  res.sendFile(__dirname.replace(/routes/, '') + '/views/register.html')
}).post('/register', (req, res) => {
  const data = req.body;
  const username = data.username;
  const password = data.password;

  const addSqlParams = [username, password];
  connection.query(q.isExist, addSqlParams[0], function (err, result) {
    if (result[0]) {
      res.send('exist')
    } else {
      connection.query(q.register, addSqlParams, function (err, result) {
        if (err) {
          console.log('注册失败 - ', err.message);
          return;
        }
        res.send('registerSuccess');
      });
    };
  });
})
// 退出
router.get('/logout', function (req, res) {
  req.session.userName = null; // 删除session
  res.redirect('/login');
});

module.exports = router