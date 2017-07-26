var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write("Hello smarthome!!");
	
	res.end();
}).listen(9000);
