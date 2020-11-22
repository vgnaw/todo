import ajax from '/js/ajax.js'

const loginName = document.getElementById('username');
const loginPass = document.getElementById('password');
const registerBtn = document.getElementById('registerBtn')

function registerRequest() {
  ajax({
    method: 'POST',
    url: 'http://localhost:3000/register',
    async: true,
    req: {
      username: loginName.value,
      password: loginPass.value
    },
    success(data) {
      if (data === 'exist') {
        alert('用户名已存在')
      } else if (data === 'registerSuccess') {
        alert('注册成功')
        location.href = "http://localhost:3000/login"
      }
    }
  })
}



username.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    registerRequest()
  }
})
password.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    registerRequest()
  }
})
registerBtn.addEventListener('click', (e) => {
  e.preventDefault();
  registerRequest()
})