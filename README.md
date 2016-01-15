# Simple Nodejs Server


```

git clone https://github.com/MSakamaki/simpleHtttpNode.git
cd simpleHtttpNode
node app.js

// port options node app.js [port]
node app.js 3000

// gzip compress option
COMPRESS=gzip node app.js

```
go url http://localhost:3000

### create ssh key (agenda)

```
# https server mode
HTTPS=true node app.js

```

```
# my create certificate and key gen command
mkdir ssh
cd ssh

openssl genrsa -des3 -out ssh/server.enc.key 1024
openssl req -new -key ssh/server.enc.key -out ssh/server.csr
openssl rsa -in ssh/server.enc.key -out ssh/server.key
openssl x509 -req -days 365 -in ssh/server.csr -signkey ssh/server.key -out ssh/server.crt

# or

openssl genrsa -out ssh/key.pem
openssl req -new -key ssh/key.pem -out ssh/csr.pem
openssl x509 -req -days 9999 -in ssh/csr.pem -signkey ssh/key.pem -out ssh/cert.pem
rm ssh/csr.pem

```
