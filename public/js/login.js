import ajax from '/js/ajax.js'

const loginName = document.getElementById('username');
const loginPass = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn')
function loginRequest() {
  ajax({
    method: 'POST',
    url: 'http://localhost:3000/login',
    async: true,
    req: {
      username: loginName.value,
      password: loginPass.value
    },
    success(data) {
      if (data === 'loginSuccess') {
        location.href = "http://localhost:3000"
      } else {
        alert('用户名或密码错误')
      }
    }
  })
}

username.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    loginRequest()
  }
})
password.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    loginRequest()
  }
})
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginRequest()
})