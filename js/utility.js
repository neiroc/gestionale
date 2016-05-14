/*
* Convert Date for DB
* @input dd/mm/yyyy
* @output yyyy-mm-dd
*/
function convertDate(date) {

input = date.split("/");
output = input[2]+"-"+ input[1]+"-"+input[0];
	
return output;
}






/*
* Generate PDF
*/

function genera_PDF_ore() {
   var data_i  = convertDate(data_inizio);	
   var data_f  = convertDate(data_fine);	
	
	var url = "http://localhost/gestionale/components/pdf_ore.php?id="+id_commessa+"&data_i="+data_i+"&data_f="+data_f+"&tipo_att="+tipo_att+"&sede="+sede;
	window.open(url,"_blank" );

}


function genera_PDF_difetti() {
   var data_i  = convertDate(data_inizio);	
   var data_f  = convertDate(data_fine);	
	
	var url = "http://localhost/gestionale/components/pdf_controlli2.php?id="+id_commessa+"&data_i="+data_i+"&data_f="+data_f+"&tipo_att="+tipo_att+"&sede="+sede;
	window.open(url,"_blank" );

}


