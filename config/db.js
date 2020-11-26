module.exports = {
  // 数据库配置
  todo: {
    host: 'localhost',
    user: 'root', // 数据库登录名
    password: '**', // 数据库密码
    database: 'todo', // 数据库名称
    port: 3306 // 端口号
  },
  // sql语句
  q: {
    // 涉及登录/注册
    login: 'select * from userinfo where UserName =? and UserPass=?', // 登录，查询用户及密码
    register: 'INSERT INTO userinfo(UserName,UserPass) VALUES(?,?)', // 注册，向userinfo添加用户
    isExist: 'select * from userinfo where UserName =?', // 注册，检测用户是否已存在
    // 删除指定事项
    del(username, ln, table, col, item, lt) {
      return `delete from ${table} where UserName='${username}' and ${col}_id=${ln} and ${col}='${item}' and createTime=${lt}`
    },
    // 涉及代办事项
    showToDo: 'select * from todo_list where UserName =?', // 查询todo
    getToDoId: 'select * from todo_list where UserName =? and todo=? and createTime=?', // 查询todo id
    addToDo: 'INSERT INTO todo_list(UserName,todo,createTime) VALUES(?,?,?)', // 添加todo
    delToDo: 'delete from todo_list where UserName=? and todo_id=? and todo=? and createTime=?', // 删除todo
    // 涉及完成事项
    addDone: 'INSERT INTO done_list(UserName,done,createTime) VALUES(?,?,?)', // 新增已完成
    getDoneId: 'select * from done_list where UserName =? and done=? and createTime=?', // 查询done id
    showDone: 'select * from done_list where UserName =?', // 查询done
    delDone: 'delete from done_list where UserName=? and done_id=? and done=? and createTime=?' // 删除done
  }
}