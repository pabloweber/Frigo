$(document).ready(function() {

	var url = window.location.href
	
	//Get the id of the clicked recipe
	function getId() {
		var id = url.split('?')[1].split('=')[1].split("&")[0];
		return id;
	}

	//API Request
	var steps = new XMLHttpRequest();
	steps.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + getId() + "/analyzedInstructions?mashape-key=0gbpW6Rs1ymshDLw1GaH2g0W8JOjp1x5kCQjsnPQ3FoiRkIu0D", false);
	steps.send();

	var summaryApi = new XMLHttpRequest();
	summaryApi.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + getId() + "/summary?mashape-key=0gbpW6Rs1ymshDLw1GaH2g0W8JOjp1x5kCQjsnPQ3FoiRkIu0D", false);
	summaryApi.send();

	//Parse what API returns
	var stepsParsed = JSON.parse(steps.response);
	var summaryParsed = JSON.parse(summaryApi.response);

	var summary = summaryParsed.summary;

	var container = document.createElement('div');
	container.setAttribute('id', 'container');
	document.body.appendChild(container);

	var main = document.createElement('div');
	main.setAttribute('id', 'main');
	container.appendChild(main);

	//Add image to DOM
	var imgUrl = sessionStorage.getItem('imageURL');
	var img = document.createElement('img');
	img.setAttribute('id', 'img');
	img.setAttribute('src', imgUrl);
	main.appendChild(img);

	//Add title to DOM
	var titleText = sessionStorage.getItem('title');
	var title = document.createElement('div');
	title.setAttribute('id', 'title');
	title.innerHTML = "<b>" + titleText + "</b>";
	main.appendChild(title);

	//Add summary to DOM
	var summaryDiv = document.createElement('div');
	summaryDiv.setAttribute('id', 'summary');
	summaryDiv.innerHTML = summary;
	main.appendChild(summaryDiv);

	//Add ingredients to DOM
	var ingredients = document.createElement('div');
	ingredients.setAttribute('id', 'ingredients');
	// ingredients.innerHTML = 

	var clear = document.createElement('br');
	clear.setAttribute('class', 'clear');
	main.appendChild(clear);

	for (var i = 0; i < stepsParsed.length; i++) {
		stepsParsed[0].steps[i].ingredients
	}


	//recipeParsed[0].steps[0].step
})
