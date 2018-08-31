<?php

require "ContactFields.php";

class Contact
{

    /* Member Variables */
    //contact fields
    private $id = null, //int
            $firstName = null, //string
            $lastName = null, //string
            $email = null, //string
            $phoneNumber = null, //string
            $contactType = null, //string
            $city = null, //string
            $state = null, //string
            $zip = null, //int
            $ownerID = null; //int


    /**
     * Creates a contact object, all values can optionally be null.
     * @param $id int
     * @param $firstName string
     * @param $lastName string
     * @param $email string
     * @param $phoneNumber string
     * @param $type string
     * @param $city string
     * @param $state string
     * @param $zip int
     * @param $ownerID int
     */
    public function __construct($id, $firstName, $lastName, $email, $phoneNumber, $type, $city, $state, $zip, $ownerID)
    {
        $this->id = $id;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->email = $email;
        $this->phoneNumber = $phoneNumber;
        $this->contactType = $type;
        $this->city = $city;
        $this->state = $state;
        $this->zip = $zip;
        $this->ownerID = $ownerID;
    }


    /* Static functions */

    /**
     * Converts the results from an SQL query into a contact object, converting empty values from the query into nulls. </br>
     * <b> Note <b/> the query should contain as much of the full row from the DB table as possible to be a complete entry.
     * @param $queryResult mysqli_result - the result of an sql query from mysqli
     * @return array|null- An array of Contacts if one or more rows from the result are parsed.
     * Null if an error occurs during conversion.
     */
    public static function convertFromSQL($queryResult){
        $retArr = array();

        try {
            //loop over all rows in the result, make a contact for each one.
            while ($row = $queryResult->fetch_assoc()) {
                $retArr[] = new Contact(
                    $row[ContactFields::ID],
                    self::convertEmptyStringToNull($row[ContactFields::FIRST_NAME]),
                    self::convertEmptyStringToNull($row[ContactFields::LAST_NAME]),
                    self::convertEmptyStringToNull($row[ContactFields::EMAIL]),
                    self::convertEmptyStringToNull($row[ContactFields::PHONE]),
                    self::convertEmptyStringToNull($row[ContactFields::CONTACT_TYPE]),
                    self::convertEmptyStringToNull($row[ContactFields::CITY]),
                    self::convertEmptyStringToNull($row[ContactFields::STATE]),
                    $row[ContactFields::ZIP],
                    $row[ContactFields::OWNER_ID]
                );
            }
        } catch (Exception $ex){
            error_log("Error occurred during SQL contact parsing: " . $ex->getMessage());
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
     * with their names taken from the ContactFields Enums
     */
    public function isValid(){
        $retArr = array();

        if (!is_null($this->id))
            if (!is_int($this->id)) $retArr[] = ContactFields::ID;

        if (!is_null($this->firstName))
            if (!is_string($this->firstName)) $retArr[] = ContactFields::FIRST_NAME;

        if (!is_null($this->lastName))
            if (!is_string($this->lastName)) $retArr[] = ContactFields::LAST_NAME;

        if (!is_null($this->email))
            if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) $retArr[] = ContactFields::EMAIL;

        if (!is_null($this->phoneNumber))
            if (!ctype_alnum($this->phoneNumber)) $retArr[] = ContactFields::PHONE;

        if (!is_null($this->contactType))
            if (!is_string($this->contactType)) $retArr[] = ContactFields::CONTACT_TYPE;

        if (!is_null($this->city))
            if (!is_string($this->city)) $retArr[] = ContactFields::CITY;

        if (!is_null($this->state))
            if (!is_string($this->state)) $retArr[] = ContactFields::STATE;

        if (!is_null($this->zip))
            if (!is_int($this->zip)) $retArr[] = ContactFields::ZIP;

        if (!is_null($this->ownerID))
            if (!is_int($this->ownerID)) $retArr[] = ContactFields::OWNER_ID;

        if (empty($retArr))
            return true;
        else
            return $retArr;
    }

    /** Returns a JSON representation of the contact.
     *  @return string|null JSON formatted string of the contact. if the contact cant pass validation, returns null. <br/>
     * <b>null fields will not be included in the JSON. </b>
     */
    public function convertToJson(){
        if ($this->isValid())
            return json_encode(get_object_vars($this));
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
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @return string
     */
    public function getPhoneNumber()
    {
        return $this->phoneNumber;
    }

    /**
     * @return string
     */
    public function getContactType()
    {
        return $this->contactType;
    }

    /**
     * @return string
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * @return string
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * @return int
     */
    public function getZip()
    {
        return $this->zip;
    }

    /**
     * @return int
     */
    public function getOwnerID()
    {
        return $this->ownerID;
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
     * @param string $firstName
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;
    }

    /**
     * @param string $lastName
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;
    }

    /**
     * @param string $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @param string $phoneNumber
     */
    public function setPhoneNumber($phoneNumber)
    {
        $this->phoneNumber = $phoneNumber;
    }

    /**
     * @param string $contactType
     */
    public function setContactType($contactType)
    {
        $this->contactType = $contactType;
    }

    /**
     * @param string $city
     */
    public function setCity($city)
    {
        $this->city = $city;
    }

    /**
     * @param string $state
     */
    public function setState($state)
    {
        $this->state = $state;
    }

    /**
     * @param int $zip
     */
    public function setZip($zip)
    {
        $this->zip = $zip;
    }

    /**
     * @param int $ownerID
     */
    public function setOwnerID($ownerID)
    {
        $this->ownerID = $ownerID;
    }










}