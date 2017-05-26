$(document).ready(function() {

	var url = window.location.href;
	
	//Get the id of the clicked recipe
	var id = url.split('?')[1].split('=')[1];


	//API Request
	var steps = new XMLHttpRequest();
	steps.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + id + "/analyzedInstructions?stepBreakdown=true&mashape-key=btSAgzlS6CmshxyNyEh24vDF8sl2p1w43h9jsnCABHsQZSfxx6", false);
	steps.send();

	var summaryApi = new XMLHttpRequest();
	summaryApi.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + id + "/summary?mashape-key=btSAgzlS6CmshxyNyEh24vDF8sl2p1w43h9jsnCABHsQZSfxx6", false);
	summaryApi.send();

	//Parse what API returns
	var stepsParsed = JSON.parse(steps.response);
	var summaryParsed = JSON.parse(summaryApi.response);

	var summary = summaryParsed.summary;

	var container = $('<div/>')
		.attr('id', 'container')
		.appendTo('body');

	var main = $('<div/>')
		.attr('id', 'main')
		.appendTo(container);

	//Add image to DOM
	var imgUrl = sessionStorage.getItem('imageURL' + sessionStorage.getItem('idOfClicked'));
	var img = $('<img/>')
		.attr('id', 'img')
		.attr('src', imgUrl);
	main.append(img);

	//Add title + summary to DOM
	var summaryDiv = $('<div/>')
		.attr('id', 'summary');
	var titleId = 'title' + sessionStorage.getItem('idOfClicked');
	var title = sessionStorage.getItem(titleId);
	summaryDiv.html("<span id='title'><b>" + title + "</b></span>" + summary);
	main.append(summaryDiv);

	//Add ingredients to DOM
	// var ingredients = document.createElement('div');
	// ingredients.setAttribute('id', 'ingredients');

	var clear = $('<br/>')
		.addClass('clear');
	main.append(clear);

	var description = $('<div/>')
		.addClass('description');
	container.append(description)

	var instructions = $('<div/>');
	var instructionsTitle = $('<span/>');
	instructionsTitle
		.attr('id', 'instructionsTitle')
		.html("Instructions");
	instructions
		.append(instructionsTitle)
		.addClass('instructions');
	container.append(instructions);

	var instructionUl = $('<ol/>');
	instructions.append(instructionUl);
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

		instructionLi[i] = $('<li/>')
			.addClass('instructionLi')
			.html(stepsParsed[0].steps[i].step);

		instructionUl.append(instructionLi[i]);

		j += 1
	}

	instructions.append(instructionUl)
	description.append(instructions);

})
