//GLOBAL SCOPE
var table1;
var id_commessa;
var costo;
var quadro;
var a_pezzo;
var sede;
var date1;
var month;
var tableDefects;



$(document).ready(function() {
var dateNow = new Date();	


// Initialize Datatables
table1 = $("#tb_ore").DataTable({"paging": false,"ordering": false,"language": {"zeroRecords":    "Seleziona una commessa",},}); 
tableDefects = $("#tb_defects").DataTable({"paging": false,"ordering": false,"language": {"zeroRecords":    "Seleziona prima una commessa",},}); 
	
// DateTime		
 $(function () {
                $('#datetimepicker2').datetimepicker({      
	                viewMode: 'months',
	                format: 'MM/YYYY',
	                defaultDate: dateNow,
	                widgetPositioning: {
	                horizontal: 'right',
	                vertical: 'bottom',
	                useCurrent:'false'
                   }
                });
 });


//Tab Panel1	    
$('#myTab a[href="#ore"]').click(function (e) {
 disable2(addHours);

var $rows = tableComm.$('tr.selected');

if ($rows.length) {
 
 var dataArr1 = [];
 var rowData = tableComm.rows($rows).data();
 

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
 
 
   table1.destroy();
  	
  	date1 = $('#datetimepicker2').data("date");
  	var d = date1.split('/');
  	var d1 = d[1]+"-"+d[0];
  	
  	
  	monthName(date1);
  	$('#month').html(monthName(date1));	
  		
		 
				  
   table1 =  $('#tb_ore').DataTable({
 	   dom: 'Bfrtip',
      buttons: [
      {
      extend:    'pdfHtml5',
                text:      '<img src="images/pdf.png">',
                titleAttr: 'PDF'
        
      },
      {
      extend:   'excel',
                text:      '<img src="images/excel.png">',
                titleAttr: 'EXCEL',
        
      },
      {
      extend:   'print',
                text:      '<img src="images/print.png">',
                titleAttr: 'EXCEL',
        
      },
    ], 
       "paging": false, 
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
	    		"date": d1
	    	},
	     },
	    "language": {
               "zeroRecords":    "Nessun risultato trovato",
        }, 
	    "columns": [

            { "data": "data" },
            { "data": "operatore", "orderable" : false },
            { "data": "ore_std", "orderable" : false  },
            { "data": "ore_extra", "orderable" : false  },
            { "data": "ore_fest", "orderable" : false  },
            { "data": "ore_sabato", "orderable" : false  },

                                    
        ],
        "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
 

            // Total over all pages
            total = table1
                .column( 2 )
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
                
 
            // Total over this page
            pageTotal = api
                .column( 2, { page: 'current'} )
                .data();
                

            // Update footer
            $( api.column( 2 ).footer() ).html(
                ''+ total+''
            );
            
            //Update summary
			   $('#totalh').html(total);
            
            
        },
 
        "order": [[0, 'desc']]
	     } );
			
		  //Move Buttons	     
	     table1.buttons().container().appendTo($('#export'));
	
		  //SUMMARY 
		  summary(id_commessa, d1);
 

 
  
 
$("#datetimepicker2").on("dp.update", function(e) {
  	
   table1.destroy();
  	
  	date1 = $('#datetimepicker2').data("date");
  	var d = date1.split('/');
  	var d1 = d[1]+"-"+d[0];
  	
  	
  	monthName(date1);
  	$('#month').html(monthName(date1));	
  		
		 
				  
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
	    		"date": d1
	    	},
	     },
	    "language": {
               "zeroRecords":    "Nessun risultato trovato",
        }, 
	    "columns": [

            { "data": "data"},
            { "data": "operatore",  "orderable" : false },
            { "data": "ore_std" },
            { "data": "ore_extra" },
            { "data": "ore_fest" },
            { "data": "ore_sabato" },

                                    
        ],
        "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
 

            // Total over all pages
            total = table1
                .column( 2 )
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
                
 
            // Total over this page
            pageTotal = api
                .column( 2, { page: 'current'} )
                .data();
                

            // Update footer
            $( api.column( 2 ).footer() ).html(
                ''+ total+''
            );
            
            //Update summary
			   $('#totalh').html(total);
            
            
        },
 
        "order": [[0, 'desc']]
	     } );
	
	//Move Buttons	     
	table1.buttons().container().appendTo($('#export'));
	//SUMMARY 
   summary(id_commessa, d1);

	
});     
	     
	  
 
		  
} else alert("Non hai selezionato nessuna riga");


		


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
    		  
   tableDefects =  $('#tb_defects').DataTable({
 	   dom: 'Bfrtip',
      buttons: [ 
     {
      extend:   'pdfHtml5',
                text:      '<img src="images/pdf.png">',
                titleAttr: 'PDF',
        
      },
      {
      extend:   'excel',
                text:      '<img src="images/excel.png">',
                titleAttr: 'EXCEL',
        
      },
            {
      extend:   'print',
                text:      '<img src="images/print.png">',
                titleAttr: 'EXCEL',
        
      },
      

      ],
	    "aProcessing": true, 
	    "aServerSide": true,
       "bSort": false,
       "paging":false,
	     retrieve: true, //Reinitialize datatable
	    "ajax": {
	    	"url":'cgi-bin/get.php',
	    	"type": "GET",
	    	"data": { //All data to Get From DB
	    		"req" : "difetti2",
            "id": id_commessa, 
		
	    	},
	     },
	  
	    "language": {
               "zeroRecords":    "Nessun risultato trovato",
        },

	    "columns": [

            { "data": "data",
              "render": function ( data, type, row, meta ) {
               var d = row.data.split('-');
               
			      return d[2]+'/'+d[1]+'/'+d[0] ;
		          }            
             },
            { "data": "seq_inizio" },
            { "data": "seq_fine" },
            { "data": "pezzi_controllati" },
            { "data": "ko",
              "render": function ( data, type, row, meta ) {
		    	  var perc = ((row.ko / row.pezzi_controllati)*100).toFixed(1);
		        return '<a style="cursor: pointer; color:#f0ad4e" onclick="infoDefects(\''+row.ko+'\')" >'+data+'</a> ('+perc+'%)' ;
		        } 
            },
            { "data": "rilavorati" },
            { "data": "ok" },
            { "data": "commento", className: "dt-head-right dt-body-center", "width": "20px",
              "render": function ( data, type, row, meta ) {
              	var color;
              	if (row.commento=="") color ="gainsboro"; else color="cornflowerblue";
		         return '<a style="cursor: pointer; color:'+color+'" onclick="comment(\''+row.commento+'\')" ><span class="glyphicon glyphicon-comment" aria-hidden="true"></span></a>' ;
		        }
		      }, 
        ],
         "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
 

            // Total over all pages
            total = tableDefects
                .column( 4 )
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
            total2 = tableDefects
                .column( 3 )
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
                
 
            // Total over this page
            pageTotal = api
                .column( 4, { page: 'current'} )
                .data();
                

            // Update footer
            $( api.column( 4 ).footer() ).html(
                ''+ total+''
            );
            
         
            
            //Update summary
			   $('#totald').html(total);
			   $('#totalp').html(total2);
			   
            
            
        },
 
        "order": [[0, 'asc']]
	     } );
 
	     //move export button
	    // var p = tableDefects.buttons();
	     //console.log(tableDefects.buttons());
	    // console.log(tableDefects.buttons().container(0));
	    //p[0].appendTo($('#excel2'));
	     tableDefects.button().container().appendTo($('#print2'));

	     
	     //&& $('#pareto-difetti').html().length == 0 //controlla se un grafico è gia stato inizializzato
	     // this ain't pretty, but you should get the idea
        if ($(e.target).attr('href') == '#controlli') {
        	
         // jsondata x graph
			json = (function () {
         json = null;
        $.ajax({
            'async': false,
            'global': false,
            'data': "req=tipo_difetti3&id="+id_commessa,
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

//Tab
$('#myTab a[href="#commesse"]').click(function (e) {
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
		  

});
		
			   /* Aggiungi Elemento */ 
		$('#saveHours').click(function(){
			
		  var from1 = $("#datetimepicker1").data("date").split("/");
        var f1 = from1[2]+"-"+from1[1]+"-"+from1[0];
			
		  var request = "ore";
		  var id_commessa = $('#id_commessa').val();
		  
		  var operatore = $('#operatore2').val();
		  var ore_std = $('#ore_std').val();
		  var ore_extra = $('#ore_extra').val();
		  var ore_fest = $('#ore_fest').val();
		  var ore_sabato = $('#ore_sabato').val();
		  
		  var pezzi = $('#n_pezzi').val();
		 
		  var datas = "request="+request+"&id_commessa="+id_commessa+"&data="+f1+"&operatore="+operatore+"&ore_std="+ore_std+"&ore_extra="+ore_extra+"&ore_fest="+ore_fest+
		  "&ore_sabato="+ore_sabato+"&pezzi="+pezzi;
		  
		  $.ajax({
			type: "POST",
			url: "cgi-bin/postdata.php",
			data: datas,
			dataType: "html"
			  }).done(function( msg ) {
			
			alert(msg);
			
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
				   $('#td4_1').html((0.50*costo)+(+costo) +" €");
				   $('#td4_2').html((((0.50*costo)+(+costo))*data[0].total_sabato) +" €");
			        
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

//EXTRA INFO	     
function infoHours(std,xtra,fest,sab) {
	$.dialog({
    title: '<img src="images/logo-82x40.jpg"></div>',
    content: '<table class="table table-condensed table-striped"><thead><tr><th style="text-align : center;" colspan="2">  <span class="glyphicon glyphicon-time" aria-hidden="true"></span>  Dettagli Ore</th></tr></thead>'+
    '<tbody><tr><td>Ore Standard</td><td>'+std+'</td> </tr><tr><td>Ore Extra</td><td>'+xtra+'</td></tr><tr> <td>Ore Festivi</td><td>'+fest+'</td></tr><tr><td>Ore Sabato</td><td>'+sab+'</td></tr></tbody></table>',
});			
}


function comment(text) {
   if (text=="") text="Nessun commento disponibile"
	$.dialog({
    title: '<img src="images/logo-82x40.jpg"></div>',
    content: '<hr style="margin-top: 0px !important">'+text,
});			
}





