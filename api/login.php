<?php

require "supportFunctions.php";
require "User.php";
require "dbInfo.cfg.php";

//headers to be used for SQL queries to specific row headers (needed in variable format for php parsing)
$usernameHeader = UserFields::USERNAME;
$passwordHeader = UserFields::PASSWORD;
$idHeader = UserFields::ID;

// get and sanitize xhr data
$xhrRequest = getXhrRequestInfo();

if (is_null($xhrRequest)){
    returnError(null);
} else {

    // get and prepare fields for SQL query
    $requestUsername = $xhrRequest[UserFields::USERNAME];
    $requestPassword = $xhrRequest[UserFields::PASSWORD];
    $hashedPassword = hash('sha512', $requestPassword);
    
    $sqlConnection = new mysqli('localhost', dbinfo::$dbUser, dbInfo::$dbPass, dbInfo::$db);
    if ($sqlConnection->connect_error){
        error_log($sqlConnection->connect_error);
        returnError(null);
    }

    // Log error if it occurs
    mysqli_report(MYSQLI_REPORT_ERROR|MYSQLI_REPORT_STRICT);

    // connection established, begin query and grab data
    try {
        /** @var mysqli_result $sqlResult */
        $sqlQuery = "SELECT $idHeader FROM `users` WHERE $usernameHeader LIKE ? and $passwordHeader LIKE ?";
        $sqlStmt = $sqlConnection->prepare($sqlQuery);
        $sqlStmt->bind_param('ss', $requestUsername, $hashedPassword);
        $sqlStmt->execute();
        $sqlResult = $sqlStmt->get_result();

        if (mysqli_num_rows($sqlResult) == 0) {
            $returnArr = array("login not found" -> -1);
        }
        
        $user = User::convertFromSQL($sqlResult);
        else {
            $returnArr = array($user->$id);
        }

        returnXhrRequestAsJson($returnArr);

    } catch (Exception $exception) {
        error_log("Exception occurred during Request handling:" . $exception->getMessage());
        returnError(null);
    }
}

function returnError($errorCode) {
    returnXhrRequestAsJson(array("error occurred"));
    exit();
}
