<?php
// connect to database 
//require('db_aux.php');

//Connetti al DB
//$mysqli = connect_db();

//Open a new connection to the MySQL server
$mysqli = new mysqli('localhost','root','pass','gest');

//Output any connection error
if ($mysqli->connect_error) {
    die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
}
$search = strip_tags(trim($_GET['q'])); 



// Do Prepared Query 
$stmt = $mysqli->prepare("SELECT id_anagrafica,nome FROM an_anagrafiche WHERE nome LIKE '%{$search}%'");

//
$stmt->execute();

$stmt->bind_result($id,$nome);


    while ($stmt->fetch()) {
       $data[] =  array('id' => $id, 'text'=>$nome );	
    }
    
    



$stmt->close();

// return the result in json
echo json_encode($data);
?>