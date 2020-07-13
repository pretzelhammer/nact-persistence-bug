require('dotenv').config();

// nothing interesting or relevant here
// just basic "hello world" http server
// runs to keep node container up

const http = require('http');

const requestListener = function (req, res) {
	res.writeHead(200);
	res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(8080);