# Xhr

An tiny and minimal function for XMLHttpRequests. Falls back to ActiveX for older versions of Internet Explorer.

## Installation

**Xhr** is a [component](https://github.com/component/component).

    $ component install matthewp/xhr

## API

### xhr(url, callback, errback)

Perform a GET request to the given url, calling the callback when complete. If an error is encountered, the errback function will be called with an [XhrError](https://github.com/matthewp/xhrerror) instance.

### xhr(options, callback, errback)

Perform an HTTP requests with the given ``options``, calling ``callback`` when complete. If an error is encountered, the errback function will be called with an [XhrError](https://github.com/matthewp/xhrerror) instance.

#### options

The ``options`` object has the following properties:

##### url

The url to perform the request on.

##### method

The HTTP method to use (GET, POST, PUT, DELETE, etc.).  Defaults to ``GET``.

##### headers

An ``Object`` in which the keys are the header key and the values are the header value. Example

```javascript
headers: {
  'Accept': 'application/json'
}
```

##### data

The data to send along as the body of the request. For example, in a ``POST`` request.

##### credentials

If true, the ``withCredentials`` value will be applied to the XMLHttpRequest object, which allows for [CORS](http://www.w3.org/TR/cors/) requests.

## Examples

```javascript
var xhr = require('xhr');

var fooData = JSON.stringify({
  foo: 'bar',
  baz: 'qux'
});

xhr({
  url: 'http://example.com/foos',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': fooData.length
  },
  method: 'POST',
  data: fooData
},
  function onSuccess() {
    console.log('It worked!');
  },
  function onError(err) {
    console.log('There was an error: ' + err.message);
  });
```