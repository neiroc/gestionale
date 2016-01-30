<?php
require "db_aux.php";

//Connetti al DB
$mysqli = connect_db();

//Retrieve Data from  Bootstrap Modal
$id = $_POST['id_offerta'];



if(($id != null)){
 
$res = $mysqli->query("INSERT FROM an_anagrafiche WHERE id_anagrafica='$id'");
 
	if($res){
	         echo "Elemento rimosso!";
	} else{
	        echo "Errore Database";
			  }
}
else
{
echo "Non hai selezionato nessuna riga";
}

?>