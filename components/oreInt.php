<?php
require "../cgi-bin/db_aux.php";
require_once('tcpdf/tcpdf.php');


// Extend the TCPDF class to create custom Header and Footer
class MYPDF extends TCPDF {

    //Page header
    public function Header() {
        // Logo
        $image_file = K_PATH_IMAGES.'logo.png';
        $this->Image($image_file, 5, 10, 40, '', 'PNG', '', 'T', false, 0, '', false, false, 0, false, false, false);
        // Set font
        $this->SetFont('helvetica', 'B', 20);
        // Title
        $this->Cell(175, 40, "Report per ".$_GET['cliente'], 0, false, 'C', 0, '', 0, false, 'M', 'B');
        // Set font
        $this->SetFont('helvetica', 'B', 9);
        $summary = "Periodo : ".$_GET['data_i']." - ".$_GET['data_f']."\nTipo Attivita : ".$_GET['tipo_att']."\nSede : ".$_GET['sede'];
		  $this->MultiCell(75, 10, $summary, 0, 'L', 0, 1, '', '', true, 0, false, true, 20, 'B');
    }

    // Page footer
    public function Footer() {
        // Position at 15 mm from bottom
        $this->SetY(-15);
        // Set font
        $this->SetFont('helvetica', 'I', 7);
        $this->MultiCell(0, 5, "CONTRACT SRL \n Via Angelelli 14/a - 40013 Castel Maggiore (BO) - TEL. +39 347 0715855 FAX +39 178 2242369 \n R.E.A. BO-500411 - Cod. Fisc./P.IVA : 03207241203 - Cap. Soc. € 10.000,00 i.v. \n Email: contract-italia@pec.it Sito web: www.contract-italy.com", 0, 'C', 0, 0, '', '', true, 0, false, true, 0, 'M');
        // Page number
         $this->SetY(-10);
                 
        $this->Cell(0, 5, 'Page '.$this->getAliasNumPage().'/'.$this->getAliasNbPages(), 0, false, 'R', 0, '', 0, false, 'T', 'M');
    }
}

// create new PDF document
$pdf = new MYPDF('L', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Contract by nEiRok_');
$pdf->SetTitle('PDF');
$pdf->SetSubject('PDF');
$pdf->SetKeywords('PDF');


// set default header data
$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, PDF_HEADER_STRING, array(0,64,255), array(0,64,128));
$pdf->setFooterData(array(0,64,0), array(0,64,128));

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, 40, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(160);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set default header data
$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, PDF_HEADER_STRING, array(255,64,255), array(100,64,128));
$pdf->setFooterData(array(0,64,0), array(0,64,128));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);



//set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

//set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

//set some language-dependent strings
$pdf->setLanguageArray($l);

// -------------------------------------------------------------------------

// set default font subsetting mode
$pdf->setFontSubsetting(true);
// Set font
// dejavusans is a UTF-8 Unicode font, if you only need to
// print standard ASCII chars, you can use core fonts like
// helvetica or times to reduce file size.
$pdf->SetFont('dejavusans', '', 14, '', true);

// Add a page
// This method has several options, check the source code documentation for more information.
$pdf->AddPage();

// Set some content to print
$tbl_header = '<style>
table {
    border: 1px solid grey; 
    border-collapse: collapse;
    border-spacing: 0;
    margin: 0 20px;
}
tr {
	 border-collapse: collapse;
	 border: 1px solid grey;
    padding: 3px 0;
}

th {
    background-color: #FFC000;
    /*border-bottom: 1px solid black;*/
    color: #333333;
    font-family: trebuchet MS;
    font-size: 12px;
    padding-bottom: 0px;
    padding-left: 0px;
    padding-top: 5px;
    text-align: left;
}
td {
    border-bottom: 1px solid #ddd; 
    font-size: 10px;
    padding-left: 5px;
}
</style>
<table width="100%" cellspacing="0" cellpadding="3" border="0">
<tr>
        <th>Data</th>
        <th>Operatore</th>
        <th>Ore standard</th>
        <th>Ore extra</th>
        <th>Ore festivi</th>
        <th>Ore sabato</th>
        
</tr>';
      
      
$tbl_footer = '</table>';
$tbl ='';

$con = connect_db();
  
//GET DATA FROM URL
$id = $_GET['id'];
$data_i = $_GET['data_i'];
$data_f = $_GET['data_f'];  

// SQL Query  
$result = mysqli_query($con,"SELECT data, operatore, ore_std,  ore_extra , ore_fest , ore_sabato  FROM co_ore  WHERE id_commessa='$id' AND data BETWEEN '$data_i' AND '$data_f'");
 
while($row = mysqli_fetch_array($result))
  {
  	
  $orderdate = explode('-', $row['data']);

  $data 		  = $orderdate[2]."/".$orderdate[1]."/".$orderdate[0];
  $operatore  = $row['operatore'];
  $ore_std    = $row['ore_std'];
  $ore_extra  = $row['ore_extra'];
  $ore_fest   = $row['ore_fest'];
  $ore_sabato = $row['ore_sabato'];

  if($i % 2 == 0){ 
  $color_row="aliceblue"; $i++;} 
  else {
  $color_row="white"; $i++;}

  $tbl .= '<tr style="background-color:'.$color_row.'"><td>'.$data.'</td><td>'.$operatore.'</td><td>'.$ore_std.'</td><td>'.$ore_extra.'</td><td>'.$ore_fest.'</td><td>'.$ore_sabato.'</td></tr>';
}
// Print text using writeHTMLCell()
$pdf->writeHTML($tbl_header . $tbl . $tbl_footer, true, false, false, false, '');


// --------------------------------------SUMMARY REPORT---------------------------------------------//


$query2 = "SELECT id_commessa, data, SUM(ore_std) AS total_std, SUM(ore_extra) AS total_extra, SUM(ore_sabato) AS total_sabato, SUM(ore_fest) AS total_fest,
           SUM(km) AS total_km, SUM(euro_pastog) AS total_pasti, SUM(spese) AS total_spese FROM co_ore WHERE id_commessa='$id' AND data BETWEEN '$data_i' AND '$data_f'";

$query3 = "SELECT id_commessa, operatore, team_leader, data, SUM(ore_std) AS total_std FROM co_ore WHERE id_commessa='$id' AND team_leader='SI' AND data BETWEEN '$data_i' AND '$data_f'";

$result2 = mysqli_query($con,$query2);
$result3 = mysqli_query($con,$query3);


$row2 = mysqli_fetch_array($result2);
$row3 = mysqli_fetch_array($result3);

$total_tl = $row3['total_std'];  	
$total_std = $row2['total_std'] - $total_tl;  	
$total_extra = $row2['total_extra'];  	
$total_sabato = $row2['total_sabato'];  	
$total_fest = $row2['total_fest'];
$total_spese = $row2['total_spese'];
$total_km = $row2['total_km'];
$total_pasti = $row2['total_pasti'];


$costo_std = $_GET['costo'];
$costo_extra = round(((0.25*$costo_std)+$costo_std),2);
$costo_sabato = round(((0.20*$costo_std)+$costo_std),2);
$costo_fest = round(((0.50*$costo_std)+$costo_std),2);
$costo_km = $_GET['euro_km'];
$costo_tl = $_GET['tl'];

$tc_std = $total_std*$costo_std;
$tc_extra = $total_extra*$costo_extra;
$tc_sabato = $total_sabato*$costo_sabato;
$tc_fest = $total_fest*$costo_fest;
$tc_km = $total_km*$costo_km;
$tc_tl = $total_tl*$costo_tl;

$totale = $tc_std+$tc_extra+$tc_sabato+$tc_fest+$tc_km+$total_spese+$total_pasti+$tc_tl;

$tbl2 = '<tr><td>Ore standard</td><td>'.$total_std.'</td><td>'.$costo_std.' €</td><td>'.$tc_std.' €</td></tr>'.
        '<tr style="background-color:aliceblue"><td>Ore extra (+25%)</td><td>'.$total_extra.'</td><td>'.$costo_extra.' €</td><td>'.$tc_extra.' €</td></tr>'.
        '<tr><td>Ore festivi (+50%)</td><td>'.$total_fest.'</td><td>'.$costo_fest.' €</td><td>'.$tc_fest.' €</td></tr>'.		
        '<tr style="background-color:aliceblue"><td>Ore sabato (+20%)</td><td>'.$total_sabato.'</td><td>'.$costo_sabato.' €</td><td>'.$tc_sabato.' €</td></tr>'.
        '<tr><td>Ore TL</td><td>'.$total_tl.'</td><td>'.$costo_tl.' €</td><td>'.$tc_tl.' €</td></tr>'.			
        '<tr><td>Spese</td><td></td><td></td><td>'.$total_spese.' €</td></tr>'.	
        '<tr style="background-color:aliceblue"><td>Km</td><td></td><td>'.$total_km.'*'.$costo_km.'</td><td>'.$tc_km.' €</td></tr>'.	
        '<tr><td>Pasti</td><td></td><td></td><td>'.$total_pasti.' €</td></tr>'.	
        '<tr style="background-color:aliceblue"><td>TOTALE</td><td></td><td></td><td>'.$totale.' €</td></tr>';	



$pdf->AddPage();

// Set some content to print
$tbl_header2 = '<style>
table {
    border: 1px solid grey; 
    border-collapse: collapse;
    border-spacing: 0;
    margin: auto;
}
tr {
	 border-collapse: collapse;
	 border: 1px solid grey;
    padding: 3px 0;
}

th {
    background-color: #FFC000;
    /*border-bottom: 1px solid black;*/
    color: #333333;
    font-family: trebuchet MS;
    font-size: 12px;
    padding-bottom: 0px;
    padding-left: 0px;
    padding-top: 5px;
    text-align: left;
}
td {
    border-bottom: 1px solid #ddd; 
    font-size: 10px;
    padding-left: 5px;
}
</style>
<table width="50%" cellspacing="0" cellpadding="3" border="0">
<tr>
        <th></th>
        <th>Ore</th>
        <th>Costo</th>
        <th>Totale</th>
        
</tr>';
      
      
$tbl_footer2 = '</table>';


$pdf->writeHTML($tbl_header2 . $tbl2 . $tbl_footer2, true, false, false, false, '');


// ---------------------------------------------------------
// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->Output('report.pdf', 'I');
//============================================================+
// END OF FILE
//============================================================+
?>
