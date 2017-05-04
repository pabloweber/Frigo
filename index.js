function main(){

	//Create API parameters based on ingredients inputed
	var inputVal = document.getElementById('ingredientsInput').value;
	var upToIngredients = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=';
	var afterIngredients = '&number=200&limitLicense=false&fillIngredients=true&ranking=1&limitLicense=false&mashape-key=0gbpW6Rs1ymshDLw1GaH2g0W8JOjp1x5kCQjsnPQ3FoiRkIu0D'

	//Get recipes for specific ingredients from API 
	var searchByIngredients = new XMLHttpRequest();
	searchByIngredients.open("GET", upToIngredients + inputVal + afterIngredients, false);
	searchByIngredients.send();

	//Parse what API returns (in JSON)
	var recipes = JSON.parse(searchByIngredients.response);

	//Create arrays for HTML creation
	var recipeDiv = [];
	var ingredientsMissing = [];
	var name = [];
	var img = [];
	var description = [];
	var descriptionText = [];
	var clickPart = [];
	var likes = [];
	var search;

	recipeWrapper = document.createElement("div");
	recipeWrapper.setAttribute("class", "recipeWrapper");

	recipeContainer = document.createElement("div");
	recipeContainer.setAttribute("class", "recipeContainer");

	//Delete visible recipes when re-search
	if (document.getElementsByClassName("recipeWrapper") !== null) {
		$(".recipeWrapper").remove();
	}


	//Create HTML
	for (var i = 0; i < recipes.length; i++) {

		//Create divs so you get a div for each recipe
		recipeDiv[i] = document.createElement("div");
		recipeDiv[i].setAttribute("id", i);
		recipeDiv[i].setAttribute("class", "recipeBlock");

			
		//Create spans to contain name of dish; and create and append the actual name of dish to said span
		name[i] = document.createElement("span");
		name[i].setAttribute("class", "name");
		name[i].innerHTML = recipes[i].title;
		sessionStorage.setItem('title' + i, recipes[i].title);


		//Create img tags to contain image;
		img[i] = document.createElement("img");
		img[i].setAttribute("class", "img");
		img[i].setAttribute("src", recipes[i].image);
		sessionStorage.setItem('imageURL' + i, recipes[i].image);

		
		//Create spans with id to contain number and names of missing ingredients
		ingredientsMissing[i] = document.createElement("div");
		ingredientsMissing[i].setAttribute("class", "ingredientsMissing");
		//Add names of missing ingredients only if there are any
		if (recipes[i].missedIngredients.length == 0) {
			ingredientsMissing[i].innerHTML = "<b>You have all the ingredients!</b>";
		} else {
			ingredientsMissing[i].innerHTML = "<b>" + recipes[i].missedIngredients.length + " " + "ingredients missing:</b></br>";
			var x = [];
			for (var j = 0; j < recipes[i].missedIngredients.length; j++) {
				x[j] = recipes[i].missedIngredients[j].name;
				ingredientsMissing[i].append(x[j]);
				if (j !== recipes[i].missedIngredients.length - 1) {
					ingredientsMissing[i].append(", ");
				}
			}
		}

		//Create divs to contain number of likes
		likes[i] = document.createElement("div");
		likes[i].setAttribute("class", "likes");
		likes[i].innerHTML = "<b>Likes</b> " + recipes[i].likes;

		//Create anchor tags to make the recipe blocks clickable
		clickPart[i] = document.createElement("a");
		clickPart[i].setAttribute("class", "clickPart");
		var url = "recipePage.html?id=" + recipes[i].id;
		clickPart[i].setAttribute("href", url);


		//Append all parts of recipe blocks to recipe blocks
		recipeDiv[i].appendChild(clickPart[i]);
		recipeDiv[i].appendChild(name[i]);
		recipeDiv[i].appendChild(img[i]);
		recipeDiv[i].appendChild(likes[i]);
		recipeDiv[i].appendChild(ingredientsMissing[i]);

		//Append recipe blocks to container
		recipeContainer.appendChild(recipeDiv[i]);
	}

	
	//Append recipe container to recipe wrapper and that to DOM (now recipes are visible)
	recipeWrapper.appendChild(recipeContainer);
	document.body.appendChild(recipeWrapper);

	//Isotope initiation (grid format)
	// $('.recipeWrapper').imagesLoaded(function() {
	    $('.recipeWrapper').isotope({
		  	itemSelector: 'div.recipeBlock',
		  	columnWidth: 'div.recipeBlock',
		  	//Sorting not workin yet
		  	getSortData: {
		  		number: function() {
		  			var number = $('.ingredientsMissing').text().split(" ")[0];
		  			return number;
		  		},
		  	sortBy: 'number'
		  	}
		});

	    //Scroll down on when recipes ready
		$('html,body').animate({
       		scrollTop: $(".recipeContainer").offset().top
    	},'slow');
	// });

	$('.recipeBlock').on('click', function() {
		var idOfClicked = $(this).attr('id');
		sessionStorage.setItem('idOfClicked', idOfClicked);
	})

}
