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
* Convert Date for DB
* @input yyyy-mm-dd
* @output dd/mm/yyyy
*/

function convertDate2(date) {

input  = date.split('-');
output = input[2]+'/'+input[1]+'/'+input[0] ;

return output;
}


/*
* MonthName
*/


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



/*
* Generate PDF
*/

function oreExt() {
   var data_i  = convertDate(data_inizio);	
   var data_f  = convertDate(data_fine);	
	
	var url = "components/oreExt.php?id="+id_commessa+"&data_i="+data_i+"&data_f="+data_f+"&tipo_att="+tipo_att+"&sede="+sede;
	window.open(url,"_blank" );

}


function oreInt() {
	var data_i  = convertDate(data_inizio);	
   var data_f  = convertDate(data_fine);
   
	var url = "components/oreInt.php?id="+id_commessa+"&data_i="+data_i+"&data_f="+data_f+"&tipo_att="+tipo_att+"&sede="+sede+"&cliente="+cliente+"&costo="+costo+"&euro_km="+euro_km+"&tl="+costo_tl;
	window.open(url,"_blank" );
}



function oreGenInt() {

	var url = "components/oreGenInt.php?data_i="+data_i+"&data_f="+data_f+"&tipo_att="+tipo_att+"&sede="+sede;
	window.open(url,"_blank" );

}


function controlliExt() {
   var data_i  = convertDate(data_inizio);	
   var data_f  = convertDate(data_fine);	
	
	var url = "components/controlliExt.php?id="+id_commessa+"&data_i="+data_i+"&data_f="+data_f+"&tipo_att="+tipo_att+"&sede="+sede;
	window.open(url,"_blank" );
}

function controlliInt() {
	var data_i  = convertDate(data_inizio);	
   var data_f  = convertDate(data_fine);	
	
	var url = "components/controlliInt.php?id="+id_commessa+"&data_i="+data_i+"&data_f="+data_f+"&tipo_att="+tipo_att+"&sede="+sede;
	window.open(url,"_blank" );
}


