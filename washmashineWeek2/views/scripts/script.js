let form = document.getElementById('nameForm');
let wText = document.getElementById('welcUserText');
let welcDiv = document.getElementById('welc');
let onOff = document.getElementById('onOff');
let drum = document.getElementById('divToOpen');
let logOut = document.getElementById('logOut');
let formDiv = document.getElementById('formDiv');
let chooseModes = document.getElementById('chooseModes');
let switchModes = document.getElementById('modes');
let addModeClose = document.getElementById('addModeClose');
let closeAddModeForm = document.getElementById('closeAddModeForm');
let openAddMode = document.getElementById('addModeB');
let addModeDiv = document.getElementById('addMode');
let addModeForm = document.getElementById('addModeForm');
let modesTable = document.getElementById('modesTable');
let changeModeDiv = document.getElementById('changeMode');
let changeModeF = document.getElementById('changeModeF');

form.onsubmit = function (e) {
	e.preventDefault();
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
		})
}

onOff.onclick = function (e) {
	e.preventDefault(e);
	let on;
	let drOpened;
	if (onOff.classList.contains('on')) {
		on = true;
	} else {
		on = false;
	}
	if (drum.classList.contains('open')) {
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
		body: JSON.stringify({ switchedOn: on, drumOpened: drOpened })
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.notLogged) {
				alert('Please, log in to use the device!');
			} else {
				//console.log(data.switchClass + " " + data.drumClass);
				if (!data.switchClass) {
					onOff.classList.remove(data.on);
					drum.classList.add(data.open);
				} else {
					onOff.classList.add(data.on);
					drum.classList.remove(data.open);
				}
			}
		})
}

logOut.onclick = function (e) {
	e.preventDefault();

	fetch('/logOut', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'GET'
	})
		.then((res) => res.json())
		.then((data) => {
			alert('Bye, ' + data.userName);
			let tbody = document.getElementsByTagName('tbody')[0];
			if (tbody) {
				modesTable.removeChild(tbody);
			}
			welcDiv.style.display = data.welcDivApp;
			wText.innerHTML = '';
			formDiv.style.display = data.formApp;
			chooseModes.style.display = data.modesDivApp;
			addModeDiv.style.display = data.addModeApp;
			changeModeDiv.style.display = data.changeModeApp;
		})
}

switchModes.onclick = function (e) {
	e.preventDefault();
	fetch('/api/getModes', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'GET'
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.notLogged) {
				alert('Please, log in to use the device!');
			} else {
				if (data.addModeApp) {
					addModeDiv.style.display = data.addModeApp;
				}
				chooseModes.style.display = data.modesDivApp;
			}
		})
}

addModeClose.onclick = function (e) {
	e.preventDefault();
	fetch('/api/getModes', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'GET'
	})
		.then((res) => res.json())
		.then((data) => {

			if (data.addModeApp) {
				addModeDiv.style.display = data.addModeApp;
			}
			chooseModes.style.display = data.modesDivApp;

		})
}

closeAddModeForm.onclick = function (e) {
	e.preventDefault();
	fetch('/api/closeCreateMode', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'GET'
	})
		.then((res) => res.json())
		.then((data) => {
			addModeDiv.style.display = data.addModeApp;
			addModeForm.modeName.value = "";

		});
}

openAddMode.onclick = function (e) {
	e.preventDefault();
	fetch('/api/addModeMenu', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'GET'
	})
		.then((res) => res.json())
		.then((data) => {
			addModeDiv.style.display = data.addModeApp;
			changeModeDiv.style.display = data.changeModeApp
		})
}

addModeForm.onsubmit = function (e) {
	e.preventDefault();
	let data = JSON.stringify(formDataToJSON(addModeForm));
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
			let tr;
			let td;
			let buttonIdObj = {
				'changeMode': 'change Mode',
				'deleteMode': 'delete Mode'
			}
			addModeForm.modeName.value = '';
			let tbody;
			if (!modesTable.getElementsByTagName('tbody')[0]) {
				tbody = document.createElement('tbody');
				modesTable.appendChild(tbody);
			} else {
				tbody = modesTable.getElementsByTagName('tbody')[0];
			}
			tr = document.createElement('tr');
			let modeObj = data.modes[data.modes.length - 1]
			tr.id = modeObj.id;

			for (let key in modeObj) {
				if (key == 'id') continue;
				td = document.createElement('td');
				td.innerHTML = modeObj[key];
				tr.appendChild(td);
			}
			let button;
			for (let key in buttonIdObj) {
				td = document.createElement('td');
				button = document.createElement('button');
				button.classList.add(key);
				button.innerHTML = buttonIdObj[key];
				td.appendChild(button);
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
			let changeModeButtons = document.getElementsByClassName('changeMode');
			let lastChangeModeButton = changeModeButtons[changeModeButtons.length - 1];
			lastChangeModeButton.addEventListener('click',
				changeMode, false);
			let deleteModeButtons = document.getElementsByClassName('deleteMode');
			let lastDeleteModeButton = deleteModeButtons[deleteModeButtons.length - 1];
			lastDeleteModeButton.addEventListener('click',
				deleteMode, false);
			lastDeleteModeButton.classList.add("red");
			addModeDiv.style.display = data.addModeApp;
		})
}

function deleteMode() {
	let modeId = this.parentNode.parentNode.id;
	let conf = confirm('Are you sure?');
	if (conf) {
		fetch('/api/deleteMode', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'DELETE',
			body: JSON.stringify({ modeId: modeId })
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					let trToDelete = document.getElementById(modeId);
					trToDelete.parentNode.removeChild(trToDelete);
				}
			})
	}
}

function changeMode() {
	let modeId = this.parentNode.parentNode.id;
	fetch('/api/changeModeMenu?modeId=' + modeId, {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'GET'
	})
		.then((res) => res.json())
		.then((data) => {
			changeModeDiv.style.display = data.changeModeApp;
			addModeDiv.style.display = data.addModeApp;
			changeModeF.modeName.value = data.modeName;
			changeModeF.spin.value = data.spin;
			changeModeF.temp.value = data.temp;
		})
}

changeModeF.onsubmit = function (e) {
	e.preventDefault();
	let data = JSON.stringify(formDataToJSON(changeModeF), {});
	fetch('/api/changeMode', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'PUT',
		body: data
	})
		.then((res) => res.json())
		.then((data) => {
			changeModeDiv.style.display = data.changeModeApp;
			let trCells = document.getElementById(data.modeToChange.id).cells;
			console.dir(trCells)
			let i = 0;
			for (let key in data.modeToChange) {
				if (key == 'id') continue;
				trCells[i].innerHTML = data.modeToChange[key];
				i++;
			}
		})
}

function formDataToJSON(formElement) {
	var formData = new FormData(formElement), ConvertedJSON = {};
	for (const [key, value] of formData.entries()) {
		ConvertedJSON[key] = value;
	}

	return ConvertedJSON;
}