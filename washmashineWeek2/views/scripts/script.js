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
let addMode = document.getElementById('addMode');
form.onsubmit = function(e) {
	e.preventDefault();
	//alert('try to submit');
	let data = JSON.stringify(formDataToJSON(form));
	fetch('/logIn', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: "PUT",
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
	fetch('/api/getModes', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method:'GET',
		//body: JSON.stringify({chooseModes: true})
	})
	.then((res) => res.json())
	.then((data) => {
		if(data.notLogged) {
			alert('Please, log in to use the device!');
		} else {
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
		method:'GET',
		//body: JSON.stringify({chooseModes: true})
	})
	.then((res) => res.json())
	.then((data) => {
		addMode.style.display = data.addModeApp;
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