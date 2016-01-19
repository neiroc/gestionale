<?php
require "db_aux.php";

//Connetti al DB
$mysqli = connect_db();

//Retrieve Data
$nome = $_POST['nome'];


if(isset($nome)){


  $res2 = $mysqli->query("INSERT INTO an_anagrafiche (name,email,mobile ) VALUES('$nome','hgfhfg','hgfhgf')");
  if($res2){
    echo "Success Post Data";
  } else{
    echo "Fail Post Data";
  }
}else{
    echo "Error Entering Data";
  }

?>