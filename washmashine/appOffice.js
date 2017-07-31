'use strict';
var express = require('express');
//let json = require('express-json');
var bodyParser = require('body-parser');
var fs = require("fs");
var path = require("path");

var app = express();


app.use(express.static(__dirname + '/public'));
console.log(__dirname + '/public');

//let json = require("./data.json")

app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function (req, res) {
	var path = __dirname + '/public';
	var htmlHead = '<!DOCTYPE html><html lang="en">' +
				'<head>' +
				'<meta charset="UTF-8">' +
				'<title>Smart-house</title>' +
				'<link rel="stylesheet" type="text/css" href="/style.css">'+
				'</head> ';
	var htmlBody = '<body>' +
					'<p>Hello, SMARTHOUSE!!</p>' +
					'<div class="washing">'+
					'<div class="panel">'+
					'<a href="#" id="switch" class="switch on">on/off</a>'+
					'</div>'+
					'<div class="drum">'+
					'<div id="door" class="door open"></div>'+
					'</div>'+
					'</div>'+
					'</br>';
	var htmlEnding = '<script type="text/javascript" src="/script.js">'+'</script>'+
					'</body>'+
					'</html>';

	var htmlForm = '<form id="nameForm" action="/" method="post" >'+
				'<input type="text" name="userName" placeholder="User Name">'+
				'<input type="submit" value="Submit" >'+
				'</form>'+
				'<button id="b" value="Love" onclick="alertName(this); return false;">Love</button>';
//onsubmit="alertName(this); return false;" - add to form tag
	fs.readFile('./data.json', function (err, data) {
		if(err) {
			console.log("err");
			return;
		}
		var info = JSON.parse(data);

		if(info.owner != "") {
			res.send(htmlHead + htmlBody + "<p id='halloPar'>Hi, " + info.owner + "</p>" + htmlEnding);
		}
		else {
			res.send(htmlHead + htmlBody + htmlForm + htmlEnding);
		}
		
	});
	

});

app.get('/on', function (req, res) {
	
})

app.post('/', function (req, res) {
	var userName = req.body.userName;
	//var html = 'Hi: ' + userName + '</br> User is saved';

	/*let user = {
		owner: userName
	}*/

	fs.readFile('./data.json', function (err, data) {
		if(err) {
			console.log("err");
			return;
		}
		var info = JSON.parse(data);

		info.owner = userName;
		console.log(info);
		
		saveUser(info, function (err)  {
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


app.get('/data', function (req, res) {
	
	fs.readFile('data.json', function (err, data) {
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

app.listen(8080);