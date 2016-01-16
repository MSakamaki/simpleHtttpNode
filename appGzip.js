/* server define */
var http = require('http');
var url  = require('url');
var path = require('path');
var fs   = require('fs');
var zlib = require('zlib');
var port = process.argv[2] || 3000;
var headerGenetator = require('./util/headerGenetator');
var contetntType = require('./util/contentType');

var listenServer = function(request, response) {

  var propaty = {
    filename: path.join(__dirname, 'public', url.parse(request.url).pathname),
  };

  var Response = {
    200:function(raw, filename) {
      var header = headerGenetator.createTemplate();
      header['Content-Type'] = contetntType.getHeaderContentText(path.extname(filename));
      header['content-encoding'] = 'gzip';
      response.writeHead(200, header);
      raw.pipe(zlib.createGzip()).pipe(response);
    },

    404:function() {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write('404 Not Found\n');
      response.end();

    },

    500:function(err) {
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.write(err + '\n');
      response.end();

    },
  };

  fs.exists(propaty.filename, function(exists) {
    console.log(propaty.filename + ' ' + exists);
    if (!exists) {
      Response['404'](); return;
    }

    if (fs.statSync(propaty.filename).isDirectory()) {
      propaty.filename += 'index.html';
    }

    var raw = fs.createReadStream(propaty.filename);
    raw.on('open', function() {
            Response['200'](raw, propaty.filename);
          }).on('error', Response['500']);
  });
};

http.createServer(listenServer).listen(parseInt(port, 10));
console.log('Server running at http://localhost:' + port);
