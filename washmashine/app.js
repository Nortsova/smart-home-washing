let express = require('express');
let bodyParser = require('body-parser');
let fs = require("fs");
let path = require("path");
let url = require("url");

let app = express();


app.use(express.static(__dirname + '/public'));
//app.use('/main', express.static('public'));
//console.log(__dirname + '/public');
//app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//let path = __dirname + '/public';
/*
let htmlHead = '<!DOCTYPE html><html lang="en">' +
				'<head>' +
				'<meta charset="UTF-8">' +
				'<title>Smart-house</title>' +
				'<link rel="stylesheet" type="text/css" href="/styles/main.css">'+
				'</head> ' +
				'<body>';
				

let htmlBody = '<div class="washing">'+
				'<div class="panel">'+
				'<button id="switch" class="switch">on/off</button>'+
				'</div>'+
				'<div id="divToOpen" class="drum open">'+
				'<div id="door" class="door "></div>'+
				'</div>'+
				'</div>'+
				'</br>';

let htmlEnding = '<script type="text/javascript" src="/script.js">'+'</script>'+
				'</body>'+
				'</html>';

let htmlForm = ['<div id="formDiv"',' style="display:none"','><form id="nameForm"' + 
				'class="form text-center" action="/main" onsubmit="formSubmit()"' + 
				'method="post"><input type="text" id="Uname" name="userName"' +
				'placeholder="User Name" required><input class="btn" type="submit"' + 
				'value="Submit"></form></div>'];

let logOutButton = ['<div id = "welc" class="text-center"><h2>Hello, SMARTHOUSE!</h2>'+
				'<button id="logOut"',' style="display:none"','>Log out</button></div>'];*/

app.get('/', (req, res) =>{
	/*let path = __dirname + '/public';*/

	let htmlHead = '<!DOCTYPE html><html lang="en">' +
				'<head>' +
				'<meta charset="UTF-8">' +
				'<title>Smart-house</title>' +
				'<link rel="stylesheet" type="text/css" href="/styles/main.css">'+
				'</head> ' +
				'<body>';
				

	let htmlBody = '<div class="washing">'+
					'<div class="panel">'+
					'<button id="switch" class="switch">on/off</button>'+
					'</div>'+
					'<div id="divToOpen" class="drum open">'+
					'<div id="door" class="door "></div>'+
					'</div>'+
					'</div>'+
					'</br>';

	let htmlEnding = '<script type="text/javascript" src="/script.js">'+'</script>'+
					'</body>'+
					'</html>';

	let htmlForm = ['<div id="formDiv"',' style="display:none"','><form id="nameForm"' + 
					'class="form text-center" action="/" ' + 
					'method="post"><input type="text" id="Uname" name="userName"' +
					'placeholder="User Name" required><input class="btn" type="submit"' + 
					'value="Submit"></form></div>'];

	let logOutButton = ['<div id = "welc" class="text-center"><h2>Hello, SMARTHOUSE!</h2>'+
					'<button id="logOut"',' style="display:none"','>Log out</button></div>'];
    

	fs.readFile('./data.json', (err, data) => {
		if(err) {
			console.log("err");
			return;
		}
		let info = JSON.parse(data);

		if(info.owner != "") {
			
				res.send(htmlHead + '<h1 id="welcOnLoad" class="text-center">Welcome, ' + 
						info.owner + '</h1>' +  logOutButton[0] + logOutButton[2]  + 
						htmlForm[0] + htmlForm[1] + htmlForm[2] + htmlBody + htmlEnding);
			
		}
		else {
			res.send(htmlHead + logOutButton[0] + logOutButton[1] + logOutButton[2] +
			 htmlForm[0] + htmlForm[2] + htmlBody + htmlEnding);
		}
		
	});

});

/*app.get('/main', (req, res) =>{


	fs.readFile('./data.json', (err, data) => {
		if(err) {
			console.log("err");
			return;
		}
		let info = JSON.parse(data);

		if(info.owner != "") {
			
				res.send(htmlHead + '<h1 id="welcOnLoad" class="text-center">Welcome, ' + 
						info.owner + '</h1>' +  logOutButton[0] + logOutButton[2]  + 
						htmlForm[0] + htmlForm[1] + htmlForm[2] + htmlBody + htmlEnding);
			
		}
		else {
			res.send(htmlHead + logOutButton[0] + logOutButton[1] + logOutButton[2] +
			 htmlForm[0] + htmlForm[2] + htmlBody + htmlEnding);
		}
		
	});

});


app.post('/main', (req, res) => {
	fs.readFile('./data.json', (err, data) => {
		if(err) {
			console.log("err");
			return;
		}
		let info = JSON.parse(data);

		if(info.owner != "") {
			
				res.send(htmlHead + '<h1 id="welcOnLoad" class="text-center">Welcome, ' + info.owner + '</h1>' +  logOutButton[0] + logOutButton[2]  + htmlForm[0] + htmlForm[1] + htmlForm[2] + htmlBody + htmlEnding);
			
		}
		else {
			res.send(htmlHead + logOutButton[0] + logOutButton[1] + logOutButton[2] + htmlForm[0] + htmlForm[2] + htmlBody + htmlEnding);
		}

		if(req.body.userName != null) {
			

			info.owner = req.body.userName;
			console.log(info);

			saveSettings(info, callBack());
			
			//res.setHeader('Content-Type', 'text/html');
			//res.status(200).json({status: 'Ok', userN: info.owner});
			let json = {status: 'Ok', userN: info.owner};

			//res.contentType('json');
			res.send(json);
		
			
		}

	})
})*/

app.post('/', (req, res) =>  {
	
	fs.readFile('./data.json', (err, data) =>  {
		if(err) {
			console.log("err");
			return;
		}
		let info = JSON.parse(data);
		if(req.body.userName != null) {
			

			info.owner = req.body.userName;
			console.log(info);

			saveSettings(info, callBack());
			
			//res.setHeader('Content-Type', 'text/html');
			//res.status(200).json({status: 'Ok', userN: info.owner});
			let json = {status: 'Ok', userN: info.owner};

			//res.contentType('json');
			res.send(json);
		
			
		} else if(req.body.on != null) {
			if(!info.owner) {
				res.send({notLogged: true});
			} else {
				//console.log( info.on);
				//console.log( req.body.on);
				changeOnOff(info);
			}
			
		} else if(req.body.needToUpgr) {
			//console.log(typeof req.body.needToUpgr);
			let jsonToSend = {};
			if(info.on) {
				//res.send({status: 'success', haveToTurn: 'on'})
				jsonToSend.status = 'success';
				jsonToSend.haveToTurn = 'on';
			} else
			{
				jsonToSend.status = 'success';
				jsonToSend.haveToTurn = 'off';
				//res.send({status: 'success', haveToTurn: 'off'});
			}
			res.send(jsonToSend);
			
				
			
		} else if(req.body.logOut) {
			info.owner = "";
			saveSettings(info, callBack());
			res.send({status: 'ok'})
		}

	});

	function changeOnOff(info) {
		if(info.on && req.body.on) {
			console.log("have to turn off");
			info.on = false;
			res.send({status: 'success', haveToTurn: 'off'});
		} else if (!info.on && !req.body.on) {
			console.log("have to turn on");
			info.on = true;
			res.send({status: 'success', haveToTurn: 'on'});
		}

		saveSettings(info, callBack());
	}




});

function callBack() {
	return function(err) {
		if(err) {
			res.status(404).send('User data is not saved');
			return;
		}
		console.log("User data is successfully saved");
	}
}


function saveSettings(settings, callback) {
	fs.writeFile('./data.json', JSON.stringify(settings), callback);
}

app.listen(8080);