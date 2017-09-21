//STAY IN
const edamamSearchURL='https://api.edamam.com/search';

function stayInButton(){
	$('.outOrInBox').on('click','.stayInButton', function(){
		console.log('stayInButton pressed');
		$('.outOrInPage').prop('hidden',true);
		$('.inPage').prop('hidden',false);
	});
}

function homeButton(){
  $('.returnHome').on('click','.homeButton', function(){
    console.log("homeButton pressed");
    $('.outOrInPage').prop('hidden',false);
		$('.outPage').prop('hidden',true);
		$('.inPage').prop('hidden',true);
  });
}

function recipeSubmit(){
  $('.recipeRequestContainer').submit(event => {
    event.preventDefault();
    const queryTarget=$(event.currentTarget).find('.recipeInput');
    const recipeInput=queryTarget.val();
    queryTarget.val('');
    console.log('recipeSubmit ran with search term '+recipeInput);
    getRecipes(recipeInput,displayRecipeResults);
    // $('.recipeResults').prop('hidden',false);
  });
}

function getRecipes(searchTerm,callback){
    settings={
      method:'GET',
      dataType: 'json',
      url:edamamSearchURL,
      data:{
        from:0,
        to:5,
        app_id:'0ddfcbda',
        app_key:'ff994fb730845d74622198d22cb55dfd',
        q:`${searchTerm}`
      },
      success:callback
    };
  $.ajax(settings);
  console.log('getRecipes ran');
} 

function displayRecipeResults(data){
  const results=data.hits.map((item)=> renderRecipes(item));
  $('.recipeResults').html(results);
  console.log (results);
  console.log('displayRecipeResults ran');
  // const ingredientString=`${item.recipe.ingredientLines}`;
  // const ingredients=ingredientString.split(',');
  // for (i=0; i<ingredients.length; i++){
    // $('.resultHolder ul').append(`<li>${item.recipe.ingredientLines[i]}</li>`);
  // }
}

function renderRecipes(item){
  console.log('renderRecipes ran');
  return`<div class="recipeResultHolder">
      <a href="${item.recipe.url}">
       <img src="${item.recipe.image}">
      </a>
      </br>
      <p>${item.recipe.label}</p>
    </div>`;
}

// GO OUT

const cityURL="https://developers.zomato.com/api/v2.1/locations";

const foodURL="https://developers.zomato.com/api/v2.1/search";

function goOutButton(){
	$('.outOrInBox').on('click','.goOutButton', function(){
		console.log('goOutButton pressed');
		$('.outOrInPage').prop('hidden',true);
		$('.outPage').prop('hidden',false);
	})
}

function citySubmit(){
  $('.cityRequestContainer').submit(event => {
    event.preventDefault();
    const queryTarget=$(event.currentTarget).find('.cityInput');
    const cityInput=queryTarget.val();
    queryTarget.val('');
    console.log('citySubmit ran with search term '+cityInput);
    getCity(cityInput,entityFind);
   $('.foodRequestContainer').prop('hidden',false);
  });
}

function getCity(searchTerm,callback){
    settings={
      method:'GET',
      url:cityURL,
      headers:{
        "user-key":"dfade01cfcbfa8fa156c5d8a39248d21"
      },
      data:{
        query:searchTerm
      },
      success:callback
    };
  $.ajax(settings);
  console.log('getCity ran');
} 

function entityFind(data){
  console.log("entityFind ran");
  const results=data.location_suggestions.map((item)=> renderEntity(item));
}

function renderEntity(item){
  console.log('renderEntity ran');
  entity=`${item.entity_id}`;
}

function foodSubmit(){
  $('.foodRequestContainer').submit(event => {
    event.preventDefault();
    const queryTarget=$(event.currentTarget).find('.foodInput');
    const foodInput=queryTarget.val();
    queryTarget.val('');
    console.log('foodSubmit ran with search term '+foodInput);
    getFood(foodInput,displayFoodResults);
  });
}

function getFood(searchTerm,callback){
    console.log(entity);
    settings={
      method:'GET',
      dataType: 'json',
      url:foodURL,
      headers:{
        "user-key":"dfade01cfcbfa8fa156c5d8a39248d21"
      },
      data:{
        count:5,
        entity_id:entity,
        q:searchTerm
      },
      success:callback
    };
  $.ajax(settings);
  console.log('getFood ran');
}

function displayFoodResults(data){
  console.log('displayFoodResults is running '+data);
  const results=data.restaurants.map((item)=> renderFood(item));
  $('.foodResults').prop('hidden',false);
  $('.foodResults').html(results);
  console.log('displayFoodResults ran');
}

function renderFood(item){
  console.log('renderRecipes ran');
  return`
      
      <a href="${item.restaurant.url}">
       ${item.restaurant.name}
      </a>
      </br>
      <p>User Rating: ${item.restaurant.user_rating.rating_text}</p>
      <p>Price Range: ${item.restaurant.price_range}/5</p>
      <p>${item.restaurant.location.address}</p>
    `;
}

function functionRunner(){
	goOutButton();
	stayInButton();
	homeButton();
	recipeSubmit();
	citySubmit();
	foodSubmit();
}

$(functionRunner);