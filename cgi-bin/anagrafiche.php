<?php

require 'db_aux.php';


/* Mostra tutte le Anagrafiche */

function mostraAnagrafiche() {

//connessione al db
$con = connect_db();


$query = "SELECT ragione_sociale,idanagrafica FROM an_anagrafiche";

$result = mysqli_query($con,$query);


//controlla risultati
if($result->num_rows > 0){

		while($row = mysqli_fetch_array($result)){			
				$re = json_encode($row);
				echo $re . "<br>";
			
		}
}	

// liberazione della memoria dal risultato della query
mysqli_free_result($result);

// chiusura della connessione
mysqli_close($link);



}

?>
