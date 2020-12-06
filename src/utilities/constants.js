/**
 * Author: Sanjay Kumar
 * Date : 12/06/2020
 * Purpose: To maintain all the constants used in the app.
 */

const VALIDATION_FAILED_CODE = 'validation_error';
const UNCAUGHT_EXCEPTION_CODE = 'uncaught_exception';
const VALIDATION_FAILED_STATUS = 422;
const UNCAUGHT_EXCEPTION_STATUS = 422;
const DB_CONNECTION_FAILED = "Failed to connect to Database";
const DB_CONNECTION_SUCCESS = "Successfully connecte to database."

const UNCAUGHT_EXCEPTION_TEXT = 'Request failed due to an exception error. Please contact administrator';

export {
    VALIDATION_FAILED_STATUS, 
    UNCAUGHT_EXCEPTION_STATUS, 
    VALIDATION_FAILED_CODE,
    UNCAUGHT_EXCEPTION_CODE,
    DB_CONNECTION_FAILED,
    DB_CONNECTION_SUCCESS,
    UNCAUGHT_EXCEPTION_TEXT
}