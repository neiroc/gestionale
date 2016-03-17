<?php
require "db_aux.php";

//Connetti al DB
$mysqli = connect_db();


$request = $_POST['request'];

//Dati Anagrafica
$id          = $_POST['id'];
$nome        = $_POST['nome'];
$cell        = $_POST['cell'];
$tel         = $_POST['tel_fisso'];
$email       = $_POST['email'];
$tipo        = $_POST['tipo'];

$sedel       = $_POST['sede_legale'];
$piva        = $_POST['piva'];
$ind_fatt    = $_POST['ind_fatt'];
$ref_amm     = $_POST['ref_amm'];
$ref_comm    = $_POST['ref_comm'];
$tel_refcomm = $_POST['tel_refcomm'];
$e_refcomm   = $_POST['email_refcomm'];
		  

//Dati Offerta
$id_offerta = $_POST['id_offerta'];
$aperta_da  = $_POST['aperta_da'];
$cliente    = $_POST['cliente'];
$strategico = $_POST['strategico'];
$proposta   = $_POST['costo_proposto'];
$tipop      = $_POST['tipo_operatore'];
$euroOra    = $_POST['euro_ora'];
$euroPasto  = $_POST['euro_pastog'];
$euroKm     = $_POST['euro_km'];
$euroTl     = $_POST['euro_tl'];
$volOre     = $_POST['volume_ore'];
$tipoAtt    = $_POST['tipo_attivita'];
$tipoPag    = $_POST['pagamento'];
$sede       = $_POST['sede'];
$nota       = $_POST['nota'];





if($request == "anagrafica") {

  $res2 = $mysqli->query("UPDATE an_anagrafiche SET nome='$nome', mobile='$cell', tel_fisso='$tel', email='$email', tipo_anagrafica='$tipo', sede_legale='$sedel', piva='$piva',
                          ind_fatt='$ind_fatt', ref_amm='$ref_amm', ref_comm='$ref_comm', tel_refcomm='$tel_refcomm', email_refcomm='$e_refcomm'   WHERE id_anagrafica='$id'"); 
  if($res2){
    echo "Anagrafica Modificata!";
  } else{
    echo "Errore Database";
  }

}

/* Snelliire!!! */

if($request == "offerta") {
	
  $res2 = $mysqli->query("UPDATE of_offerte SET aperta_da='$aperta_da', cliente='$cliente', cliente_strategico='$strategico', costo_proposto='$proposta', tipo_operatore='$tipop', 
                          euro_ora='$euroOra', euro_pastog='$euroPasto', euro_km='$euroKm', euro_tl='$euroTl', volume_ore='$volOre', tipo_attivita='$tipoAtt', pagamento='$tipoPag',
                          sede='$sede', nota='$nota'  WHERE id_offerta='$id_offerta'"); 
  
  if($res2){
    echo "Offerta Modificata!";
  } else{
    echo "Errore Database";
  }

}




?>