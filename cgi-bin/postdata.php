<?php
require "db_aux.php";
require "utility.php";

//Connetti al DB
//$mysqli = connect_db();


$con=mysql_connect("localhost","root","pass");
// Check connection
if (mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  $con = False;
}
            
mysql_select_db('gest');
            


if($_POST['request']=="anagrafica") {
	if($_POST['nome']!=NULL) 	
		$result = mysql_insert_array("an_anagrafiche", $_POST, "request");
		//Return result
		echo json_encode($result);
}
      
      
if($_POST['request']=="offerta") {
	if(($_POST['aperta_da']!="null") && ($_POST['cliente']!="null")){ 

		$result = mysql_insert_array("of_offerte", $_POST, "request");
		
	}
	else 
		echo "Errore";

}


if($_POST['request']=="accetta"){

$id = $_POST['id_commessa'];

$result = mysql_insert_array("co_commesse", $_POST, "request");
$result2 =  mysql_query("INSERT INTO  xt_tipo_difetto (id) VALUES ('$id') "); 
 				
// Results
if( $result['mysql_error'] ) {
    echo "Query Failed: " . $result['mysql_error'];
}else echo "Offerta accettata!"; 


   

}



if($_POST['request']=="ore"){
		if(($_POST['operatore']!="null") && ($_POST['data']!="null")) {
 				$result = mysql_insert_array("co_ore", $_POST, "request");
 				// Results
				echo json_encode($result); 
 	   }else {
 	         echo json_encode(array( "mysql_error" => "Fai un piccolo sforzo, inserisci almeno data e operatore ;)"));
 	   }
}


if($_POST['request']=="difetti"){
		
 			$result = mysql_insert_array("co_difetti", $_POST, "request");
 			//Return result
		    echo json_encode($result);
 	   
}





// Close database!

?>