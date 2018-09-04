<?php

require "supportFunctions.php";
require "User.php";
require  "dbInfo.cfg.php";

//headers to be used for SQL queries to specific row headers (needed in variable format for php parsing
$usernameHeader = UserFields::USERNAME;
$passwordHeader = UserFields::PASSWORD;



//get and sanitize the xhr data
$xhrRequest = getXhrRequestInfo();

//
if (is_null($xhrRequest)){
    returnError(null);
} else {

    // get and prepare fields for SQL query
    $requestUsername = $xhrRequest[UserFields::USERNAME];
    $requestPassword = $xhrRequest[UserFields::PASSWORD];
    $hashedPassword = hash('sha512', $requestPassword);

    // search database for contacts based on info provided

    $sqlConnection  = new mysqli('localhost' ,dbinfo::$dbUser, dbInfo::$dbPass, dbInfo::$db);
    if ($sqlConnection->connect_error) {
        error_log( $sqlConnection->connect_error );
        returnError(null);
    }

    //log any error that occurs
    mysqli_report(MYSQLI_REPORT_ERROR);

    //connection established, begin query and grab the data
    try {
        /** @var mysqli_result $sqlResult */
        $sqlQuery = "INSERT INTO `users` (user, pass) VALUES (?, ?);";
        $sqlStmt = $sqlConnection->prepare($sqlQuery);
        $sqlStmt->bind_param('ss', $requestUsername, $hashedPassword);
        $success = $sqlStmt->execute();

        if ($success) {
            $returnArr = array("success" => 1);
        }
        // Duplicate username error
        elseif (strpos(mysqli_error($sqlConnection), "Duplicate entry") !== false){
            $returnArr = array("success" => 0);
        }
        else {
            $returnArr = array("success" => -1);
        }

        returnXhrRequestAsJson($returnArr);
    } catch (Exception $exception){
        error_log("Exception occurred during Request handling: " . $exception->getMessage());
        returnError(null);
    }
}


function returnError($errorCode){
    //todo return error? no difference between valid search with 0 and failed search
    returnXhrRequestAsJson(array("error occurred"));
    exit();
}
