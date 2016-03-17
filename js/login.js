$(document).ready(function() {
	
	$("#login").submit(function() {
		
		var loginj = {
       	
			username: $('#username').val(),
			password: $('#password').val(),
		}
		
		//var host = "http://"+document.location.hostname ;
		var host = "http://localhost/gestionale";
		var url = host+"/login/"; // url dello script remoto
		
		

		$.ajax({
			url: url, //url a cui fare la chiamata
			async: true, //chiamata asincrona
			type: "POST",// metodo della chiamata
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(loginj), // json with user and pass
			dataType: 'json',
			success:function(call){	
				if(call.result==="login effettuato con successo"){
					
					$.cookie('username', $('#username').val(), {expires:30});
					$.cookie('nome', call.nome, {expires:30});

					
					
					if (call.type == "Amministratore") 
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
	

	//var host = "http://"+document.location.hostname ;
	//var url = host+"/logout/";

   var url = "http://localhost/gestionale/logout/";
	$.ajax({
		type: "POST",
		
		async: true,
		
		contentType: "application/json; charset=utf-8",
		
		url:url,
		
		data: "req=logout",
		
		dataType: 'json',
		
		success:function(call){
			
			if(call.result==="logout effettuato con successo"){	

				$.removeCookie('username');
	
				location.href="index.html";
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

