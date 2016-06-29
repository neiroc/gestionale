<?php
require "../cgi-bin/db_aux.php";
require_once('tcpdf/tcpdf.php');


// Extend the TCPDF class to create custom Header and Footer
class MYPDF extends TCPDF {

    //Page header
    public function Header() {
        // Logo
        $image_file = K_PATH_IMAGES.'logo.png';
        $this->Image($image_file, 15, 10, 40, '', 'PNG', '', 'T', false, 0, '', false, false, 0, false, false, false);
        // Set font
        $this->SetFont('helvetica', 'B', 18);
        // Title
        $this->Cell(85, 40, 'Report', 0, false, 'C', 0, '', 0, false, 'M', 'B');
        // Set font
        $this->SetFont('helvetica', 'B', 9);
        $summary = "Periodo : ".$_GET['data_i']." - ".$_GET['data_f']."\nTipo Attivita : ".$_GET['tipo_att']."\nSede : ".$_GET['sede'];
//		  $this->MultiCell(0,4,$summary,0,'L',0);
		  $this->MultiCell(75, 10, $summary, 0, 'L', 0, 1, '', '', true, 0, false, true, 20, 'B');
    }

    // Page footer
    public function Footer() {
        // Position at 15 mm from bottom
        $this->SetY(-15);
        // Set font
        $this->SetFont('helvetica', 'I', 8);
        $this->MultiCell(0, 5, "Via Angelelli 14/a - 40013 Castel Maggiore (BO) Tel.: +39 051 6325815", 0, 'C', 0, 0, '', '', true, 0, false, true, 0, 'M');
        // Page number
        $this->Cell(0, 5, 'Page '.$this->getAliasNumPage().'/'.$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
    }
}

// create new PDF document
$pdf = new MYPDF('P', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Contract by neiroc_');
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

// ---------------------------------------------------------

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
        <th>Ore Lavorate</th>
        
</tr>';
      
      
$tbl_footer = '</table>';
$tbl ='';

$con = connect_db();
  
//GET DATA FROM URL

$data_i = $_GET['data_i'];
$data_f = $_GET['data_f'];  

// SQL Query  
$result = mysqli_query($con,"SELECT data, operatore, (ore_std + ore_extra + ore_fest + ore_sabato) as total FROM co_ore  WHERE  data BETWEEN '$data_i' AND '$data_f'");
 
while($row = mysqli_fetch_array($result))
  {
  	
  $orderdate = explode('-', $row['data']);

  $data = $orderdate[2]."/".$orderdate[1]."/".$orderdate[0];
  $operatore = $row['operatore'];
  $total = $row['total'];

  if($i % 2 == 0){ 
  $color_row="aliceblue"; $i++;} 
  else {
  $color_row="white"; $i++;}

  $tbl .= '<tr style="background-color:'.$color_row.'"><td>'.$data.'</td><td>'.$operatore.'</td><td>'.$total.'</td></tr>';
}
// Print text using writeHTMLCell()
$pdf->writeHTML($tbl_header . $tbl . $tbl_footer, true, false, false, false, '');

// ---------------------------------------------------------
// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->Output('report.pdf', 'I');
//============================================================+
// END OF FILE
//============================================================+
?>
