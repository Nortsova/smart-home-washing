
var express = require('express');
//var json = require('express-json');
var bodyParser = require('body-parser');
var fs = require("fs");
var path = require("path");

var app = express();


app.use(express.static(__dirname + '/public'));
console.log(__dirname + '/public');

//var json = require("./data.json")

app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function (req, res){
	var path = __dirname + '/public';
	var htmlHead = '<!DOCTYPE html><html lang="en">' +
				'<head>' +
				'<meta charset="UTF-8">' +
				'<title>Smart-house</title>' +
				'<link rel="stylesheet" type="text/css" href="/styles/main.css">'+
				'</head> ' +
				'<body>';
	var htmlBody = '<div class="text-center"><h2>Hello, SMARTHOUSE!!</h2></div>' +
					'<div class="washing">'+
					'<div class="panel">'+
					'<a href="#" id="switch" class="switch on">on/off</a>'+
					'</div>'+
					'<div class="drum open">'+
					'<div id="door" class="door "></div>'+
					'</div>'+
					'</div>'+
					'</br>';
	var htmlEnding = '<script type="text/javascript" src="/script.js">'+'</script>'+
					'</body>'+
					'</html>';

	var htmlForm = '<form id="nameForm" class="form text-center" action="/" method="post">'+
				'<input type="text" name="userName" placeholder="User Name">'+
				'<input class="btn" type="submit" value="Submit">'+
				'</form>';

	fs.readFile('./data.json', function(err, data) {
		if(err) {
			console.log("err");
			return;
		}
		var info = JSON.parse(data);

		if(info.owner != "") {
			res.send(htmlHead + "<h1 class='text-center'>Hi, " + info.owner + "</h1>" +  htmlBody + htmlEnding);
		}
		else {
			res.send(htmlHead +htmlForm + htmlBody + htmlEnding);
		}
		
	});
	

});

app.get('/on', function(req, res)  {
	
})

app.post('/', function(req, res)  {
	var userName = req.body.userName;
	var html = 'Hi: ' + userName + '</br> User is saved';

	/*var user = {
		owner: userName
	}*/

	fs.readFile('./data.json', function(err, data)  {
		if(err) {
			console.log("err");
			return;
		}
		var info = JSON.parse(data);

		info.owner = userName;
		console.log(info);
		
		saveUser(info, function(err)  {
			if(err) {
				res.status(404).send('User is not saved');
				return;
			}
			//res.send(html);
			console.log("User is successfully saved");
			res.status(200);
			//res.end();

		
		
		}); 

	});


});


app.get('/data', function(req, res) {
	
	fs.readFile('data.json', function(err, data) {
		if(err) {
			res.status(404).send('Not found');
			return;
		}

		json = JSON.parse(data);

		res.send(json.owner);
	});



	
	
})

function saveUser(user, callback) {
	fs.writeFile('./data.json', JSON.stringify(user), callback);
}

app.listen(8100);