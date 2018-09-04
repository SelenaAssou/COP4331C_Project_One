<?php

require "UserFields.php";

class User
{

    /* Member Variables */
    //user fields
    private $id = null, //int
            $username = null, //string
            $pass = null, //string


    /**
     * Creates a user object, all values can optionally be null.
     * @param $id int
     * @param $username string
     * @param $pass string
     */
    public function __construct($id, $username, $pass)
    {
        $this->id = $id;
        $this->username = $username;
        $this->pass = $pass;
    }


    /* Static functions */

    /**
     * Converts the results from an SQL query into a User object, converting empty values from the query into nulls. </br>
     * <b> Note <b/> the query should contain as much of the full row from the DB table as possible to be a complete entry.
     * @param $queryResult mysqli_result - the result of an sql query from mysqli
     * @return array|null- An array of Users if one or more rows from the result are parsed.
     * Null if an error occurs during conversion.
     */
    public static function convertFromSQL($queryResult){
        $retArr = array();

        try {
            //loop over all rows in the result, make a user for each one.
            while ($row = $queryResult->fetch_assoc()) {
                $retArr[] = new User(
                    $row[UserFields::ID],
                    self::convertEmptyStringToNull($row[UserFields::USERNAME]),
                    self::convertEmptyStringToNull($row[UserFields::PASSWORD]),
                );
            }
        } catch (Exception $ex){
            error_log("Error occurred during SQL user parsing: " . $ex->getMessage());
            return null;
        }

        return $retArr;
    }

    /**
     * Converts a empty string into a null object for backend handling
     * @param $string string - a string to be checked if empty
     * @return string|null - Returns a string if the string was not empty, null otherwise.
     */
    private static function convertEmptyStringToNull($string){
        if (empty($string))
            return null;
        else
            return $string;
    }



    /* Member Functions */

    /**
     * Checks whether all fields that have values, are acceptable for the database.
     * @return boolean|array - true if all fields are valid, otherwise returns a string array of invalid fields
     * with their names taken from the UserFields Enums
     */
    public function isValid(){
        $retArr = array();

        if (!is_null($this->id))
            if (!is_int($this->id)) $retArr[] = UserFields::ID;

        if (!is_null($this->username))
            if (!is_string($this->username)) $retArr[] = UserFields::USERNAME;

        if (!is_null($this->pass))
            if (!is_string($this->pass)) $retArr[] = UserFields::PASSWORD;

        if (empty($retArr))
            return true;
        else
            return $retArr;
    }

    /**
     * Returns an array representation of all the fields inside the user.
     * @return array|null All fields of the user in array format. If the user cannot pass validation, reutrns null.
     */
    public function convertToArray(){
        if ($this->isValid())
            return get_object_vars($this);
                else
            return null;
    }


    ///////////Getters///////////////

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }


    ///////////Setters///////////////


    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @param string $username
     */
    public function setUsername($username)
    {
        $this->username = $username;
    }

    /**
     * @param string $password
     */
    public function setLastName($password)
    {
        $this->password = $password;
    }

}
