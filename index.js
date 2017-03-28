console.log('JavaScript connected');

function getRecipes(){
	var inputVal = document.getElementById('ingredientsInput').value;
	var upToIngredients = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=';
	var afterIngredients = '&number=200&limitLicense=false&fillIngredients=true&ranking=1&mashape-key=0gbpW6Rs1ymshDLw1GaH2g0W8JOjp1x5kCQjsnPQ3FoiRkIu0D' //limitLicense=false&

	var searchByIngredients = new XMLHttpRequest();
	searchByIngredients.open("GET", upToIngredients + inputVal + afterIngredients, false);
	searchByIngredients.send();

	var recipes = JSON.parse(searchByIngredients.response);


	var recipeDiv = [];
	var ingredientsMissing = [];
	var name = [];
	var img = [];
	var description = [];
	var descriptionText = [];
	var clickPart = [];

	recipeWrapper = document.createElement("div");
	recipeWrapper.setAttribute("class", "recipeWrapper");

	recipeContainer = document.createElement("div");
	recipeContainer.setAttribute("class", "recipeContainer");

	
	if (document.getElementsByClassName("recipeWrapper") !== null) {

		$(".recipeWrapper").remove();

	}

	for (var i = 0; i < recipes.length; i++) {

		// var getDescription = new XMLHttpRequest();
		// var recId = recipes[i].id;
		// getDescription.open("GET", "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recId + "/summary?mashape-key=0gbpW6Rs1ymshDLw1GaH2g0W8JOjp1x5kCQjsnPQ3FoiRkIu0D", false);
		// getDescription.send();

		// var descriptions = JSON.parse(getDescription.response);

		//Create a new div in each loop with an id of recipeDiv0, recipeDiv1... so you get a div for each recipe
		recipeDiv[i] = document.createElement("div");
		recipeDiv[i].setAttribute("id", recipes[i].id);
		recipeDiv[i].setAttribute("class", "recipeBlock");

			
		//Create span with id of nameSpan0, nameSpan1... to contain name of dish; and create and append the actual name of dish to said span
		name[i] = document.createElement("span");
		name[i].setAttribute("class", "name");
		name[i].innerHTML = recipes[i].title;


		//Create img tag with id of img0, im1... to contain image;
		img[i] = document.createElement("img");
		img[i].setAttribute("class", "img");
		img[i].setAttribute("src", recipes[i].image);

		
		//Create span with id of ingredientsMissingSpan0, ingredientsMissingSpan1... to contain number of missing ingredients; and create and append textNode containing the actual number of missing ingredients to said span
		ingredientsMissing[i] = document.createElement("div");
		ingredientsMissing[i].setAttribute("class", "ingredientsMissing");
		ingredientsMissing[i].innerHTML = "<b>" + recipes[i].missedIngredients.length + " " + "missing ingredients:</b></br>";
		var x = [];
		for (var j = 0; j < recipes[i].missedIngredients.length; j++) {
			x[j] = recipes[i].missedIngredients[j].name;
			ingredientsMissing[i].append(x[j]);
			if (j !== recipes[i].missedIngredients.length - 1) {
				ingredientsMissing[i].append(", ");
			}
		}

		//Create an a tag to make the block clickable
		clickPart[i] = document.createElement("a");
		clickPart[i].setAttribute("class", "clickPart");
		clickPart[i].setAttribute("href", "http://www.google.com")


		//Create span with id of description0, description1... to contain description; and create and append textNode containing the actual description to said span
		// description[i] = document.createElement("div");
		// description[i].setAttribute("class", "description");
		// description[i].innerHTML = descriptions.summary;


		//Append title and number of missing ingredients spans to main div separated by a linebreak
		recipeDiv[i].appendChild(clickPart[i]);
		recipeDiv[i].appendChild(name[i]);
		recipeDiv[i].appendChild(img[i]);
		recipeDiv[i].appendChild(ingredientsMissing[i]);
		// recipeDiv[i].appendChild(description[i]);

		recipeContainer.appendChild(recipeDiv[i]);
	}

	
	recipeWrapper.appendChild(recipeContainer);
	document.body.appendChild(recipeWrapper);

	$('.recipeWrapper').imagesLoaded(function() {
	    $('.recipeWrapper').masonry({
		  	itemSelector: 'div.recipeBlock',
		  	columnWidth: 'div.recipeBlock'
		});

		$('html,body').animate({
       		scrollTop: $(".recipeContainer").offset().top
    	},'slow');
	});

	console.log(recipes.length)

}

console.log("JavaScript finished loading");