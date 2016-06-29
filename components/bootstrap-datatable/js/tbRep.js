//GLOBAL	VARS
var tableComm;
var tableHours;
var tableDefects;

var data_inizio;
var data_fine;

var id_commessa;
var tipo_att;
var sede;
var difetti = new Array();

var upUs;
var g;



$(document).ready(function() {

upUser();


tableHours = $("#tb_hours").DataTable({"paging": false,"ordering": false,"language": {"zeroRecords":    "Seleziona prima una commessa",},}); // Initialize Datatable
tableDefects = $("#tb_defects").DataTable({"paging": false,"ordering": false,"language": {"zeroRecords":    "Seleziona prima una commessa",},}); // Initialize Datatable


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
			   locale: 'it',

        });
        
        $('#data_fine').datetimepicker({
        	   format: 'DD/MM/YYYY',
            useCurrent: false, //Important! See issue #1075,
            defaultDate : dateNow,
            locale: 'it'
        });
        
        //$("#data_inizio").data('datetimepicker').setLocalDate(new Date(year, month, day, 00, 01));

        
        $("#data_inizio").on("dp.change", function (e) {
            $('#data_fine').data("DateTimePicker").minDate(e.date);
        });
        $("#data_fine").on("dp.change", function (e) {
            $('#data_inizio').data("DateTimePicker").maxDate(e.date);
        });
});


	var nome = $.cookie('nome');



  	    /* TABELLA COMMESSE CLIENTE */
  	    
	    tableComm = $('#tb_comm').DataTable({
       "paging": false,
       "searching": false,
	    "aProcessing": true, 
	    "aServerSide": true,
	     retrieve: true, //Reinitialize datatable ??
	    "ajax": {
	    	"url":'cgi-bin/get.php',
	    	"type": "GET",
	    	"data": { //All data to Get From DB
	    		"req" : "report",
	    	   "nome" :   nome,
	    	},
	     },
	     "initComplete": function(settings, json) {
        $('#tb_comm tbody tr:eq(0)').click();
        }, 
		 "language": {
               "zeroRecords":    "Nessun risultato trovato",
        },
	    "columns": [
            { "data": "data_apertura", "orderable" : true, type: 'date-eu',
               "render": function ( data, type, row, meta ) {
               var d = row.data_apertura.split('-');
			      return d[2]+'/'+d[1]+'/'+d[0] ;
		          }, 
		      },
            { "data": "tipo_attivita", "orderable" : false },
            { "data": "sede", "orderable" : false },
            { "data": "nota", className: "nota dt-head-right dt-body-center", "width": "20px", "orderable": false,
              "render": function ( data, type, row, meta ) {
              	var color;
              	if (row.nota=="") color ="gainsboro"; else color="cornflowerblue";
		         return '<a class="prova" style="cursor: pointer; color:'+color+'" onclick="comment(\''+row.nota+'\')" ><span class="glyphicon glyphicon-comment" aria-hidden="true"></span></a>' ;
		        }
		      },
                                               
        ],
 
        "order": [[0, 'asc']]
	     } );
	     
	
	      
    
	    /* Seleziona Righe */
	    $('#tb_comm tbody').on( 'click', 'tr', function () {

	            tableComm.$('tr.selected').removeClass('selected');
	            $(this).addClass('selected');		   		
	        
	    });



 

	
//REPORT HOURS PANEL TAB 	    
$('ul.nav a').on('shown.bs.tab', function(e){

tableHours.destroy();
data_inizio =  $("#data_inizio").data("date");
data_fine =  $("#data_fine").data("date");



$('.dal').html(data_inizio);
$('.al').html(data_fine);


var $rows = tableComm.$('tr.selected');	
	


   var rowData = tableComm.rows($rows).data();
   
    $.each($(rowData),function(key,value){
    id_commessa = value["id_commessa"];
    tipo_att = value["tipo_attivita"]
    sede = value["sede"]
    });
     
     $('.sedeh').html(sede);
     $('.tipo_att').html(tipo_att);
     
     
     				  
   tableHours =  $('#tb_hours').DataTable({
 	   dom: 'Bfrtip',
	    "aProcessing": true, 
	    "aServerSide": true,
	    "paging":false,
	     retrieve: true, //Reinitialize datatable
	    "ajax": {
	    	"url":'cgi-bin/get.php',
	    	"type": "GET",
	    	"data": { //All data to Get From DB
	    		"req" : "ore_cliente",
	    	   "table" : "co_ore",
            "var1": id_commessa, 
	    		"var2": "cliente",
	    		"data_i" : convertDate(data_inizio),
	    		"data_f" : convertDate(data_fine),
	    	},
	     },
	    "language": {
               "zeroRecords":    "Nessun risultato trovato",
        },
         
	    "columns": [

            { "data": "data", "type": "date-eu",  
               "render": function ( data, type, row, meta ) {
               var d = row.data.split('-');
			      return d[2]+'/'+d[1]+'/'+d[0] ;
		          }
		      },
            { "data": "operatore", "orderable" : false },
            { "data": "total", "orderable" : false,
              "render": function ( data, type, row, meta ) {
			    		//console.log(row.ore_fest);		    	
			      return '<a style="cursor: pointer; color:green" onclick="infoHours(\''+row.ore_std+'\',\''+row.ore_extra+'\',\''+row.ore_fest+'\',\''+row.ore_sabato+'\')" >'+data+'</a>' ;
		          }, 
            },
            //{ "data": "sede"}, 
        ],

        "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
 

            // Total over the current page
            total = tableHours
                .column( 2, { page: 'current'} )
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
            $( api.column( 2 ).footer() ).html(
                ''+ total+''
            );
            
            //Update summary
			   $('#totalh').html(total);
            
            
        },
 
 
        "order": [[0, 'desc']]
	     } );

});



//DEFECTS PANEL TAB     
$('ul.nav a').on('shown.bs.tab', function(e){
    
    data_inizio =  $("#data_inizio").data("date");
    data_fine =  $("#data_fine").data("date");
    var data_i_conv = convertDate(data_inizio);
    var data_f_conv = convertDate(data_fine);
    
    
    //Clear table and graph
    tableDefects.destroy();
    $("#pareto-difetti").html("");
    difetti = [];

    var json;
    var $rows = tableComm.$('tr.selected');	
    var rowData = tableComm.rows($rows).data();
   
    $.each($(rowData),function(key,value){
    id_commessa = value["id_commessa"];
     });
     
  
   /* DEFECTS TABLE*/  
   tableDefects =  $('#tb_defects').DataTable({
 	   dom: 'Bfrtip',
	    "aProcessing": true, 
	    "aServerSide": true,
       "paging":false,
	     retrieve: true, //Reinitialize datatable
	    "ajax": {
	    	"url":'cgi-bin/get.php',
	    	"type": "GET",
	    	"data": { //All data to Get From DB
	    		"req" : "difetti",
            "id": id_commessa,
            "data_i": data_i_conv,
            "data_f": data_f_conv,
	    	},
	     },
	  
	    "language": {
               "zeroRecords":    "Nessun risultato trovato",
        },

	    "columns": [

            { "data": "data", "type" : "date-eu", "orderable":true,
              "render": function ( data, type, row, meta ) {
               var d = row.data.split('-');
			      return d[2]+'/'+d[1]+'/'+d[0] ;
		          }            
             },
            { "data": "seq_inizio", "orderable": false },
            { "data": "seq_fine", "orderable": false },
            { "data": "pezzi_controllati", "orderable": false },
            { "data": "ok", "orderable": false },
            { "data": "ko", "orderable": false,
              "render": function ( data, type, row, meta ) {
              	row1 = row;
		    	  var perc = ((row.ko / row.pezzi_controllati)*100).toFixed(1);
		        return '<a style="cursor: pointer; color:#f0ad4e" onclick="infoDefects(\''+row.difetto1+'\',\''+row.difetto2+'\',\''+row.difetto3+'\',\''+row.difetto4+'\',\''+row.difetto5+'\',\''+row.difetto6+'\',\''+row.difetto7+'\',\''+row.difetto8+'\')" >'+data+'</a> ('+perc+'%)' ;
		        } 
            },
            { "data": "rilavorati", "orderable": false },
            
            { "data": "commento", className: "dt-head-right dt-body-center", "width": "20px", "orderable": false,
              "render": function ( data, type, row, meta ) {
              	var color;
              	if (row.commento=="") color ="gainsboro"; else color="cornflowerblue";
		         return '<a class="prova11" style="cursor: pointer; color:'+color+'" onclick="comment(\''+row.commento+'\')" ><span class="glyphicon glyphicon-comment" aria-hidden="true"></span></a>' ;
		        }
		      }, 
        ],
         "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
            
            // Total over all pages
            var total3 = tableDefects
                .column( 3, { page: 'current'} )
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
 

            // Total over all pages
            var total4 = tableDefects
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
                
             // Total over all pages
            var total5 = tableDefects
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
                
            // Total over all pages
            var total6 = tableDefects
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
                

                

                

            // Update footer
            $( api.column( 3 ).footer() ).html(
                'Controllati<br>'+ total3+''
            );
            $( api.column( 4 ).footer() ).html(
                'Conformi<br>'+ total4+''
            );
            $( api.column( 5 ).footer() ).html(
                'Non conformi<br>'+ total5+''
            );
            $( api.column( 6 ).footer() ).html(
                'Rilavorati<br>'+ total6+''
            );
            
            //Update summary
			   $('#totalp').html(total3);
			   $('#totalc').html(total4);
            $('#totald').html(total5);
            $('#totalr').html(total6);
            
        },
 
        "order": [[0, 'desc']]
	     } );
 	     
	     //&& $('#pareto-difetti').html().length == 0 //controlla se un grafico è gia stato inizializzato
	     // this ain't pretty, but you should get the idea
        if ($(e.target).attr('href') == '#difetti') {

        	
        // jsondata x graph
			json = (function () {
         json = null;
        $.ajax({
            'async': false,
            'global': false,
            'data': "req=tipo_difetti2&id="+id_commessa+"&data_i="+data_i_conv+"&data_f="+data_f_conv,
            'url': 'cgi-bin/get.php',
            'dataType': "json",
            'success': function (data) {
                json = data;
                for(var i=0; i<8; i++){
                	if(json[i]==undefined) break;
                	difetti[i] = json[i].difetto;
                }
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



//EXTRA INFO	     
function infoHours(std,xtra,fest,sab) {
	$.dialog({
    title: '<img src="images/logo-82x40.jpg"></div>',
    content: '<table class="table table-condensed table-striped"><thead><tr><th style="text-align : center;" colspan="2">  <span class="glyphicon glyphicon-time" aria-hidden="true"></span>  Dettagli Ore</th></tr></thead>'+
    '<tbody><tr><td>Ore Standard</td><td>'+std+'</td> </tr><tr><td>Ore Extra</td><td>'+xtra+'</td></tr><tr> <td>Ore Festivi</td><td>'+fest+'</td></tr><tr><td>Ore Sabato</td><td>'+sab+'</td></tr></tbody></table>',
});			
}

function infoDefects(dif1,dif2,dif3,dif4,dif5,dif6,dif7,dif8) {
		$.dialog({
    title: '<img src="images/logo-82x40.jpg"></div>',
    content: '<table class="table table-condensed table-striped"><thead><tr><th style="text-align : center;" colspan="2">    Dettagli Difetti</th></tr></thead>'+
    '<tbody><tr><td>'+difetti[0]+'</td><td>'+dif1+'</td> </tr><tr><td>'+difetti[1]+'</td><td>'+dif2+'</td></tr><tr><td>'+difetti[2]+'</td><td>'+dif3+'</td></tr><tr><td>'+difetti[3]+'</td><td>'+dif4+'</td></tr><tr><td>'+difetti[4]+'</td><td>'+dif5+'</td></tr>'+
    '<tr><td>'+difetti[5]+'</td><td>'+dif6+'</td></tr><tr><td>'+difetti[6]+'</td><td>'+dif7+'</td></tr><tr><td>'+difetti[7]+'</td><td>'+dif8+'</td></tr></tbody></table>',
});
			
		
}


function comment(text) {
   if (text=="") text="Nessun commento disponibile"
	$.dialog({
    title: '<img src="images/logo-82x40.jpg"></div>',
    content: '<hr style="margin-top: 0px !important">'+text,
});			
}

function comment2(text) {
	
if (text=="") text="Nessun commento disponibile";

$('.nota').popover({
selector: '.prova',
placement: 'left',
//trigger: 'hover',
title: "NOTA",
content: text,
});			


}




    


	  
