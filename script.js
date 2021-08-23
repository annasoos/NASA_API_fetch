
let apiOrigin = "https://api.nasa.gov/planetary/apod?api_key=gdL3xO8OrxWCFsfoAwpMqBrewAxSFejGzNbijaXx";
let apiURL = apiOrigin;

function fetching() {
	fetch(apiURL)
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		console.log(data);

		let explanationOutput = `${data.explanation}`;
		let dateOutput = `${data.date}`;
		let titleOutput = `${data.title}`;
		let imageSource = `${data.url}`;

		console.log(imageSource);

		document.getElementById("explanation").innerHTML = explanationOutput;
		document.getElementById("dateOfPicture").innerHTML= dateOutput;
		document.getElementById("title").innerHTML = titleOutput;

		if (data.url.includes("youtube")){
			document.getElementById("container").innerHTML = `<iframe id="iframe"></iframe>`;
			document.getElementById("iframe").src = imageSource;
		} else{
			document.getElementById("container").innerHTML = `<img id="image">`;
			document.getElementById("image").src = imageSource;
		};
		
	})
	.catch(function (error) {
		console.log("ERROR");
	});
};


function loadEvent() {

	const rootElement = document.getElementById("root");

	rootElement.insertAdjacentHTML('afterbegin', `
		<label>Pick a day!</label>
		<input id="date" type="date" id="input" min="1995-06-16">
		<h1 id="headline"> Astronomy Picture of The Day </h1>
		<p id="explanation"></p>
		<div id="dateOfPicture"></div>
		<div id="container"></div>
		<text id="title"></text>
	`);

	// DATE PICKER INPUT & MAX VALUE SET TO ACTUAL DATE


	let inputField = document.querySelector('#date');

	let date = new Date();

	inputField.value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0);

	inputField.max = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0);


	// CALL FETCH FUNCTION

	fetching();

	// MODIFY THE API URL WITH THE INPUT VALUE

	inputField.addEventListener('change', updateAPIurl);

	function updateAPIurl() {

		let newDateValue = inputField.value;

		console.log(newDateValue);

		apiURL = apiOrigin + "&date=" + newDateValue;

		console.log(apiURL);

		fetching(); //CALL FETCH AGAIN TO REFRESH THE CONTENT

		return apiURL;
	};

};

window.addEventListener("load", loadEvent);
