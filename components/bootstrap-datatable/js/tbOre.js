//Global
var table1;
var id_commessa;
var costo;
var quadro;
var a_pezzo;
var sede;
var date1;
var month;

$(document).ready(function() {
	
	
// DateTime		
 $(function () {
                $('#datetimepicker2').datetimepicker({      
	                viewMode: 'months',
	                format: 'MM/YYYY',
	                widgetPositioning: {
	                horizontal: 'right',
	                vertical: 'bottom',
	                useCurrent:'false'
                   }
                });
 });
var i=0;

//Tab Panel1	    
$('#myTab a[href="#ore"]').click(function (e) {
	if (i>0) table1.destroy();
  e.preventDefault();
  disable2(addHours);
  
  $('#tb_head').hide(); //Nascondi header tabella
  

var $rows = table.$('tr.selected');

if ($rows.length) {
 
 var dataArr1 = [];
 var rowData = table.rows($rows).data();
 

 $.each($(rowData),function(key,value){
     id_commessa = value["id_commessa"];
     costo = value["costo_proposto"];
     quadro = value["quadro"];
     a_pezzo = value["a_pezzo"];
     sede = value["sede"];
 });
 
//Disable input fields
//ridonadante?
 if (quadro=="NO") {
 	$('#sede').val(sede);
 	$('#sede').prop("disabled",true);
 }
 if (a_pezzo=="NO") {
  	$('#n_pezzi').prop("disabled",true);
 	$('#spese').prop("disabled",true);
 	$('#km').prop("disabled",true);
 	$('#vosto_ora').prop("disabled",true);
}else {
 	$('#ore_std').prop("disabled",true);
 	$('#ore_extra').prop("disabled",true);
 	$('#ore_fest').prop("disabled",true);
 	$('#ore_sabato').prop("disabled",true);

}
 
  
 
$("#datetimepicker2").on("dp.update", function(e) {
  	i++;
   if (i > 1)  table1.destroy();
  	
  	date1 = $('#datetimepicker2').data("date");
  	monthName(date1);
  	$('#month').html(monthName(date1));	
  	$('#tb_head').show();	
		 
				  
   table1 =  $('#tb_ore').DataTable({
 	   dom: 'Bfrtip',
      buttons: [
        'pdf'
    ], 
	    "aProcessing": true, 
	    "aServerSide": true,
	     retrieve: true, //Reinitialize datatable
	    "ajax": {
	    	"url":'cgi-bin/get.php',
	    	"type": "GET",
	    	"data": { //All data to Get From DB
	    		"req" : "ore",
	    	   "table" : "co_ore",
            "var1": id_commessa, 
	    		"var2": "cliente",
	    		"date": date1
	    	},
	     },
	    "language": {
               "zeroRecords":    "Nessun risultato trovato",
        }, 
	    "columns": [

            { "data": "data" },
            { "data": "operatore" },
            { "data": "ore_std" },
            { "data": "ore_extra" },
            { "data": "ore_fest" },
            { "data": "ore_sabato" },

                                    
        ],
 
        "order": [[0, 'desc']]
	     } );
	
	//SUMMARY 
   summary(id_commessa, date1);

	
});     
	     
	  
 
		  
} else alert("Non hai selezionato nessuna riga");


		


});

//Tab
$('#myTab a[href="#home"]').click(function (e) {
table1.destroy();

$('#addHours').prop("disabled",true);
});


	    	$('#hoursModal').on('shown.bs.modal', function () {	    		    		
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


$('#addHours').click(function(){


		    
		 $("#id_commessa").val(id_commessa);

		 
		  $('#hoursModal').modal('show'); 
		  
				/* Save Changes */
				/*$('#savechanges').click(function(){
				  var nome = $('#nome2').val();
			
				
				  
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
		
		
		 
		  
		  	} else alert("Non hai selezionato nessuna riga")*/
		
		});
		
			   /* Aggiungi Elemento */ 
		$('#saveHours').click(function(){
		  var request ="ore"
		  var id_commessa = $('#id_commessa').val();
		  var datatime = $('#datatime').val();
		  
		  var operatore = $('#operatore2').val();
		  var ore_std = $('#ore_std').val();
		  var ore_extra = $('#ore_extra').val();
		  var ore_fest = $('#ore_fest').val();
		  var ore_sabato = $('#ore_sabato').val();
		 
		  var datas = "request="+request+"&id_commessa="+id_commessa+"&data="+datatime+"&operatore="+operatore+"&ore_std="+ore_std+"&ore_extra="+ore_extra+"&ore_fest="+ore_fest+
		  "&ore_sabato="+ore_sabato;
		  
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
	  
// Other Feautures		
  $(function () {
                $('#datetimepicker1').datetimepicker({      
                format: "DD/MM/YYYY"
                
                });
 });
 

//SPINNERS
    $("input[name='mySpinner']").TouchSpin({
    	max: 8,
      verticalbuttons: true
    });
    
    $("input[name='mySpinner2']").TouchSpin({
    	
      verticalbuttons: true
    });


}); /* Fine Document Ready*/


function disable2(select_val) {
$('#addHours').prop("disabled",false);
}




//specchio summary
function summary(id, mese) {

	$.ajax({
				type: "GET",
				url: "cgi-bin/get.php",
				data: {req: "summary", id: id, date : mese},
            dataType: "json",
 				success: function (data) {
 					
 					//migliorare 					
				   $('#td1').html(data[0].total_std);
				   $('#td1_1').html(costo+" €");
				   $('#td1_2').html(costo*data[0].total_std+" €");
				 
				   $('#td2').html(data[0].total_extra); //ore tot extra
				   $('#td2_1').html((0.25*costo)+(+costo) +" €"); //costo
				   $('#td2_2').html((((0.25*costo)+(+costo))*data[0].total_extra) +" €");
				   
				   $('#td3').html(data[0].total_sabato);
				   $('#td3_1').html((0.20*costo)+(+costo) +" €");
				   $('#td3_2').html((((0.20*costo)+(+costo))*data[0].total_sabato) +" €");
				   
				   $('#td4').html(data[0].total_fest);
				   $('#td4_1').html(data[0].total_fest);
				   $('#td4_1').html(data[0].total_fest);
			        
			     }
				
				 
		     });
}

function monthName(date) {
	
	switch (date.substring(0,2)) {
	    case '01':
	        return "GENNAIO";
	        break;
	    case '02':
	        return "FEBBRAIO";
	        break;
	    case '03':
	        return "MARZO";
	        break;
	    case '04':
	        return "APRILE";
	        break;
	    case '05':
	        return "MAGGIO";
	        break;
	    case '06':
	        return "GIUGNO";
	        break;
	    case '07':
	        return "LUGLIO";
	        break;
	    case '08':
	        return "AGOSTO";
	        break;
	    case '09':
	        return "SETTEMBRE";
	        break;
	    case '10':
	        return "OTTOBRE";
	        break;
	    case '11':
	        return "NOVEMBRE";
	        break;
	    case '12':
	        return "DICEMBRE";
	        break;    
	}
}				






