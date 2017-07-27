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
            res.write(fs.readFileSync(__dirname + pathname, 'utf8'));
        }
     else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(fs.readFileSync('hello-smarthouse.html', 'utf8'));
     }
     res.end();
  /*   
  fs.readFile('hello-smarthouse.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });*/
}).listen(8080);