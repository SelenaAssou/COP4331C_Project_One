<?php

require "supportFunctions.php";
require "User.php";
require "dbInfo.cfg.php";

//foo

// get and sanitize xhr data
$xhrRequest = getXhrRequestInfo();

if (is_null($xhrRequest)){
    returnError(null);
} else {

    // get and prepare fields for SQL query
    $requestUsername = $xhrRequest[UserFields::USERNAME];
    $requestPassword = $xhrRequest[UserFields::PASSWORD];
    $hashedPassword = hash('sha512', $requestPassword);
}
