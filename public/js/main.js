import ajax from '/js/ajax.js'
const inpToDo = document.getElementById('inpToDo'); // 输入框，添加事件
const todoList = document.getElementById('todoList'); // 代办列表
const doneList = document.getElementById('doneList'); // 完成列表
const todoCount = document.getElementById('todoCount'); // 代办数量
const doneCount = document.getElementById('doneCount'); // 完成数量
const username = document.getElementById('username'); // 用户名

// 添加列
function add(list, liId, val, createTime) {
  let li = document.createElement('li')
  let label = document.createElement('label')
  let input = document.createElement('input')
  let p = document.createElement('p')
  let span = document.createElement('span')
  input.type = 'checkbox'
  input.style.opacity = '0'
  input.id = `inp${liId}`
  label.setAttribute('for', `inp${liId}`)
  span.innerHTML = '\u2718'
  p.innerHTML = val
  list === todoList ? (input.checked = false, label.innerHTML = '\u237B') : (input.checked = true, label.innerHTML = '\u2714');
  li.appendChild(label)
  li.appendChild(input)
  li.appendChild(p)
  li.appendChild(span)
  li.setAttribute('ln', liId)
  li.setAttribute('lt', createTime)
  list.appendChild(li)
}
// 页面加载后触发
window.onload = function () {
  getToDo()
  getDone()
  getUsername()
}
// 获取所有todo
function getToDo() {
  ajax({
    method: 'POST',
    url: 'http://localhost:3000',
    async: true,
    req: {
      aim: 'getToDo'
    },
    type: 'json',
    success(data) {
      // 遍历响应数据
      for (const i of data) {
        add(todoList, i.todo_id, i.todo, i.createTime)
      }
      getToDoCount()
    }
  })
}
// 获取所有done
function getDone() {
  ajax({
    method: 'POST',
    url: 'http://localhost:3000',
    async: true,
    req: {
      aim: 'getDone'
    },
    type: 'json',
    success(data) {
      // 遍历响应数据
      for (const i of data) {
        add(doneList, i.done_id, i.done, i.createTime)
      }
      getDoneCount()
    }
  })
}
// 点击列表
todoList.addEventListener('click', (e) => {
  manageState(e)
})
doneList.addEventListener('click', (e) => {
  manageState(e)
})
// 事项状态
function manageState(e) {
  let el = e.target
  let li = el.parentElement
  let list = el.parentElement.parentElement
  let pVal = el.parentElement.getElementsByTagName('p')[0].innerHTML
  let ln = li.getAttribute('ln')
  let lt = li.getAttribute('lt')
  let table, col
  // el.parentElement.remove();
  if (list.id === 'todoList') {
    table = 'todo_list'
    col = 'todo'
  } else {
    table = 'done_list'
    col = 'done'
  }
  switch (el.tagName) {
    case 'SPAN':
      del(el, pVal, table, col, ln, lt)
      break;
    case 'INPUT':
      toggleState(el, pVal, table, col, ln, lt)
      break;
  }
}
// 获取用户名
function getUsername() {
  ajax({
    method: 'POST',
    url: 'http://localhost:3000',
    async: true,
    req: {
      aim: 'getUsername'
    },
    type: 'text',
    success(data) {
      username.innerHTML = data
    }
  })
}
// 添加todo
inpToDo.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    let d = +new Date();
    if (inpToDo.value) {
      ajax({
        method: 'POST',
        url: 'http://localhost:3000',
        async: true,
        req: {
          aim: 'addToDo',
          todo: inpToDo.value,
          d: d
        },
        type: 'json',
        success(data) {
          add(todoList, data.todo_id, data.todo, data.createTime)
          getToDoCount()
        }
      })
    }
    inpToDo.value = null
  }
})
// 删除事项
function del(el, pVal, table, col, ln, lt) {
  ajax({
    method: 'POST',
    url: 'http://localhost:3000',
    async: true,
    req: {
      aim: 'del',
      table: table,
      ln: ln,
      col: col,
      item: pVal,
      lt: lt
    },
    type: 'text',
    success(data) {
      el.parentElement.remove();
      getToDoCount()
      getDoneCount()
    }
  })
}

// 完成/取消
function toggleState(el, pVal, table, col, ln, lt) {
  table === 'todo_list' && el.checked ? done(el, pVal, table, col, ln, lt) : undone(el, pVal, table, col, ln, lt)
}

//完成事项
function done(el, pVal, table, col, ln, lt) {
  ajax({
    method: 'POST',
    url: 'http://localhost:3000',
    async: true,
    req: {
      aim: 'done',
      table: table,
      ln: ln,
      col: col,
      item: pVal,
      lt: lt
    },
    type: 'json',
    success(data) {
      el.parentElement.remove();
      add(doneList, data.done_id, data.done, data.createTime)
      getToDoCount()
      getDoneCount()
    }
  })
}

// 取消完成
function undone(el, pVal, table, col, ln, lt) {
  ajax({
    method: 'POST',
    url: 'http://localhost:3000',
    async: true,
    req: {
      aim: 'undone',
      table: table,
      ln: ln,
      col: col,
      item: pVal,
      lt: lt
    },
    type: 'json',
    success(data) {
      el.parentElement.remove();
      add(todoList, data.todo_id, data.todo, data.createTime)
      getToDoCount()
      getDoneCount()
    }
  })
}

// 获取todo数量
function getToDoCount() {
  todoCount.innerHTML = todoList.querySelectorAll('li').length
}
// 获取done数量
function getDoneCount() {
  doneCount.innerHTML = doneList.querySelectorAll('li').length
}