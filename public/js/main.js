import ajax from '/js/ajax.js'
const logout = document.getElementById('logout');
const inpToDo = document.getElementById('inpToDo');
const todoList = document.getElementById('todoList')
const doneList = document.getElementById('doneList')



function getAllList() {

}



window.onload = function () {
  ajax({
    method: 'POST',
    url: 'http://localhost:3000',
    async: true,
    req: {
      aim: 'getToDo'
    },
    success(data) {
      console.log(data)
    }
  })
}


function addToDo(li, input, p, a) {
  li = document.createElement('li')
  input = document.createElement('input')
  p = document.createElement('p')
  a = document.createElement('a')
  input.type = 'checkbox'
  p.innerHTML = inpToDo.value
  li.appendChild(input)
  li.appendChild(p)
  li.appendChild(a)
  todoList.appendChild(li)
  return p.innerHTML;
}
inpToDo.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    
    if (inpToDo.value) {
      ajax({
        method: 'POST',
        url: 'http://localhost:3000',
        async: true,
        req: {
          aim: 'addToDo',
          todo: addToDo()
        },
        success(data) {
          console.log(data)
        }
      })
    }
    inpToDo.value = null
  }
})






todoList.addEventListener('click', function (e) {
  console.log(e.target.parentElement.getElementsByTagName('p')[0].innerHTML)
})
doneList.addEventListener('click', function (e) {
  console.log(e.target.parentElement.getElementsByTagName('p')[0].innerHTML)
})