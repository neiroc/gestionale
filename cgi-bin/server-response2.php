<?php
require('db_aux.php');

//AUTOCOMPLTE FROM DB

//Connetti al DB
$mysqli = connect_db();


//Output any connection error
if ($mysqli->connect_error) {
    die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
}
$search = strip_tags(trim($_GET['q'])); 



// Do Prepared Query 
$stmt = $mysqli->prepare("SELECT tipo_anagrafica,nome FROM an_anagrafiche WHERE nome LIKE '%{$search}%'");

//
$stmt->execute();

$stmt->bind_result($type,$nome);


    while ($stmt->fetch()) {
       $data[] =  array('id' => $type, 'text'=> $nome );	
    }
    
    



$stmt->close();

// return the result in json
echo json_encode($data);
?>