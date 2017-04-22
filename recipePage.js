$(document).ready(function() {

	var url = window.location.href
	
	//Get the id of the clicked recipe
	function getId() {
		var id = url.split('?')[1].split('=')[1].split("&")[0];
		return id;
	}

	//Get the name of the clicked recipe
	function getName() {
		var name = url.split('?')[1].split('&')[1].split('=')[1];
		name = name.replace(/%20/g, " ");
		return name;
	}

	//API Request
	var recipe = new XMLHttpRequest();
	recipe.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + getId() + "/analyzedInstructions?mashape-key=0gbpW6Rs1ymshDLw1GaH2g0W8JOjp1x5kCQjsnPQ3FoiRkIu0D", false);
	recipe.send();

	//Parse what API returns
	var recipeParsed = JSON.parse(recipe.response);

	var img = document.createElement('img');
	img.setAttribute('id', 'img');
	// img.setAttribute('src', )
	document.body.appendChild(img);

	for (var i = 0; i < recipeParsed.length; i++) {

	}


	//recipeParsed[0].steps[0].step

	console.log(test());

})
	