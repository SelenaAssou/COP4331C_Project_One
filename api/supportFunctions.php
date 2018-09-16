<?php
/**
 * @return mixed assoc array of json info. NULL if there was an error in retrieving/decoding.
 */
function getXhrRequestInfo(){
    $php = file_get_contents('php://input');

    if (!$php){
        error_log("failed to get file contents in xhr request.", 0);
        return NULL;
    }

    $json = json_decode($php, true);
    if ($json == NULL){
        error_log("Couldn't decode Json: $php");
        return NULL;
    } else
        return $json;

}

/**
 * @param $obj array - data to be returned after being converted to json.
 * For best results, should be an <b>assoc array</b>.
 */
function returnXhrRequestAsJson($obj){
    $jsonObj = json_encode($obj,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES|JSON_NUMERIC_CHECK);
    header('Content-type: application/json');
    echo $jsonObj;
}

/**
 * Checks to make sure that not of the variables passed in are Boolean types. <br/>
 * This is useful for checking if a variable failed a sanitation filter from functions such as filter_var. </br>
 * Index of the failed argument is passed to the server error log.
 * @param mixed ...$types one or more variables of any type to be checked.
 * @return bool - true if one of the types passed in was a boolean. false otherwise.
 */
function didFailFilter(...$types){
    foreach ($types as $index=>$type){
        if (is_bool($type)) {
            error_log("failed filter. index of failure: " . $index);
            return true;
        }
    }
    return false;
}
?>