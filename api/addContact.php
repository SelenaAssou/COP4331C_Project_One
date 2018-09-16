<?php

    require 'Contact.php';
    require 'supportFunctions.php';
    require 'dbInfo.cfg.php';

    // Get and sanitize xhr data
    $xhrRequest = getXhrRequestInfo();

    // Validation
    if (is_null($xhrRequest)) {
        returnError(null);
    } 
    else {

        // Get and prepare fields for SQL Query
        $xFirstName = filter_var($xhrRequest[ContactFields::FIRST_NAME], FILTER_SANITIZE_STRING);
        $xLastName = filter_var($xhrRequest[ContactFields::LAST_NAME], FILTER_SANITIZE_STRING);
        $xEmail = filter_var($xhrRequest[ContactFields::EMAIL], FILTER_SANITIZE_EMAIL);
        $xPhone = filter_var($xhrRequest[ContactFields::PHONE], FILTER_SANITIZE_STRING);
        $xContactType = filter_var($xhrRequest[ContactFields::CONTACT_TYPE], FILTER_SANITIZE_STRING);
        $xCity = filter_var($xhrRequest[ContactFields::CITY], FILTER_SANITIZE_STRING);
        $xState = filter_var($xhrRequest[ContactFields::STATE], FILTER_SANITIZE_STRING);
        $xZip = filter_var($xhrRequest[ContactFields::ZIP], FILTER_SANITIZE_NUMBER_INT);
        $xOwnerID = filter_var($xhrRequest[ContactFields::OWNER_ID], FILTER_SANITIZE_NUMBER_INT);

        //check filters
        if (didFailFilter($xFirstName, $xLastName, $xEmail, $xPhone, $xContactType, $xCity, $xState, $xZip, $xOwnerID)){
            error_log("User Fields didnt pass sanitation");
            returnError(null);
        }

        // Connect to database
        $sqlConnection = new mysqli('localhost', dbinfo::$dbUser, dbinfo::$dbPass, dbinfo::$db);
        if ($sqlConnection->connect_error) {
            error_log($sqlConnection->connect_error);
            returnError(null);
        }

        //log any error that occurs
        mysqli_report(MYSQLI_REPORT_ERROR|MYSQLI_REPORT_STRICT);

        // Connection established. Begin query and try to store data

        try {
            $sqlQuery = "INSERT INTO `contacts` (`id`, `firstName`, `lastName`, `email`, `phoneNumber`, 
                        `contactType`, `city`, `state`, `zip`, `ownerID`) VALUES 
                        (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
            $sqlStmt = $sqlConnection->prepare($sqlQuery);
            
            // Bind Parameters
            $sqlStmt->bind_param("sssssssii", $xFirstName, $xLastName, $xEmail, $xPhone, $xContactType,
                                $xCity, $xState, $xZip, $xOwnerID);
            
            // Execute SQL Statement
            $success = $sqlStmt->execute();

            if ($success) {
                $returnArr = array("success" => 1);
            }
            else {
                $returnArr = array("success" => -1);
            } 

            returnXhrRequestAsJson($returnArr);
        }
        catch (Exception $exception) {
            error_log("Exception occured during Request handling: " . $exception->getMessage());
            returnError(null);
        }
    }

    function returnError($errorCode) {
        returnXhrRequestAsJson(array("error occured"));
        exit();
    }
?>
