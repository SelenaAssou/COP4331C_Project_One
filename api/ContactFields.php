<?php

/**
 * Class ContactFields Holds the enumerations of the strings for the database fields.
 * Meant to be used for common checking and usage.
 */
class ContactFields extends SplEnum
{
    const UNKNOWN = "unknown";
    const __default = self::UNKNOWN;

    const ID = "id";
    const FIRST_NAME = "firstName";
    const LAST_NAME = "lastName";
    const EMAIL = "email";
    const PHONE = "phoneNumber";
    const CONTACT_TYPE = "contactType";
    const CITY = "city";
    const STATE = "state";
    const ZIP = "zip";
    const OWNER_ID = "ownerID";

}