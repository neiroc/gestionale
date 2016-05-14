<?php
require('mysql_table.php');

class PDF extends PDF_MySQL_Table
{
function Header()
{
	// Logo
   $this->Image('../images/logo.png',10,6,30);
	$this->SetFont('Arial','',18);
	$this->Cell(200,6,'Report',0,0,'C');
	$this->SetFont('Arial','',9);
   $summary = "Periodo : ".$_GET['data_i']." - ".$_GET['data_f']."\nTipo Attivita : ".$_GET['tipo_att']."\nSede : ".$_GET['sede'];
	$this->MultiCell(0,4,$summary,0,'L',0);
	$this->Ln(10);
	
	//Ensure table header is output
	parent::Header();
}

// Page footer
function Footer()
{
    // Position at 1.5 cm from bottom
    $this->SetY(-15);
    // Arial italic 8
    $this->SetFont('Arial','I',8);
    // Page number
    $this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'C');
}
}

$id = $_GET['id'];
$data_i = $_GET['data_i'];
$data_f = $_GET['data_f'];


//Connect to database
mysql_connect('localhost','root','pass');
mysql_select_db('gest');



$pdf=new PDF();
$pdf->AliasNbPages();
// Column headings
$pdf->AddPage('L');

//First table
$pdf->AddCol('data',35,'Data','L');
$pdf->AddCol('seq_inizio',35,'Codice In','L');
$pdf->AddCol('seq_fine',35,'Codice Out','L');
$pdf->AddCol('pezzi_controllati',35,'Controllati','L');
$pdf->AddCol('ok',35,'Conformi','L');
$pdf->AddCol('ko',35,'Non conformi','L');
$pdf->AddCol('rilavorati',35,'Rilavorati','L');
$prop=array('HeaderColor'=>array(255,150,100),
            'color1'=>array(255,255,210),
            'color2'=>array(255,255,255),
            'padding'=>2);
            


$pdf->Table("SELECT data, seq_inizio, seq_fine, pezzi_controllati, 
             pezzi_controllati - (difetto1 + difetto2 + difetto3 + difetto4 + difetto5 + difetto6 + difetto7 + difetto8)  AS ok,
             difetto1 + difetto2 + difetto3 + difetto4 + difetto5 + difetto6 + difetto7 + difetto8 AS ko, 
             rilavorati FROM co_difetti WHERE id='$id' AND data BETWEEN '$data_i' AND '$data_f'",$prop);



$pdf->Output('report_controlli.pdf', 'I');
?>
