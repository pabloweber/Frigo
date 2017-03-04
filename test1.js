console.log('JavaScript connected');


var frigo = new XMLHttpRequest();
frigo.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=chicken&number=200&mashape-key=0gbpW6Rs1ymshDLw1GaH2g0W8JOjp1x5kCQjsnPQ3FoiRkIu0D", false);
frigo.send();

var recipes = JSON.parse(frigo.response);

function createHTML() {
	
	var recipeDiv = [];
	var title = [];
	var ingredientsMissing = [];
	var nameSpan = [];
	var ingredientsMissingSpan = [];
	// var linebreak = document.createElement("br");

	for (var i = 0; i < recipes.length; i++) {
		//Create a new div in each loop with an id of recipeDiv0, recipeDiv1... so you get a div for each recipe
		recipeDiv[i] = document.createElement("div");
		recipeDiv[i].setAttribute("id", "recipeDiv" + i);
		
		//Create span with id of nameSpan0, nameSpan1... to contain name of dish; and create and append the actual name of dish to said span
		nameSpan[i] = document.createElement("span");
		nameSpan[i].setAttribute("id", "nameSpan" + i);
		title[i] = document.createTextNode("Dish name: " + recipes[i].title);
		nameSpan[i].appendChild(title[i]);

		
		//Create span with id of ingredientsMissingSpan0, ingredientsMissingSpan1... to contain number of missing ingredients; and create and append the actual number of missing ingredients to said span
		ingredientsMissingSpan[i] = document.createElement("span");
		ingredientsMissingSpan[i].setAttribute("id", "ingredientsMissingSpan" + i);
		ingredientsMissing[i] = document.createTextNode("Number of missing ingredients: " + recipes[i].missedIngredientCount);
		ingredientsMissingSpan[i].appendChild(ingredientsMissing[i]);


		//Append title and number of missing ingredients spans to main div separated by a linebreak
		recipeDiv[i].appendChild(nameSpan[i]);
		var linebreak = document.createElement("br");
		recipeDiv[i].appendChild(linebreak);
		recipeDiv[i].appendChild(ingredientsMissingSpan[i]);

		
		//Append div to the html file so that it's visible
		document.body.appendChild(recipeDiv[i]);

	}

}

createHTML();



console.log("JavaScript finished loading");




