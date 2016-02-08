//GLOBAL VARIABLES 
 
var table;

$(document).ready(function() {
	
		
		/* Inizializza Tabella */
	   table =  $('#tb_comm').DataTable({
	    "aProcessing": true, 
	    "aServerSide": true,   	     
	    "ajax": {
	    	"url":'cgi-bin/server-response.php',
	    	"type": "GET",
	    	"data": { //All data to Get From DB
	    		"req" : "commesse",
	    	   "table" : "co_commesse",
            "var1": "id", 
	    		"var2": "cliente",
	    		"var3": "costo_proposto",
	    		"var4": "cliente_strategico",
	    		"var5": "aperta_da",
	    		"var6": "data_apertura",
	    		"var7": "operatore",
	    		"var8": "tipo_operatore",
	    		"var9": "tipo_attivita",
	    	  "var10": "costo_operatore",
	    	  "var11": "tariffa",
	    	  "var12": "volume_ore",
	    	  "var13": "id_commessa",
	    	  "var14": "sede",
	    	  "var15": "euro_ora",
	    	  "var16": "euro_giorno",
	    	  "var17": "euro_km",
	    	  "var18": "euro_tl",
	    	  "var19": "nota",    		   		
	    	},	    
	    },
	    "columns": [
            {
                "className":      'details-control',    
                "data":           null,
                "defaultContent": '',
                "orderable":      false
            },
            { "data": "aperta_da" },
            { "data": "cliente" },
            { "data": "tipo_attivita" },
            { "data": "sede" }
           
                                    
        ],
        "order": [[1, 'asc']]
	     } );
	      
    
	    /* Seleziona Righe */
		 $('#tb_comm tbody').on( 'click', 'tr', function () {
	        if ( $(this).hasClass('selected') ) {
	            $(this).removeClass('selected');
	        }
	        else {
	            table.$('tr.selected').removeClass('selected');
	            $(this).addClass('selected');
	        }
	    } );
	    
	    
		 // Add event listener for opening and closing details
	    $('#tb_comm tbody').on('click', 'td.details-control', function () {
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
		  var apertada = $('#apertada').val();
		  var cliente = $('#cliente').val();
		  var operatore = $('#operatore').val();
		  var tipo = $('#tipo').val();
		  var sede = $('#sede').val();
		  var request = "offerta";
		 
		  var datas = "aperta_da="+apertada+"&cliente="+cliente+"&operatore="+operatore+"&tipo_attivita="+tipo+"&request="+request+"&sede="+sede;
		  
		  $.ajax({
			type: "POST",
			url: "cgi-bin/postdata.php",
			data: datas,
			dataType: "html"
			  }).done(function( msg ) {
			
			alert( msg );
			
	/*
		  table.row.add( {
        "nome":       nome,
        "mobile":   cell,
        "email":     email,
        "tipo_anagrafica": tipo
       
    		} ).draw();*/

			  }).fail(function() {
			alert( "error aa" );
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
	    


}); <!-- Fine Document Ready -->




/* Formatting function for row details - modify as you need */
function format ( d ) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>ID Commessa:</td>'+
            '<td>'+d.id_commessa+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Cliente Strategico:</td>'+
            '<td>'+d.cliente_strategico+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Tipo Operatore:</td>'+
            '<td>'+d.tipo_operatore+' Costo: '+d.costo_operatore+'<br> €/O: '+d.euro_ora+'<br>€/G: '+d.euro_giorno+'<br>€/Km: '+d.euro_km+'<br>€/TL: '+d.euro_tl+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>NOTA:</td>'+
            '<td>'+d.nota+'</td>'+
        '</tr>'+
    '</table>';
}



    
  

	  
