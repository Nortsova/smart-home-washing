var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
http.createServer(function (req, res) {
	var pathname = url.parse(req.url).pathname;
	var ext = path.extname(pathname);

	 if(ext){
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
     }
     //res.end();
     
 /* fs.readFile('hello-smarthouse.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });*/
}).listen(8080);