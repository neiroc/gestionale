$(document).ready(function() {
	
//GLOBAL	
var tableRep;
var tableHours;
var id_commessa;

// Other Feautures		
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
 
 
var nome = $.cookie('nome');

  	/* Inizializza Tabella */
				
	    tableRep = $('#tb_rep').DataTable({

	    "aProcessing": true, 
	    "aServerSide": true,
	
	     retrieve: true, //Reinitialize datatable
	    "ajax": {
	    	"url":'cgi-bin/get.php',
	    	"type": "GET",
	    	"data": { //All data to Get From DB
	    		"req" : "report",
	    	   "table" : "co_commesse",
	    	   "nome" :   nome,
	    	   "var1" : "id_commessa",
	    	},
	     },
		 "language": {
               "zeroRecords":    "Nessun risultato trovato",
        },
	    "columns": [
            { "data": "data_apertura" },
            { "data": "tipo_attivita" },
            { "data": "sede" },
                                               
        ],
 
        "order": [[1, 'asc']]
	     } );
	     
	
	      
    
	    /* Seleziona Righe */
	    $('#tb_rep tbody').on( 'click', 'tr', function () {

		   		    
		   		   
	        if ( $(this).hasClass('selected') ) {
	            $(this).removeClass('selected');
	        }
	        else {
	            tableRep.$('tr.selected').removeClass('selected');
	            $(this).addClass('selected');		   		
	        }
	    });
	    
	    
	    


	
//Tab Panel1	    
$('#myTab a[href="#report"]').click(function (e) {

var $rows = tableRep.$('tr.selected');	
	
if ($rows.length) {
	    
   var rowData = tableRep.rows($rows).data();
   
    $.each($(rowData),function(key,value){
    id_commessa = value["id_commessa"];
     });
     
     				  
   tableHours =  $('#tb_client').DataTable({
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
	     
}else {
alert("Selezione una riga");
}



});


	    


});
	    



    
  

	  
