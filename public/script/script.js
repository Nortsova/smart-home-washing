let form = document.getElementById('form');
function FormDataToJSON(FormElement){    
    var formData = new FormData(FormElement), ConvertedJSON= {};
    for (const [key, value]  of formData.entries())
    {
        ConvertedJSON[key] = value;
    }

    return ConvertedJSON
}

form.onsubmit = function(e) {
	e.preventDefault();
	let data = JSON.stringify(FormDataToJSON(form));
	fetch("./login",
	{
		headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
		},
		method: "POST",
		body:  data
	})
	.then(function(res){ return res.json(); })
	.then(function(data){ console.log(data) })
};

