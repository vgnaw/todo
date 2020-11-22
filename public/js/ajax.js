function ajax(options) {
  let method = options.method.toUpperCase();
  let url = options.url;
  let async = options.async || true;
  let req = options.req || '';
  let success = options.success;
  let XHR
  if (window.XMLHttpRequest) {
    XHR = new XMLHttpRequest();
  } else {
    XHR = new ActiveXObject('Microsoft.XMLHTTP')
  }
  console.log(req)
  if (typeof req === 'object') {
    let reqArr = []
    for (let key in req) {
      let value = req[key]
      reqArr.push(key + '=' + value)
    }
    req = reqArr.join('&')
  }
  XHR.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      success(this.responseText)
    } else {
      console.log("ERROR!" + '  state：' + this.readyState + '；status：' + this.status)
    }
  };
  console.log(method,req,url,async)
  if (method === 'GET') {
    url += ('?' + req);
    XHR.open(method, url, async);
    XHR.send()
  } else if (method === 'POST') {
    XHR.open(method, url, async);
    XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XHR.send(req);
  }
}
export default ajax;