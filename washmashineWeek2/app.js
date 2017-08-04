let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
let path = require("path");
let url = require("url");
let favicon = require('serve-favicon');
let handlebars = require('handlebars');
let app = express();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'));
app.use(favicon(__dirname + '/public/favicon.ico'));
let info;
app.get('/', (req, res) => {
	fs.readFile('./data.json', (err, data) => {
  	if(err) console.log(err);
	  	info = JSON.parse(data);
	  	let changeL = info.changeLog;
	  	if(changeL) {
	  		let swClass;
	  		let drClass;
	  		if(changeL.switchClass) {
	  			swClass = changeL.switchClass;
	  			//drClass = changeL.drumClass;
	  		} else {
	  			drClass = changeL.drumClass;
	  		}
	  		let addModeMenu;
	  		if(!changeL.addModeApp) {
	  			addModeMenu = 'none';
	  		}

	  		res.render('index', {welcDivApp: changeL.welcDivApp,
	  		 	formApp: changeL.formApp, welcText: changeL.welcText,
	  			switchClass: swClass, drumClass: drClass,
	  			modesDivApp: changeL.modesDivApp, addModeApp: addModeMenu})
	  	} else {
	  		res.render('index', {welcDivApp: 'none', formApp: 'block',
	  			drumClass: 'open', modesDivApp: 'none', addModeApp: 'none'});
	  	}
  })
	//res.render('index', {welcomeText: 'HIIII'});
})
app.put('/logIn', (req, res) => {
	fs.readFile('./data.json', (err, data) => {
		if(err) console.log(err);
		info = JSON.parse(data);
		console.log(info);
		if(info.ok) {
			console.log("server ok!");
			info.changeLog = {};
			let changeL = info.changeLog;
			changeL.welcText = 'Welcome ' + req.body.userName;
			changeL.formApp = 'none';
			changeL.welcDivApp = 'block';
			info.userName = req.body.userName;
			saveChanges(info, callBack());
			res.send(JSON.stringify({welcText: changeL.welcText,
				formApp: changeL.formApp, welcDivApp: changeL.welcDivApp}));
		};
	})
});
app.put('/switchDevice', (req, res) => {
	fs.readFile('./data.json', (err, data) => {
		if(err) console.log(err);
		info = JSON.parse(data);
		if(!info.changeLog) {
			res.send(JSON.stringify({notLogged: true}));
		} else {
			let changeL = info.changeLog;
			let classOpen = 'open';
			let classOn = 'on';

			if(req.body.switchedOn) {
				changeL.switchClass = false;
				changeL.drumClass = 'open';
			} else {
				changeL.switchClass = 'on';
				changeL.drumClass = false;
			}
			saveChanges(info, callBack());
			res.send(JSON.stringify({switchClass: changeL.switchClass,
				drumClass: changeL.drumClass, open: classOpen, on: classOn}));
		}
	})
})

app.get('/logOut', (req, res) => {
	fs.readFile('./data.json', (err, data) => {
		if(err) console.log(err);
		info = JSON.parse(data);
	    info.changeLog = '';
	    
	    res.send(JSON.stringify({welcDivApp: 'none', formApp: 'block',
	    modesDivApp: 'none', userName: info.userName, addModeApp: 'none'}));
	    info.userName = '';
	    saveChanges(info, callBack());

	})
})

app.get('/api/getModes', (req, res) => {
	fs.readFile('./data.json', (err, data) => {
		if(err) console.log(err);
		info = JSON.parse(data);
		if(!info.changeLog) {
			res.send(JSON.stringify({notLogged: true}));
		} else {
			let changeL = info.changeLog;
			changeL.modesDivApp = 'block';
			saveChanges(info, callBack());
			res.send(JSON.stringify({modesDivApp: changeL.modesDivApp}));
		}	
	})
})

app.get('/api/addModeMenu', (req, res) => {
	fs.readFile('./data.json', (err, data) => {
		if(err) console.log(err);
		info = JSON.parse(data);
		let changeL = info.changeLog;
		changeL.addModeApp = 'block';
		saveChanges(info, callBack());
		res.send(JSON.stringify({addModeApp: changeL.addModeApp}));
	})	
})
function saveChanges(file, callback) {
	fs.writeFile('./data.json', JSON.stringify(file), callback);
}


function callBack() {
	return function(err) {
		if(err) {
			res.status(404).send('User data is not saved');
			return;
		}
		console.log("User data is successfully saved");
	}
}

app.listen(8080);