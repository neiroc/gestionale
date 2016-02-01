<?php
require "db_aux.php";
require "utility.php";

//Connetti al DB
//$mysqli = connect_db();


$con=mysql_connect("localhost","root","pass");

// Check connection
if (mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  $con = False;
}
            
mysql_select_db('gest');
      
      
if($_POST['request']=="offerta") {


// Insert all the values of $_POST into the database table `of_offerte`, except
// for $_POST['request'].  Remember, field names are determined by array keys!
$result = mysql_insert_array("of_offerte", $_POST, "request");

}
else if($_POST['request']=="anagrafe") {
$result = mysql_insert_array("an_anagrafiche", $_POST, "request");
}
else{
 
$result = mysql_insert_array("co_commesse", $_POST, "request");

}

// Results
if( $result['mysql_error'] ) {
    echo "Query Failed: " . $result['mysql_error'];
} else {
    echo "Elemento Aggiunto !";
}
// Close database!

?>