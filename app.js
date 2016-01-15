/* server define */
var http = require('http'),
    https = require('https');
    url  = require('url'),
    path = require('path'),
    fs   = require('fs'),
    zlib = require('zlib'),
    port = process.argv[2] || 3000;
    compressType = process.env.COMPRESS || 'default';
    isHttps = !!process.env.HTTPS;

var listenServer = function(request, response) {
    console.log('start listenServer');
    var propaty = {
        'filename': path.join(__dirname, 'public', url.parse(request.url).pathname),
        'isHtml': /.*\.html$/
    }

    var compress = {
        default: function(response, header, raw) {
            response.writeHead(200, header);
            raw.pipe(response);
        },
        gzip: function(response, header, raw) {
            header['content-encoding'] = 'gzip';
            response.writeHead(200, header);
            raw.pipe(zlib.createGzip()).pipe(response);
        },
    }

    var Response = {
        '200':function(raw, filename){
            //var extname = path.extname(filename);
            var header = {
                'Access-Control-Allow-Origin':'*',
                'Pragma': 'no-cache',
                'Cache-Control' : 'no-cache',
            }
            if (filename.match(propaty.isHtml)) { header['Content-Type']='text/html'; }
            compress[compressType](response, header, raw);        },
        '404':function(){
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('404 Not Found\n');
            response.end();

        },
        '500':function(err){
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.write(err + '\n');
            response.end();

        }
    }

    fs.exists(propaty.filename, function(exists){
        console.log(propaty.filename+' '+exists, __dirname);
        if (!exists) { Response['404'](); return ; }
        if (fs.statSync(propaty.filename).isDirectory()) {
            propaty.filename = path.join(propaty.filename, 'index.html');
        }

        var raw = fs.createReadStream(propaty.filename);
        raw.on('error', function(err) {
            console.log('error');
            Response['500'](err);
        });
        raw.on('open', function() {
            console.log('open');
            Response['200'](raw, propaty.filename);
        });
    });
}

if (isHttps) {
    https.createServer({
            ssh_key: fs.readFileSync('ssh/key.pem'),
            ssh_cert: fs.readFileSync('ssh/cert.pem')
        }, listenServer).listen(parseInt(port, 10)); 
    console.log('Server running at https://localhost:' + port );
} else {
    http.createServer(listenServer).listen(parseInt(port, 10));
    console.log('Server running at http://localhost:' + port );
}

