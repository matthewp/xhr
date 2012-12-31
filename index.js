var keys = require('keys'),
    xobj = require('xhr'),
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

  keys(options.headers || {
  }).forEach(function (key) {
    req.setRequestHeader(key, options.headers[key]);
  });

  req.onload = function (e) {
    if([
      200, 
      304, 
      0
    ].indexOf(req.status) === -1) {
      (errback || noop)(new XhrError('Server responded with a status of ' + req.status, req.status));
    } else {
      (callback || noop)(e.target);
    }
  };

  req.send(options.data || void 0);
}

module.exports = xhr;