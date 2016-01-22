$(document).ready(function() { 
		console.log($('tr.selected'));
		/*Inizializza Tabella
		*
		*C'è differenza tra dataTable() e DataTable() inserire funzione api() ove necessario
		*/
		
	   var table =  $('#tb_anag').dataTable({
	    "aProcessing": true, 
	    "aServerSide": true,
	     
	    "ajax": "cgi-bin/server-response.php",
	    "columns": [
            {
                "className":      'details-control',    
                "data":           null,
                "defaultContent": '',
                "orderable":      false
            },
            { "data": "nome" },
            { "data": "mobile" },
            { "data": "email" },
            { "data": "tipo_anagrafica" }
            
            
        ],

        "order": [[1, 'asc']]
	     } );
	     

      

	      
	    /* Seleziona Righe */
		 $('#tb_anag tbody').on( 'click', 'tr', function () {
	        if ( $(this).hasClass('selected') ) {
	            $(this).removeClass('selected');
	        }
	        else {
	            table.$('tr.selected').removeClass('selected');
	            $(this).addClass('selected');
	        }
	    } );

	   
    /* Rimuovi elemento selezionat */
	  $('#rmData').click( function () {
	

    var dataArr = [];
    var rows = $('tr.selected');
    var rowData = table.api().rows(rows).data();
    $.each($(rowData),function(key,value){
        dataArr.push(value["id_anagrafica"]); //"name" being the value of your first column.
    });
    
    console.log(dataArr);
    var datas = "id="+dataArr;
	$.ajax({
		type: "POST",
		url: "cgi-bin/delete.php",
		data: datas,
		dataType: "html"
		  }).done(function( msg ) {
		alert( msg );
	
	//viewdata();
	
	  }).fail(function() {
	alert( "error" );
	  }).always(function() {
	alert( "finished" );
	  });
	  
   
	  

        table.api().row('.selected').remove().draw( false );
    } );
    
    
    
    
    // Add event listener for opening and closing details
    $('#tb_anag tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.api().row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );



$('#editData').click(function(){
	
	var $rows = table.$('tr.selected');
	if ($rows.length) {
	 
	 var dataArr = [];
    var rows = $('tr.selected');
    var rowData = table.api().rows(rows).data();
    console.log(rowData);
    $.each($(rowData),function(key,value){
        dataArr.push(value["nome"]);
        dataArr.push(value["mobile"]); 
        dataArr.push(value["email"]);
        dataArr.push(value["tipo_anagrafica"]);
    });
    
  $("#nome2").val(dataArr[0]);
  $("#cell2").val(dataArr[1]);
  $("#email2").val(dataArr[2]);
  $("#tipo2").val(dataArr[3]);
  
  $('#editModal').modal('show'); 
  
  	} else alert("Non hai selezionato nessuna riga")

});


/*
on('show', function(){
         
        //make your ajax call populate items or what even you need
        $(this).find('#nome').html($('<b> Order Id selected: ' + nome  + '</b>'))
    });*/









}); /*Fine Document Ready*/






/* Formatting function for row details - modify as you need */
function format ( d ) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Registrato il:</td>'+
            '<td>'+d.id_anagrafica+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extension number:</td>'+
            '<td>'+d.nome+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extra info:</td>'+
            '<td>And any further details here (images etc)...</td>'+
        '</tr>'+
    '</table>';
}


    
  
    

$('#save').click(function(){
  var nome = $('#nome').val();
  var cell = $('#cell').val();
  var email = $('#email').val();
  var tipo = $('#tipo').val();

  
  var datas = "nome="+nome+"&cell="+cell+"&email="+email+"&tipo="+tipo;
  
  $.ajax({
	type: "POST",
	url: "cgi-bin/postdata.php",
	data: datas,
	dataType: "html"
	  }).done(function( msg ) {
	alert( msg );

//viewdata();

  }).fail(function() {
alert( "error" );
  }).always(function() {
alert( "finished" );
  });
  });
 
	 
	 

	  
