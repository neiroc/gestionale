<?php
require 'db_aux.php';

//connessione al db
$con = connect_db();


$query = "SELECT * FROM co_ore WHERE id_commessa=38";

$result = mysqli_query($con,$query);


//controlla risultati
if($result->num_rows > 0){

		while($row = mysqli_fetch_array($result,MYSQL_ASSOC)){			
				
			$output[] = $row;
		}
		 echo json_encode( $output );
}	

// liberazione della memoria dal risultato della query
//mysqli_free_result($result);

// chiusura della connessione
//mysqli_close($link);





?>