let form = document.getElementById('nameForm');
let formDiv = document.getElementById('formDiv');
window.onload = windLoad();
let check = false;
function FormDataToJSON(FormElement){    
    var formData = new FormData(FormElement), ConvertedJSON= {};
    for (const [key, value]  of formData.entries())
    {
        ConvertedJSON[key] = value;
    }

    return ConvertedJSON;
}

function formSubmit() {
	return function(e) {
		e.preventDefault();
		let data = JSON.stringify(FormDataToJSON(form));
		console.log(data);
		fetch("/main",
		{
			headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
			},
			method: "POST",
			body:  data
		})
		.then(function(res){ return res.json(); })
		.then(function(data){ 
			console.log(data);
			if(data.status == "Ok") {

				document.getElementById('logOut').style.display = "inline-block";
				document.getElementById('formDiv').style.display = "none";
				document.getElementById('welc').style.display = "block";
				
				let welcome;
				let helloSH;
				if(!check) {
					welcome = document.createElement("h2");
					welcome.id = "welcomeText";
					welcome.classList.add('text-center');
					welcome.innerHTML = "Welcome, " + data.userN;
					helloSH = document.getElementById('welc');
					helloSH.appendChild(welcome);
					check = true;
				} 
				
			};
		})
	};
}

let onOff = document.getElementById('switch');


function windLoad() {
	return function() {
		fetch("./", 
		{
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({"needToUpgr": true})
		})
		.then(function(res) {return res.json();})
		.then(function(data) {
			if(data.status == 'success') {
				
				let door = document.getElementById('divToOpen');
				let onOff = document.getElementById('switch')
				if(data.haveToTurn == "off") {

				   door.classList.add('open');
				   onOff.classList.remove('on');
				} else {
					
					door.classList.remove('open');
					onOff.classList.add('on');
				}
			}
		})
	}
}

function OnOffFunc() {

	return function(e) {
		let status = {};
	
	    if(onOff.classList.contains('on')) {
	    	status["on"] = true;
	    } else {
	    	status["on"] = false;
	    	
	    }
		fetch("./", 
		{
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify(status)
		})
		.then(function(res) {return res.json();})
		.then(function(data) {
			if(data.status == 'success') {
				
				let door = document.getElementById('divToOpen');
				let onOff = document.getElementById('switch')
				if(data.haveToTurn == "off") {
				   door.classList.add('open');
				   onOff.classList.remove('on');
				} else {
					door.classList.remove('open');
					onOff.classList.add('on');
				}
			} else if(data.notLogged) {
				alert("You have to log in first!");
			} 
		})
	}
};

onOff.onclick = OnOffFunc();

let logOut = document.getElementById('logOut');

logOut.onclick = function(e) {
	fetch('./', 
	{
		headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
		},
		method: "POST",
		body: JSON.stringify({logOut: true})	
	})
	.then(function(res) {return res.json();})
	.then(function(data) {
		if(data.status == 'ok') {
			//document.getElementById('logOut').style.display = "none";
			if(document.getElementById('welcOnLoad') != null) {
				document.getElementById('welcOnLoad').style.display = "none";
			}
			document.getElementById('formDiv').style.display = "block";
			document.getElementById('Uname').value = "";
			document.getElementById('logOut').style.display = "none";
			document.getElementById('welcomeText').style.display = "none";
			//document.getElementById('logOut').style.display = "none";

		}
	})
}