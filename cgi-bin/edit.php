<?php
require "db_aux.php";

//Connetti al DB
$mysqli = connect_db();

//Tipo richiesta
$request = $_POST['request'];


if($request == "anagrafica") {
	
//Dati Anagrafica
$id          = $_POST['id'];
$nome        = $_POST['nome'];
$cell        = $_POST['cell'];
$tel         = $_POST['tel_fisso'];
$email       = $_POST['email'];
$tipo        = $_POST['tipo'];
$costo		 = $_POST['costo'];

$sedel       = $_POST['sede_legale'];
$piva        = $_POST['piva'];
$ind_fatt    = $_POST['ind_fatt'];
$ref_amm     = $_POST['ref_amm'];
$ref_comm    = $_POST['ref_comm'];
$tel_refcomm = $_POST['tel_refcomm'];
$e_refcomm   = $_POST['email_refcomm'];
		  

  $res2 = $mysqli->query("UPDATE an_anagrafiche SET nome='$nome', mobile='$cell', tel_fisso='$tel', email='$email', tipo_anagrafica='$tipo', sede_legale='$sedel', piva='$piva',
                          ind_fatt='$ind_fatt', ref_amm='$ref_amm', ref_comm='$ref_comm', tel_refcomm='$tel_refcomm', email_refcomm='$e_refcomm', costo='$costo'   WHERE id_anagrafica='$id'"); 
  if($res2){
    echo "Anagrafica Modificata!";
  } else{
    echo "Errore Database";
  }

}

/* Snelliire!!! */

if($request == "offerta") {
	
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


	
  $res2 = $mysqli->query("UPDATE of_offerte SET aperta_da='$aperta_da', cliente='$cliente', cliente_strategico='$strategico', costo_proposto='$proposta', tipo_operatore='$tipop', 
                          euro_ora='$euroOra', euro_pastog='$euroPasto', euro_km='$euroKm', euro_tl='$euroTl', volume_ore='$volOre', tipo_attivita='$tipoAtt', pagamento='$tipoPag',
                          sede='$sede', nota='$nota'  WHERE id_offerta='$id_offerta'"); 
  
  if($res2){
    echo "Offerta Modificata!";
  } else{
    echo "Errore Database";
  }

}

if($request == "ore") {
	
//Dati Inserimento Ore
$id			 = $_POST['id'];
$id_commessa = $_POST['id_commessa'];

$data        = $_POST['data'];
$operatore   = $_POST['operatore'];
$ore_std     = $_POST['ore_std'];
$ore_extra   = $_POST['ore_extra'];
$ore_fest    = $_POST['ore_fest'];
$ore_sabato  = $_POST['ore_sabato'];

$pezzi       = $_POST['pezzi'];
$spese       = $_POST['spese'];
$km          = $_POST['km'];
$europasto   = $_POST['euro_pastog'];

$sede        = $_POST['sede'];
$cliente     = $_POST['cliente'];
$commento    = $_POST['commento'];



	if(($_POST['operatore']!="null") && ($_POST['data']!="null")) {
	  
		  $res2 = $mysqli->query("UPDATE co_ore SET data='$data', operatore='$operatore', ore_std='$ore_std', ore_extra='$ore_extra', ore_fest='$ore_fest', ore_sabato='$ore_sabato',
		                         pezzi='$pezzi', sede='$sede', cliente='$cliente', commento='$commento', spese='$spese', km='$km', euro_pastog='$europasto' WHERE id='$id'"); 
		  
		  if($res2){
		  	   echo json_encode(array( "mysql_error" => false,
		                          "mysql_insert_id" => mysql_insert_id(),
		                          "mysql_affected_rows" => mysql_affected_rows(),
		                          "mysql_info" => mysql_info()
		                        ));
		  } else{
		       echo json_encode(array( "mysql_error" => mysqli_error($con) ));
		  }
	  
	}else echo json_encode(array( "mysql_error" => "Fai un piccolo sforzo, inserisci almeno data e operatore ;)"));

}

if($request == "difetti") {
	
//Dati Commessa
$id= $_POST['id'];
$data= $_POST['data'];
$difetto1 = $_POST['difetto1'];
$difetto2 = $_POST['difetto2'];
$difetto3 = $_POST['difetto3'];
$difetto4 = $_POST['difetto4'];
$difetto5 = $_POST['difetto5'];
$difetto6 = $_POST['difetto6'];
$difetto7 = $_POST['difetto7'];
$difetto8 = $_POST['difetto8'];
$pezzi_controllati = $_POST['pezzi_controllati'];
$seq_inizio = $_POST['seq_inizio'];
$seq_fine = $_POST['seq_fine'];
$operatore = $_POST['operatore'];
$rilavorati = $_POST['rilavorati'];
$commento = $_POST['commento'];




	
  $res2 = $mysqli->query("UPDATE co_difetti SET data='$data', operatore='$operatore', seq_inizio='$seq_inizio', seq_fine='$seq_fine', difetto1='$difetto1', difetto2='$difetto2',
          difetto3='$difetto3',difetto4='$difetto4',difetto5='$difetto5',difetto6='$difetto6',difetto7='$difetto7',difetto8='$difetto8', pezzi_controllati='$pezzi_controllati',
          rilavorati='$rilavorati',commento='$commento' WHERE id='$id'"); 
  
  if($res2){
  	   echo json_encode(array( "mysql_error" => false,
                          "mysql_insert_id" => mysql_insert_id(),
                          "mysql_affected_rows" => mysql_affected_rows(),
                          "mysql_info" => mysql_info()
                        ));
  } else{
       echo json_encode(array( "mysql_error" => mysqli_error($con) ));
  }

}

if($request=="salva_difetti"){
	
	$difetton = $_POST['difetton'];
	$nome = $_POST['nome'];
   $id = $_POST['id'];
			
  $res2 = $mysqli->query("UPDATE xt_tipo_difetto SET ".$difetton."='$nome' WHERE id='$id'"); 
  
  if($res2){
    echo "Difetto salvato!";
  } else{
    echo "Errore Database";
  }
 	   
}




?>