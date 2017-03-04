console.log('JavaScript connected');


var frigo = new XMLHttpRequest();
frigo.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=chicken&number=200&mashape-key=0gbpW6Rs1ymshDLw1GaH2g0W8JOjp1x5kCQjsnPQ3FoiRkIu0D", false);
frigo.send();

var recipes = JSON.parse(frigo.response);

function createHTML() {
	
	var recipeDiv = [];
	var title = [];
	var ingredientsMissing = [];

	for (var i = 0; i < recipes.length; i++) {
		//Create a new div in each loop with and id of recipeDiv0, recipeDiv1... so you get a div for each recipe
		recipeDiv[i] = document.createElement("div");
		recipeDiv[i].setAttribute("id", "recipeDiv" + i);
		
		//Get dish name and number of missing ingredients from API
		title[i] = document.createTextNode("Dish name: " + recipes[i].title);
		ingredientsMissing[i] = document.createTextNode("Number of missing ingredients: " + recipes[i].missedIngredientCount)

		//Append title and number of missing ingredients to their respective divs
		recipeDiv[i].appendChild(title[i]);
		recipeDiv[i].appendChild(ingredientsMissing[i]);
		
		//Append div to the html file so that it's visible
		document.body.appendChild(recipeDiv[i]);

	}

}

createHTML();










console.log("JavaScript finished loading");




