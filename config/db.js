// 数据库配置
module.exports = {
  todo: {
    host: 'localhost',
    user: 'root',
    password: '4444',
    database: 'todo',
    port: 3306
  },
  q: {
    // 登录/注册
    login: 'select * from userinfo where UserName =? and UserPass=?', // 登录，查询用户及密码
    register: 'INSERT INTO userinfo(UserName,UserPass) VALUES(?,?)', // 注册，向userinfo添加用户
    isExist: 'select * from userinfo where UserName =?', // 注册，检测用户是否已存在
    // 进行中
    showToDo: 'select todo from todo_list where UserName =?', // 查询todo
    addToDo: 'INSERT INTO todo_list(UserName,todo) VALUES(?,?)', // 添加todo
    delToDo: 'delete from todo_list where UserName=? and todo=?;', // 删除todo
    // 已完成
    showDone: 'select * from done_list where UserName =?', // 查询done
    addDone: 'INSERT INTO todo_list(UserName,done) VALUES(?,?)', // 添加done
    delDone: 'delete from todo_list where UserName=? and done=?;' // 删除done
  }
}