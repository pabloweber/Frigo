$(document).ready(function() {

	var url = window.location.href
	
	//Get the id of the clicked recipe
	function getId() {
		var id = url.split('?')[1].split('=')[1].split("&")[0];
		return id;
	}

	//API Request
	var steps = new XMLHttpRequest();
	steps.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + getId() + "/analyzedInstructions?stepBreakdown=true&mashape-key=btSAgzlS6CmshxyNyEh24vDF8sl2p1w43h9jsnCABHsQZSfxx6", false);
	steps.send();

	var summaryApi = new XMLHttpRequest();
	summaryApi.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + getId() + "/summary?mashape-key=btSAgzlS6CmshxyNyEh24vDF8sl2p1w43h9jsnCABHsQZSfxx6", false);
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

	var description = document.createElement('div');
	description.setAttribute('class', 'description');
	container.appendChild(description)

	var instructions = document.createElement('div');
	var instructionsTitle = document.createElement('span');
	instructionsTitle.setAttribute('id', 'instructionsTitle');
	instructionsTitle.innerHTML = "Instructions";
	instructions.appendChild(instructionsTitle);
	instructions.setAttribute('class', 'instructions');
	container.appendChild(instructions);

	var instructionUl = document.createElement('ol');
	instructions.appendChild(instructionUl);
	var j = 1;
	var instructionLi = [];

	for (var k = 0; k < stepsParsed[0].steps.length; k++) {

		for (var a = 0; a < stepsParsed[0].steps[k].ingredients.length; a++) {
			console.log(stepsParsed[0].steps[k].ingredients[a])
		}

	}

	for (var i = 0; i < stepsParsed[0].steps.length; i++) {

		var isNumber =  /^\d+$/.test(stepsParsed[0].steps[i].step);

		if (isNumber) {
			continue;
		}

		instructionLi[i] = document.createElement('li');
		instructionLi[i].setAttribute('class', 'instructionLi');
		instructionLi[i].innerHTML = stepsParsed[0].steps[i].step;

		instructionUl.appendChild(instructionLi[i]);

		j += 1
	}

	instructions.appendChild(instructionUl)

	description.appendChild(instructions);

})
