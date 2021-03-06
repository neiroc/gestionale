<?php

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
        $this->Cell(175, 40, 'Report', 0, false, 'C', 0, '', 0, false, 'M', 'B');
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
        $this->SetFont('helvetica', 'I', 7);
        $this->MultiCell(0, 5, "CONTRACT SRL \n Via Angelelli 14/a - 40013 Castel Maggiore (BO) - TEL. +39 347 0715855 FAX +39 178 2242369 \n R.E.A. BO-500411 - Cod. Fisc./P.IVA : 03207241203 - Cap. Soc. € 10.000,00 i.v. \n Email: contract-italia@pec.it Sito web: www.contract-italy.com", 0, 'C', 0, 0, '', '', true, 0, false, true, 0, 'M');
        // Page number
         $this->SetY(-10);
                 
        $this->Cell(0, 5, 'Page '.$this->getAliasNumPage().'/'.$this->getAliasNbPages(), 0, false, 'R', 0, '', 0, false, 'T', 'M');
    }
}

// create new PDF document
$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

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
$pdf->SetFont('dejavusans', '', 11, '', true);

// Add a page
// This method has several options, check the source code documentation for more information.
$pdf->AddPage();


// Connect to DB ------------------------------------------

$con=mysqli_connect("localhost","root","pass","gest");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
  
//GET DATA FROM URL
$id = $_GET['id'];
$data_i = $_GET['data_i'];
$data_f = $_GET['data_f'];

$result2 = mysqli_query($con, "SELECT difetto1, difetto2, difetto3, difetto4, difetto5, difetto6, difetto7, difetto8 FROM xt_tipo_difetto WHERE id='$id'");							  
$row2 = mysqli_fetch_array($result2);

///Comment: impostare width colonne su th

// Set some content to print
$tbl_header = '<style>
table {
    border-top: 1px solid grey;
    border-bottom: 1px solid grey; 
}

tr {
	 border: 1px solid grey;
   
}

th {
    background-color: #FFC000;
    color: #333333;
    font-family: trebuchet MS;
    font-size: 9px;
    text-align: left;
}
td {
    border-bottom: 1px solid #ddd; 
    font-size: 9px;
}
</style>

<table width="100%" cellspacing="0" cellpadding="4">
<tr>
        <th>Data</th>
        <th>Codice IN</th>
        <th>Codice OUT</th>
        <th>Controllati</th>
        <th>'.$row2['difetto1'].'</th>
        <th>'.$row2['difetto2'].'</th>
        <th>'.$row2['difetto3'].'</th>
        <th>'.$row2['difetto4'].'</th>
        <th>'.$row2['difetto5'].'</th>
        <th>'.$row2['difetto6'].'</th>
        <th>'.$row2['difetto7'].'</th>
        <th>'.$row2['difetto8'].'</th>
        <th>Conformi</th>
        <th>Non Conformi</th>
        <th>Rilavorati</th>
</tr>';
      
      
$tbl_footer = '</table>';
$tbl ='';

// SQL Query  
$result = mysqli_query($con,"SELECT data, seq_inizio, seq_fine, pezzi_controllati, difetto1, difetto2, difetto3, difetto4, difetto5, difetto6, difetto7, difetto8,   
									  pezzi_controllati - (difetto1 + difetto2 + difetto3 + difetto4 + difetto5 + difetto6 + difetto7 + difetto8)  AS ok,
									  difetto1 + difetto2 + difetto3 + difetto4 + difetto5 + difetto6 + difetto7 + difetto8 AS ko, rilavorati FROM co_difetti 
									  WHERE id='$id' AND data BETWEEN '$data_i' AND '$data_f'");
									  
									  
 
while($row = mysqli_fetch_array($result))
  {
  	
  $orderdate = explode('-', $row['data']);
  $data = $orderdate[2]."/".$orderdate[1]."/".$orderdate[0];
  $cod_in = $row['seq_inizio'];
  $cod_out = $row['seq_fine'];
  $controllati = $row['pezzi_controllati'];
  $difetto1 = $row['difetto1'];
  $difetto2 = $row['difetto2'];
  $difetto3 = $row['difetto3'];
  $difetto4 = $row['difetto4'];
  $difetto5 = $row['difetto5'];
  $difetto6 = $row['difetto6'];
  $difetto7 = $row['difetto7'];
  $difetto8 = $row['difetto8'];
  $ok = $row['ok'];
  $ko = $row['ko'];
  $rilavorati = $row['rilavorati'];
  if($i % 2 == 0){ $color_row="aliceblue"; $i++;} else {$color_row="white"; $i++;}
  $tbl .= '<tr style="background-color:'.$color_row.'"><td>'.$data.'</td><td>'.$cod_in.'</td><td>'.$cod_out.'</td><td>'.$controllati.'</td><td>'.$difetto1.'</td><td>'.$difetto2.'</td><td>'.$difetto3.'</td><td>'.$difetto4.'</td><td>'.$difetto5.'</td><td>'.$difetto6.'</td><td>'.$difetto7.'</td><td>'.$difetto8.'</td><td>'.$ok.'</td><td>'.$ko.'</td><td>'.$rilavorati.'</td></tr>';
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
