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
		pathname = '/hello-smarthouse.html';
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
			if(err) console.log("err");
			else {
				res.writeHead(200, {'Content-Type': mimeType});
				res.end(data);
			}
		})
	}

	 /*if(ext){
        if(ext === '.css'){
            res.writeHead(200, {'Content-Type': 'text/css'});
        }
        else if(ext === '.js'){
            res.writeHead(200, {'Content-Type': 'text/javascript'});
        }
            fs.readFile(__dirname + pathname, 'utf8', function(err, data) {
            	if(err) throw err;
            	res.write(data);
            	res.end();

            });
        }
     else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.readFile('hello-smarthouse.html', 'utf8', function(err, data) {
            	if(err) throw err;
            	res.write(data);
            	res.end();

            });
     }*/
     //res.end();
     
 /* fs.readFile('hello-smarthouse.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });*/
}).listen(8080);