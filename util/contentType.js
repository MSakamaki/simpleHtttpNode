// http://www.iana.org/assignments/media-types/media-types.xhtml
module.exports = {
  getHeaderContentText: function(extension){
    return this[extension] ? this[extension] : 'text/plain';
  },
  '.html': 'text/html',
  '.htm' : 'text/htm',
  '.css' : 'text/css',
  '.js' : 'text/javascript; charset=utf-8',
  '.json' : 'application/json; charset=utf-8',
  '.xml' : 'application/xml; charset=utf-8',
  '.jpeg' : 'image/jpeg',
  '.jpg' : 'image/jpg',
  '.gif' : 'image/gif',
  '.png' : 'image/png',
  '.mp3' : 'audio/mp3',
}
