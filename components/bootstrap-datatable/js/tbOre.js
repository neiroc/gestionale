//Global
var table1;
var id_commessa;


$(document).ready(function() {

//Tab Panel1	    
$('#myTab a[href="#ore"]').click(function (e) {
  e.preventDefault();
  disable2(addHours);
  
  

var $rows = table.$('tr.selected');

if ($rows.length) {
 
 var dataArr1 = [];
 var rowData = table.rows($rows).data();
 

 $.each($(rowData),function(key,value){
     id_commessa = value["id_commessa"];
 });
		
		 
				  
 table1 =  $('#tb_ore').DataTable({
 	   dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf'
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
	    	},
	    },
	    "columns": [

            { "data": "data" },
            { "data": "operatore" },
            { "data": "ore_std" },
            { "data": "ore_extra" },
            { "data": "ore_fest" },
            { "data": "ore_sabato" },

                                    
        ],
 
        "order": [[1, 'asc']]
	     } );
	     
	  
 
		  
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
		  console.log(datatime);
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
    	
      verticalbuttons: true
    });


}); /* Fine Document Ready*/


function disable2(select_val) {
$('#addHours').prop("disabled",false);
}			
					






