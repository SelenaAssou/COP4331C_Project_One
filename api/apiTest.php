<?php

//Purpose of this test file is to be a testing API endpoint
//Will return all passed JSON values back to the requester after decoding and encoding

require 'supportFunctions.php';

$data = getXhrRequestInfo();

if ($data == NULL){
    returnXhrRequestAsJson(array("error" => "Failed to decode XHR Request"));
    die();
}

$counter = 0;
$returnData = array();
foreach ($data as $key => $value){
    $counter++;

    $returnData["$counter : $key"] = $value;
}

returnXhrRequestAsJson($returnData);
?>