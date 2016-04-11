//GLOBAL VARIABLES 
var table;

$(document).ready(function() {

	
		
		/* Inizializza Tabella */
	   table =  $('#tb_comm').DataTable({
	    "aProcessing": true, 
	    "aServerSide": true,
	    "initComplete": function(settings, json) {
        $('#tb_comm tbody tr:eq(0)').click();
        },   	     
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
	    		"var7": "quadro",
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
	    	  "var20": "a_pezzo",
           "var21": "euro_pezzo"    		   		
	    	},	    
	    },
	    "columns": [
            {
                "className":      'details-control',    
                "data":           null,
                "defaultContent": '',
                "orderable":      false
            },
            { "data": "id_commessa" },
            { "data": "cliente" },
            { "data": "tipo_attivita" },
            { "data": "sede" }
           
                                    
        ],
        "order": [[1, 'asc']]
	     } );
	      
    
	    /* Seleziona Righe */
		 $('#tb_comm tbody').on( 'click', 'tr', function () {
	        if ( $(this).hasClass('selected') ) {
	            //$(this).removeClass('selected');
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
		 
		  var datas = "aperta_da="+apertada+"&cliente="+cliente+"&tipo_attivita="+tipo+"&request="+request+"&sede="+sede;
		  
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
		   var rows = $('tr.selected');
		   var rowData = table.rows(rows).data();
			
			if ($rows.length) {
			 
			 var dataArr = [];
	    
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
		
		
		 
		  
		  	} else {
		  		$.alert({
						title : false,
					   confirmButton : 'OPS!',	
						content:'Seleziona prima una riga!'
					    });
		     }
		
		});

	   
    /* Rimuovi elemento selezionat */
	 $('#rmData').click( function () {
         var $rows = table.$('tr.selected');
		   var rows = $('tr.selected');
		   var rowData = table.rows(rows).data();
		   var datas;
		   
		   if ($rows.length) {
		   	
		   		$.confirm({
				    title: 'Rimuovi',
				    content: 'Sicuro di voler eliminare questa commessa?',
				    confirmButton: 'SI',
                cancelButton: 'NO',
				    confirm: function(){
				    			   
				    $.each($(rowData),function(key,value){
				        datas = "request=commessa&id="+value["id_commessa"]; //"name" being the value of your first column.
				    });
				    
						$.ajax({
							type: "POST",
							url: "cgi-bin/delete.php",
							data: datas,
							dataType: "html"
							  }).done(function( msg ) {
						
						  }).fail(function() {
						alert( "error" );
						  }).always(function() {
						alert( "finished" );
						  });
	
		             table.row('.selected').remove().draw( false );
				    	 
				       $.alert({
				       title:false,
				       content : 'Commessa Eliminata!',
				       confirmButton: 'DAJE!'
				       });
				    },
				    cancel: function(){
				    $.alert('Visto che non eri sicuro!')
				    }
				 
				});

	        
	     }else {
	     	$.alert({
						title : false,
					   confirmButton : 'OPS!',	
						content:'Seleziona prima una riga!'
					    });
	     }
	     	
	     	
	    } );
	    


}); <!-- Fine Document Ready -->




/* Formatting function for row details - modify as you need */
function format ( d ) {
	
   var valutazione;
   var rischio;
   var classe_rischio;
   var costo_industriale = (d.euro_ora*1.15).toFixed(2);
   var marg_lordo = (((d.costo_proposto - d.euro_ora)/d.costo_proposto)*100).toFixed(2);
   var marg_ind = (((d.costo_proposto - costo_industriale)/d.costo_proposto)*100).toFixed(2);
     
     
    //Valutazione Del Rischio. Inserire in un'altra funzione 
	
	//Assegna Classe di Rischio    
    if (d.volume_ore=="<200") 
    	classe_rischio="A";
    else if (d.volume_ore=="[200,400]") 
    	classe_rischio="B";			
    else 
      classe_rischio="C";
      
   //Assegna Rischio Aziendale 
    if(marg_ind<0)
      rischio="ALTO";
   
    else if(marg_ind <= 20 && classe_rischio=="A" ) 
	   rischio="MEDIO";
	 else if (marg_ind <= 20) 
		rischio="ALTO";
	 else if (marg_ind >= 20 && marg_ind <=25 && classe_rischio=="A") 
	   rischio="BASSO";
	 else if (marg_ind >= 20 && marg_ind <=25 || classe_rischio=="B" || classe_rischio=="B" ) 
	   rischio="MEDIO";
	 else 
	   rischio="BASSO";
	   
	//Valutazione offerta  	 
    if (rischio=="ALTO" && d.cliente_strategico=="SI") 
    	valutazione="Offerta da discutere con direzione";
    else if (rischio=="ALTO" && d.cliente_strategico=="NO")
       valutazione="Non approvata";
    else if (rischio=="MEDIO" && d.cliente_strategico=="NO")
       valutazione="Offerta da discutere con direzione";
    else if (rischio=="MEDIO" && d.cliente_strategico=="NO")
       valutazione="Offerta da discutere con direzione";
    else 
       valutazione="Procedere con l'offerta"; 

      
    // `d` is the original data object for the row
    return '<table  cellpadding="5" cellspacing="0" style="padding-left:50px; background-color:white; ">'+
        '<tr>'+
            '<td>Data Apertura:</td>'+
            '<td>'+d.data_apertura+'</td>'+
        '</tr>'+
         '<tr>'+
            '<td>Quadro : '+d.quadro+'</td>'+
            '<td>A pezzi : '+d.a_pezzo+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Cliente</td>'+
            '<td>Proposta: '+d.costo_proposto+' €/o</td>'+
            '<td>€/pezzo: '+d.euro_pezzo+'</td>'+
            '<td>€/Km: '+d.euro_km+'</td>'+
            '<td>€/TL: '+d.euro_tl+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Operatore</td>'+
            '<td>Tipo: '+d.tipo_operatore+'</td>'+
            '<td>Costo: '+d.euro_ora+' €/o</td>'+
				'<td>Costo Ind.: '+costo_industriale+' €/o</td>'+
				'<td>Margine Lordo: '+marg_lordo+'%</td>'+
				'<td>Margine Ind.: '+marg_ind+'%</td>'+

        '</tr>'+
         '<tr>'+
            '<td>Rischio</td>'+
            '<td>Classe Rischio: '+classe_rischio+'</td>'+
            '<td>Valutazione: <b>'+valutazione+'</b> </td>'+
        '</tr>'+
        '<tr>'+
            '<td>NOTA:</td>'+
            '<td>'+d.nota+'</td>'+
        '</tr>'+
    '</table>';
}






    
  

	  
