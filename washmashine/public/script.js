let form = document.getElementById('nameForm');

function FormDataToJSON(FormElement){    
    var formData = new FormData(FormElement), ConvertedJSON= {};
    for (const [key, value]  of formData.entries())
    {
        ConvertedJSON[key] = value;
    }

    return ConvertedJSON;
}

form.onsubmit = function(e) {
	e.preventDefault();
	let data = JSON.stringify(FormDataToJSON(form));
	fetch("./",
	{
		headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
		},
		method: "POST",
		body:  data
	})
	.then(function(res){ return res.json(); })
	.then(function(data){ if(data.status == "SUCCESS") {
							//alert('You successfully logged in! WELCOME');
							document.getElementById('formDiv').style.display = "none";
							let welcome = document.createElement("h1");
							welcome.classList.add('text-center');
							welcome.innerHTML = "Welcome, " + data.userN;
							let parentEl = document.getElementById('welc').parentNode;
							parentEl.insertBefore(welcome, document.getElementById('welc'));
							//document.getElementById('welc').appendChild(welcome);
						   };
						})
};

let onOff = document.getElementById('switch');

onOff.onclick = function(e) {
	e.preventDefault();
	let status = {};
    if(onOff.classList.contains('switch on')) {
    	status["on"] = true;
    	alert("D");
    } else {
    	status["on"] = false;
    }
	fetch("./on", 
	{
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: "POST",
		body: JSON.stringify(status)
	})
	.then(function(res) {return res.json();})
	.then(function(data) {console.log(data)})
};