var forIn = require('for-in'),
    xobj = require('xhr'),
    indexof = require('indexof'),
    XhrError = require('xhrerror');

function noop() { }

function xhr(options, callback, errback) {
  var req = xobj();

  if(Object.prototype.toString.call(options) == '[object String]') {
    options = { url: options };
  }

  req.open(options.method || 'GET', options.url, true);

  if(options.credentials) {
    req.withCredentials = true;
  }

  forIn(options.headers || {}, function (value, key) {
    req.setRequestHeader(key, value);
  });

  req.onreadystatechange = function() {
    if(req.readyState != 4) return;

    if(indexof([
      200,
      304,
      0
    ], req.status) === -1) {
      (errback || noop)(new XhrError('Server responded with a status of ' + req.status, req.status));
    } else {
      (callback || noop)(req);
    }
  };

  req.send(options.data || void 0);
}

module.exports = xhr;
