<?php

    require 'Contact.php';
    require 'supportFunctions.php';
    require 'dbInfo.cfg.php';

    // Get and sanitize xhr data
    $xhrRequest = getXhrRequestInfo();

    if (is_null($xhrRequest)) {
        returnError(null);
    }
    else {
        // Get and prepare fields for SQL query
        $xID = $xhrRequest[ContactFields::ID];
        $xOwnerID = $xhrRequest[ContactFields::OWNER_ID];

        // Connect to database to search
        $sqlConnection = new mysqli('localhost', dbinfo::$dbuser, dbinfo::$dbpass, dbinfo::$db);
        if ($sqlConnection->connect_error) {
            error_log($sqlConnection->connect_error);
            returnError(null);
        }

        // log any error that occurs
        mysqli_report(MYSQLI_REPORT_ERROR|MYSQLI_REPORT_STRICT);
        
        // Connection established. Begin query to delete data.
        try {
            $sqlQuery = "DELETE FROM `contacts` WHERE `id` = ? AND `ownerID` = ?;";
            $sqlStmt = $sqlConnection->prepare($sqlQuery);

            $sqlStmt->bind_param("ii", $xID, $xOwnerID);

            // Execute SQL Statement
            $success = $sqlStmt->execute();

            if ($success) {
                $returnArr = array("success" => 1);
            } else {
                $returnArr = array("success" => -1);
            } 

            returnXhrRequestAsJson($returnArr);
        }
        catch {
            error_log("Exception occured during Request handling: " . $exception->getMessage());
            returnError(null);
        }
    }

    function returnError($errorCode) {
        returnXhrRequestAsJson(array("error occured"));
        exit();
    }
?>
