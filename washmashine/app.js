
let express = require('express');
//let json = require('express-json');
let bodyParser = require('body-parser');
let fs = require("fs");
let path = require("path");


let app = express();


app.use(express.static(__dirname + '/public'));
console.log(__dirname + '/public');

//let json = require("./data.json")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function (req, res){
	let path = __dirname + '/public';
	let htmlHead = '<!DOCTYPE html><html lang="en">' +
				'<head>' +
				'<meta charset="UTF-8">' +
				'<title>Smart-house</title>' +
				'<link rel="stylesheet" type="text/css" href="/styles/main.css">'+
				'</head> ' +
				'<body>';
	let htmlBody = '<div id = "welc" class="text-center"><h2>Hello, SMARTHOUSE!!</h2></div>' +
					'<div class="washing">'+
					'<div class="panel">'+
					'<a href="/on" id="switch" class="switch on">on/off</a>'+
					'</div>'+
					'<div class="drum open">'+
					'<div id="door" class="door "></div>'+
					'</div>'+
					'</div>'+
					'</br>';
	let htmlEnding = '<script type="text/javascript" src="/script.js">'+'</script>'+
					'</body>'+
					'</html>';

	let htmlForm = '<div id="formDiv"><form id="nameForm" class="form text-center" action="/" method="post">'+
				'<input type="text" name="userName" placeholder="User Name">'+
				'<input class="btn" type="submit" value="Submit">'+
				'</form></div>';
    

	fs.readFile('./data.json', function(err, data) {
		if(err) {
			console.log("err");
			return;
		}
		let info = JSON.parse(data);

		if(info.owner != "") {
			res.send(htmlHead + "<h1 class='text-center'>Welcome, " + info.owner + "</h1>" +  htmlBody + htmlEnding);
		}
		else {
			res.send(htmlHead +htmlForm + htmlBody + htmlEnding);
		}
		
	});
	

});

/*app.get('/on', function(req, res)  {
	
})*/

app.post('/', function(req, res)  {
	//let userName = req.body.userName;
	//let html = 'Hi: ' + userName + '</br> User is saved';

	/*let user = {
		owner: userName
	}*/
	//console.log(req.body);

	fs.readFile('./data.json', function(err, data)  {
		if(err) {
			console.log("err");
			return;
		}
		let info = JSON.parse(data);

		info.owner = req.body.userName;
		console.log(info);
		
		saveUser(info, function(err)  {
			if(err) {
				res.status(404).send('User is not saved');
				return;
			}
			//res.send(html);
			console.log("User is successfully saved");
			//res.status(200);
			res.send({ status: 'SUCCESS', userN: info.owner });
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

app.post("/on", (req, res) => {
	fs.readFile('./data.json', function(err, data)  {
		if(err) {
			console.log("err");
			return;
		}
		let info = JSON.parse(data);
		console.log(req.status.on);
		// if(info.on && req.) {

		// }
		//info.on = req.body.userName;
		//console.log(info);
		
		/*saveUser(info, function(err)  {
			if(err) {
				res.status(404).send('User is not saved');
				return;
			}
			//res.send(html);
			console.log("User is successfully saved");
			//res.status(200);
			res.send({ status: 'SUCCESS', userN: info.owner });
			//res.end();

		
		
		}); */

	});
})
function saveUser(user, callback) {
	fs.writeFile('./data.json', JSON.stringify(user), callback);
}

app.listen(8080);