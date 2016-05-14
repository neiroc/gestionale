<?php


/* Effettua la connessione al db*/

function connect_db(){


	$con=mysqli_connect("localhost","root","pass","gest");

    // Check connection
    if (mysqli_connect_errno()){
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
        $con = False;
      }
    
   
   return $con;

}


// Frees the memory associated with a result
//$results->free();

// close connection
//$mysqli->close();
?>
