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
  const selSqlParams = [username, data.todo, data.d];
  // 添加todo
  if (data.aim === 'addToDo') {
    connection.query(q.addToDo, selSqlParams, function (err, result) {
      if (err) {
        console.log(err.message)
      } else {
        connection.query(q.getToDoId, selSqlParams, function (err, result) {
          if (err) {
            console.log(err.message)
          } else {
            res.send(result[0])
          }
        })
      }
    });
    // 获取用户名
  } else if (data.aim === 'getUsername') {
    res.send(username)
    // 获取所有done
  } else if (data.aim === 'getToDo') {
    connection.query(q.showToDo, username, function (err, result) {
      if (err) {
        console.log(err.message)
      } else {
        res.send(result)
      }
    })
    // 获取所有done
  } else if (data.aim === 'getDone') {
    connection.query(q.showDone, username, function (err, result) {
      if (err) {
        console.log(err.message)
      } else {
        res.send(result)
      }
    });
    // 删除指定事项
  } else if (data.aim === 'del') {
    connection.query(q.del(username, data.ln, data.table, data.col, data.item, data.lt), function (err, result) {
      if (err) {
        console.log(err.message)
      } else {
        res.send('delSuccess')
      }
    });
    // 完成事项
  } else if (data.aim === 'done') {
    connection.query(q.delToDo, [username, data.ln, data.item, data.lt], function (err, result) {
      if (err) {
        console.log(err.message)
      } else {
        connection.query(q.addDone, [username, data.item, data.lt], function (err, result) {
          if (err) {
            console.log(err.message)
          } else {
            connection.query(q.getDoneId, [username, data.item, data.lt], function (err, result) {
              if (err) {
                console.log(err.message)
              }
              res.send(result[0])
            });
          }
        })
      }
    })
    // 撤销完成事项
  } else if (data.aim === 'undone') {
    connection.query(q.delDone, [username, data.ln, data.item, data.lt], function (err, result) {
      if (err) {
        console.log(err.message)
      } else {
        connection.query(q.addToDo, [username, data.item, data.lt], function (err, result) {
          if (err) {
            console.log(err.message)
          } else {
            connection.query(q.getToDoId, [username, data.item, data.lt], function (err, result) {
              if (err) {
                console.log(err.message)
              }
              res.send(result[0])
            });
          }
        })
      }
    })
  }
})
// 登录
router.get('/login', function (req, res) {
  res.sendFile(__dirname.replace(/routes/, '') + '/views/login.html')
}).post('/login', (req, res) => {
  const data = req.body;
  const username = data.username;
  const password = data.password;
  const sqlParams = [username, password];
  connection.query(q.login, sqlParams, function (err, result) {
    if (result[0]) {
      console.log('登录成功')
      req.session.userName = username; // 登录成功，设置 session
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

  const sqlParams = [username, password];
  connection.query(q.isExist, sqlParams[0], function (err, result) {
    if (result[0]) {
      res.send('exist')
    } else {
      connection.query(q.register, sqlParams, function (err, result) {
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