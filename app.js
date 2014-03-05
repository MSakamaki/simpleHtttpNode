/* server define */
var http = require('http'),
    https = require('https');
    url  = require('url'),
    path = require('path'),
    fs   = require('fs'),
    port = process.argv[2] || 3000;


var listenServer = function(request, response) {

    var propaty = {
        'filename': path.join(process.cwd(), url.parse(request.url).pathname),
        'isHtml': /.*\.html$/
    }

    var Response = {
        '200':function(file, filename){
            var extname = path.extname(filename);
            var header = {
                'Access-Control-Allow-Origin':'*',
                'Pragma': 'no-cache',
                'Cache-Control' : 'no-cache'
            }
            if (filename.match(propaty.isHtml)) { header['Content-Type']='text/html'; }
            response.writeHead(200, header);
            response.write(file, 'binary');
            response.end();
        },
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
        console.log(propaty.filename+' '+exists);
        if (!exists) { Response['404'](); return ; }
        if (fs.statSync(propaty.filename).isDirectory()) { propaty.filename += 'index.html'; }

        fs.readFile(propaty.filename, 'binary', function(err, file){
            if (err) { Response['500'](err); return ; }
            Response['200'](file, propaty.filename);
        });
    });
}

if (port === 443) {
    https.createServer({
            ssh_key: fs.readFileSync('key.pem'),
            ssh_cert: fs.readFileSync('cert.pem')
        }, listenServer).listen(parseInt(port, 10)); 
    console.log('Server running at https://localhost:' + port );
} else {
    http.createServer(listenServer).listen(parseInt(port, 10));
    console.log('Server running at http://localhost:' + port );
}

