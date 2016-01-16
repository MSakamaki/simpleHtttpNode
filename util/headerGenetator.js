// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
// https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html
module.exports = {
  createTemplate: function() {
    return {
      'Access-Control-Allow-Origin':'*',
      'Pragma': 'no-cache',
      'Cache-Control' : 'no-cache',
    }
  },
}
