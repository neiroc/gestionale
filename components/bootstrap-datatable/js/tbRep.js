//GLOBAL	SCOPE
var tableComm;
var tableHours;
var tableDefects;
var id_commessa;
var upUs;
var g;

	
	
	     
function infoHours(std,xtra,fest,sab) {
	$.dialog({
    title: 'Text content!',
    content: 'Ore standard :'+std+'<br>'+
    			 'Ore Extra :' +xtra+'<br>'+
    			 'Ore Festivi :' +fest+'<br>'+
    			 'Ore Sabato :' +sab+'<br>',
});
			
}


$(document).ready(function() {
	
	upUser();

tableComm = $("#tb_comm").DataTable({"paging": false,"ordering": false,"language": {"zeroRecords":    "Seleziona un intervallo di tempo",},}); // Initialize Datatable
tableHours = $("#tb_hours").DataTable({"paging": false,"ordering": false,"language": {"zeroRecords":    "Seleziona prima una commessa",},}); // Initialize Datatable
tableDefects = $("#tb_defects").DataTable({"paging": false,"ordering": false,"language": {"zeroRecords":    "Seleziona prima una commessa",},}); // Initialize Datatable


//tableComm = $("#tb_c").DataTable({"paging": false,"ordering": false,"language": {"zeroRecords":    "Seleziona un intervallo di tempo",},}); // Initialize Datatable

function upUser(){
	upUs=$.cookie('nome');
	$('#navuser1').html('<span class="glyphicon glyphicon-user"></span> ' + upUs);
}
	
			

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
            useCurrent: false, //Important! See issue #1075,
            defaultDate : dateNow,
        });
        
        //$("#data_inizio").data('datetimepicker').setLocalDate(new Date(year, month, day, 00, 01));

        
        $("#data_inizio").on("dp.change", function (e) {
            $('#data_fine').data("DateTimePicker").minDate(e.date);
        });
        $("#data_fine").on("dp.change", function (e) {
            $('#data_inizio').data("DateTimePicker").maxDate(e.date);
        });
    });


//SHOW COMMESSE CLIENT
$('#mostra').click(function (e) {
	
	tableComm.destroy(); 
	
	var nome = $.cookie('nome');
	var d1 =  $('#data_inizio').val();
	var d2 =  $('#data_fine').val();
	 
	//CONVERT DATE	
	var from1 = $("#data_inizio").data("date").split("/");
	var inizio = from1[2]+"-"+from1[1]+"-"+from1[0];
	
	var from2 = $("#data_fine").data("date").split("/");
	var fine = from2[2]+"-"+from2[1]+"-"+from2[0];	
	
	//aggiorna dati quando cambia intervallo

 					

  	/* Inizializza Tabella */
				
	    tableComm = $('#tb_comm').DataTable({
       "paging": false,
       "searching": false,
       "ordering": false,
	    "aProcessing": true, 
	    "aServerSide": true,
	     retrieve: true, //Reinitialize datatable ??
	    "ajax": {
	    	"url":'cgi-bin/get.php',
	    	"type": "GET",
	    	"data": { //All data to Get From DB
	    		"req" : "report",
	    	   "nome" :   nome,
	    	   "inizio":  inizio,
	    	   "fine":    fine,

	    	},
	     },
	     "initComplete": function(settings, json) {
        $('#tb_comm tbody tr:eq(0)').click();
        }, 
		 "language": {
               "zeroRecords":    "Nessun risultato trovato",
        },
	    "columns": [
            { "data": "data_apertura" },
            { "data": "tipo_attivita" },
            { "data": "sede" },
                                               
        ],
 
        "order": [[0, 'asc']]
	     } );
	     
	
	      
    
	    /* Seleziona Righe */
	    $('#tb_comm tbody').on( 'click', 'tr', function () {

	        
	            tableComm.$('tr.selected').removeClass('selected');
	            $(this).addClass('selected');		   		
	        
	    });

});

 

	
//REPORT HOURS PANEL TAB 	    
$('ul.nav a').on('shown.bs.tab', function(e){

tableHours.destroy();

var $rows = tableComm.$('tr.selected');	
	


   var rowData = tableComm.rows($rows).data();
   
    $.each($(rowData),function(key,value){
    id_commessa = value["id_commessa"];
     });
     
     				  
   tableHours =  $('#tb_hours').DataTable({
 	   dom: 'Bfrtip',
      buttons: [
        'pdf'
    ], 
	    "aProcessing": true, 
	    "aServerSide": true,
	    "paging":false,
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
            { "data": "operatore", "orderable" : false },
            { "data": "total", 
              "render": function ( data, type, row, meta ) {
			    		//console.log(row.ore_fest);		    	
			      return '<a style="cursor: pointer; color:green" onclick="infoHours(\''+row.ore_std+'\',\''+row.ore_extra+'\',\''+row.ore_fest+'\',\''+row.ore_sabato+'\')" >'+data+'</a>' ;
		          }, 
            },
            //{ "data": "sede"}, 
        ],
 
 
        "order": [[0, 'desc']]
	     } );
	     




});



//DEFECTS PANEL TAB     
$('ul.nav a').on('shown.bs.tab', function(e){
    
    //Clear table and graph
    tableDefects.destroy();
    $("#pareto-difetti").html("");

    var json;
    var $rows = tableComm.$('tr.selected');	
    var rowData = tableComm.rows($rows).data();
   
    $.each($(rowData),function(key,value){
    id_commessa = value["id_commessa"];
     });
     
     /*
       $.ajax({
	type: "GET",
	url: "cgi-bin/get.php",
	data: "req=tipo_difetti&id="+id_commessa,
	dataType: "json",
	success : function (data) {
		$('#dif1').html(data[0].difetto1);
		$('#dif2').html(data[0].difetto2);
		$('#dif3').html(data[0].difetto3);
		$('#dif4').html(data[0].difetto4);
		$('#dif5').html(data[0].difetto5);
		$('#dif6').html(data[0].difetto6);
		$('#dif7').html(data[0].difetto7);
		$('#dif8').html(data[0].difetto8);

	},
   error: function () {
                   
   }
});	*/
     
		  
   tableDefects =  $('#tb_defects').DataTable({
 	   dom: 'Bfrtip',
      buttons: [
        'pdf'
    ], 
	    "aProcessing": true, 
	    "aServerSide": true,
	     "searching": false,
       "bSort": false,
       "paging":false,
	     retrieve: true, //Reinitialize datatable
	    "ajax": {
	    	"url":'cgi-bin/get.php',
	    	"type": "GET",
	    	"data": { //All data to Get From DB
	    		"req" : "difetti",
            "id": id_commessa, 

	    		
	    	},
	     },
	  
	    "language": {
               "zeroRecords":    "Nessun risultato trovato",
        },

	    "columns": [

            { "data": "data" },
            { "data": "seq_inizio" },
            { "data": "seq_fine" },
            { "data": "pezzi_controllati" },
            { "data": "ko",
             "render": function ( data, type, row, meta ) {
		    	var perc = ((row.ko / row.pezzi_controllati)*100).toFixed(1);
				
		    	//console.log(perc);
		      return '<a style="cursor: pointer; color:#f0ad4e" onclick="prova(\''+row.ko+'\')" >'+data+'</a> ('+perc+'%)' ;
		    } 
            
            },
            { "data": "rilavorati" },
            { "data": "ok" },
        ],
 
        "order": [[0, 'asc']]
	     } );
	     
	     //&& $('#pareto-difetti').html().length == 0 //controlla se un grafico è gia stato inizializzato
	     // this ain't pretty, but you should get the idea
        if ($(e.target).attr('href') == '#difetti') {
        	console.log(id_commessa);
        // jsondata x graph
			json = (function () {
         json = null;
        $.ajax({
            'async': false,
            'global': false,
            'data': "req=tipo_difetti2&id="+id_commessa,
            'url': 'cgi-bin/get.php',
            'dataType': "json",
            'success': function (data) {
                json = data;
					 json.sort(function(a, b) {
						    return b.tot_difetti - a.tot_difetti;
						});
						      
			g = Morris.Bar({
                element: 'pareto-difetti',
                resize: true,
                data: json,
                xkey: "difetto",
                ykeys: ['tot_difetti'],
                labels: ['Difetti'],
                barRatio: 0.4,
                xLabelAngle: 90,
                hideHover: 'auto',
                postUnits: ' ',
                
            });
						
						                
                
                
            }
        });
        return json;
    	})
      ();    	          
          
          
          
      
        }


});


	    

});

    


	  
