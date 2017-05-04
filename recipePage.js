$(document).ready(function() {

	var url = window.location.href
	
	//Get the id of the clicked recipe
	function getId() {
		var id = url.split('?')[1].split('=')[1].split("&")[0];
		return id;
	}

	//API Request
	var steps = new XMLHttpRequest();
	steps.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + getId() + "/analyzedInstructions?stepBreakdown=true&mashape-key=0gbpW6Rs1ymshDLw1GaH2g0W8JOjp1x5kCQjsnPQ3FoiRkIu0D", false);
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
	var imgUrl = sessionStorage.getItem('imageURL' + sessionStorage.getItem('idOfClicked'));
	var img = document.createElement('img');
	img.setAttribute('id', 'img');
	img.setAttribute('src', imgUrl);
	main.appendChild(img);

	//Add title + summary to DOM
	var summaryDiv = document.createElement('div');
	summaryDiv.setAttribute('id', 'summary');
	var titleId = 'title' + sessionStorage.getItem('idOfClicked');
	var title = sessionStorage.getItem(titleId);
	summaryDiv.innerHTML =  "<span id='title'><b>" + title + "</b></span>" + summary;
	main.appendChild(summaryDiv);

	//Add ingredients to DOM
	var ingredients = document.createElement('div');
	ingredients.setAttribute('id', 'ingredients');
	// ingredients.innerHTML = 

	var clear = document.createElement('br');
	clear.setAttribute('class', 'clear');
	main.appendChild(clear);

	// for (var i = 0; i < stepsParsed.length; i++) {
	// 	stepsParsed[0].steps[i].ingredients
	// }

	var instructions = document.createElement('div');
	var instructionsTitle = document.createElement('span');
	instructionsTitle.setAttribute('id', 'instructionsTitle');
	instructionsTitle.innerHTML = "Instructions";
	instructions.appendChild(instructionsTitle);
	instructions.setAttribute('class', 'instructions');
	container.appendChild(instructions);

	var instructionSpan = [];
	var j = 1;

	for (var k = 0; k < stepsParsed[0].steps.length; k++) {

		for (var a = 0; a < stepsParsed[0].steps[k].ingredients.length; a++) {
			console.log(stepsParsed[0].steps[k].ingredients[a])
		}

	}

	for (var i = 0; i < stepsParsed[0].steps.length; i++) {

		var isNumber =  /^\d+$/.test(stepsParsed[0].steps[i].step);

		if (isNumber == true) {
			continue;
		}

		instructionSpan[i] = document.createElement('span');
		instructionSpan[i].setAttribute('class', 'instructionSpan');
		instructionSpan[i].innerHTML = "<b><span id='stepNumber'>" + (j) + ".</span>" + "</b> " + stepsParsed[0].steps[i].step;

		instructions.appendChild(instructionSpan[i]);

		j += 1
	}
})
