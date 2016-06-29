<?php
require "db_aux.php";

//connessione al db
$con = connect_db();

$request = $_GET['req'];


if($request == "ore") {
$id = $_GET['var1'];
$data_i = $_GET['data_i'];
$data_f = $_GET['data_f'];
$query = "SELECT id_commessa,data,operatore,sede,ore_std,ore_extra,ore_fest,ore_sabato, spese, km, euro_pastog, (ore_std + ore_extra + ore_fest + ore_sabato) as total, cliente, commento, team_leader,id FROM co_ore WHERE id_commessa='$id' AND data BETWEEN '$data_i' AND '$data_f'";
$result = mysqli_query($con,$query);
}


if($request == "ore_cliente") {
$id = $_GET['var1'];
$data_i = $_GET['data_i'];
$data_f = $_GET['data_f'];
$query = "SELECT id_commessa,data,operatore,ore_std,ore_extra,ore_fest,ore_sabato, (ore_std + ore_extra + ore_fest + ore_sabato) as total, cliente FROM co_ore WHERE id_commessa='$id' AND data BETWEEN '$data_i' AND '$data_f'";
$result = mysqli_query($con,$query);
}



if($request == "ore_generali") {

$date1 = $_GET['date1']; //inzio
$date2 = $_GET['date2']; //fine intervallo

$query = "SELECT data, id_commessa, cliente, operatore, ore_std, ore_extra, ore_fest, ore_sabato, spese, km, euro_pastog, team_leader, sede FROM co_ore WHERE data BETWEEN '$date1' AND '$date2'";
$result = mysqli_query($con,$query);
}

if($request == "tipo_difetti") {
$id = $_GET['id'];

$query = "SELECT * FROM xt_tipo_difetto WHERE id='$id'";
$result = mysqli_query($con,$query);

$row = array();

		while($row = mysqli_fetch_array($result)){			
			  $output[] = $row;			
		}
		//$output = substr($output, 3, -3);
		  echo json_encode( $output );
}

if($request == "tipo_difetti2") {
$id = $_GET['id'];
$data_i = $_GET['data_i'];
$data_f = $_GET['data_f'];

$query = "SELECT * FROM xt_tipo_difetto WHERE id='$id'";
$result1 = mysqli_query($con,$query);

$query = "SELECT data, SUM(difetto1) as tot_difetto1, SUM(difetto2) as tot_difetto2, SUM(difetto3) as tot_difetto3,SUM(difetto4) as tot_difetto4, SUM(difetto5) as tot_difetto5, 
                 SUM(difetto6) as tot_difetto6, SUM(difetto7) as tot_difetto7, SUM(difetto8) as tot_difetto8, SUM(difetto9) as tot_difetto9,SUM(difetto10) as tot_difetto10 
                 FROM co_difetti WHERE id='$id' AND data BETWEEN '$data_i' AND '$data_f'";
                 
$result2 = mysqli_query($con,$query);

		while($row1 = mysqli_fetch_array($result2, MYSQL_ASSOC)){			
				while ($row = mysqli_fetch_array($result1, MYSQL_ASSOC)) {
						/*ciclo su colonne MIGLIORAREE!!*/
						/*foreach ($row as $k=>$v)
					    {
					        $features = explode("#", $v);
					        $value = $features[1]; // get the specific language feature
					        $arr[] = $value;
					    }*/
					    
					   /*Sta robbba è un pò grezza..more elegance!*/ 
					  $city = array();
					  
			        if($row['difetto1'] != null) 
			        $city[] = new ArrayObject(['difetto' => $row['difetto1'], 'tot_difetti' => $row1['tot_difetto1']]);
			        
                 if($row['difetto2'] != null) 			        
			        $city[] = new ArrayObject(['difetto' => $row['difetto2'], 'tot_difetti' => $row1['tot_difetto2']]);
			        
			        if($row['difetto3'] != null) 
			        $city[] = new ArrayObject(['difetto' => $row['difetto3'], 'tot_difetti' => $row1['tot_difetto3']]);
			        
			        if($row['difetto4'] != null) 
			        $city[] = new ArrayObject(['difetto' => $row['difetto4'], 'tot_difetti' => $row1['tot_difetto4']]);
			        			       
			        if($row['difetto5'] != null) 
			        $city[] = new ArrayObject(['difetto' => $row['difetto5'], 'tot_difetti' => $row1['tot_difetto5']]);
			        			        
			        if($row['difetto6'] != null) 
			        $city[] = new ArrayObject(['difetto' => $row['difetto6'], 'tot_difetti' => $row1['tot_difetto6']]);
			        
			        if($row['difetto7'] != null) 
			        $city[] = new ArrayObject(['difetto' => $row['difetto7'], 'tot_difetti' => $row1['tot_difetto7']]);
			        
			        if($row['difetto8'] != null) 
			        $city[] = new ArrayObject(['difetto' => $row['difetto8'], 'tot_difetti' => $row1['tot_difetto8']]);
			        
			        if($row['difetto9'] != null) 
			        $city[] = new ArrayObject(['difetto' => $row['difetto9'], 'tot_difetti' => $row1['tot_difetto9']]);
			        
			        if($row['difetto10'] != null) 
			        $city[] = new ArrayObject(['difetto' => $row['difetto10'], 'tot_difetti' => $row1['tot_difetto10']]);
			     }
}

	  
 header("Content-type: application/json");
 echo json_encode($city);
}

//Tipo difetto e quantita
if($request == "tipo_difetti3") {
$id = $_GET['id'];
$data_i = $_GET['data_i'];
$data_f = $_GET['data_f'];


$query = "SELECT * FROM xt_tipo_difetto WHERE id='$id'";
$result1 = mysqli_query($con,$query);

$query = "SELECT data, SUM(difetto1) as tot_difetto1, SUM(difetto2) as tot_difetto2, SUM(difetto3) as tot_difetto3,SUM(difetto4) as tot_difetto4, SUM(difetto5) as tot_difetto5, 
                 SUM(difetto6) as tot_difetto6, SUM(difetto7) as tot_difetto7, SUM(difetto8) as tot_difetto8, SUM(difetto9) as tot_difetto9,SUM(difetto10) as tot_difetto10 
                 FROM co_difetti WHERE id_commessa='$id' AND data BETWEEN '$data_i' AND '$data_f'";
                 
$result2 = mysqli_query($con,$query);

		while($row1 = mysqli_fetch_array($result2, MYSQL_ASSOC)){			
				while ($row = mysqli_fetch_array($result1, MYSQL_ASSOC)) {
						/*ciclo su colonne MIGLIORAREE!!*/
						/*foreach ($row as $k=>$v)
					    {
					        $features = explode("#", $v);
					        $value = $features[1]; // get the specific language feature
					        $arr[] = $value;
					    }*/
					    
					   /*Sta robbba è un pò grezza..more elegance!*/ 
					  $city = array();
					  
			        if($row['difetto1'] != null) 
			        $city[] = new ArrayObject(['difetto' => $row['difetto1'], 'tot_difetti' => $row1['tot_difetto1']]);
			        
                 if($row['difetto2'] != null) 			        
			        $city[] = new ArrayObject(['difetto' => $row['difetto2'], 'tot_difetti' => $row1['tot_difetto2']]);
			        
			        if($row['difetto3'] != null) 
			        $city[] = new ArrayObject(['difetto' => $row['difetto3'], 'tot_difetti' => $row1['tot_difetto3']]);
			        
			        if($row['difetto4'] != null) 
			        $city[] = new ArrayObject(['difetto' => $row['difetto4'], 'tot_difetti' => $row1['tot_difetto4']]);
			        			       
			        if($row['difetto5'] != null) 
			        $city[] = new ArrayObject(['difetto' => $row['difetto5'], 'tot_difetti' => $row1['tot_difetto5']]);
			        			        
			        if($row['difetto6'] != null) 
			        $city[] = new ArrayObject(['difetto' => $row['difetto6'], 'tot_difetti' => $row1['tot_difetto6']]);
			        
			        if($row['difetto7'] != null) 
			        $city[] = new ArrayObject(['difetto' => $row['difetto7'], 'tot_difetti' => $row1['tot_difetto7']]);
			        
			        if($row['difetto8'] != null) 
			        $city[] = new ArrayObject(['difetto' => $row['difetto8'], 'tot_difetti' => $row1['tot_difetto8']]);
			        
			        if($row['difetto9'] != null) 
			        $city[] = new ArrayObject(['difetto' => $row['difetto9'], 'tot_difetti' => $row1['tot_difetto9']]);
			        
			        if($row['difetto10'] != null) 
			        $city[] = new ArrayObject(['difetto' => $row['difetto10'], 'tot_difetti' => $row1['tot_difetto10']]);
			     }
}
	  
 header("Content-type: application/json");
 echo json_encode($city);
}

if($request == "report") {

$nome = $_GET['nome'];

$query = "SELECT cliente, data_apertura, tipo_attivita, sede, id_commessa, nota FROM co_commesse WHERE cliente='$nome' ";
$result = mysqli_query($con,$query);
}

if($request == "difetti") {

$id = $_GET['id'];
$data_i = $_GET['data_i'];
$data_f = $_GET['data_f'];

$query = "SELECT data, seq_inizio, seq_fine, pezzi_controllati, commento, 
                 difetto1,difetto2,difetto3,difetto4,difetto5,difetto6,difetto7,difetto8, 
                 difetto1 + difetto2 + difetto3 + difetto4 + difetto5 + difetto6 + difetto7 + difetto8 AS ko,
                 rilavorati,
                 pezzi_controllati - (difetto1 + difetto2 + difetto3 + difetto4 + difetto5 + difetto6 + difetto7 + difetto8)  AS ok 
                 FROM co_difetti WHERE id='$id' AND data BETWEEN '$data_i' AND '$data_f' ";
$result = mysqli_query($con,$query);
}

if($request == "difetti2") {

$id = $_GET['id'];
$data_i = $_GET['data_i'];
$data_f = $_GET['data_f'];


$query = "SELECT id, id_commessa, data, seq_inizio, seq_fine, pezzi_controllati, commento, operatore,
                 difetto1,difetto2,difetto3,difetto4,difetto5,difetto6,difetto7,difetto8, 
                 difetto1 + difetto2 + difetto3 + difetto4 + difetto5 + difetto6 + difetto7 + difetto8 AS ko,
                 rilavorati,
                 pezzi_controllati - (difetto1 + difetto2 + difetto3 + difetto4 + difetto5 + difetto6 + difetto7 + difetto8)  AS ok 
                 FROM co_difetti WHERE id_commessa='$id' AND data BETWEEN '$data_i' AND '$data_f' ";
$result = mysqli_query($con,$query);
}





//controlla risultati

if($request == "ore" || $request == "ore_cliente" || $request == "report" || $request == "ore_generali" || $request == "difetti" || $request == "difetti2") {
$row = array();

		while($row = mysqli_fetch_array($result)){			
			 
			 
			  $output['data'][] = $row;
			  //$output[][] = $row;
			
		}
		//$output = substr($output, 3, -3);
		  echo json_encode( $output );
	

// liberazione della memoria dal risultato della query
mysqli_free_result($result);
}



?>