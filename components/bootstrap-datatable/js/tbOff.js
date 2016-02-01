$(document).ready(function() {
	
		/* Inizializza Tabella */
				
	   var table =  $('#tb_off').DataTable({
	    "aProcessing": true, 
	    "aServerSide": true,   	     
	    "ajax": {
	    	"url":'cgi-bin/server-response.php',
	    	"type": "GET",
	    	"data": { //All data to Get From DB
	    		"req" : "offerta",
	    	 "table" : "of_offerte",
            "var1": "id_offerta", 
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
	    	  "var13": "rischio",
	    	  "var14": "sede",
	    	  "var15": "euro_ora",
	    	  "var16": "euro_giorno",
	    	  "var17": "euro_km",
	    	  "var18": "euro_tl",
	    	  "var19": "nota"    		
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
            { "data": "operatore" },     
            { "data": "tipo_attivita" },
            { "data": "sede" }
            
           
                                    
        ],
 		  "createdRow": function(row, data, dataIndex ) {
           	        var v = valuta(data);
						    if (v == "Procedere con l'offerta" )
						      $(row).addClass( 'important' );
						    else if (v == "Offerta da discutere con direzione" )
						      $(row).addClass( 'warning' );
						    else 
						      $(row).addClass( 'danger' ); 
						  },
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
	            row.child( format(row.data())).show();
	            tr.addClass('shown');
	        }
	    } );
	    

	    
	    	$('#myModal').on('shown.bs.modal', function () {	    		    		
		    	 $('.select2').select2({
		    	 	allowClear: true,	
		    	 	multiple: true, 
		    	 	maximumSelectionSize: 1, 	
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
			
		  /* Get Data From Modal*/
		  var request = "offerta";
		  
		  var apertada = $('#apertada').val();
		  var cliente = $('#cliente').val();
		  var strategico = $('#strategico').val();
		  var proposta = $('#proposta').val();
		  
		  var operatore = $('#operatore').val();
		  var tipo = $('#tipo').val();
		  
		  var euroOra = $('#euroOra').val();
		  var euroGiorno = $('#euroGiorno').val();
		  var euroKm = $('#euroKm').val();
		  var euroTl = $('#euroTl').val();
		  var volOre = $('#volumeOre').val();
		  
		  var tipoAtt = $('#tipoAtt').val();
		  var sede = $('#sede').val();
		  
		  var nota = $('#nota').val();
		 
		 
		  var datas = "request="+request+"&aperta_da="+apertada+"&cliente="+cliente+"&cliente_strategico="+strategico+"&costo_proposto="+proposta+"&operatore="+operatore+"&tipo_operatore="+tipo+
		  "&costo_operatore="+euroOra+"&euro_giorno="+euroGiorno+"&euro_km="+euroKm+"&euro_tl="+euroTl+"&volume_ore="+volOre+"&tipo_attivita="+tipoAtt+"&sede="+sede+"&nota="+nota;
		  
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
		    //console.log(rowData[0]);
		    //console.log(rowData["cliente"]);
		    
		    $.each($(rowData),function(key,value){
		    	  console.log(dataArr["aperta_da"]);
		        dataArr.push(value["aperta_da"]);
		        dataArr.push(value["cliente"]); 
		        dataArr.push(value["operatore"]);
		        dataArr.push(value["sede"]);
		        dataArr.push(value["costo"]);
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
	 	//???BootstrapDialog.confirm('Hi Apple, are you sure?');

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
	    
	    
	    	   
    /* Accetta Offerta della riga selezionata */
	 $('#accept').click( function () {

		 var request = "accetta" 
	    var dataArr = [];
	    var rows = $('tr.selected');
	    var rowData = table.rows(rows).data();
	    $.each($(rowData),function(key,value){
	        dataArr.push(value["id_offerta"]);
	        
	        dataArr.push(value["aperta_da"]);
	        dataArr.push(value["data_apertura"]);
	        dataArr.push(value["cliente"]); 
	        dataArr.push(value["cliente_strategico"]); 
	        dataArr.push(value["costo_proposto"]); 
	        dataArr.push(value["operatore"]);
	        dataArr.push(value["tipo_operatore"]);
	        dataArr.push(value["tipo_attivita"]);
	        dataArr.push(value["costo_operatore"]);
	        dataArr.push(value["tariffa"]);
	        dataArr.push(value["volume_ore"]);
	       
	        dataArr.push(value["sede"]);
	        dataArr.push(value["euro_ora"]); 
	        dataArr.push(value["euro_giorno"]); 
	        dataArr.push(value["euro_km"]); 
	        dataArr.push(value["euro_tl"]); 
	        dataArr.push(value["nota"]); 
	    });
	    
	    console.log(dataArr[1]);
	    var datas = "request="+request+"&id="+dataArr[0]+"&aperta_da="+dataArr[1]+"&cliente="+dataArr[3]+"&cliente_strategico="+dataArr[4]+"&costo_proposto="+dataArr[5]+
	    "&operatore="+dataArr[6]+"&tipo_operatore="+dataArr[7]+"&tipo_attivita="+dataArr[8]+"&costo_operatore="+dataArr[9]+"&tariffa="+dataArr[10]+"&volume_ore="+dataArr[11]+"&sede="+dataArr[12]+"&euro_ora="+dataArr[13]+"&euro_giorno="+dataArr[14]+
	    "&euro_km="+dataArr[15]+"&euro_tl="+dataArr[16]+"&nota="+dataArr[17];
	    
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
		  

	    } );

}); /*Fine Document Ready*/





   
function valuta( d ) {
	
   
   var valutazione;
   var rischio;
   var classe_rischio;
   var costo_industriale = d.costo_operatore*1.15;
   var marg_lordo = ((d.costo_proposto - d.costo_operatore)/d.costo_proposto)*100;
   var marg_ind = ((d.costo_proposto - costo_industriale)/d.costo_proposto)*100;
     
     
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
   
    else if(marg_ind <= 20 && classe_rischio=="A") 
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
    	return valutazione="Offerta da discutere con direzione";
    else if (rischio=="ALTO" && d.cliente_strategico=="NO")
      return valutazione="Non approvata";
    else if (rischio=="MEDIO" && d.cliente_strategico=="NO")
      return valutazione="Offerta da discutere con direzione";
    else if (rischio=="MEDIO" && d.cliente_strategico=="NO")
      return valutazione="Offerta da discutere con direzione";
    else 
      return valutazione="Procedere con l'offerta"; 




}


/* Formatting function for row details - modify as you need */
function format ( d ) {
	
	   var valutazione;
   var rischio;
   var classe_rischio;
   var costo_industriale = d.costo_operatore*1.15;
   var marg_lordo = ((d.costo_proposto - d.costo_operatore)/d.costo_proposto)*100;
   var marg_ind = ((d.costo_proposto - costo_industriale)/d.costo_proposto)*100;
     
     
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
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px; background-color:white;">'+
        '<tr>'+
            '<td>Data Apertura:</td>'+
            '<td>'+d.data_apertura+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Cliente</td>'+
            '<td>Strategico: '+d.cliente_strategico+'</td>'+
            '<td>Proposta: '+d.costo_proposto+' €/o</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Operatore</td>'+
            '<td>Tipo: '+d.tipo_operatore+'</td>'+
            '<td>Costo: '+d.costo_operatore+' €/o</td>'+
				'<td>Costo Ind.: '+costo_industriale+' €/o</td>'+
				'<td>Margine Lordo: '+marg_lordo+'%</td>'+
				'<td>Margine Ind.: '+marg_ind+'%</td>'+
            /*'<td>€/O: '+d.euro_ora+'</td>'+*/
            '<td>€/G: '+d.euro_giorno+'</td>'+
            '<td>€/Km: '+d.euro_km+'</td>'+
            '<td>€/TL: '+d.euro_tl+'</td>'+
        '</tr>'+
         '<tr>'+
            '<td>Rischio</td>'+
            '<td>Volume ore: '+d.volume_ore+'</td>'+
            '<td>Classe Rischio: '+classe_rischio+'</td>'+
            '<td>Valutazione: <b>'+valutazione+'</b> </td>'+
        '</tr>'+
        '<tr>'+
            '<td>NOTA:</td>'+
            '<td>'+d.nota+'</td>'+
        '</tr>'+
    '</table>';
}

/*
* SPINNER
*/
(function ($) {
	
	$('.spinner .btn:first-of-type').on('click', function() {
    var spinner = $(this).parent().parent().find('input');
    spinner.val(parseInt(spinner.val(), 10) + 1);
});

$('.spinner .btn:last-of-type').on('click', function() {
    var spinner = $(this).parent().parent().find('input');
    spinner.val(parseInt(spinner.val(), 10) - 1);
});
	
	/*
  $('.spinner .btn:first-of-type').on('click', function() {
    $('.spinner input').val( parseInt($('.spinner input').val(), 10) + 1);
  });
  $('.spinner .btn:last-of-type').on('click', function() {
    $('.spinner input').val( parseInt($('.spinner input').val(), 10) - 1);
  });*/
})(jQuery);



    
  

	  
