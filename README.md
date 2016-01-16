# Simple Nodejs Server


```

git clone https://github.com/MSakamaki/simpleHtttpNode.git
cd simpleHtttpNode
node app.js

// port options node app.js [port]
node app.js 3000

// gzip compress option
node appGzip.js

```
go url http://localhost:3000

### create ssh key (agenda)

```
# my create certificate and key gen command
mkdir ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl/server.key -out ssl/server.crt

```

```
# https server mode
node appHttps.js

```
go url https://localhost:3000
