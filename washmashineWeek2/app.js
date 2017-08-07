let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
let path = require("path");
let url = require("url");
let favicon = require('serve-favicon');
//let handlebars = require('handlebars');
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
	  			changeL.drumClass = 'open';
	  			drClass = changeL.drumClass;
	  		}
	  		//let addModeMenu;
	  		if(!changeL.addModeApp) {
	  			changeL.addModeApp = 'none';
	  		} 
	  		let modeArr;
	  		if(!changeL.modes) {
	  			modeArr = [];
	  		} else {
	  			modeArr = changeL.modes;
	  		}
	  		//let changeModeMenu;
	  		if(!changeL.changeModeApp) {
	  			changeL.changeModeApp = 'none';
	  		} 
	  		
	  		if(!changeL.modesDivApp) {
	  			changeL.modesDivApp = 'none';
	  		}

	  		res.render('index', {welcDivApp: changeL.welcDivApp,
	  		 	formApp: changeL.formApp, welcText: changeL.welcText,
	  			switchClass: swClass, drumClass: drClass,
	  			modesDivApp: changeL.modesDivApp, addModeApp: changeL.addModeApp,
	  			modes: modeArr, changeModeApp: changeL.changeModeApp,
	  			modeProps: changeL.modeProps})
	  	} else {
	  		res.render('index', {welcDivApp: 'none', formApp: 'block',
	  			drumClass: 'open', modesDivApp: 'none', addModeApp: 'none',
	  			modes: [], changeModeApp: 'none'});
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
			if(changeL.modesDivApp == 'block') {
				changeL.modesDivApp = 'none';
				changeL.addModeApp = 'none';
				res.send({modesDivApp: changeL.modesDivApp,
					addModeApp: changeL.addModeApp});
			} else {
				changeL.modesDivApp = 'block';
				res.send(JSON.stringify({modesDivApp: changeL.modesDivApp}));
			}
			saveChanges(info, callBack());
			
		}	
	})
})

app.get('/api/addModeMenu', (req, res) => {
	fs.readFile('./data.json', (err, data) => {
		if(err) console.log(err);
		info = JSON.parse(data);
		let changeL = info.changeLog;
		changeL.addModeApp = 'block';
		changeL.changeModeApp = 'none';
		saveChanges(info, callBack());
		res.send(JSON.stringify({addModeApp: changeL.addModeApp,
			changeModeApp: changeL.changeModeApp}));
	})	
})
app.post('/api/createMode', (req, res) => {
	fs.readFile('./data.json', (err, data) => {
		if(err) console.log(err);
		info = JSON.parse(data);
		let changeL = info.changeLog;
		if(!changeL.modes) {
			changeL.modes = [];
		} 
		let modes = changeL.modes;
		modes.push({});
		modes[modes.length - 1].modeName = req.body.modeName;
		modes[modes.length - 1].spin = req.body.spin;
		modes[modes.length - 1].temp = req.body.temp;
		modes[modes.length - 1].id = Math.floor(Math.random() * 1000);
		changeL.addModeApp = 'none';
	 
		saveChanges(info, callBack());
		res.send(JSON.stringify({modes: changeL.modes, addModeApp: changeL.addModeApp }));
	})
});
//let modeToChange;
app.post('/api/changeModeMenu', (req, res) => {
	fs.readFile('./data.json', (err, data) => {
		if(err) console.log(err);
		info = JSON.parse(data);
		let changeL = info.changeLog;
		let modes = changeL.modes;
		let modeToChange;
		for(let i = 0; i < modes.length; i++) {
			if(modes[i].id == req.body.modeId) {
				modeToChange = modes[i];
				break;
			}
		}
		console.log(modeToChange);
		changeL.changeModeApp = 'block';
		changeL.addModeApp = 'none';
		let modeProps;
		if(!changeL.modeProps) {
			changeL.modeProps = {};
		}
		modeProps = changeL.modeProps;
		modeProps.modeName = modeToChange.modeName;
		modeProps.spin = modeToChange.spin;
		modeProps.temp = modeToChange.temp;
		modeProps.id = modeToChange.id;
		saveChanges(info, callBack());
		res.send(JSON.stringify({changeModeApp: changeL.changeModeApp,
			modeName: modeProps.modeName, spin: modeProps.spin,
			temp: modeProps.temp, addModeApp: changeL.addModeApp}));

	})
})
app.put('/api/changeMode', (req, res) => {
	fs.readFile('./data.json', (err, data) => {
		if(err) console.log(err);
		info = JSON.parse(data);
		let changeL = info.changeLog;
		let modes = changeL.modes;
		let modeProps = changeL.modeProps;
		let modeToChange;
		changeL.changeModeApp = 'none';
		for(let i = 0; i < modes.length; i++) {
			if(modes[i].id == modeProps.id) {
				modeToChange = modes[i];
				break;
			}
		}
		modeToChange.modeName = req.body.modeName;
		modeToChange.spin = req.body.spin;
		modeToChange.temp = req.body.temp;
		saveChanges(info, callBack());
		res.send(JSON.stringify({changeModeApp: changeL.changeModeApp,
			modeToChange: modeToChange}))

	})
})

app.delete('/api/deleteMode', (req, res) => {
	fs.readFile('./data.json', (err, data) => {
		if(err) console.log(err);
		info = JSON.parse(data);
		let changeL = info.changeLog;
		let modes = changeL.modes;
		// modeId;
		console.log(modes);
		let index;
		for(let i = 0; i < modes.length; i++) {
			if(modes[i].id == req.body.modeId) {
				console.log(modes[i]);
				console.log(i);
				index = i;
				break;
			}
		}
		modes.splice(index, 1);
		console.log(modes);
		saveChanges(info, callBack());
		res.send(JSON.stringify({success: true}));


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