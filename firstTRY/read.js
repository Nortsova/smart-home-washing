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
	var pathname = url.parse(req.url).pathname;
	
    if(pathname == '/') {
        pathname = '/index.html'
    }

    var ext = path.extname(pathname);
    
    var mimeType = mimeTypes[ext];
    pathname = pathname.substring(1, pathname.length);

    if((ext == ".png") || (ext == ".jpg")) {
        fs.readFile('./' + pathname, function(err, data) {
            res.writeHead(200, {'Content-Type': mimeType});
            res.end(data, 'binary');
        });
        
    } else {
        fs.readFile(pathname, 'utf8', function(err, data) {
            res.writeHead(200, {'Content-Type': mimeType});
            res.end(data);
        });
    }



    

}).listen(8080);

