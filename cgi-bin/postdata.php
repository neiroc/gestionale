<?php
require "db_aux.php";

//Connetti al DB
$mysqli = connect_db();

//Retrieve Data from  Bootstrap Modal
if($_POST['request']=="offerta") {

$table = "of_offerte";
$col = array('aperta_da', 'cliente', 'operatore', 'tipo_operatore');
$var1 = $_POST['apertada'];
$var2 = $_POST['cliente'];
$var3 = $_POST['operatore'];
$var4 = $_POST['tipo'];

}else {
$table = "an_anagrafiche";
$col = array('nome', 'mobile', 'email', 'tipo_anagrafica');
$var1 = $_POST['nome'];
$var2 = $_POST['cell'];
$var3 = $_POST['email'];
$var4 = $_POST['tipo'];

}



$colnames = "`".implode("`, `", $col)."`";

 if(($var1 != null) && ($var2 !=null) && ($var3 != null)){
  $res2 = $mysqli->query("INSERT INTO $table ($colnames) VALUES('$var1','$var2','$var3','$var4')");
  if($res2){
    echo "Anagrafica aggiunta!";
  } else{
    echo "Errore Database";
  }
}else{
    echo "Errore nell'inserimento dati";
  }

?>