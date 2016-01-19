<?php
require "db_aux.php";

//Connetti al DB
$mysqli = connect_db();

//Retrieve Data from  Bootstrap Modal
$nome = $_POST['nome'];
$cell = $_POST['cell'];
$email = $_POST['email'];
$tipo = $_POST['tipo'];


 if(($nome != null) && ($email !=null) && ($tipo != null)){
  $res2 = $mysqli->query("INSERT INTO an_anagrafiche (nome,mobile,email,tipo_anagrafica ) VALUES('$nome','$cell','$email','$tipo')");
  if($res2){
    echo "Anagrafica aggiunta!";
  } else{
    echo "Errore Database";
  }
}else{
    echo "Errore nell'inserimento dati";
  }

?>