'use strict';
var _typeof = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (a) {
    return typeof a
  } : function (a) {
    return a && 'function' == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? 'symbol' : typeof a
  },
  _createClass = function () {
    function a(b, c) {
      for (var e, d = 0; d < c.length; d++) e = c[d], e.enumerable = e.enumerable || !1, e.configurable = !0, 'value' in e && (e.writable = !0), Object.defineProperty(b, e.key, e)
    }
    return function (b, c, d) {
      return c && a(b.prototype, c), d && a(b, d), b
    }
  }();

function _classCallCheck(a, b) {
  if (!(a instanceof b)) throw new TypeError('Cannot call a class as a function')
}
var AJAX = function () {
    function a() {
      _classCallCheck(this, a)
    }
    return _createClass(a, [{
      key: 'request',
      value: function (b, c) {
        var d = {};
        'string' == typeof b ? d.url = b : 'object' == ('undefined' == typeof b ? 'undefined' : _typeof(b)) && (d.method = 'method' in b ? b.method : 'GET', 'url' in b && (d.url = b.url), 'headers' in b && Array.isArray(b.headers) && (d.headers = b.headers), 'json' in b && (d.json = b.json), 'timeout' in b && Number.isInteger(b.timeout) && (d.timeout = b.timeout)), this.__r(d, c)
      }
    }, {
      key: '__r',
      value: function __r(b, c) {
        var e, d = new XMLHttpRequest,
          f = !1;
        //d.withCredentials = true;
        if (d.open(b.method, b.url, !0), 'headers' in b)
          for (var g in b.headers) d.setRequestHeader(g, b.headers[g]);
        'json' in b && (f = !0, d.setRequestHeader('Content-Type', 'application/json'), 'object' == _typeof(b.json) && (e = JSON.stringify(b.json))), 'timeout' in b && (d.timeout = b.timeout), d.addEventListener('load', function () {
          var j = null;
          (200 === d.status || 304 === d.status) && (f ? j = JSON.parse(d.responseText) : j = d.responseText);
          var k = d.getAllResponseHeaders().split('\r\n'),
            l = {},
            _iteratorNormalCompletion = !0,
            _didIteratorError = !1,
            _iteratorError = void 0;
          try {
            for (var o, n = k[Symbol.iterator](); !(_iteratorNormalCompletion = (o = n.next()).done); _iteratorNormalCompletion = !0) {
              var p = o.value,
                q = p.split(':'),
                r = q.shift().trim(),
                s = q.join(':').trim();
              0 < r.length && (l[r] = s)
            }
          } catch (t) {
            _didIteratorError = !0, _iteratorError = t
          } finally {
            try {
              !_iteratorNormalCompletion && n.return && n.return()
            } finally {
              if (_didIteratorError) throw _iteratorError
            }
          }
          var m = {
            headers: l,
            statusCode: d.status,
            statusMessage: d.statusText
          };
          c(null, m, j)
        }), d.addEventListener('timeout', function () {
          c({
            error_code: 'ETIMEDOUT'
          })
        }), d.addEventListener('error', function (j) {
          c({
            error_code: 'EUNKNOWN',
            message: j.target.status
          }), console.error(j)
        }), d.send(e)
      }
    }]), a
  }(),
  __ajax = new AJAX;

function request(a, b) {
  __ajax.request(a, b)
}