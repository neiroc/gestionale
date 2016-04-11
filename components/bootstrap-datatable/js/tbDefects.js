//Global




$(document).ready(function() {

}); //DocumentReady Ends



$('#addDefects').click(function () {
	
	var $rows = table.$('tr.selected');
	var rowData = table.rows($rows).data();
	
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
		$('#label9').html(data[0].difetto9);
		$('#label10').html(data[0].difetto10);

	},
   error: function () {
                   
   }
});	
	

$('#defectsModal').modal('show'); 
	
});



	/* Salva Difetti*/
	$('#saveDefects').click(function(){
		
	
		
	  var from1 = $('#datetimepicker7').data("date").split("/");
     var f1 = from1[2]+"-"+from1[1]+"-"+from1[0];
		
	  var request = "difetti";
	  
	  var id_commessa = $('#id_commessa2').val();
	  
	  var difetto1 = $('#difetto1').val();
	  var difetto2 = $('#difetto2').val();
	  var difetto3 = $('#difetto3').val();
	  var difetto4 = $('#difetto4').val();
	  var difetto5 = $('#difetto5').val();
	  var difetto6 = $('#difetto6').val();
	  var difetto7 = $('#difetto7').val();
	  var difetto8 = $('#difetto8').val();

	 
	  var datas = "request="+request+"&id="+id_commessa+"&data="+f1+"&difetto1="+difetto1+"&difetto2="+difetto2+"&difetto3="+difetto3+"&difetto4="+difetto4+"&difetto5="+difetto5+
	              "&difetto6="+difetto6+"&difetto7="+difetto7+"&difetto8="+difetto8;
	  
	  $.ajax({
		type: "POST",
		url: "cgi-bin/postdata.php",
		data: datas,
		dataType: "html",
		success: function (data) {
		alert("difetti salvati");
		alert(data); //gestione errori da vedere
		},
		error: function (data) {
		
		}

  });
  
});

//DATE	
$(function () {
        $('#datetimepicker7').datetimepicker({
        		format: 'DD/MM/YYYY'
        });
});


	  




