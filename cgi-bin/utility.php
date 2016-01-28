  <?php
    
    /*Insert array in SQL query http://www.abeautifulsite.net/inserting-an-array-into-a-mysql-database-table/*/
    function mysql_insert_array($table, $data, $exclude = array()) {
        $fields = $values = array();
        if( !is_array($exclude) ) $exclude = array($exclude);
        foreach( array_keys($data) as $key ) {
            if( !in_array($key, $exclude) ) {
                $fields[] = "`$key`";
                $values[] = "'" . mysql_real_escape_string($data[$key]) . "'";
            }
        }
        $fields = implode(",", $fields);
        $values = implode(",", $values);
        if( mysql_query("INSERT INTO `$table` ($fields) VALUES ($values)") ) {
            return array( "mysql_error" => false,
                          "mysql_insert_id" => mysql_insert_id(),
                          "mysql_affected_rows" => mysql_affected_rows(),
                          "mysql_info" => mysql_info()
                        );
        } else {
            return array( "mysql_error" => mysql_error() );
        }
    }
    
    
    function mysqli_insert_array($table, $data, $exclude = array()) {
     $con=mysqli_connect("localhost", "root","","test");
     $fields = $values = array();
     if( !is_array($exclude) ) $exclude = array($exclude);
     foreach( array_keys($data) as $key ) {
        if( !in_array($key, $exclude) ) {
            $fields[] = "`$key`";
            $values[] = "'" . mysql_real_escape_string($data[$key]) . "'";
        }
    }
    $fields = implode(",", $fields);
    $values = implode(",", $values);
    if( mysqli_query($con,"INSERT INTO `$table` ($fields) VALUES ($values)") ) {
        return array( "mysql_error" => false,
                      "mysql_insert_id" => mysqli_insert_id($con),
                      "mysql_affected_rows" => mysqli_affected_rows($con),
                      "mysql_info" => mysqli_info($con)
                    );
    } else {
        return array( "mysql_error" => mysqli_error($con) );
    }
}

?>