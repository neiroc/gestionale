var username;

$('document').ready(function(){
	
	if ($.cookie('username')){
		username=$.cookie('username');
	}
	else {
		location.href="index.html";
	}


});