$(document).ready(function() {
	 
		
		/* Inizializza Tabella */
				
	   var table =  $('#tb_anag').DataTable({
	    "aProcessing": true, 
	    "aServerSide": true,   	     
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
	            $(this).removeClass('selected');
	        }
	        else {
	            table.$('tr.selected').removeClass('selected');
	            $(this).addClass('selected');
	        }
	    } );
	    
	    
		 // Add event listener for opening and closing details
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
	    
	    
	   /* Aggiungi Elemento */ 
		$('#save').click(function(){
		  var request = "anagrafe";
		  var nome = $('#nome').val();
		  var cell = $('#cell').val();
		  var tel = $('#tel').val();
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
		  var datas = "request="+request+"&nome="+nome+"&mobile="+cell+"&tel_fisso="+tel+"&email="+email+"&tipo_anagrafica="+tipo+
		  "&sede_legale="+sedel+"&piva="+piva+"&ind_fatt="+ind_fatt+"&ref_amm="+ref_amm+"&tel_refcomm="+tel_ref_comm+"&email_refcomm="+email_ref_comm;
		  var m;
		  $.ajax({
			type: "POST",
			url: "cgi-bin/postdata.php",
			data: datas,
			dataType: "html"
			  }).done(function( msg ) {
	
		
		  table.row.add( {
        "nome":       nome,
        "mobile":   cell,
        "email":     email,
        "tipo_anagrafica": tipo
       
    		}).draw();
    	
			  

			  }).fail(function() {
			alert( "Server Error" );
			  }).always(function() {
			alert( "Finished" );
			  });

	  });
	  
	  
	   /*Edit Data from Table. Scrivere codice + pulito*/

		$('#editData').click(function(){
			
			var $rows = table.$('tr.selected');
			if ($rows.length) {
			 
			 var dataArr = [];
		    var rows = $('tr.selected');
		    var rowData = table.rows(rows).data();
		    console.log(rowData);
		    $.each($(rowData),function(key,value){
		        dataArr.push(value["nome"]);
		        dataArr.push(value["mobile"]); 
		        dataArr.push(value["email"]);
		        dataArr.push(value["tipo_anagrafica"]);
		        dataArr.push(value["id_anagrafica"]);
		    });
		    
		 $("#nome2").val(dataArr[0]);
		 $("#cell2").val(dataArr[1]);
		 $("#email2").val(dataArr[2]);
		 $("#tipo2").val(dataArr[3]);
		  
		  $('#editModal').modal('show'); 
		  
				/* Save Changes */
				$('#savechanges').click(function(){
				  var nome = $('#nome2').val();
				  var cell = $('#cell2').val();
				  var email = $('#email2').val();
				  var tipo = $('#tipo2').val();
				
				  
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
		
		
		 
		  
		  	} else alert("Non hai selezionato nessuna riga")
		
		});

	   
    /* Rimuovi elemento selezionat */
	 $('#rmData').click( function () {

	    var dataArr = [];
	    var rows = $('tr.selected');
	    var rowData = table.rows(rows).data();
	    $.each($(rowData),function(key,value){
	        dataArr.push(value["id_anagrafica"]); //"name" being the value of your first column.
	    });
	    
	    console.log(dataArr);
	    var datas = "id="+dataArr;
		$.ajax({
			type: "POST",
			url: "cgi-bin/delete.php",
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
		  

	        table.row('.selected').remove().draw( false );
	    } );

}); /*Fine Document Ready*/


/*Add Dinamically Input Fields when an option is selected*/
/*
$('#tipo').change(function(){

    if( $(this).val() == '2'){
        $('.modal-body').append();
    }else{
        //$('#myInput').remove();
    }
});*/

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
	console.log(d);
	if (d.tipo_anagrafica == "Cliente") {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Registrato il:</td>'+
            '<td>'+d.start_date+'</td>'+
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
            '<td>Ref. Amm.: '+d.ref_amm+'</td>'+
            '<td>Tel. '+d.ref_amm+'</td>'+
            '<td>Email  ' +d.email_ref_comm+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Ref. Comm.: '+d.ref_comm+'</td>'+
        '</tr>'+
    '</table>';
 }
 else {
 	return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Registrato il:</td>'+
            '<td>'+d.start_date+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extra info:</td>'+
            '<td>'+d.tipo_anagrafica+'</td>'+
        '</tr>'+
    '</table>';
 
 }
}



    
  
    


	 
	 

	  
