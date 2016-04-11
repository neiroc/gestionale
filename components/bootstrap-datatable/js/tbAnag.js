$(document).ready(function() {
	 
		
		/* Inizializza Tabella */
				
	   var table =  $('#tb_anag').DataTable({
	    "aProcessing": true, 
	    "aServerSide": true,
	    "initComplete": function(settings, json) {
        $('#tb_anag tbody tr:eq(0)').click();
        },    	     
	    "ajax": {
	    	"url":'cgi-bin/server-response.php',
	    	"data": {
	    		"req" : "anagrafica",
	    	  "table": "an_anagrafiche",
	    		"var1": "id_anagrafica", 
	    		"var2": "nome",
	    		"var3": "mobile",
	    		"var4": "email",
	    		"var5": "start_date",
	    		"var6": "tipo_anagrafica",
	    		"var7": "tel_fisso",
	    		"var8": "sede_legale",
	    		"var9": "piva",
	    		"var10": "ind_fatt",
	    		"var11": "ref_amm",
	    		"var12": "ref_comm",
	    		"var13": "tel_refcomm",
	    		"var14": "email_refcomm",

	    	},	    
	    },

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
          "columnDefs": [ {
		    "targets": 3,
		    "data": "download_link",
		    "render": function ( data, type, full, meta ) {
		      return '<a href="mailto:'+data+'">'+data+'</a>';
		    }
		  } ],
        "order": [[1, 'asc']]
	     } );
	     
	
	      
    
	    /* Seleziona Righe */
		 $('#tb_anag tbody').on( 'click', 'tr', function () {
	        if ( $(this).hasClass('selected') ) {
	            //$(this).removeClass('selected');
	        }
	        else {
	            table.$('tr.selected').removeClass('selected');
	            $(this).addClass('selected');
	        }
	    } );
	    
	    
		 // Mostra dettagli
	    $('#tb_anag tbody').on('click', 'td.details-control', function () {
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
	    
	    
		$('#addData').click(function(){
		
			$('#myModal').modal('show'); 
			    
		   /* Aggiungi Elemento */
		    
			$('#save1').submit(function(){
			  
			  var nome = $('#nome').val();
			  var cell = $('#cell').val();
			  var tel = $('#tel_fisso').val();
			  var email = $('#email').val();
			  var tipo = $('#tipo').val();		  
			  var sedel = $('#sede_legale').val();
			  var piva = $('#piva').val();
			  var ind_fatt = $('#ind_fatt').val();
			  var ref_amm = $('#ref_amm').val();
			  var ref_comm = $('#ref_comm').val();
			  var tel_ref_comm = $('#tel_refcomm').val();
			  var email_ref_comm = $('#email_refcomm').val();
			  
			  /* Le variabile postate devono avere lo stesso nome delle colonne della tabella del DB */
			  var datas = "request=anagrafica&nome="+nome+"&mobile="+cell+"&tel_fisso="+tel+"&email="+email+"&tipo_anagrafica="+tipo+
			  "&sede_legale="+sedel+"&piva="+piva+"&ind_fatt="+ind_fatt+"&ref_amm="+ref_amm+"&tel_refcomm="+tel_ref_comm+"&email_refcomm="+email_ref_comm;
			
           if (nome != null) {
           	
           	 //Prevent Multiple Fired Events			
				 var me1 = $(this);
	          //e1.preventDefault();
	
			    if ( me1.data('requestRunning') ) {
			        return;
			    }
	          me1.data('requestRunning', true);			  
			  
				  $.ajax({
					type: "POST",
					url: "cgi-bin/postdata.php",
					data: datas,
					dataType: "html",
					success : function () {
							$.alert({
					          title: false,
							    content: 'Anagrafica salvata correttamente!',
							    confirmButton : 'DAJE', 
							    confirm: function(){
								  
									table.row.add( {
						        "nome":       nome,
						        "mobile":   cell,
						        "email":     email,
						        "tipo_anagrafica": tipo
						       
						    		}).draw();
					
					          }
							});
					},
					complete : function () {
					  			me1.data('requestRunning', false);
	            },
	            error: function () {
	            alert("Errore AJAX Call");                 
	            }
			   });
		   
		   }else{
				$.alert({
				title : false,
			   confirmButton : 'OPS!',	
				content:'Inserisci prima un nome!'
			    });
			}
			
			$('#myModal').modal('toggle');
			return false; // avoid to execute the actual submit of the form. 
 
			});
		});
	  
	  
	   /*Edit Data from Table. Scrivere codice + pulito*/

		$('#editData').click(function(){
			
			
			var $rows = table.$('tr.selected');
			
			if ($rows.length) {
			 
			 var id;
		    var rows = $('tr.selected');
		    var rowData = table.rows(rows).data();

		    $.each($(rowData),function(key,value){
		        id = value["id_anagrafica"];
		        $("#nome").val(value["nome"]);
		        $("#cell").val(value["mobile"]);
		        $("#tel_fisso").val(value["tel_fisso"]); 
		        $("#email").val(value["email"]);
		        $("#tipo").val(value["tipo_anagrafica"]);
		        
		        $("#sede_legale").val(value["sede_legale"]); 
		        $("#piva").val(value["piva"]); 
		        $("#ind_fatt").val(value["ind_fatt"]); 
		        $("#ref_amm").val(value["ref_amm"]); 
		        $("#ref_comm").val(value["ref_comm"]); 
		        $("#tel_refcomm").val(value["tel_refcomm"]); 
		        $("#email_refcomm").val(value["email_refcomm"]); 
		    });

		  
		  $('#myModal').modal('show'); 
		  
				/* Save Changes */
				$('#save1').submit(function(e){
						
					 //Prevent Multiple Fired Events
					 			
					 var me = $(this);
		          //e.preventDefault();
		
				    if ( me.data('requestRunning') ) {
				        return;
				    }
		          me.data('requestRunning', true);
					
					
					
				  var nome = $('#nome').val();
				  var cell = $('#cell').val();
				  var tel  = $('#tel_fisso').val();
				  var email= $('#email').val();
				  var tipo = $('#tipo').val();		  
				  var sedel = $('#sede_legale').val();
				  var piva = $('#piva').val();
				  console.log(piva);
				  var ind_fatt = $('#ind_fatt').val();
				  var ref_amm = $('#ref_amm').val();
				  var ref_comm = $('#ref_comm').val();
				  var tel_ref_comm = $('#tel_refcomm').val();
				  var email_ref_comm = $('#email_refcomm').val();
			  
				
				  
				  var datas = "request=anagrafica&id="+id+"&nome="+nome+"&cell="+cell+"&tel_fisso="+tel+"&email="+email+"&tipo="+tipo+"&sede_legale="+sedel+"&piva="+piva+"&ind_fatt="+ind_fatt+
				               "&ref_amm="+ref_amm+"&ref_comm="+ref_comm+"&tel_refcomm="+tel_ref_comm+"&email_refcomm="+email_ref_comm;
				  
				  $.ajax({
					type: "POST",
					url: "cgi-bin/edit.php",
					data: datas,
					dataType: "html",
					success: function(msg) {
                  	$.alert({
				          title: false,
						    content: 'Anagrafica modificata!',
						    confirmButton : 'DAJE', 
						    });
	            },
               complete: function() {
               me.data('requestRunning', false);
               },
               error: function () {
               alert("Errore AJAX Call");                 
               }
          
				  });
				  
				  $('#myModal').modal('toggle');
				  return false; // avoid to execute the actual submit of the form. 
				});
		
		 
		  
		  	} else {
				$.alert({
	         title : false,
			   confirmButton : 'OPS!',	
				content:'Seleziona prima una riga!'});	  	
		  	}
		  	
			
		 
		
		});

	   
    /* Rimuovi elemento selezionat */
	 $('#rmData').click( function () {
       var $rows = table.$('tr.selected');
	    var id;
	    var rows = $('tr.selected');
	    var rowData = table.rows(rows).data();
	   
	    $.each($(rowData),function(key,value){
	    id = value["id_anagrafica"]; //"name" being the value of your first column.
	    });
	    
	    		   
	    		   if($rows.length){
					
					$.confirm({
				    title: 'Rimuovi',
				    content: 'Sicuro di voler eliminare questa anagrafica?',
				    confirmButton: 'SI',
                cancelButton: 'NO',
				    confirm: function(){
				    	
					var datas = "request=anagrafica&id="+id;
					$.ajax({
						type: "POST",
						url: "cgi-bin/delete.php",
						data: datas,
						dataType: "html"
						  }).done(function( msg ) {
				     table.row('.selected').remove().draw( false );
					  }).fail(function() {
					  alert( "Error" );
					  }).always(function() {
					//alert( "finished" );
					  });
	
					  $.alert('Anagrafica Eliminata!');				        		
					  
					  
				    },
				    cancel: function(){
				        $.alert('Visto che non eri sicuro!')
				    }

				    
				   });
				
				}else{ $.alert({
				title : false,
			   confirmButton : 'OPS!',	
				content:'Seleziona prima una riga!'
			    });
			    }			    
				
				

	    } );

}); /*Fine Document Ready*/



function disable(select_val,input_id) {
                var e = document.getElementById(select_val);
                var x = document.getElementsByName(input_id);
                var i;
                
                var strUser = e.options[e.selectedIndex].value;
                if(strUser === "Cliente"){
                	  //document.getElementById(input_id).disabled = false;
                    
							for (i = 0; i < x.length; i++) {
							    x[i].disabled = false; 
							   }            
                }
                else{
                  for (i = 0; i < x.length; i++) {
							    x[i].disabled = true; 
							   }  
                }
}





/* Formatting function for row details - modify as you need */
function format ( d ) {
	
	if (d.tipo_anagrafica == "Cliente") {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Registrato il: '+d.start_date+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Tel. Fisso: '+d.tel_fisso+'</td>'+          
        '</tr>'+
        '<tr>'+
            '<td>Sede: '+d.sede_legale+'</td>'+
            '<td>Indirizzo Fatt. '+d.ind_fatt+ '</td>'+
            '<td>P.IVA ' +d.piva+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Ref. Amm. : '+d.ref_amm+'</td>'+
            
        '</tr>'+
        '<tr>'+
            '<td>Ref. Comm. : '+d.ref_comm+'</td>'+
            '<td>Tel. :'+d.ref_comm+'</td>'+
            '<td>Email  :' +d.email_refcomm+'</td>'+
        '</tr>'+
    '</table>';
 }
 else {
 	return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Registrato il :</td>'+
            '<td>'+d.start_date+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extra info :</td>'+
            '<td>'+d.tipo_anagrafica+'</td>'+
        '</tr>'+
    '</table>';
 
 }
}



    
  
    


	 
	 

	  
