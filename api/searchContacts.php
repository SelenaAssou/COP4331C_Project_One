<?php

require "supportFunctions.php";
require "Contact.php";
require  "dbInfo.cfg.php";

//headers to be used for SQL queries to specific row headers (needed in variable format for php parsing
$firstNameHeader = ContactFields::FIRST_NAME;
$lastNameHeader = ContactFields::LAST_NAME;
$ownerHeader = ContactFields::OWNER_ID;



//get and sanitize the xhr data
$xhrRequest = getXhrRequestInfo();

//
if (is_null($xhrRequest)){
    returnError(null);
} else {

    // get and sanitize fields
    $requestFirstName = filter_var($xhrRequest[ContactFields::FIRST_NAME],FILTER_SANITIZE_STRING);
    $requestLastName = filter_var($xhrRequest[ContactFields::LAST_NAME],FILTER_SANITIZE_STRING);
    $requestOwnerID = filter_var($xhrRequest[ContactFields::OWNER_ID],FILTER_SANITIZE_NUMBER_INT);

    // search database for contacts based on info provided

//    SELECT * FROM `contacts` WHERE `firstName` LIKE '%k%' AND `lastName` LIKE '%kill%' AND `ownerID` = 3
    $sqlQuery = "SELECT * FROM `contacts` where $firstNameHeader LIKE '%$requestFirstName%' AND $lastNameHeader LIKE '%$requestLastName%' AND $ownerHeader = $requestOwnerID";

    $sqlConnection  = new mysqli('localhost' ,dbinfo::$dbUser, dbInfo::$dbPass, dbInfo::$db);
    if ($sqlConnection->connect_error) {
        error_log( $sqlConnection->connect_error );
        returnError(null);
    }

    //connection established, begin query and grab the data

    /** @var mysqli_result $sqlResult */
    $sqlResult = $sqlConnection->query($sqlQuery);
    if (is_bool($sqlResult)){
        error_log("sql query failed : $sqlQuery");
        exit();
    }
    $contacts = Contact::convertFromSQL($sqlResult);
    $returnArr = array();
    /** @var Contact $contact */
    foreach ($contacts as $contact ){
//        error_log($contact->convertToArray());
        $returnArr[] = $contact->convertToArray();
    }

    returnXhrRequestAsJson($returnArr);
}


function returnError($errorCode){
    //todo return error? no difference between valid search with 0 and failed search
    returnXhrRequestAsJson(array("error occurred"));
    exit();
}










