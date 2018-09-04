<?php

/**
 * Class UserFields Holds the enumerations of the strings for the database fields.
 * Meant to be used for common checking and usage.
 */

require "SplType.php";

class UserFields extends SplEnum
{
    const UNKNOWN = "unknown";
    const __default = self::UNKNOWN;

    const ID = "id";
    const USERNAME = "user";
    const PASSWORD = "pass";

}
