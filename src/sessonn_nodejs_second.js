var getURL = function(_url, key, value) {
  var obj = url.parse(_url, true);
  obj.query[key] = value;
  return url.format(obj);
};
function redirect(res, res) {
  let redirect = function(url) {
    res.setHead("Location", url);
    res.writeHead(302);
    res.end();
  };
  let id = req.query[key];
  if (!id) {
    var session = generate();
    redirect(getURL(req.url, key, session.id));
  } else {
    var session = sessions[id];
    if (session) {
      if (session.cookie.expire > new Date().getTime()) {
        // 更新超时时间
        session.cookie.expire = new Date().getTime() + EXPIRES;
        req.session = session;
        handle(req, res);
      } else {
        // 超时了，删除旧的数据，并重新生成
        delete sessions[id];
        var session = generate();
        redirect(getURL(req.url, key, session.id));
      }
    } else {
      // 如果session过期或口令不对，重新生成session
      var session = generate();
      redirect(getURL(req.url, key, session.id));
    }
  }
}
