console.log('JavaScript connected');

function getRecipes(){
	var inputVal = document.getElementById('ingredientsInput').value;
	var upToIngredients = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=';
	var maxNumMissing = document.getElementById('maxNumMissing').value;

	var afterIngredients = '&number=200&limitLicense=false&mashape-key=0gbpW6Rs1ymshDLw1GaH2g0W8JOjp1x5kCQjsnPQ3FoiRkIu0D'

	var searchByIngredients = new XMLHttpRequest();
	searchByIngredients.open("GET", upToIngredients + inputVal + afterIngredients, false);
	searchByIngredients.send();

	var recipes = JSON.parse(searchByIngredients.response);

	function createHTML() {
		
		var recipeDiv = [];
		var title = [];
		var ingredientsMissing = [];
		var nameSpan = [];
		var ingredientsMissingSpan = [];
		var img = [];
		var descriptionSpan = [];
		var descriptionText = [];

		recipeContainer = document.createElement("div");
		recipeContainer.setAttribute("class", "recipeContainer");

		


		if (document.getElementsByClassName("recipeContainer") !== null) {

			$(".recipeContainer").remove();

		}

		for (var i = 0; i < recipes.length; i++) {

			// var getDescription = new XMLHttpRequest();
			// var recId = recipes[i].id;
			// getDescription.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recId + "/summary?mashape-key=0gbpW6Rs1ymshDLw1GaH2g0W8JOjp1x5kCQjsnPQ3FoiRkIu0D", false);
			// getDescription.send();

			// var descriptions = JSON.parse(getDescription.response);

			//Create a new div in each loop with an id of recipeDiv0, recipeDiv1... so you get a div for each recipe
			recipeDiv[i] = document.createElement("div");
			recipeDiv[i].setAttribute("id", "recipeDiv" + i);
			recipeDiv[i].setAttribute("class", "recipeBlock");

				
			//Create span with id of nameSpan0, nameSpan1... to contain name of dish; and create and append the actual name of dish to said span
			nameSpan[i] = document.createElement("span");
			nameSpan[i].setAttribute("id", "nameSpan" + i);
			title[i] = document.createTextNode(recipes[i].title);
			nameSpan[i].appendChild(title[i]);


			//Create img tag with id of img0, im1... to contain image;
			img[i] = document.createElement("img");
			img[i].setAttribute("id", "img" + i);
			img[i].setAttribute("src", recipes[i].image);

				
			//Create span with id of ingredientsMissingSpan0, ingredientsMissingSpan1... to contain number of missing ingredients; and create and append textNode containing the actual number of missing ingredients to said span
			ingredientsMissingSpan[i] = document.createElement("span");
			ingredientsMissingSpan[i].setAttribute("id", "ingredientsMissingSpan" + i);
			ingredientsMissing[i] = document.createTextNode("Number of missing ingredients: " + recipes[i].missedIngredientCount);
			ingredientsMissingSpan[i].appendChild(ingredientsMissing[i]);


			//Create span with id of descriptionSpan0, descriptionSpan1... to contain description; and create and append textNode containing the actual description to said span
			// descriptionSpan[i] = document.createElement("span");
			// descriptionSpan[i].setAttribute("id", "descriptionSpan" + i);
			// descriptionText[i] = document.createTextNode(getDescription.summary);
			// descriptionSpan[i].appendChild(descriptionText[i]);


			//Append title and number of missing ingredients spans to main div separated by a linebreak
			recipeDiv[i].appendChild(nameSpan[i]);
			recipeDiv[i].appendChild(img[i]);
			recipeDiv[i].appendChild(ingredientsMissingSpan[i]);
			// recipeDiv[i].appendChild(descriptionSpan[i]);

			recipeContainer.appendChild(recipeDiv[i]);
		}

		document.body.appendChild(recipeContainer);

		$('.recipeContainer').imagesLoaded(function() {
		    $('.recipeContainer').masonry({
			  	itemSelector: 'div.recipeBlock',
			  	columnWidth: 'div.recipeBlock'
			});
		});

		console.log(recipes.length)

	}

	createHTML();
}

console.log("JavaScript finished loading");