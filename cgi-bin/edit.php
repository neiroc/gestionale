<?php
require "db_aux.php";

//Connetti al DB
$mysqli = connect_db();

//Retrieve Data from  Bootstrap Modal
$nome = $_POST['nome'];
$cell = $_POST['cell'];
$email = $_POST['email'];
$tipo = $_POST['tipo'];
$id= $_POST['id'];



 
 if(($nome != null) && ($email !=null) && ($tipo != null)){
  $res2 = $mysqli->query("UPDATE an_anagrafiche SET nome='$nome',mobile='$cell',email='$email',tipo_anagrafica='$tipo' WHERE id_anagrafica='$id'"); 
  if($res2){
    echo "Anagrafica Modificata!";
  } else{
    echo "Errore Database";
  }
}else{
    echo "Errore nell'inserimento dati";
  }

?>