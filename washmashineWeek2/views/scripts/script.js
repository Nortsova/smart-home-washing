let form = document.getElementById('nameForm');
let wText = document.getElementById('welcUserText');
let welcDiv = document.getElementById('welc');
let onOff = document.getElementById('onOff');
let drum = document.getElementById('divToOpen');
let logOut = document.getElementById('logOut');
let formDiv = document.getElementById('formDiv');
let chooseModes = document.getElementById('chooseModes');
let switchModes = document.getElementById('modes');
let openAddMode = document.getElementById('addModeB');
let addModeDiv = document.getElementById('addMode');
let addModeF = document.getElementById('addModeF');
let modesTable = document.getElementById('modesTable');
let valSpin = document.getElementById('valSpin');
let valTemp = document.getElementById('valTemp');
form.onsubmit = function(e) {
	e.preventDefault();
	//alert('try to submit');
	let data = JSON.stringify(formDataToJSON(form));
	fetch('/logIn', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'PUT',
		body: data
	})
	.then((res) => res.json())
	.then((data) => {
		welcDiv.style.display = data.welcDivApp;
		wText.innerHTML = data.welcText;
		formDiv.style.display = data.formApp;
		//welcDiv.style.display = data.;
	})
}

onOff.onclick = function(e) {
	e.preventDefault(e);
	let on;
	let drOpened;
	if(onOff.classList.contains('on')) {
		on = true;
	} else {
		on = false;
	}
	if(drum.classList.contains('open')) {
		drOpened = true;
	} else {
		drOpened = false;
	}

	fetch('/switchDevice', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'PUT',
		body: JSON.stringify({switchedOn: on, drumOpened: drOpened })
	})
	.then((res) => res.json())
	.then((data) => {
		if(data.notLogged) {
			alert('Please, log in to use the device!');
		} else {
			console.log(data.switchClass + " " + data.drumClass);
			if(!data.switchClass) {
				//alert('s');
				onOff.classList.remove(data.on);
				drum.classList.add(data.open);
			} else {
				onOff.classList.add(data.on);
				drum.classList.remove(data.open);
			}
		}
	})
}

logOut.onclick = function(e) {
	e.preventDefault();

	fetch('/logOut', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'GET',
		//body: JSON.stringify({logOut: true})
	})
	.then((res) => res.json())
	.then((data) => {
		alert('Bye, ' + data.userName);
		welcDiv.style.display = data.welcDivApp;
		wText.innerHTML = '';
		formDiv.style.display = data.formApp;
		chooseModes.style.display = data.modesDivApp;
		addMode.style.display = data.addModeApp;
	})
}

switchModes.onclick = function(e) {
	e.preventDefault();
	//alert('sss');
	//let display = chooseModes.style.display;
	fetch('/api/getModes', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method:'GET',
		//body: JSON.stringify({display: chooseModes.style.display})
	})
	.then((res) => res.json())
	.then((data) => {
		if(data.notLogged) {
			alert('Please, log in to use the device!');
		} else {
			if(data.addModeApp) {
				addMode.style.display = data.addModeApp;
			}
			chooseModes.style.display = data.modesDivApp;
		}
	})
}
openAddMode.onclick = function(e) {
	e.preventDefault();
	fetch('/api/addModeMenu', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method:'GET'
		//body: JSON.stringify({chooseModes: true})
	})
	.then((res) => res.json())
	.then((data) => {
		addMode.style.display = data.addModeApp;
	})
}

addModeF.spin.onchange = function(e) {
	e.preventDefault();
	valSpin.innerHTML = addModeF.spin.value;
}

addModeF.onsubmit = function(e) {
	e.preventDefault();
	alert('trying to add mode');
	let data = JSON.stringify(formDataToJSON(addModeF));
	fetch('/api/createMode', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: data
	})
	.then((res) => res.json())
	.then((data) => {
		//alert('You added new mode!');
		let tr;
		let td;
		let bIdObj = {
			'changeMode': 'change Mode',
			'deleteMode': 'delete Mode'
		}
		addModeF.modeName.value = '';
		tr = document.createElement('tr');
		let modeObj = data.modes[data.modes.length - 1]
		for(let key in modeObj) {
			td = document.createElement('td');
			td.innerHTML = modeObj[key];
			tr.appendChild(td);
		}
		for(let key in bIdObj) {
			td = document.createElement('td');
			let button = document.createElement('button');
			button.id = key;
			button.innerHTML = bIdObj[key];
			td.appendChild(button);
			tr.appendChild(td);
		}
		modesTable.appendChild(tr);


		/*for(let i in data.modes) {
			//console.log(data.modes[i]);
			tr = document.createElement('tr');
			for(let key in data.modes[i]) {
				td = document.createElement('td');
				td.innerHTML = data.modes[i][key];
				tr.appendChild(td);
			}
			for(let key in bIdObj) {
				td = document.createElement('td');
				let button = document.createElement('button');
				button.id = key;
				button.innerHTML = bIdObj[key];
				td.appendChild(button);
				tr.appendChild(td);

			}
			
			modesTable.appendChild(tr);

		}*/
	})
}

function formDataToJSON(formElement){    
    var formData = new FormData(formElement), ConvertedJSON= {};
    for (const [key, value]  of formData.entries())
    {
        ConvertedJSON[key] = value;
    }

    return ConvertedJSON;
}