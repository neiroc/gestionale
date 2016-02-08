<?php
require "db_aux.php";

//connessione al db
$con = connect_db();

$id = $_GET['var1'];

$query = "SELECT id_commessa,data,operatore,ore_std,ore_extra,ore_fest,ore_sabato,cliente FROM co_ore WHERE id_commessa='$id'";

$result = mysqli_query($con,$query);


//controlla risultati


$row = array();

		while($row = mysqli_fetch_array($result)){			
			 
			 
			  $output['data'][] = $row;
			
		}
		//$output = substr($output, 3, -3);
		  echo json_encode( $output );
	

// liberazione della memoria dal risultato della query
mysqli_free_result($result);




?>