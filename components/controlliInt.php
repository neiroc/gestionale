<?php

require "../cgi-bin/db_aux.php";
require_once('jpgraph/jpgraph.php');
require_once('jpgraph/jpgraph_bar.php');
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

// set default font subsetting mode ?? cos'èè 
$pdf->setFontSubsetting(false);
// Set font
// dejavusans is a UTF-8 Unicode font, if you only need to
// print standard ASCII chars, you can use core fonts like
// helvetica or times to reduce file size.
$pdf->SetFont('helvetica', 'I', 7);

// Add a page
// This method has several options, check the source code documentation for more information.
$pdf->AddPage();


// Connect to DB ------------------------------------------

$con = connect_db();
  
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
									  WHERE id_commessa='$id' AND data BETWEEN '$data_i' AND '$data_f'");
									  
									  
 
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


//-----------------------------------------------| Render Graph |--------------------------------------------------//

$data1y=array();
$labels=array();
     
//Tipo difetto e quantita

$id = $_GET['id'];
$data_i = $_GET['data_i'];
$data_f = $_GET['data_f'];


$query = "SELECT * FROM xt_tipo_difetto WHERE id='$id'";
$result1 = mysqli_query($con,$query);

$query = "SELECT data, SUM(difetto1) as tot_difetto1, SUM(difetto2) as tot_difetto2, SUM(difetto3) as tot_difetto3,SUM(difetto4) as tot_difetto4, SUM(difetto5) as tot_difetto5, 
                 SUM(difetto6) as tot_difetto6, SUM(difetto7) as tot_difetto7, SUM(difetto8) as tot_difetto8, SUM(difetto9) as tot_difetto9,SUM(difetto10) as tot_difetto10 
                 FROM co_difetti WHERE id_commessa='$id' AND data BETWEEN '$data_i' AND '$data_f'";
                 
$result2 = mysqli_query($con,$query);

while($row1 = mysqli_fetch_array($result2, MYSQL_ASSOC)){			
				while ($row = mysqli_fetch_array($result1, MYSQL_ASSOC)) {

				
					  
			        if($row['difetto1'] != null){
			        $labels[] = $row['difetto1'];	 
			        $data1y[] = $row1['tot_difetto1'];
			        }
			        
                 if($row['difetto2'] != null){
			        $labels[] = $row['difetto2'];	 
			        $data1y[] = $row1['tot_difetto2'];
			        }
			        
			        if($row['difetto3'] != null){
			        $labels[] = $row['difetto3'];	 
			        $data1y[] = $row1['tot_difetto3'];
			        }
			        
			        			        
			        if($row['difetto4'] != null){
			        $labels[] = $row['difetto4'];	 
			        $data1y[] = $row1['tot_difetto4'];
			        }
			        
			        			        
			        if($row['difetto5'] != null){
			        $labels[] = $row['difetto5'];	 
			        $data1y[] = $row1['tot_difetto5'];
			        }	
			        		        
			        if($row['difetto6'] != null){
			        $labels[] = $row['difetto6'];	 
			        $data1y[] = $row1['tot_difetto6'];
			        }
			        			        
			        if($row['difetto7'] != null){
			        $labels[] = $row['difetto7'];	 
			        $data1y[] = $row1['tot_difetto7'];
			        }
			        			        
			        if($row['difetto8'] != null){
			        $labels[] = $row['difetto8'];	 
			        $data1y[] = $row1['tot_difetto8'];
			        }
			        			        

			     }
}
	  

	  


// Add a page
$pdf->AddPage();


// Create the graph. These two calls are always required
$graph = new Graph(900,500,'auto');
$graph->SetScale("textlin");

$theme_class=new UniversalTheme;
$graph->SetTheme($theme_class);

$graph->SetBox(false);

$graph->ygrid->SetFill(false);

$graph->img->SetMargin(130,0,0,175);
$graph->xaxis->SetTickLabels($labels);
$graph->xaxis->SetLabelAngle(50);

$graph->yaxis->HideLine(false);
$graph->yaxis->HideTicks(false,false);

// Create the bar plots
$b1plot = new BarPlot($data1y);
// ...and add it to the graph
$graph->Add($b1plot);

$graph->title->Set("Pareto difetti");

$graph->title->Align("center");

$contentType = 'image/png';
$gdImgHandler = $graph->Stroke(_IMG_HANDLER);

// @see http://stackoverflow.com/a/9084110/126431
ob_start();                        // start buffering
$graph->img->Stream();             // print data to buffer
$graphData = ob_get_contents();   // retrieve buffer contents
ob_end_clean();                    // stop buffer

// outputting this in a HTML tag would work like this:
// $graphBase64 = "data:$contentType;base64," . base64_encode($graphData);
// echo sprintf('<img src="%s" alt="Graph">', $graphBase64);

$pdf->Image('@'.$graphData);


// ---------------------------------------------------------
// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->Output('report.pdf', 'I');
//============================================================+
// END OF FILE
//============================================================+
?>
