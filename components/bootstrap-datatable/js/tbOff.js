$(document).ready(function() {



		/* Inizializza Tabella */
				
	   var table =  $('#tb_off').DataTable({
	    "aProcessing": true, 
	    "aServerSide": true,
	    "initComplete": function(settings, json) {
        $('#tb_off tbody tr:eq(0)').click();
        },    	     
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
	    		"var7": "quadro",
	    		"var8": "tipo_operatore",
	    		"var9": "tipo_attivita",
	    	  "var10": "euro_ora",
	    	  "var11": "tariffa",
	    	  "var12": "volume_ore",
	    	  "var13": "rischio",
	    	  "var14": "sede",
	    	  "var15": "euro_pezzo",
	    	  "var16": "pagamento",
	    	  "var17": "euro_km",
	    	  "var18": "euro_tl",
	    	  "var19": "nota" ,
	    	  "var20": "a_pezzo"   		
	    	},	    
	    },
	    "columns": [
            {
                "className":      'details-control',    
                "data":           null,
                "defaultContent": '',
                "orderable":      false
            },
            { "data": "data_apertura", "type": "date-eu",
               "render": function ( data, type, row, meta ) {
               var d = row.data_apertura.split('-');
			      return d[2]+'/'+d[1]+'/'+d[0] ;
		          } 
		      }, 
            { "data": "aperta_da" },
            { "data": "cliente" },
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
        "order": [[1, 'desc']]
	     } );
	     

	    /* Seleziona Righe */
		 $('#tb_off tbody').on( 'click', 'tr', function () {
	        if ( $(this).hasClass('selected') ) {
	            //$(this).removeClass('selected');
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
			
	    
$('#addData').click(function(e){
	
	$('#myModal').modal('show');
	 
	   /* Aggiungi Elemento */ 
		$('#save').click(function(){
			
		  /* Get Data From Modal */
		  var request = "offerta";
		  
		  var apertada = $('#apertada').val();
		  var data_apertura = moment().format('YYYY-MM-DD');
		  var cliente = $('#cliente').val();
		  var strategico = $('#strategico').val();
		  var proposta = $('#proposta').val();
		  
		  var tipo = $('#tipo').val();
		  
		  var euroOra = $('#euroOra').val();
		  var euroPasto = $('#euroPg').val();
		  var euroKm = $('#euroKm').val();
		  var euroTl = $('#euroTl').val();
		  var volOre = $('#volumeOre').val();
		  
		  var tipoAtt = $('#tipoAtt').val();
		  var tipoPag = $('#tipoPag').val();
		  var sede = $('#sede').val();
		  
		  var nota = $('#nota').val();
		  var quadro;
        var a_pezzo;
		  
		  //tipo offerta
			if ($('#quadro').is(":checked"))
					quadro="SI";
			else 
			      quadro="NO";
			      
			if ($('#pezzo').is(":checked"))
					a_pezzo="SI";
			else 
			      a_pezzo="NO";      
			      
			      		
			
		 
		  var datas = "request="+request+"&aperta_da="+apertada+"&data_apertura="+data_apertura+"&cliente="+cliente+"&cliente_strategico="+strategico+"&quadro="+quadro+"&a_pezzo="+a_pezzo+"&costo_proposto="+proposta+"&tipo_operatore="+tipo+
		  "&euro_ora="+euroOra+"&euro_pastog="+euroPasto+"&euro_km="+euroKm+"&euro_tl="+euroTl+"&volume_ore="+volOre+"&tipo_attivita="+tipoAtt+"&pagamento="+tipoPag+"&sede="+sede+"&nota="+nota;
		  
		  if (apertada != null && cliente != null) {
		  	
		  	//Prevent Multiple Fired Events			
			 var me = $(this);
          e.preventDefault();

		    if ( me.data('requestRunning') ) {
		        return;
		    }
          me.data('requestRunning', true);
		  
			  $.ajax({
				type: "POST",
				url: "cgi-bin/postdata.php",
				data: datas,
				dataType: "html",
				success: function () {
					$.alert({
		          title: false,
				    content: 'Offerta aggiunta correttamente!',
				    confirmButton : 'OK!', 
					});
				},
				complete: function () {
				me.data('requestRunning', false);
				location.reload(); //Alternative??
				}
		     });
	  
	    }else {
				$.alert({
					title:false,
					confirmButton : 'OPS!',
				   content: 'Inserisci il nome di chi apre l`offerta e quello del cliente!'
				});
		  }
      });
    });
	  
	  
	   /*Edit Data from Table. Scrivere codice + pulito*/

		$('#editData').click(function(){
			var $rows = table.$('tr.selected');
		   var rows = $('tr.selected');
		   var rowData = table.rows(rows).data();
		   var id; //aperta_da, cliente, tipo_att, operatore, sede, costo;
		   var datas;
			
			
			if ($rows.length) {

			    $.each($(rowData),function(key,value){		    	  
			    	  id = value["id_offerta"];
			    	  
			    	  //Load Values
			    	  $('#proposta').val(value["costo_proposto"]);
			    	  $('#euroOra').val(value["euro_ora"]);
			    	  $('#euroPg').val(value["euro_pastog"]);
			    	  $('#euroKm').val(value["euro_km"]);
			    	  $('#euroTl').val(value["euro_tl"]);
			    	  $('#volumeOre').val(value["volume_ore"]);
			    	  $("#sede").val(value["sede"]);
			    	  $('#nota').val(value["nota"]) 
			    });

			    $('#myModal').modal('show'); 
		  
				/* Save Changes */
				$('#save').click(function(e){

				  var aperta_da =  $('#apertada').val();
				  var cliente = $('#cliente').val();
				  var strategico = $('#strategico').val();
		        var proposta = $('#proposta').val();

		        var tipo = $('#tipo').val();
		  
				  var euroOra = $('#euroOra').val();
				  var euroPasto = $('#euroPg').val();
				  var euroKm = $('#euroKm').val();
				  var euroTl = $('#euroTl').val();
				  var volOre = $('#volumeOre').val();
				  
				  var tipoAtt = $('#tipoAtt').val();
				  var tipoPag = $('#tipoPag').val();
				  var sede = $('#sede').val();
				  
				  var nota = $('#nota').val();
				  

				  datas = "request=offerta&id_offerta="+id+"&aperta_da="+aperta_da+"&cliente="+cliente+"&cliente_strategico="+strategico+"&costo_proposto="+proposta+"&tipo_operatore="+tipo+
		        "&euro_ora="+euroOra+"&euro_pastog="+euroPasto+"&euro_km="+euroKm+"&euro_tl="+euroTl+"&volume_ore="+volOre+"&tipo_attivita="+tipoAtt+"&pagamento="+tipoPag+"&sede="+sede+"&nota="+nota;


					if (aperta_da != null && cliente != null) {
						
					//Prevent Multiple Fired Events			
					 var me = $(this);
		          e.preventDefault();
		
				    if ( me.data('requestRunning') ) {
				        return;
				    }
		          me.data('requestRunning', true);
						
						  $.ajax({
							type: "POST",
							url: "cgi-bin/edit.php",
							data: datas,
							dataType: "html",
							success: function () {
								$.alert({
									title:false,
									confirmButton : 'DAJE!',
								   content: 'Offerta modificata correttamente!'
								});
							
							},
							complete: function () {
								me.data('requestRunning', false);
								location.reload();
							},
							error: function () {
								alert("Error AJAX Call!");
							}
							});
					
				   }else {
						$.alert({
							title:false,
							confirmButton : 'OPS!',
						   content: 'Inserisci il nome di chi apre l`offerta e quello del cliente!'
						});
				   }

		  	   });
		  	 
			   }else{ 
			   $.alert({
						title:false,
						confirmButton : 'OPS!',
					   content: 'Seleziona prima una riga!'
					});
			   }
		});

	   
    /* Rimuovi elemento selezionat */
	 $('#rmData').click( function () {
	 	
	 	   var $rows = table.$('tr.selected');
		   var rows = $('tr.selected');
		   var rowData = table.rows(rows).data();
		   var id;

			if ($rows.length){

				$.confirm({
				    title: 'Rimuovi',
				    content: 'Sicuro di voler eliminare questa offerta?',
				    confirmButton: 'SI',
                cancelButton: 'NO',
				    confirm: function(){
				    	 

					    var rowData = table.rows(rows).data();
					    $.each($(rowData),function(key,value){
					      id = value["id_offerta"]; //"name" being the value of your first column.
					    });
					    
					    	
					    var datas = "request=offerta&id="+id;
						 $.ajax({
							type: "POST",
							url: "cgi-bin/delete.php",
							data: datas,
							dataType: "html",
							success:  function () {
								$.alert('Offerta Eliminata!');
							},
							complete: function () {
							table.row('.selected').remove().draw( false );
							},
							
							})
				        
				    },
				    cancel: function(){
				        $.alert('Visto che non eri sicuro!');
				    }
				 
				});
				
			} else { 
			   $.alert({
				title : false,
			   confirmButton : 'OPS!',	
				content:'Seleziona prima una riga!'
			    });
			 }

	    } );
	    
	    
	    	   
    /* Accetta Offerta della riga selezionata */
	 $('#accept').click( function () { 
         var $rows = table.$('tr.selected');
		   var rows = $('tr.selected');
		   var rowData = table.rows(rows).data();
		   var datas, datas1, datas2;
		   var id, quadro, aperta_da, data_a, cliente, cliente_strategico, costo_proposto, operatore, tipo_operatore, tipo_att, eo, tariffa, vo, sede, ek, etl, nota;
		   
	      $.each($(rowData),function(key,value){
	    	   	
	        id = value["id_offerta"];
	        quadro = value["quadro"];
	        a_pezzo = value["a_pezzo"];
	        aperta_da = value["aperta_da"];
	        data_a = value["data_apertura"];
	        cliente = value["cliente"]; 
	        cliente_strategico = value["cliente_strategico"]; 
	        costo_proposto = value["costo_proposto"]; 
	        operatore = value["operatore"];
	        tipo_operatore = value["tipo_operatore"];
	        tipo_att = value["tipo_attivita"];
	        eo = value["euro_ora"];
	        tariffa = value["tariffa"];
	        vo = value["volume_ore"];
	        sede = value["sede"];
	        ek = value["euro_km"]; 
	        etl = value["euro_tl"]; 
	        nota = value["nota"];
	        
	        
		    datas1 = "request=accetta&id_commessa="+value["id_offerta"]+"&aperta_da="+aperta_da+"&data_apertura="+data_a+"&cliente="+cliente+"&cliente_strategico="+cliente_strategico+"&costo_proposto="+costo_proposto+
		    "&tipo_operatore="+tipo_operatore+"&tipo_attivita="+tipo_att+"&euro_ora="+eo+"&tariffa="+tariffa+"&volume_ore="+vo+"&sede="+sede+
		    "&euro_km="+ek+"&euro_tl="+etl+"&nota="+nota+"&quadro="+quadro+"&a_pezzo="+a_pezzo; 

	        
	        });
			    
			   if($rows.length){
			     	 
					$.ajax({
						type: "POST",
						url: "cgi-bin/postdata.php",
						data: datas1,
						dataType: "html",
	               success: function (msg) {
							$.alert({
								title:false,
							   content: msg
						    });
						},
					});

				  
		      }else {
		      	 $.alert({
						title : false,
					   confirmButton : 'OPS!',	
						content:'Seleziona prima una riga!'
					    });
			   }

	  });
	    

	    
//SPINNERS
$("input[name='mySpinner']").TouchSpin({
      verticalbuttons: true,
      postfix: '€',
      step: 0.25,
      decimals: 2

}).on('touchspin.on.startspin', function () {
	var x = valuta2();
	$(val).text(x);}
	);

$("input[name='mySpinner2']").TouchSpin({
      verticalbuttons: true,
      step: 0.01,
      decimals: 2
});
  


}); /*Fine Document Ready*/





function valuta( d ) {
   
   var valutazione;
   var rischio;
   var classe_rischio;
   var costo_industriale = d.euro_ora*1.15;
   var marg_lordo = ((d.costo_proposto - d.euro_ora)/d.costo_proposto)*100;
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

function valuta2() {
	  
  var classe_rischio;
  var rischio;  
  var cliente_strategico = $('#strategico').val();
  var costo_proposto = $('#proposta').val();
  var fattore = $('#fattore').val();


  var euro_ora = $('#euroOra').val();
  var euroPasto = $('#euroPg').val();
  var euroKm = $('#euroKm').val();
  var euroTl = $('#euroTl').val();
  var volume_ore = $('#volumeOre').val();
  

  var costo_industriale = euro_ora*fattore;
  var marg_lordo = ((costo_proposto - euro_ora)/costo_proposto)*100;
  var marg_ind = ((costo_proposto - costo_industriale)/costo_proposto)*100;
     
		 
     
    //Valutazione Del Rischio. Inserire in un'altra funzione 
	
	//Assegna Classe di Rischio    
    if (volume_ore=="<200") 
    	classe_rischio="A";
    else if (volume_ore=="[200,400]") 
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
    if (rischio=="ALTO" && cliente_strategico=="SI") 
    	return valutazione="Offerta da discutere con direzione";
    else if (rischio=="ALTO" && cliente_strategico=="NO")
      return valutazione="Non approvare";
    else if (rischio=="MEDIO" && cliente_strategico=="NO")
      return valutazione="Offerta da discutere con direzione";
    else if (rischio=="MEDIO" && cliente_strategico=="NO")
      return valutazione="Offerta da discutere con direzione";
    else 
      return valutazione="Procedere con l'offerta"; 

}





/* Formatting function for row details - modify as you need */
/* Formatting function for row details  */
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




function disable(select_val,input_id,input_id2) {
              var x=document.getElementById(select_val).checked;
              
              if(x == true){
              
                	 document.getElementById(input_id).disabled = true;
                	 document.getElementById(input_id2).disabled = false;
                     	 
              }
              else {
              	    document.getElementById(input_id).disabled = false;
                	 document.getElementById(input_id2).disabled = true;
   			}
}

function disable1(select_val,input_id) {
              var x=document.getElementById(select_val).checked;
              
              if(x == true)
                	 document.getElementById(input_id).disabled = true;
              else 
              	    document.getElementById(input_id).disabled = false;
   			
}

function changev(sel) {
if (sel.value == "interno") 
  $(euroOra).val(11.00);
else
  $(euroOra).val(14.00);
}			
					
							       
                
              


$('#saveAtt').click(function(){
var att = $('#att').val();
$('<option/>').attr('value',att).text(att).appendTo('#tipoAtt');
alert("Attivita aggiunta");

});
  

	  
