$(document).ready(function() {
	
		
		/* Inizializza Tabella */
				
	   var table =  $('#tb_off').DataTable({
	    "aProcessing": true, 
	    "aServerSide": true,   	     
	    "ajax": {
	    	"url":'cgi-bin/server-response.php',
	    	"data": {
	    		"table": "of_offerte",
	    		"var1": "id_offerta", 
	    		"var2": "cliente",
	    		"var3": "aperta_da",
	    		"var4": "operatore",
	    		"var5": "tipo_operatore",
	    		"var6": "sede",
	    	},	    
	    },
	    "columns": [
            {
                "className":      'details-control',    
                "data":           null,
                "defaultContent": '',
                "orderable":      false
            },
            { "data": "cliente" },
            { "data": "aperta_da" },
            { "data": "tipo_operatore" },
            { "data": "sede" },
           
                                    
        ],
        "order": [[1, 'asc']]
	     } );
	      
    
	    /* Seleziona Righe */
		 $('#tb_off tbody').on( 'click', 'tr', function () {
	        if ( $(this).hasClass('selected') ) {
	            $(this).removeClass('selected');
	        }
	        else {
	            table.$('tr.selected').removeClass('selected');
	            $(this).addClass('selected');
	        }
	    } );
	    
	    
		 // Add event listener for opening and closing details
	    $('#tb_off tbody').on('click', 'td.details-control', function () {
	        var tr = $(this).closest('tr');
	        var row = table.row( tr );
	 
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
	    
	    
	    
	    	$('#myModal').on('shown.bs.modal', function () {	    		    		
		    	 $('.select2').select2({
		    	 	 ajax: {
				        url: "cgi-bin/server-response2.php",
				        dataType: 'json',
				        delay: 250,
				        data: function (params) {
				            return {
				                q: params.term // search term
				            };
				        },
				        processResults: function (data) {
				            // parse the results into the format expected by Select2.
				            // since we are using custom formatting functions we do not need to
				            // alter the remote JSON data
				            return {
				                results: data
				            };
				        },
				        cache: true
				    },
				    minimumInputLength: 2,
				    placeholder: "Seleziona...",
				});
			});
			
	    
	     	    
	   /* Aggiungi Elemento */ 
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
			
	
		  table.row.add( {
        "nome":       nome,
        "mobile":   cell,
        "email":     email,
        "tipo_anagrafica": tipo
       
    		} ).draw();

			  }).fail(function() {
			alert( "error" );
			  }).always(function() {
			alert( "finished" );
			  });
	  });
	  
	  
	   /*Edit Data from Table. Scrivere codice + pulito*/

		$('#editData').click(function(){
			
			var $rows = table.$('tr.selected');
			if ($rows.length) {
			 
			 var dataArr = [];
		    var rows = $('tr.selected');
		    var rowData = table.rows(rows).data();
		    
		    $.each($(rowData),function(key,value){
		        dataArr.push(value["nome"]);
		        dataArr.push(value["mobile"]); 
		        dataArr.push(value["email"]);
		        dataArr.push(value["tipo_anagrafica"]);
		        dataArr.push(value["id_anagrafica"]);
		    });
		    
		 $("#nome2").val(dataArr[0]);
		 $("#cell2").val(dataArr[1]);
		 $("#email2").val(dataArr[2]);
		 $("#tipo2").val(dataArr[3]);
		  
		  $('#editModal').modal('show'); 
		  
				/* Save Changes */
				$('#savechanges').click(function(){
				  var nome = $('#nome2').val();
				  var cell = $('#cell2').val();
				  var email = $('#email2').val();
				  var tipo = $('#tipo2').val();
				
				  
				  var datas = "nome="+nome+"&cell="+cell+"&email="+email+"&tipo="+tipo+"&id="+dataArr[4];
				  
				  $.ajax({
					type: "POST",
					url: "cgi-bin/edit.php",
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
		
		
		 
		  
		  	} else alert("Non hai selezionato nessuna riga")
		
		});

	   
    /* Rimuovi elemento selezionat */
	 $('#rmData').click( function () {

	    var dataArr = [];
	    var rows = $('tr.selected');
	    var rowData = table.rows(rows).data();
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
		  

	        table.row('.selected').remove().draw( false );
	    } );

}); /*Fine Document Ready*/





/* Formatting function for row details - modify as you need */
function format ( d ) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Registrato il:</td>'+
            '<td>'+d.start_date+'</td>'+
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



    
  

	  
