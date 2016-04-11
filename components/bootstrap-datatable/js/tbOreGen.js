//Global
var tableGeneral;
var data_inzio;
var data_fine;

$(document).ready(function() {
	
//Date Interval
$(function () {
        $('#data_inizio').datetimepicker({
        		format: 'DD/MM/YYYY'
        });
        
        $('#data_fine').datetimepicker({
        	   format: 'DD/MM/YYYY',
            useCurrent: false //Important! See issue #1075
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


  //disable2(addHours);
  
  $('#head_ore_gen').hide(); //Nascondi header tabella
  


$('#mostra').click(function(){
	
//tableGeneral.destroy();
	
//CONVERT DATE	
var from1 = $("#data_inizio").data("date").split("/");
var f1 = from1[2]+"-"+from1[1]+"-"+from1[0];

var from2 = $("#data_fine").data("date").split("/");
var f2 = from2[2]+"-"+from2[1]+"-"+from2[0];



$('#head_ore_gen').show();	
		 
				  
   tableGeneral =  $('#tb_ore_generali').DataTable({
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

            { "data": "data" },
            { "data": "id_commessa" },
            { "data": "operatore" },
            { "data": "ore_std" },
            { "data": "ore_extra" },
            { "data": "ore_fest" },
            { "data": "ore_sabato" },
            { "data": "sede" },
                                   
        ],
        "order": [[0, 'desc']]
	     } );
	
	//SUMMARY 
   //summary(id_commessa, date1);

	
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
				   $('#td4_1').html((0.50*costo)+(+costo) +" €");
				   $('#td4_2').html((((0.50*costo)+(+costo))*data[0].total_sabato) +" €");
			        
			     }
				
				 
		     });
}

