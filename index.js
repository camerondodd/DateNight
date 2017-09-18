const edamamSearchURL='https://api.edamam.com/search';

function goOutButton(){
	$('.outOrInBox').on('click','.goOutButton', function(){
		console.log('goOutButton pressed');
		$('.outOrInPage').prop('hidden',true);
		$('.outPage').prop('hidden',false);
	})
}

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
  return`<div class="resultHolder">
      <a href="${item.recipe.url}">
       <img src="${item.recipe.image}">
      </a>
      </br>
      <p>${item.recipe.label}</p>
    </div>`;
}

function functionRunner(){
	goOutButton();
	stayInButton();
	homeButton();
	recipeSubmit();
}

$(functionRunner);