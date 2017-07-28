var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mimeTypes = {

	'.js': 'text/javascript',
	'.html': 'text/html',
	'.css': 'text/css',
	'.jpg': 'image/jpeg',
	'.png': 'image/png'

};


http.createServer(function (req, res) {

	var pathname = url.parse(req.url).path;
	var ext = path.extname(pathname);

	if(pathname == '/') {
		pathname = '/index.html';
	}

	var mimeType = mimeTypes[ext];
	pathname = pathname.substr(1);

	if((ext == ".png") || (ext == ".jpg")) {
		fs.readFile('./' + pathname, function(err, data) {
			res.writeHead(200, {'Content-Type': mimeType});
			
			res.end(data, 'binary');
		})
	} else {
		fs.readFile(pathname, 'utf8', function (err, data) {
			if(err) res.end("<h1 style='text-align:center; margin: 100px 0;'>ERROR 404 (Not found)</h1>");
			else {
				res.writeHead(200, {'Content-Type': mimeType});
				res.end(data);
			}
		})
	}

}).listen(8080);
