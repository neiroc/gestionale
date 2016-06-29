$(document).ready(function() {
	
	var upUs;
	upUser();
	
	$("#login").submit(function() {
		
		var loginj = {
       	
			username: $('#username').val(),
			password: $('#password').val(),
		}
		
		var host = document.location ;
		var url = host+"/cgi-bin/login.php"; // url dello script remoto
		console.log(url);

		$.ajax({
			url: url, //url a cui fare la chiamata
			async: true, //chiamata asincrona
			type: "POST",// metodo della chiamata
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(loginj), // json with user and pass
			dataType: 'json',
			success:function(call){	

			 
				if(call.result==="login effettuato con successo"){
					//convert timestamp mysql
				   var c = call.date.split(' ')[0];
				   var d = c.split('-')
			      var new_d = d[2]+"/"+d[1]+"/"+d[0];

					$.cookie('username', $('#username').val(), {expires:30});
					$.cookie('nome', call.nome, {expires:30});
					$.cookie('date', new_d, {expires:30});
					$.cookie('n_comm',call.num, {expires:30});

					if (call.type == "Amministratore" || call.type == "Team Leader") 
				       location.href="dashboard.html";
				   else
					    location.href="client.html";
				}
				else {
					//errorAlert(call.result);
					alert("Credenziali Errate");
				} 		
			},
			error: function(e){
				alert("Errore interno al server");
				//errorAlert("500 Internal server error: Errore di connessione al server");
			},
		});
		
		return false; // avoid to execute the actual submit of the form.
	});
	
	
	
	
	$('#logout').on('click', function(){

	var host = document.domain ;
   var url = "cgi-bin/logout.php"; // url dello script remoto
   //var url = "localhost/gestionale/cgi-bin/logout.php"; // url dello script remoto
	console.log(url);
	$.ajax({
		type: "POST",
		async: true,
		contentType: "application/json; charset=utf-8",
		url:url,
		//data: "req=logout",
		dataType: 'json',
		success:function(call){
			
			if(call.result==="logout effettuato con successo"){	

				$.removeCookie('username');
				location.href="./";
			}
			else 
				//errorAlert(call.result); 		
				alert(call.result); 		
		},
		error: function(e){

//			errorAlert("errore di connessione al server");
alert("errore di connessione al server");
		},
	});
	//return false; // avoid to execute the actual submit of the form.

});					
					



});


//aggiorna l'user in navbar
function upUser(){
	upUs=$.cookie('nome');
	$('#user_name1').html(upUs);
	$('#date_cl').html($.cookie('date'));
	$('#n_comm').html($.cookie('n_comm'));
}

