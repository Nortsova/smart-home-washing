
let express = require('express');
//let json = require('express-json');
let bodyParser = require('body-parser');
let fs = require("fs");
let path = require("path");

let app = express();


app.use(express.static(__dirname + '/public'));
console.log(__dirname + '/public');

//let json = require("./data.json")

app.use(bodyParser.urlencoded({extended: false}));
/*
app.get('/', (req, res) => {
	res.send("OK");
});*/

/*app.get('/', (req, res) => {
  
});*/

app.get('/check', (req, res) => {
	
	
	//let testObjStr = JSON.stringify(json);

	/*fs.readFile('./data.json', (err, data) => {
		if(err) {
			console.log("err");
			return;
		}
		//json = JSON.parse(data);
		res.send(typeof data);
	});
*/

	/*if(testObjStr.owner != "") res.send("LOGGED");
	else res.send("(((");*/

	//res.send(typeof testObjStr);
	//res.send(typeof json);

	//res.send(testObjStr.owner);
	/*let html = '<form action="/" method="post">' +
				'Enter your name</br>' +
				'<input type="text" name="userName"></br>'+
				'<input type="submit" value="Submit"></br>'+
				'</form>';*/


	//res.sendFile(__dirname + '/index.html');
	
});

app.get('/', (req, res) => {
	let path = __dirname + '/public';
	let htmlHead = '<!DOCTYPE html><html lang="en">' +
				'<head>' +
				'<meta charset="UTF-8">' +
				'<title>Smart-house</title>' +
				'<link rel="stylesheet" type="text/css" href="/style.css">'+
				'</head> ';
	let htmlBody = '<body>' +
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
	let htmlEnding = '<script type="text/javascript" src="/script.js">'+'</script>'+
					'</body>'+
					'</html>';

	let htmlForm = '<form id="nameForm" action="/" method="post">'+
				'<input type="text" name="userName" placeholder="User Name">'+
				'<input type="submit" value="Submit">'+
				'</form>';

	fs.readFile('./data.json', (err, data) => {
		if(err) {
			console.log("err");
			return;
		}
		let info = JSON.parse(data);

		if(info.owner != "") {
			res.send(htmlHead + htmlBody + "<p>Hi, " + info.owner + "</p>" + htmlEnding);
		}
		else {
			res.send(htmlHead + htmlBody + htmlForm + htmlEnding);
		}
		
	});
	

});

app.post('/', (req, res) => {
	let userName = req.body.userName;
	let html = 'Hi: ' + userName + '</br> User is saved';

	/*let user = {
		owner: userName
	}*/

	fs.readFile('./data.json', (err, data) => {
		if(err) {
			console.log("err");
			return;
		}
		let info = JSON.parse(data);

		info.owner = userName;
		console.log(info);
		//res.send(typeof data);
		/*fs.writeFile('./data.json', JSON.stringify(info), (err) => {
			if(err) {
				res.status(404).send('User is not saved');
				return;
			}
			console.log("User saved");
		});*/
		saveUser(info, (err) => {
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



	


	//res.send(html);
});


app.get('/data', (req, res) => {
	//res.json(req.body.owner);
	

	fs.readFile('data.json', (err, data) => {
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