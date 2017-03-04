console.log('JavaScript connected');


var frigo = new XMLHttpRequest();
frigo.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=chicken&mashape-key=0gbpW6Rs1ymshDLw1GaH2g0W8JOjp1x5kCQjsnPQ3FoiRkIu0D", false);
frigo.send();

var recipes = JSON.parse(frigo.response);

var title = "Dish name: " + recipes[0].title;
var ingredientsUsed = "Ingredients Used: " + recipes[0].usedIngredientCount;
var ingredientsMissing = "Ingredients Missed: " + recipes[0].missedIngredientCount;

function createHTML() {
	var div = [];
	var title = [];

	for (var i = 0; i < recipes.length; i++) {
		div[i] = document.createElement("div");
		div[i].setAttribute("id", "div" + i);
		title[i] = document.createTextNode("Dish name: " + recipes[i].title);

		div[i].appendChild(title[i]);
		document.body.appendChild(div[i]);
	}

}

createHTML();










console.log("JavaScript finished loading");




