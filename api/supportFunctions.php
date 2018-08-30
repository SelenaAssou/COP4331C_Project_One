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
    $jsonObj = json_encode($obj, JSON_FORCE_OBJECT);
    header('Content-type: application/json');
    echo $jsonObj;
}
?>