import ajax from '/js/ajax.js'

const userNameBox = document.getElementById('userNameBox'); // 用户名盒子
const userPassBox = document.getElementById('userPassBox'); // 密码输盒子
const username = document.getElementById('username'); // 用户名输入框
const password = document.getElementById('password'); // 密码输入框
const loginBtn = document.getElementById('loginBtn'); // 登录按钮
const labelName = userNameBox.querySelector('label'); // 用户名标题
const labelPass = userPassBox.querySelector('label'); // 密码标题
const nameP = userNameBox.querySelector('p'); // 用户名输入框下方线条
const passP = userPassBox.querySelector('p'); // 用户名输入框下方线条

// 用户框回车执行登录
username.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkU() && checkP() ? loginRequest() : alert('用户名或密码不正确')
  }
})
// 密码框回车执行登录
password.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkU() && checkP() ? loginRequest() : alert('用户名或密码不正确')
  }
})
// 点击注册按钮执行登录
loginBtn.addEventListener('click', (e) => {
  checkU() && checkP() ? loginRequest() : alert('用户名或密码不正确')
})

// 用户名正则：4~16位数字、字母或下划线
const userReg = /^\w{4,16}$/;
// 密码正则：8~16位 至少1个大写字母，1个小写字母和1个数字
const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/;
// 验证帐号是否符合正则
function checkU() {
  if (userReg.test(username.value)) {
    return true
  } else {
    return false
  }
}
// 验证密码是否符合正则
function checkP() {
  if (passReg.test(password.value)) {
    return true
  } else {
    return false
  }
}

// 登录请求
function loginRequest() {
  ajax({
    method: 'POST',
    url: 'http://localhost:3000/login',
    async: true,
    req: {
      username: username.value,
      password: password.value
    },
    type: 'text',
    success(data) {
      if (data === 'loginSuccess') {
        location.href = "http://localhost:3000"
      } else {
        alert('用户名或密码不正确')
      }
    }
  })
}


// 用户名输入框样式
username.addEventListener('focus', (e) => {
  nameP.style.width = '250px';
  labelName.style.marginBottom = '30px'
  labelName.style.fontSize = 'xx-small'
  labelName.style.marginLeft = '-190px'
  labelName.style.color = 'rgba(95,86,86,.1)'
})
username.addEventListener('blur', (e) => {
  if (username.value === '') {
    nameP.style.width = '0px';
    labelName.style.marginBottom = '0px'
    labelName.style.fontSize = '16px'
    labelName.style.marginLeft = '-175px'
    labelName.style.color = 'rgba(95,86,86,1)'
  } else {
    nameP.style.width = '250px';
    labelName.style.marginBottom = '30px'
    labelName.style.fontSize = 'xx-small'
    labelName.style.marginLeft = '-190px'
    labelName.style.color = 'rgba(95,86,86,.1)'
  }
})
if (username.value === '') {
  nameP.style.width = '0px';
  labelName.style.marginBottom = '0px'
  labelName.style.fontSize = '16px'
  labelName.style.marginLeft = '-175px'
  labelName.style.color = 'rgba(95,86,86,1)'
} else {
  nameP.style.width = '250px';
  labelName.style.marginBottom = '30px'
  labelName.style.fontSize = 'xx-small'
  labelName.style.marginLeft = '-190px'
  labelName.style.color = 'rgba(95,86,86,.1)'
}
// 密码输入框样式
password.addEventListener('focus', (e) => {
  passP.style.width = '250px';
  labelPass.style.marginBottom = '50px'
  labelPass.style.fontSize = 'xx-small'
  labelPass.style.marginLeft = '-190px'
  labelPass.style.color = 'rgba(95,86,86,.1)'
})
password.addEventListener('blur', (e) => {
  if (password.value === '') {
    passP.style.width = '0px';
    labelPass.style.marginBottom = '0px'
    labelPass.style.fontSize = '16px'
    labelPass.style.marginLeft = '-175px'
    labelPass.style.color = 'rgba(95,86,86,1)'
  } else {
    passP.style.width = '250px';
    labelPass.style.marginBottom = '50px'
    labelPass.style.fontSize = 'xx-small'
    labelPass.style.marginLeft = '-190px'
    labelPass.style.color = 'rgba(95,86,86,.1)'
  }
})
if (password.value === '') {
  passP.style.width = '0px';
  labelPass.style.marginBottom = '0px'
  labelPass.style.fontSize = '16px'
  labelPass.style.marginLeft = '-175px'
  labelPass.style.color = 'rgba(95,86,86,1)'
} else {
  passP.style.width = '250px';
  labelPass.style.marginBottom = '50px'
  labelPass.style.fontSize = 'xx-small'
  labelPass.style.marginLeft = '-190px'
  labelPass.style.color = 'rgba(95,86,86,.1)'
}