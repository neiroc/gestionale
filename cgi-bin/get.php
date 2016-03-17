<?php
require "db_aux.php";

//connessione al db
$con = connect_db();

$request = $_GET['req'];



if($request == "ore") {
$id = $_GET['var1'];
$date = $_GET['date'];
$query = "SELECT id_commessa,data,operatore,ore_std,ore_extra,ore_fest,ore_sabato,cliente FROM co_ore WHERE id_commessa='$id' AND data LIKE '%$date'";
$result = mysqli_query($con,$query);
}


if($request == "report") {
//$date = $_GET['date'];
$nome = $_GET['nome'];

$query = "SELECT cliente, data_apertura, tipo_attivita, sede, id_commessa FROM co_commesse WHERE cliente='$nome' ";
$result = mysqli_query($con,$query);
}


if($request == "summary") {
$date = $_GET['date'];
$id = $_GET['id']; 
//$date = "03/2016";
//$id=32;
$query = "SELECT id_commessa, data, SUM(ore_std) AS total_std, SUM(ore_extra) AS total_extra, SUM(ore_sabato) AS total_sabato, SUM(ore_fest) AS total_fest FROM co_ore WHERE id_commessa='$id' AND data LIKE '%$date'";
$result = mysqli_query($con,$query);

$row = array();

		while($row = mysqli_fetch_array($result)){			
			  $output[] = $row;			
		}
		//$output = substr($output, 3, -3);
		  echo json_encode( $output );




}

//controlla risultati

if($request == "ore" || $request == "report" ) {
$row = array();

		while($row = mysqli_fetch_array($result)){			
			 
			 
			  $output['data'][] = $row;
			
		}
		//$output = substr($output, 3, -3);
		  echo json_encode( $output );
	

// liberazione della memoria dal risultato della query
mysqli_free_result($result);
}



?>