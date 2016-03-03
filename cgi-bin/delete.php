<?php
require "db_aux.php";

//Connetti al DB
$mysqli = connect_db();

//Retrieve Data 
$request = $_POST['request'];
$id = $_POST['id'];



 if(($id != null)){
 	
		if($request == "anagrafica") {
		  $res = $mysqli->query("DELETE FROM an_anagrafiche WHERE id_anagrafica='$id'");
		 
					  if($res){
					    echo "Elemento rimosso!";
					  } else{
					    echo "Errore Database";
					  }
		}
		
		if($request == "offerta") {
		  $res = $mysqli->query("DELETE FROM of_offerte WHERE id_offerta='$id'");
		 
					  if($res){
					    echo "Elemento rimosso!";
					  } else{
					    echo "Errore Database";
					  }
		}
		
	    if($request == "commessa") {
		  $res = $mysqli->query("DELETE FROM co_commesse WHERE id_commessa='$id'");
		 
					  if($res){
					    echo "Elemento rimosso!";
					  } else{
					    echo "Errore Database";
					  }
		}
		
		
			    
}else echo "Il nulla non si cancella, seleziona una riga!" 


?>