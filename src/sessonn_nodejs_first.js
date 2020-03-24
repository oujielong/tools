///* 服务器端需要记录用户的登录信息，使用session */

// 提供一个生成session的方法
var session_multity = {}; // 全局
var key = "session_key"; //全局
var EXPIRES = 20 * 60 * 1000; //全局
function generateSession() {
  //全局
  let session_single = {};
  session_single.id = new Date().getTime() + Math.random();
  session_single.cookie = { expire: new Date().getTime() + EXPIRES };
  session_multity[session_single.id] = session_single;
  return session_single;
}
/* 回调函数 */
function callBackFunc(req, res) {
  var id = req.cookies[key];
  if (!id) {
    req.session = generateSession();
  } else {
    let session_current = session_multity[id];
    if (session_current) {
      //   存在session并校验 ,过期时间 , 过期则删除数据重新生产， 没有过期则更新过期时间
      if (session_current.cookie.expire > new Date().getTime()) {
        session_current.cookie.expire = new Date().getTime() + EXPIRES;
        req.session = session;
      } else {
        // 超时了，删除旧的数据，并重新生成
        res.session = session_current;
        delete session_multity[id];
        req.session = generateSession();
      }
    } else {
      req.session = generateSession();
    }
  }
}

/* 相应客户端是设置新值--拦截更新原来的setHead的东西 */
var writeHead = res.writeHead;
res.writeHead = function() {
  var cookies = res.getHeader("set-Cookie");
  var session = serialize(key, req.session.id); // [{session_key:1379429487362837}]
  cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, ssession];
  res.setHead("Set-Cookie", cookies);
  return writeHead.apply(this, arguments);
};

// 在回调中使用
var handle = function(req, res) {
  if (!req.session.isVisit) {
    req.session.isVisit = true;
    res.writeHead(200);
    res.end("欢迎第一次来到动物园");
  } else {
    res.writeHead(200);
    res.end("动物园再次欢迎你");
  }
};
