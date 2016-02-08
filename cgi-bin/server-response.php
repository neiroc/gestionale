<?php
    /*
     * Script:    DataTables server-side script for PHP and MySQL
     * Copyright: 2010 - Allan Jardine, 2012 - Chris Wright
     * License:   GPL v2 or BSD (3-point)
     */
     
     /* See http://www.discussdesk.com/bootstrap-datatable-with-php-mysql-server-side-script.htm */
     
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Easy set variables
     */
     
    /* Array of database columns which should be read and sent back to DataTables. Use a space where
     * you want to insert a non-database field (for example a counter or static )
     */


   


	if($_GET['req'] == "offerta"){
	$aColumns = array($_GET['var1'],$_GET['var2'],$_GET['var3'],$_GET['var4'],$_GET['var5'],$_GET['var6'],$_GET['var8'], 
                     $_GET['var9'],$_GET['var10'],$_GET['var11'],$_GET['var12'],$_GET['var13'],$_GET['var14'],$_GET['var15'],$_GET['var17'],$_GET['var18'],$_GET['var19']);
	}
	if($_GET['req'] == "anagrafica") {
   $aColumns = array($_GET['var1'],$_GET['var2'],$_GET['var3'],$_GET['var4'],$_GET['var5'],$_GET['var6'],$_GET['var7'],$_GET['var8'], 
                     $_GET['var9'],$_GET['var10'],$_GET['var11'],$_GET['var12'],$_GET['var13'],$_GET['var14']);
	}
	 
   if($_GET['req'] == "commesse"){ 	
   $aColumns = array($_GET['var1'],$_GET['var2'],$_GET['var3'],$_GET['var4'],$_GET['var5'],$_GET['var6'],$_GET['var7'],$_GET['var8'], 
                     $_GET['var9'],$_GET['var10'],$_GET['var11'],$_GET['var12'],$_GET['var13'],$_GET['var14'],$_GET['var15'],$_GET['var16'],$_GET['var17'],$_GET['var18'],$_GET['var19']);
		}
     
    /* Indexed column (used for fast and accurate table cardinality) */
    $sIndexColumn = $_GET['var1'];
     
    /* DB table to use */
    $sTable = $_GET['table'];
     
    /* Database connection information */
    $gaSql['user']       = "root";
    $gaSql['password']   = "pass";
    $gaSql['db']         = "gest";
    $gaSql['server']     = "localhost";
     
     
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * If you just want to use the basic configuration for DataTables with PHP server-side, there is
     * no need to edit below this line
     */
     
    /*
     * Local functions
     */
    function fatal_error ( $sErrorMessage = '' )
    {
        header( $_SERVER['SERVER_PROTOCOL'] .' 500 Internal Server Error' );
        die( $sErrorMessage );
    }
 
     
    /*
     * MySQL connection
     */
    if ( ! $gaSql['link'] = mysql_pconnect( $gaSql['server'], $gaSql['user'], $gaSql['password']  ) )
    {
        fatal_error( 'Could not open connection to server' );
    }
 
    if ( ! mysql_select_db( $gaSql['db'], $gaSql['link'] ) )
    {
        fatal_error( 'Could not select database ' );
    }
     
     
    /*
     * Paging
     */
    $sLimit = "";
    if ( isset( $_GET['iDisplayStart'] ) && $_GET['iDisplayLength'] != '-1' )
    {
        $sLimit = "LIMIT ".intval( $_GET['iDisplayStart'] ).", ".
            intval( $_GET['iDisplayLength'] );
    }
     
     
    /*
     * Ordering
     */
    $sOrder = "";
    if ( isset( $_GET['iSortCol_0'] ) )
    {
        $sOrder = "ORDER BY  ";
        for ( $i=0 ; $i<intval( $_GET['iSortingCols'] ) ; $i++ )
        {
            if ( $_GET[ 'bSortable_'.intval($_GET['iSortCol_'.$i]) ] == "true" )
            {
                $sOrder .= $aColumns[ intval( $_GET['iSortCol_'.$i] ) ]."
                    ".($_GET['sSortDir_'.$i]==='asc' ? 'asc' : 'desc') .", ";
            }
        }
         
        $sOrder = substr_replace( $sOrder, "", -2 );
        if ( $sOrder == "ORDER BY" )
        {
            $sOrder = "";
        }
    }
     
     
    /*
     * Filtering
     * NOTE this does not match the built-in DataTables filtering which does it
     * word by word on any field. It's possible to do here, but concerned about efficiency
     * on very large tables, and MySQL's regex functionality is very limited
     */
    $sWhere = "";
    if ( isset($_GET['sSearch']) && $_GET['sSearch'] != "" )
    {
        $sWhere = "WHERE (";
        for ( $i=0 ; $i<count($aColumns) ; $i++ )
        {
            if ( isset($_GET['bSearchable_'.$i]) && $_GET['bSearchable_'.$i] == "true" )
            {
                $sWhere .= $aColumns[$i]." LIKE '%".mysql_real_escape_string( $_GET['sSearch'] )."%' OR ";
            }
        }
        $sWhere = substr_replace( $sWhere, "", -3 );
        $sWhere .= ')';
    }
     
    /* Individual column filtering */
    for ( $i=0 ; $i<count($aColumns) ; $i++ )
    {
        if ( isset($_GET['bSearchable_'.$i]) && $_GET['bSearchable_'.$i] == "true" && $_GET['sSearch_'.$i] != '' )
        {
            if ( $sWhere == "" )
            {
                $sWhere = "WHERE ";
            }
            else
            {
                $sWhere .= " AND ";
            }
            $sWhere .= $aColumns[$i]." LIKE '%".mysql_real_escape_string($_GET['sSearch_'.$i])."%' ";
        }
    }
     
     
    /*
     * SQL queries
     * Get data to display
     */
    $sQuery = "
        SELECT SQL_CALC_FOUND_ROWS ".str_replace(" , ", " ", implode(", ", $aColumns))."
        FROM   $sTable
        $sWhere
        $sOrder
        $sLimit
    ";
    $rResult = mysql_query( $sQuery, $gaSql['link'] ) or fatal_error( 'MySQL Error: ' . mysql_errno() );
    
     
    /* Data set length after filtering */
    $sQuery = "
        SELECT FOUND_ROWS()
    ";
    $rResultFilterTotal = mysql_query( $sQuery, $gaSql['link'] ) or fatal_error( 'MySQL Error: ' . mysql_errno() );
    $aResultFilterTotal = mysql_fetch_array($rResultFilterTotal);
    $iFilteredTotal = $aResultFilterTotal[0];
     
    /* Total data set length */
    $sQuery = "
        SELECT COUNT(".$sIndexColumn.")
        FROM   $sTable
    ";
    $rResultTotal = mysql_query( $sQuery, $gaSql['link'] ) or fatal_error( 'MySQL Error: ' . mysql_errno() );
    $aResultTotal = mysql_fetch_array($rResultTotal);
    $iTotal = $aResultTotal[0];
     
     
    /*
     * Output
     */
    
    /*
	$output = array(
        "sEcho" => intval($_GET['sEcho']),
        "iTotalRecords" => $iTotal,
        "iTotalDisplayRecords" => $iFilteredTotal,
        "aaData" => array()
    );*/
    

	 /* Restituisci output */
     
    while ( $aRow = mysql_fetch_array( $rResult ) )
    {          
    $output['data'][] = $aRow;
    }
     echo json_encode( $output );
    
?>