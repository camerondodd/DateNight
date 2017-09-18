

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
	})
}

function homeButton(){
  $('.returnHome').on('click','.homeButton', function(){
    console.log("homeButton pressed");
    $('.outOrInPage').prop('hidden',false);
		$('.outPage').prop('hidden',true);
		$('.inPage').prop('hidden',true);
  })
}

function functionRunner(){
	goOutButton();
	stayInButton();
	homeButton();
}

$(functionRunner);