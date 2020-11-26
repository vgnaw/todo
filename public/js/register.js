import ajax from '/js/ajax.js'
const username = document.getElementById('username'); // 用户名输入框
const password = document.getElementById('password'); // 密码输入框
const registerBtn = document.getElementById('registerBtn'); // 注册按钮
const labelName = userNameBox.querySelector('label'); // 用户名标题
const labelPass = userPassBox.querySelector('label'); // 密码标题
const nameP = userNameBox.querySelector('p'); // 用户名输入框下方线条
const passP = userPassBox.querySelector('p'); // 密码输入框下方线条
const nameHint = userNameBox.querySelector('span'); // 用户名输入框下方提示信息
const passHint = userPassBox.querySelector('span'); // 密码输入框下方提示信息

// 用户名框获得焦点
username.addEventListener('focus', (e) => {
  nameP.style.width = '250px';
  labelName.style.marginBottom = '30px'
  labelName.style.fontSize = 'xx-small'
  labelName.style.marginLeft = '-190px'
  labelName.style.color = 'rgba(95,86,86,.1)'
  nameHint.style.color = 'rgba(95,86,86,.8)'
})
// 用户名框失去焦点
username.addEventListener('blur', (e) => {
  nameHint.style.color = 'rgba(95,86,86,.1)'
  checkU()
  if (username.value === '') {
    nameP.style.width = '0px';
    labelName.style.marginBottom = '0px'
    labelName.style.marginLeft = '-175px'
    labelName.style.fontSize = '16px'
    labelName.style.color = 'rgba(95,86,86,1)'
  } else {
    nameP.style.width = '250px';
    labelName.style.marginBottom = '30px'
    labelName.style.fontSize = 'xx-small'
    labelName.style.marginLeft = '-190px'
    labelName.style.color = 'rgba(95,86,86,.1)'
  }
})
// 用户名框输入事件
username.addEventListener('input', (e) => {
  checkU()
})
// 用户框回车执行注册
username.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && checkU() && checkP()) {
    registerRequest()
  }
})

// 密码框获得焦点
password.addEventListener('focus', (e) => {
  passP.style.width = '250px';
  labelPass.style.marginBottom = '30px'
  labelPass.style.fontSize = 'xx-small'
  labelPass.style.marginLeft = '-190px'
  labelPass.style.color = 'rgba(95,86,86,.1)'
  passHint.style.color = 'rgba(95,86,86,.8)'
})
// 密码框失去焦点
password.addEventListener('blur', (e) => {
  passHint.style.color = 'rgba(95,86,86,.1)'
  checkP()
  if (password.value === '') {
    passP.style.width = '0px';
    labelPass.style.marginBottom = '0px'
    labelPass.style.fontSize = '16px'
    labelPass.style.marginLeft = '-175px'
    labelPass.style.color = 'rgba(95,86,86,1)'
  } else {
    passP.style.width = '250px';
    labelPass.style.marginBottom = '30px'
    labelPass.style.fontSize = 'xx-small'
    labelPass.style.marginLeft = '-190px'
    labelPass.style.color = 'rgba(95,86,86,.1)'
  }
})
// 密码框输入事件
password.addEventListener('input', (e) => {
  checkP()
})
// 密码框回车执行注册
password.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && checkU() && checkP()) {
    registerRequest()
  }
})

// 点击注册按钮执行注册
registerBtn.addEventListener('click', (e) => {
  if (checkU() && checkP()) {
    registerRequest()
  }
})

// 用户名正则：4~16位数字、字母或下划线
const userReg = /^\w{4,16}$/;
// 密码正则：8~16位字母、数字和1个大写字母
const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/;

// 验证帐号是否符合正则
function checkU() {
  if (userReg.test(username.value)) {
    nameP.style.backgroundColor = 'green'
    return true
  } else {
    nameP.style.backgroundColor = '#FF0033'
    return false
  }
}
// 验证密码是否符合正则
function checkP() {
  if (passReg.test(password.value)) {
    passP.style.backgroundColor = 'green'
    return true
  } else {
    passP.style.backgroundColor = '#FF0033'
    return false
  }
}

// 注册请求
function registerRequest() {
  ajax({
    method: 'POST',
    url: 'http://localhost:3000/register',
    async: true,
    req: {
      username: username.value,
      password: password.value
    },
    type: 'text',
    success(data) {
      console.log(data)
      if (data === 'exist') {
        alert('用户名已存在')
      } else if (data === 'registerSuccess') {
        alert('注册成功')
        location.href = "http://localhost:3000/login"
      }
    }
  })
}