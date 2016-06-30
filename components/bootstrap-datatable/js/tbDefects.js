   $('#popover1').popover({
    html : true,
    title: function() {
      return $("#popover-head1").html();
    },
    content: function() {
      return $("#popover-content1").html();
    }
	});
	
	$('#popover2').popover({
    html : true,
    title: function() {
      return $("#popover-head2").html();
    },
    content: function() {
      return $("#popover-content2").html();
    }
	});
	
	 $('#popover3').popover({
    html : true,
    title: function() {
      return $("#popover-head3").html();
    },
    content: function() {
      return $("#popover-content3").html();
    }
	 });
	
	 $('#popover4').popover({
    html : true,
    title: function() {
      return $("#popover-head4").html();
    },
    content: function() {
      return $("#popover-content4").html();
    }
	 });
	
	 $('#popover5').popover({
    html : true,
    title: function() {
      return $("#popover-head5").html();
    },
    content: function() {
      return $("#popover-content5").html();
    }
	});
	
	 $('#popover6').popover({
    html : true,
    title: function() {
      return $("#popover-head6").html();
    },
    content: function() {
      return $("#popover-content6").html();
    }
	 });

    $('#popover7').popover({
    html : true,
    title: function() {
      return $("#popover-head7").html();
    },
    content: function() {
      return $("#popover-content7").html();
    }
	}); 
	
    $('#popover8').popover({
    html : true,
    title: function() {
      return $("#popover-head8").html();
    },
    content: function() {
      return $("#popover-content8").html();
    }
	 }); 
	

//ORRIBILE. MODIFICARE ASSOLUTAMENTE GESTIONE DIFETTI !!!
function save1() {
   
	var nome = $('#dif1').val();
	var datas = "request=salva_difetti&id="+id_commessa+"&difetton=difetto1&nome="+nome;
	  
	  $.ajax({
		type: "POST",
		url: "cgi-bin/edit.php",
		data: datas,
		dataType: "html",
		success: function (data) {
		alert(data); //gestione errori da vedere
		},
		error: function (data) {
		}
  });
  $('#popover1').popover('hide');
  $('#label1').html(nome);
}

function save2() {
   
	var nome = $('#dif2').val();
	var datas = "request=salva_difetti&id="+id_commessa+"&difetton=difetto2&nome="+nome;
	  
	  $.ajax({
		type: "POST",
		url: "cgi-bin/edit.php",
		data: datas,
		dataType: "html",
		success: function (data) {
		alert(data); //gestione errori da vedere
		},
		error: function (data) {
		}
  });
  $('#popover2').popover('hide');
  $('#label2').html(nome);
  
}

function save3() {
   
	var nome = $('#dif3').val();
	var datas = "request=salva_difetti&id="+id_commessa+"&difetton=difetto3&nome="+nome;
	  
	  $.ajax({
		type: "POST",
		url: "cgi-bin/edit.php",
		data: datas,
		dataType: "html",
		success: function (data) {
		alert(data); //gestione errori da vedere
		},
		error: function (data) {
		}
  });
  $('#popover3').popover('hide');
  $('#label3').html(nome);
}


function save4() {
   
	var nome = $('#dif4').val();
	var datas = "request=salva_difetti&id="+id_commessa+"&difetton=difetto4&nome="+nome;
	  
	  $.ajax({
		type: "POST",
		url: "cgi-bin/edit.php",
		data: datas,
		dataType: "html",
		success: function (data) {
		alert(data); //gestione errori da vedere
		},
		error: function (data) {
		}
  });
  $('#popover4').popover('hide');
  $('#label4').html(nome);
}

function save5() {
   
	var nome = $('#dif5').val();
	var datas = "request=salva_difetti&id="+id_commessa+"&difetton=difetto5&nome="+nome;
	  
	  $.ajax({
		type: "POST",
		url: "cgi-bin/edit.php",
		data: datas,
		dataType: "html",
		success: function (data) {
		alert(data); //gestione errori da vedere
		},
		error: function (data) {
		}
  });
  $('#popover5').popover('hide');
  $('#label5').html(nome);
}


function save6() {
   
	var nome = $('#dif6').val();
	var datas = "request=salva_difetti&id="+id_commessa+"&difetton=difetto6&nome="+nome;
	  
	  $.ajax({
		type: "POST",
		url: "cgi-bin/edit.php",
		data: datas,
		dataType: "html",
		success: function (data) {
		alert(data); //gestione errori da vedere
		},
		error: function (data) {
		}
  });
  $('#popover6').popover('hide');
  $('#label6').html(nome);
}

function save7() {
   
	var nome = $('#dif7').val();
	var datas = "request=salva_difetti&id="+id_commessa+"&difetton=difetto7&nome="+nome;
	  
	  $.ajax({
		type: "POST",
		url: "cgi-bin/edit.php",
		data: datas,
		dataType: "html",
		success: function (data) {
		alert(data); //gestione errori da vedere
		},
		error: function (data) {
		}
  });
  $('#popover7').popover('hide');
  $('#label7').html(nome);
}


function save8() {
   
	var nome = $('#dif8').val();
	var datas = "request=salva_difetti&id="+id_commessa+"&difetton=difetto8&nome="+nome;
	  
	  $.ajax({
		type: "POST",
		url: "cgi-bin/edit.php",
		data: datas,
		dataType: "html",
		success: function (data) {
		alert(data); //gestione errori da vedere
		},
		error: function (data) {
		}
  });
  $('#popover8').popover('hide');
  $('#label8').html(nome);
}



$(document).ready(function() {
    
    

/*    //toggle `popup` / `inline` mode
    $.fn.editable.defaults.mode = 'popup';     


    //make username editable
    $('#label8').editable({
    type: 'text',
    pk: 1,
    url: './postdata.php',
    title: 'Inserisci Difetto',
    selector: '#username',

    });
    */   
    /* 
    $('#label1').popover({
    selector: '#popover1', 
    html : true,
    title: function() {
      return $("#popover-head").html();
    },
    content: function() {
      return $("#popover-content").html();
    }
	}); 
	
	    $('#label2').popover({
    selector: '#popover2', 
    html : true,
    title: function() {
      return $("#popover-head").html();
    },
    content: function() {
      return $("#popover-content").html();
    }
	}); 
	
	    $('#label3').popover({
    selector: '#popover3', 
    html : true,
    title: function() {
      return $("#popover-head").html();
    },
    content: function() {
      return $("#popover-content").html();
    }
	}); 
	
	    $('#label4').popover({
    selector: '#popover4', 
    html : true,
    title: function() {
      return $("#popover-head").html();
    },
    content: function() {
      return $("#popover-content").html();
    }
	}); 
	
	    $('#label5').popover({
    selector: '#popover5', 
    html : true,
    title: function() {
      return $("#popover-head").html();
    },
    content: function() {
      return $("#popover-content").html();
    }
	}); 
	

    
    $('#label6').popover({
    selector: '#popover6', 
    html : true,
    title: function() {
      return $("#popover-head").html();
    },
    content: function() {
      return $("#popover-content").html();
    }
	});*/
	

	



}); //DocumentReady Ends


$('#addDefects').on("click",  function(){


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
	

$('#defectsModal').modal('show'); 


});




	/* Salva Difetti*/
	$('#saveDefects').click(function(){
     var url;	  
	  var datas;
	  
    //Verifica operatore 
	  var operatore;	
	  var select2def = $("#select2def").select2("data");
	  console.log(select2def);
	  if (select2def == "")
		 operatore = null;
	  else  
	  	 operatore = select2def[0].text;
	           
	  console.log(operatore);         
		
	  var from1 = $('#datetimepicker7').data("date").split("/");
     var f1 = from1[2]+"-"+from1[1]+"-"+from1[0];
 
	  var pezzi_controllati = $('#pezzi_controllati').val();
	  var rilavorati = $('#rilavorati').val();
	  var seq_inizio = $('#seq_inizio').val();

	  var seq_fine = $('#seq_fine').val();
	  var difetto1 = $('#difetto1').val();
	  var difetto2 = $('#difetto2').val();
	  var difetto3 = $('#difetto3').val();
	  var difetto4 = $('#difetto4').val();
	  var difetto5 = $('#difetto5').val();
	  var difetto6 = $('#difetto6').val();
	  var difetto7 = $('#difetto7').val();
	  var difetto8 = $('#difetto8').val();
	  var commento = $.trim($('#commento_dif').val()); //Use trim to avoid unexpected token
	  var ko = parseInt(difetto1)+parseInt(difetto2)+parseInt(difetto3)+parseInt(difetto4)+parseInt(difetto5)+parseInt(difetto6)+parseInt(difetto7)+parseInt(difetto8);
     var ok = pezzi_controllati - ko;
  

	   
	  if (flag) {
	 
	  url = "cgi-bin/postdata.php";
	  datas = "request=difetti&id_commessa="+id_commessa+"&data="+f1+"&difetto1="+difetto1+"&difetto2="+difetto2+"&difetto3="+difetto3+"&difetto4="+difetto4+"&difetto5="+difetto5+
	              "&difetto6="+difetto6+"&difetto7="+difetto7+"&difetto8="+difetto8+"&pezzi_controllati="+pezzi_controllati+"&seq_inizio="+seq_inizio+"&seq_fine="+seq_fine+"&operatore="+operatore+
	              "&rilavorati="+rilavorati+"&commento="+commento;
	  }
	  else{
     url = "cgi-bin/edit.php";	  
	  datas = "request=difetti&id="+id_row+"id_commessa="+id_commessa+"&data="+f1+"&difetto1="+difetto1+"&difetto2="+difetto2+"&difetto3="+difetto3+"&difetto4="+difetto4+"&difetto5="+difetto5+
	              "&difetto6="+difetto6+"&difetto7="+difetto7+"&difetto8="+difetto8+"&pezzi_controllati="+pezzi_controllati+"&seq_inizio="+seq_inizio+"&seq_fine="+seq_fine+"&operatore="+operatore+
	              "&rilavorati="+rilavorati+"&commento="+commento;
	  }
	  
	  $.ajax({
		type: "POST",
		url: url,
		data: datas,
		dataType: "html",
		success: function (msg) {
				var result = $.parseJSON(msg);
            
				if(result['mysql_error'])
				   var m = "ERROR: "+result['mysql_error'];
				else{ 
				   var m = "Dettagli difetti salvati!";
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
         if (flag && tab != 0) {
	         tableDefects.row.add( {
	         	  "id": id_row,
			        "data":       f1,
			        "seq_inizio": seq_inizio,
			        "seq_fine": seq_fine,
			        "pezzi_controllati": pezzi_controllati,
			        "ok": ok,
		           "ko": ko,
	              "rilavorati": rilavorati,
	              "commento": commento,
	              "difetto1":difetto1,		    
	              "difetto2":difetto2,		    
	              "difetto3":difetto3,		    
	              "difetto4":difetto4,		    
	              "difetto5":difetto5,		    
	              "difetto6":difetto6,		    
	              "difetto7":difetto7,		    
	              "difetto8":difetto8,		    
	               } ).draw();
         }
        
         //se edita aggiorna riga
         if (flag == 0 && tab != 0) {
	         var obj = {
	 	           "id": id_row,
			        "data":       f1,
			        "seq_inizio": seq_inizio,
			        "seq_fine": seq_fine,
			        "pezzi_controllati": pezzi_controllati,
			        "ok": ok,
		           "ko": ko,
	              "rilavorati": rilavorati,
	              "commento": commento,	
	              };
         tableDefects.row(rowNumber).data(obj);
         flag = 1; //reimposto il flag per salvare e non editare
         $('#defectsModal').modal('toggle');
        } 	
	   },
		error: function (data) {
		console.log(data);
		}

  });
  
});

//DATE	
$(function () {
	var dateNow = new Date();
        $('#datetimepicker7').datetimepicker({
        	   locale: 'it',
        		format: 'DD/MM/YYYY',
				defaultDate: dateNow,
        });
});


	  




