/**************
* GLOBAL SCOPE
***************/

//tabelle
var table1;
var tableDefects;

//dati commessa
var id_commessa;
var cliente;
var costo;
var costo_tl;
var quadro;
var a_pezzo;
var sede;
var tipo_att;
var euro_km;

//altri
var flag = 1; //flag su 1 -> salva 0 -> edita
var id_row;
var rowNumber;
var date1;
var month;
var data_inizio;
var data_fine;

//select2
var tl; //registra se in autocomplete selezionato un tl
var operatore = null; //nome operatore

var difetti = new Array();



$(document).ready(function() {
var dateNow = new Date();	


// Initialize Datatables
table1 = $("#tb_hours").DataTable({"paging": false,"ordering": false,"language": {"zeroRecords":    "Seleziona una commessa",},}); 
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


//Tab Panel Hours	    
$('#myTab a[href="#ore"]').click(function (e) {


var $rows = tableComm.$('tr.selected');

if ($rows.length) {
 
 var dataArr1 = [];
 var rowData = tableComm.rows($rows).data();
 

 $.each($(rowData),function(key,value){
     id_commessa = value["id_commessa"];
     cliente = value["cliente"];
     costo = value["costo_proposto"];
     quadro = value["quadro"];
     a_pezzo = value["a_pezzo"];
     sede = value["sede"];
     tipo_att = value["tipo_attivita"];
     euro_km = value["euro_km"];
     costo_tl = value["euro_tl"];
 });
 
//Disable input fields
//ridonadante?
 if (quadro=="NO") {
 	$('#sede').val(sede);
 	$('#sede').prop("disabled",true);
 }
 
 
   table1.destroy();

  	
    data_inizio =  $("#data_inizio1").data("date");
    data_fine =  $("#data_fine1").data("date");
    var data_i_conv = convertDate(data_inizio);
    var data_f_conv = convertDate(data_fine);

               


			  
   table1 =  $('#tb_hours').DataTable({
       "paging": false, 
	    "aProcessing": true, 
	    "aServerSide": true,
	    "bSort": true,
	     retrieve: true, //Reinitialize datatable
	    "ajax": {
	    	"url":'cgi-bin/get.php',
	    	"type": "GET",
	    	"data": { //All data to Get From DB
	    		"req" : "ore",
	    	   "table" : "co_ore",
            "var1": id_commessa, 
	    		"var2": "cliente",
	    		"data_i": data_i_conv,
	    		"data_f": data_f_conv,
	    		
	    	},
	     },
               



	    "language": {
               "zeroRecords":    "Nessun risultato trovato",
        }, 
	    "columns": [


            { "data": "data","type": "date-eu",
               "render": function ( data, type, row, meta ) {
               var d = row.data.split('-');
			      return d[2]+'/'+d[1]+'/'+d[0] ;},
            },
            { "data": "operatore", "orderable" : false, 
            	"render": function ( data, type, row, meta ) {

		               if(row.team_leader==="SI")
		               return  '<span style="color:#337ab7">'+row.operatore+'</span>';
		               else
		               return  row.operatore; 
			      }
			   },
            { "data": "ore_std", "orderable" : false,
              "render": function ( data, type, row, meta ) {

		               if(row.team_leader==="SI")
		               return  '<span style="color:#337ab7">'+row.ore_std+'</span>';
		               else
		               return  row.ore_std; 
			      }
            },
            { "data": "ore_extra", "orderable" : false  },
            { "data": "ore_fest", "orderable" : false  },
            { "data": "ore_sabato", "orderable" : false  },
            { "data": "commento", className: "dt-head-right dt-body-center", "width": "20px",
              "render": function ( data, type, row, meta ) {
              	
              	 var commento = row.commento;
                var color;
              	 if (row.commento=="") color ="gainsboro"; else color="#5cb85c";   

                return '<a style="cursor: pointer; color:'+color+'; padding-right:10px;" onclick="comment1(\''+commento+'\')" ><span class="glyphicon glyphicon-comment" aria-hidden="true"></span></a>'+
                '<a style="cursor: pointer; color:#f0ad4e; padding-right:10px" onclick="editHrs(\''+row.id+'\',\''+row.id_commessa+'\',\''+row.data+'\',\''+row.sede+'\',\''+row.ore_std+'\',\''+row.ore_extra+'\',\''+row.ore_fest+'\',\''+row.ore_sabato+'\',\''+row.spese+'\',\''+row.km+'\',\''+row.euro_pastog+'\',\''+row.commento+'\')" ><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>'+
		          '<a style="cursor: pointer; color:#d43f3a" onclick="deleteHrs(\''+meta.row+'\',\''+row.id_commessa+'\',\''+row.data+'\',\''+row.operatore+'\')" ><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>';
		        }
		      },
		      
		      //Hidden Columns
		      {"data": "spese", "visible":false}, 
		      {"data": "km", "visible":false}, 
		      {"data": "euro_pastog", "visible":false},
		      {"data": "team_leader", "visible":false},
		      {"data": "id", "visible":false},
		       

                                    
        ],
         
         "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
 

            // Totale ore standard
            var total2 = table1
                .column( 2, { page: 'current'})
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
            
            // Totale ore standard TL //si può fare di mejo??!   
            var ore_tl=0; 
            table1
                .cells( function ( index, data, node ) {

				        if(table1.row( index ).data()[14] == 'SI'){
             			var i = table1.row( index ).data()[4];	        	 
				        	ore_tl = (ore_tl+parseInt(i));
                   }
				    }, 0, { page: 'current'} );

                
            // Totale ore extra
            var total3 = table1
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
                
             // Total ore festivi
            var total4 = table1
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
                
            // Total ore sabato
            var total5 = table1
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
                
            // Total spese
            var total7 = table1
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
                
            // Total km
            var total8 = table1
                .column( 8, { page: 'current'} )
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
            var total9 = table1
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


            // Update footer
            $( api.column( 2 ).footer() ).html(
                'Ore standard<br>'+ (total2-ore_tl)+'+'+ore_tl
            );
            $( api.column( 3 ).footer() ).html(
                'Ore Extra<br>'+ total3+''
            );
            $( api.column( 4 ).footer() ).html(
                'Ore festivi<br>'+ total4+''
            );
            $( api.column( 5 ).footer() ).html(
                'Ore sabato<br>'+ total5+''
            );
            
            //controllare dove arrontondare le cifre
            
            //Update summary
            var costo_extra = ((0.25*costo)+(+costo)).toFixed(2);
            var costo_festivi = ((0.50*costo)+(+costo)).toFixed(2);
            var costo_sabato  = ((0.20*costo)+(+costo)).toFixed(2);
            
            //Ore standard
            var totale_std = (total2-ore_tl)*costo;
			   $('#td1').html(total2-ore_tl);
			   $('#td1_1').html(costo+" €");
			   $('#td1_2').html(totale_std+" €");

			   
			   //Ore extra 
			   var totale_extra =costo_extra*total3;
			   $('#td2').html(total3);
			   $('#td2_1').html(costo_extra +" €");
			   $('#td2_2').html(totale_extra+" €");
			   
			   //Ore festivi
			   var totale_fest = costo_festivi*total4;
			   $('#td3').html(total4);
            $('#td3_1').html(costo_festivi +" €");
            $('#td3_2').html(totale_fest+" €");
			   
			   //Ore sabato
			   var totale_sab = costo_sabato*total5;
            $('#td4').html(total5);
            $('#td4_1').html(costo_sabato +" €");
            $('#td4_2').html(totale_sab+" €");
            
            //Ore TL
            var totale_tl = costo_tl*ore_tl;
            $('#td5').html(ore_tl);
            $('#td5_1').html(costo_tl+" €");
            $('#td5_2').html(totale_tl+" €");
            
            //Spese
            $('#td6_2').html(total7+" €");
            
            //Totale km
            var totale_km = (total8*euro_km);
            //$('#td7').html(total8);
            $('#td7_1').html(total8+"*"+euro_km);
            $('#td7_2').html((total8*euro_km).toFixed(2)+" €");
            
            
            //Totale pasti
            $('#td8_2').html(total9+" €");
            
            //TOTALE
            $('#td9').html("<b>"+(total2+total3+total4+total5)+"</b>");

            $('#td9_2').html("<b>"+(totale_std+totale_extra+totale_fest+totale_sab+total7+total9+totale_km+totale_tl).toFixed(2)+" €</b>");
            
            
        },
 
        "order": [[0, 'asc']]
	     } );


		  
} else alert("Non hai selezionato nessuna riga");


		


});

//Trovare soluzione alternativa??
$('#tb_hours').on( 'click', 'tr', function () {
    rowNumber = table1.rows( { order: 'applied', filter: 'applied' } ).nodes().indexOf( this );
    console.log(rowNumber);
} );


//DEFECTS PANEL TAB     
$('ul.nav a').on('shown.bs.tab', function(e){
    
    //Clear table and graph
    tableDefects.destroy();
    $("#pareto-difetti").html("");
    difetti = [];

    var json;
    var $rows = tableComm.$('tr.selected');	
    var rowData = tableComm.rows($rows).data();
    
   
    $.each($(rowData),function(key,value){
    id_commessa = value["id_commessa"];
    tipo_att = value["tipo_attivita"];
    sede = value["sede"];
     });
     
   //Get period & convert	
    data_inizio =  $("#data_inizio1").data("date");
    data_fine =  $("#data_fine1").data("date");
    var data_i_conv = convertDate(data_inizio);
    var data_f_conv = convertDate(data_fine);

    		  
   tableDefects =  $('#tb_defects').DataTable({
	    "aProcessing": true, 
	    "aServerSide": true,
       "bSort": true,
       "paging":false,
	     retrieve: true, //Reinitialize datatable
	    "ajax": {
	    	"url":'cgi-bin/get.php',
	    	"type": "GET",
	    	"data": { //All data to Get From DB
	    		"req" : "difetti2",
            "id": id_commessa,
            "data_i": data_i_conv,
	    		"data_f": data_f_conv, 
		
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
            { "data": "seq_inizio","orderable" : false},
            { "data": "seq_fine","orderable" : false },
            { "data": "pezzi_controllati","orderable" : false },
            { "data": "ok","orderable" : false },
            { "data": "ko","orderable" : false,
              "render": function ( data, type, row, meta ) {

		    	  var perc = ((row.ko / row.pezzi_controllati)*100).toFixed(1);
		        return '<a style="cursor: pointer; color:#f0ad4e" onclick="infoDefects(\''+row.difetto1+'\',\''+row.difetto2+'\',\''+row.difetto3+'\',\''+row.difetto4+'\',\''+row.difetto5+'\',\''+row.difetto6+'\',\''+row.difetto7+'\',\''+row.difetto8+'\')" >'+data+'</a> ('+perc+'%)' ;
		        } 
            },

            { "data": "rilavorati","orderable" : false },
            
            { "data": "commento","orderable" : false, className: "dt-head-right dt-body-center", "width": "20px",
              "render": function ( data, type, row, meta ) {
              	var color;
              	if (row.commento=="") color ="gainsboro"; else color="#5cb85c";              	
		         return '<a style="cursor: pointer; color:'+color+'; padding-right:10px;" onclick="comment(\''+row.commento+'\')" ><span class="glyphicon glyphicon-comment" aria-hidden="true"></span></a>'+
		                '<a style="cursor: pointer; color:#f0ad4e; padding-right:10px" onclick="edit(\''+row.id+'\',\''+row.data+'\',\''+row.operatore+'\',\''+row.pezzi_controllati+'\',\''+row.seq_inizio+'\',\''+row.seq_fine+'\',\''+row.difetto1+'\',\''+row.difetto2+'\',\''+row.difetto3+'\',\''+row.difetto4+'\',\''+row.difetto5+'\',\''+row.difetto6+'\',\''+row.difetto7+'\',\''+row.difetto8+'\')" ><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>'+
		                '<a style="cursor: pointer; color:#d43f3a" onclick="deleteCheck(\''+row.id+'\')" ><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>';
		        }
		      }, 
//		      onclick="edit(\''+row.data+'\',\''+row.operatore+'\',\''+row.difetto1+'\',\''+row.difetto2+'\',\''+row.difetto3+'\',\''+row.difetto4+'\',\''+row.difetto5+'\',\''+row.difetto5+'\'),\''+row.difetto6+'\,\''+row.difetto7+'\,\''+row.difetto8+'\')
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
 
        "order": [[0, 'asc']]
	     } );

	     //&& $('#pareto-difetti').html().length == 0 //controlla se un grafico è gia stato inizializzato
	     // this ain't pretty, but you should get the idea
        if ($(e.target).attr('href') == '#controlli') {
        	
         // jsondata x graph
			json = (function () {
         json = null;
        $.ajax({
            'async': false,
            'global': false,
            'data': "req=tipo_difetti3&id="+id_commessa+"&data_i="+data_i_conv+"&data_f="+data_f_conv,
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

//Trovare soluzione alternativa??
$('#tb_defects').on( 'click', 'tr', function () {
    rowNumber = tableDefects.rows( { order: 'applied', filter: 'applied' } ).nodes().indexOf( this );
    console.log(rowNumber);
} );

var data1;
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
	    allowClear: true
	});
	
	//verifica se operatore è tl
	$('.select2').on("select2:select", function(e) { 
   
	   if(e.params.data.id == "Team Leader"){
	   tl = "SI";
	   operatore=e.params.data.text;
	   }else{
	    tl = "NO";
	    operatore=e.params.data.text;
	    }
   });
   
   	 

		
});


$('#addHours').click(function(){
		   //more elegance pleaz    
	      var $rows = tableComm.$('tr.selected');
	      var rowData = tableComm.rows($rows).data();
			 
			$.each($(rowData),function(key,value){
			     id_commessa = value["id_commessa"];
			     cliente = value["cliente"];
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

	     

		 $("#id_commessa").val(id_commessa);
		 $('#hoursModal').modal('show'); 
		  

});
		
		/* Aggiungi Elemento */ 
		$('#saveHours').click(function(){
		  
		  var url; //cambia se flag impostato
		  var datas;

		  var from1 = $("#datetimepicker1").data("date").split("/");
        var f1 = from1[2]+"-"+from1[1]+"-"+from1[0];
			
		  
		  var ore_std = $('#ore_std').val();
		  var ore_extra = $('#ore_extra').val();
		  var ore_fest = $('#ore_fest').val();
		  var ore_sabato = $('#ore_sabato').val();
		  var sede = $('#sede').val();
		  
		  var pezzi = $('#n_pezzi').val();
		  var nota = $.trim($('#nota').val());
		  

		 console.log(operatore);
		  
        if (flag){
        	url="cgi-bin/postdata.php"; 
        	datas = "request=ore&id_commessa="+id_commessa+"&data="+f1+"&operatore="+operatore+"&ore_std="+ore_std+"&ore_extra="+ore_extra+"&ore_fest="+ore_fest+
		  "&ore_sabato="+ore_sabato+"&pezzi="+pezzi+"&sede="+sede+"&cliente="+cliente+"&commento="+nota+"&team_leader="+tl;
        }
        else {
        	url="cgi-bin/edit.php";
         datas = "request=ore&id="+id_row+"&id_commessa="+id_commessa+"&data="+f1+"&operatore="+operatore+"&ore_std="+ore_std+"&ore_extra="+ore_extra+"&ore_fest="+ore_fest+
		  "&ore_sabato="+ore_sabato+"&pezzi="+pezzi+"&sede="+sede+"&cliente="+cliente+"&commento="+nota+"&team_leader="+tl;;        	
        	}

		  
		  $.ajax({
			type: "POST",
			url: url,
			data: datas,
			dataType: "html",
			success : function (msg) {
				
           console.log(msg);
			   var result = $.parseJSON(msg);
            
				if(result['mysql_error']){
				   var m = result['mysql_error'];
				   flag=2;
				   }
				else{ 
				   var m = "Dettagli ore salvato!";
				   id_row = result['mysql_insert_id'];

				   }
						   
					$.alert({
			          title: false,
					    content: m,
					    confirmButton : 'DAJE', 
					});
			},
			complete: function () {
         //se salva aggiungi riga
         if (flag == 1) {
         table1.row.add( {
         	  
         	  "id": id_row,
		        "data":       f1,
		        "operatore":   operatore,
		        "ore_std":     ore_std,
		        "ore_extra":  ore_extra,
		        "ore_fest":     ore_fest,
		        "ore_sabato":       ore_sabato,
		        "spese": "1",
		        "km": "2",
              "euro_pastog": "2",
              "team_leader": "NO",
              "commento" : "Nessun commento"  
              		    
               } ).draw();
               operatore = null; //reimposto a null operatore
         }
         if (flag == 0) {
         //se edita aggiorna riga
         var obj = {
         	  "id": id_row,
		        "data":       f1,
		        "operatore":   operatore,
		        "ore_std":     ore_std,
		        "ore_extra":  ore_extra,
		        "ore_fest":     ore_fest,
		        "ore_sabato":       ore_sabato,
		        "spese": "1",
		        "km": "2",
              "euro_pastog": "2",
              "team_leader": "NO",
              "commento" : "Nessun commento"  
              };
         table1.row(rowNumber).data(obj);
         flag = 1; //reimposto il flag per salvare e non editare
         operatore = null; //reimposto a null operatore
         
         $('#hoursModal').modal('toggle'); 	
         }
         if (flag==2) flag=1;
                                	
			},
			error: function () {
	            alert("Errore AJAX Call Server-Side");                 
	      }
			});

	    });
	    

	    
  $('#defectsModal').on('shown.bs.modal', function () {	    		    		
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
	  
// Other Feautures		
  $(function () {
  	var dateNow = new Date();
                $('#datetimepicker1').datetimepicker({      
                	locale: 'it',
        		      format: 'DD/MM/YYYY',
				      defaultDate: dateNow,
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
    
      $("input[name='mySpinner3']").TouchSpin({
      max: 10000000000,
      verticalbuttons: true
    });


}); /* Fine Document Ready*/


function disable2(select_val) {
$('#addHours').prop("disabled",false);
}


			

//EXTRA INFO	     
function infoHours(std,xtra,fest,sab) {
	$.dialog({
    title: '<img src="images/logo-82x40.jpg"></div>',
    content: '<table class="table table-condensed table-striped"><thead><tr><th style="text-align : center;" colspan="2">  <span class="glyphicon glyphicon-time" aria-hidden="true"></span>  Dettagli Ore</th></tr></thead>'+
    '<tbody><tr><td>Ore Standard</td><td>'+std+'</td> </tr><tr><td>Ore Extra</td><td>'+xtra+'</td></tr><tr> <td>Ore Festivi</td><td>'+fest+'</td></tr><tr><td>Ore Sabato</td><td>'+sab+'</td></tr></tbody></table>',
});			
}


function comment1(text) {

   if (text=="") text="Nessun commento disponibile"
	$.dialog({
    title: '<img src="images/logo-82x40.jpg"></div>',
    content: '<hr style="margin-top: 0px !important">'+text,
});
}

function infoDefects(dif1,dif2,dif3,dif4,dif5,dif6,dif7,dif8) {
	
var text="";
var dif = [dif1,dif2,dif3,dif4,dif5,dif6,dif7,dif8];

for ( i=0; i<8; i++ ){
		if(difetti[i] != undefined ){
		 text += '<tr><td>'+difetti[i]+'</td><td>'+dif[i]+'</td></tr>';
		 }
}

$.dialog({
    title: '<img src="images/logo-82x40.jpg"></div>',
    content: '<table class="table table-condensed table-striped"><thead><tr><th style="text-align : center;" colspan="2">    Dettagli Difetti</th></tr></thead>'+
    '<tbody>'+text+'</tbody></table>',
});
			
		
}

function comment(text) {

   if (text=="") text="Nessun commento disponibile"
	$.dialog({
    title: '<img src="images/logo-82x40.jpg"></div>',
    content: '<hr style="margin-top: 0px !important">'+text,
});
}

function editHrs(id,id_commessa,data,sede,std,extra,fest,sab,spese,km,euro_pasto,nota) {


flag = 0;	//imposto il flag per editare	
id_row = id;
var date = convertDate2(data);

//carica valori
$('#id_commessa').val(id_commessa);

$time = $('#datetimepicker1').data("DateTimePicker");
$time.date(date);

$('#sede').val(sede);
$('#ore_std').val(std);
$('#ore_extra').val(extra);
$('#ore_fest').val(fest);
$('#ore_sabato').val(sab);
$('#spese').val(spese);
$('#km').val(km);
$('#euro_pasto').val(euro_pasto);
$('#nota').val(nota);
$('#hoursModal').modal('show');



}



function deleteHrs(nrow, id,data,operatore) {
	
	$.confirm({
				    title: 'Rimuovi',
				    content: 'Sicuro di voler eliminare questa riga?',
				    confirmButton: 'SI',
                cancelButton: 'NO',
				    confirm: function(){
				    	
					var datas = "request=ore&id="+id+"&data="+data+"&operatore="+operatore;
					$.ajax({
						type: "POST",
						url: "cgi-bin/delete.php",
						data: datas,
						dataType: "html",
						success: function () {
						$.alert('Eliminata!');	
						},
                  complete: function () {
                  	table1.row(rowNumber).remove().draw( false );
                  }
						
						
					   });
	
					  			        		
					  				     
					  
				    },
				    cancel: function(){
				        $.alert('Visto che non eri sicuro!')
				    }
				    
	});


				   

}

function deleteCheck(id) {
	                  	console.log(rowNumber);
$.confirm({
				    title: 'Rimuovi',
				    content: 'Sicuro di voler eliminare questa riga?',
				    confirmButton: 'SI',
                cancelButton: 'NO',
				    confirm: function(){
				    	
					var datas = "request=controlli&id="+id;
					$.ajax({
						type: "POST",
						url: "cgi-bin/delete.php",
						data: datas,
						dataType: "html",
						success: function () {
						$.alert('Eliminata!');

						},
                  complete: function () {
             
      
						tableDefects.row(rowNumber).remove().draw( false );	
                  }
					});
					
					},
				    cancel: function(){
				        $.alert('Visto che non eri sicuro!')
				    }
});
}


//trovare soluzione più elegante
function edit(id,data,operatore,pezzi,seq1,seq2,dif1,dif2,dif3,dif4,dif5,dif6,dif7,dif8) {
	
	flag = 0;
	id_row=id;
	
   var $rows = tableComm.$('tr.selected');
	var rowData = tableComm.rows($rows).data();
	
	 $.each($(rowData),function(key,value){
     id_commessa = value["id_commessa"];
    });
    
  $('#id_commessa2').val(id_commessa);
	
  $.ajax({
	type: "GET",
	url: "cgi-bin/get.php",
	data: "req=tipo_difetti&id="+id_commessa,
	dataType: "json",
	success : function (data) {
		
		$('#label1').html(data[0].difetto1);
      $('#label2').html(data[0].difetto2);
      $('#label3').html(data[0].difetto3);
      $('#label4').html(data[0].difetto4);
		$('#label5').html(data[0].difetto5);
		$('#label6').html(data[0].difetto6);
      $('#label7').html(data[0].difetto7);
      $('#label8').html(data[0].difetto8);


	},
   error: function () {
                   
   }
 
   
});	
	
//carica valori
$('#pezzi_controllati').val(pezzi);
$('#seq_inizio').val(seq1);
$('#seq_fine').val(seq2);
$('#difetto1').val(dif1);
$('#difetto2').val(dif2);
$('#difetto3').val(dif3);
$('#difetto4').val(dif4);
$('#difetto5').val(dif5);
$('#difetto6').val(dif6);
$('#difetto7').val(dif7);
$('#difetto8').val(dif8);
$('#defectsModal').modal('show');



}

//Date Interval
$(function () {
var dateNow = new Date();
var datePast = new Date();
var datePast = datePast.setMonth(dateNow.getMonth() -1);	
	
        $('#data_inizio1').datetimepicker({
        		format: 'DD/MM/YYYY',
			   defaultDate : datePast,
        });
        
        $('#data_fine1').datetimepicker({
        	   format: 'DD/MM/YYYY',
            useCurrent: false, //Important! See issue #1075
            defaultDate : dateNow,
        });
        
        $("#data_inizio1").on("dp.change", function (e) {
            $('#data_fine1').data("DateTimePicker").minDate(e.date);
        });
        $("#data_fine1").on("dp.change", function (e) {
            $('#data_inizio1').data("DateTimePicker").maxDate(e.date);
        });
});







