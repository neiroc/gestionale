//Global
var tableGeneral;
var data_i;
var data_f;
var costo;

$(document).ready(function() {
//
tableGeneral = $("#tb_ore_generali").DataTable({ dom: 'Brtip',"paging": false,"ordering": false,"language": {"zeroRecords":    "Seleziona una commessa",},});

	
	
//Date Interval
$(function () {
var dateNow = new Date();
var datePast = new Date();
var datePast = datePast.setMonth(dateNow.getMonth() -1);	
	
        $('#data_inizio').datetimepicker({
        		format: 'DD/MM/YYYY',
			   defaultDate : datePast,
        });
        
        $('#data_fine').datetimepicker({
        	   format: 'DD/MM/YYYY',
            useCurrent: false, //Important! See issue #1075
            defaultDate : dateNow,
        });
        
        $("#data_inizio").on("dp.change", function (e) {
            $('#data_fine').data("DateTimePicker").minDate(e.date);
        });
        $("#data_fine").on("dp.change", function (e) {
            $('#data_inizio').data("DateTimePicker").maxDate(e.date);
        });
});




//Tab Panel	   
$('#myTab a[href="#ore_generali"]').click(function (e) {
	
	
var $rows = tableComm.$('tr.selected');


 
 var rowData = tableComm.rows($rows).data();
 

 $.each($(rowData),function(key,value){
  
     costo = value["costo_proposto"];

 });


$('#mostra').click(function(){
	
tableGeneral.destroy();
	
//CONVERT DATE	
var from1 = $("#data_inizio").data("date").split("/");
var f1 = from1[2]+"-"+from1[1]+"-"+from1[0];

var from2 = $("#data_fine").data("date").split("/");
var f2 = from2[2]+"-"+from2[1]+"-"+from2[0];
data_i=f1;
data_f=f2;


    // Setup - add a text input to each header cell
    $('#tb_ore_generali thead tr#filterrow th').each( function () {
    	  if ($(this).hasClass( 'filter' )){ 
        var title = $('#tb_ore_generali thead th').eq( $(this).index() ).text();
        $(this).html( '<input width="28" type="text" placeholder="Filtra '+title+'" />' );
     }
    } );
   
    		  
   tableGeneral =  $('#tb_ore_generali').DataTable({

 	   dom: 'Brtip',
      buttons: [
        'pdf'
      ],
       "paging": false, 
	    "aProcessing": true, 
	    "aServerSide": true,
	     retrieve: true, //Reinitialize datatable
	    "ajax": {
	    	"url":'cgi-bin/get.php',
	    	"type": "GET",
	    	"data": { //All data to Get From DB
	    		"req" : "ore_generali",
	    	   "table" : "co_ore",
	    		"date1": f1,
	    		"date2": f2
	    	},
	     },
	    "language": {
               "zeroRecords":    "Nessun risultato trovato",
        }, 
	    "columns": [

            { "data": "data", "type": "date-eu",
               "render": function ( data, type, row, meta ) {
               var d = row.data.split('-');
			      return d[2]+'/'+d[1]+'/'+d[0] ;}, 
			   },
            { "data": "id_commessa" },
            { "data": "cliente" },
            { "data": "operatore" },
            { "data": "ore_std", "orderable":false },
            { "data": "ore_extra", "orderable":false },
            { "data": "ore_fest", "orderable":false },
            { "data": "ore_sabato", "orderable":false },
            { "data": "sede" },
            {"data": "spese", "visible":false}, 
		      {"data": "km", "visible":false}, 
		      {"data": "euro_pastog", "visible":false},
		      {"data": "team_leader", "visible":false},
                                   
        ],
        "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
            
            // Total ore std
            var total2 = tableGeneral
                .column( 4, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                	 if ( typeof a === 'string' ) {
				         a = a.replace(/[^\d.-]/g, '') * 1;
				        }
				       if ( typeof b === 'string' ) {
						  b = b.replace(/[^\d.-]/g, '') * 1;
						  }
                    return a+b;
                }, 0 );
 

            // Total ore extra
            var total3 = tableGeneral
                .column( 5, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                	 if ( typeof a === 'string' ) {
				         a = a.replace(/[^\d.-]/g, '') * 1;
				        }
				       if ( typeof b === 'string' ) {
						  b = b.replace(/[^\d.-]/g, '') * 1;
						  }
                    return a+b;
                }, 0 );
                
             // Total ore fest
            var total4 = tableGeneral
                .column( 6, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                	 if ( typeof a === 'string' ) {
				         a = a.replace(/[^\d.-]/g, '') * 1;
				        }
				       if ( typeof b === 'string' ) {
						  b = b.replace(/[^\d.-]/g, '') * 1;
						  }
                    return a+b;
                }, 0 );
                
            // Total ore sab
            var total5 = tableGeneral
                .column( 7, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                	 if ( typeof a === 'string' ) {
				         a = a.replace(/[^\d.-]/g, '') * 1;
				        }
				       if ( typeof b === 'string' ) {
						  b = b.replace(/[^\d.-]/g, '') * 1;
						  }
                    return a+b;
                }, 0 );
                
             // Total spese
            var total9 = tableGeneral
                .column( 9, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                	 if ( typeof a === 'string' ) {
				         a = a.replace(/[^\d.-]/g, '') * 1;
				        }
				       if ( typeof b === 'string' ) {
						  b = b.replace(/[^\d.-]/g, '') * 1;
						  }
                    return a+b;
                }, 0 );
                
              // Total km
            var total10 = tableGeneral
                .column( 10, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                	 if ( typeof a === 'string' ) {
				         a = a.replace(/[^\d.-]/g, '') * 1;
				        }
				       if ( typeof b === 'string' ) {
						  b = b.replace(/[^\d.-]/g, '') * 1;
						  }
                    return a+b;
                }, 0 );
                
             // Total pasti
            var total11 = tableGeneral
                .column( 11, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                	 if ( typeof a === 'string' ) {
				         a = a.replace(/[^\d.-]/g, '') * 1;
				        }
				       if ( typeof b === 'string' ) {
						  b = b.replace(/[^\d.-]/g, '') * 1;
						  }
                    return a+b;
                }, 0 );
                


            // Update footer
            $( api.column( 4 ).footer() ).html(
                'Ore std<br>'+ total2+''
            );
            $( api.column( 5 ).footer() ).html(
                'Ore extra<br>'+ total3+''
            );
            $( api.column( 6 ).footer() ).html(
                'Ore festivi<br>'+ total4+''
            );
            $( api.column( 7 ).footer() ).html(
                'Ore sabato<br>'+ total5+''
            );
            
            //Update summary
            var costo_extra = ((0.25*costo)+(+costo)).toFixed(2);
            var costo_festivi = ((0.50*costo)+(+costo)).toFixed(2);
            var costo_sabato  = ((0.20*costo)+(+costo)).toFixed(2);
            
            //Ore standard
            var totale_std = parseFloat((total2*costo).toFixed(2));
			   $('#tD1').html(total2);
			   $('#tD1_1').html(costo+" €");
			   $('#tD1_2').html(totale_std+" €");

			   
			   //Ore extra 
			   var totale_extra=parseFloat((costo_extra*total3).toFixed(2));
			   $('#tD2').html(total3);
			   $('#tD2_1').html(costo_extra +" €");
			   $('#tD2_2').html(totale_extra+" €");
			   
			   //Ore festivi
			   var totale_fest = parseFloat((costo_festivi*total4).toFixed(2));
			   $('#tD3').html(total4);
            $('#tD3_1').html(costo_festivi +" €");
            $('#tD3_2').html(totale_fest+" €");
			   
			   //Ore sabato
			   var totale_sab = parseFloat((costo_sabato*total5).toFixed(2));
            $('#tD4').html(total5);
            $('#tD4_1').html(costo_sabato +" €");
            $('#tD4_2').html(totale_sab+" €");
            
            //Ore TL
            /*var totale_tl = costo_tl*ore_tl;
            $('#tD5').html(ore_tl);
            $('#tD5_1').html(costo_tl+" €");
            $('#tD5_2').html(totale_tl+" €");*/
            
            //Spese
            $('#tD6_2').html(total9+" €");
            
            //Totale km
            //var totale_km = (total10*euro_km);
            //$('#td7').html(total8);
            //$('#tD7_1').html(total8+"*"+euro_km);
            //$('#tD7_2').html((total8*euro_km).toFixed(2)+" €");
            
            //Totale pasti
            $('#tD8_2').html(total9+" €");
            
            //TOTALE
            $('#tD9').html("<b>"+(total2+total3+total4+total5)+"</b>");

            $('#tD9_2').html("<b>"+(totale_std+totale_extra+totale_fest+totale_sab).toFixed(2)+" €</b>");
            
            


            
        },
        "order": [[0, 'desc']]
	     } );
	


	       // Apply the search
		    tableGeneral.columns().eq(0).each(function(colIdx) {
			    $('input', tableGeneral.column(colIdx).header()).on('keyup change', function() {
			        tableGeneral
			            .column(colIdx)
			            .search((this.value),true,false)
			            .draw();
			    });
			 
			    $('input', tableGeneral.column(colIdx).header()).on('click', function(e) {
			        e.stopPropagation();
			    });
			});



});

});

}); //DocumentReady Ends

//Tab
$('#myTab a[href="#home"]').click(function (e) {
	$('#addHours').prop("disabled",true);
});




function disable2(select_val) {
$('#addHours').prop("disabled",false);
}



