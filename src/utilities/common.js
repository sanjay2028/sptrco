/**
 * Author: Sanjay Kumar
 * Date : 12/06/2020
 * Purpose: Contains all the common functions
 */

"use-strict";

import dbConnet from "./db";
import {
  UNCAUGHT_EXCEPTION_TEXT,
  UNCAUGHT_EXCEPTION_CODE,
  VALIDATION_FAILED_CODE,
  VALIDATION_FAILED_STATUS,
  UNCAUGHT_EXCEPTION_STATUS,
} from "./constants";

const initApp = async (app) => {
  const port = process.env.PORT;
  return await new Promise(async (resolve, reject) => {
    try {
      let dbStatus = await dbConnet();
      await app.listen(port);
      console.log(`${dbStatus}`);
      console.log(`App listening at Port No. ${port}`);
      return resolve();
    } catch (error) {
      console.log("Error", error);
    }
  });
};

const createResponse = (res, body) => {
  res.status(200).send({
    statusCode: 200, 
    body: body
  });
  
}

const createError = (res, error) => {
  let body = {
    error_type: UNCAUGHT_EXCEPTION_CODE,
    errors: [
      {
        uncaught_exception: UNCAUGHT_EXCEPTION_TEXT,
      },
    ],
  };

  let statusCode = UNCAUGHT_EXCEPTION_STATUS;
  
  if (error.hasOwnProperty("details")) {
    let errorCollection = {};    
    error.details.map(({message, path}) => {
      let [fieldName, fieldIndex="0", nestedField=null] = path;
      fieldIndex = fieldIndex.toString();
      if(!!nestedField){
        fieldIndex = `${path.join(".")}`;
        errorCollection[fieldIndex] = {[nestedField]: message}        
      } else {        
        errorCollection[fieldName] = message;        
      }      
    });    

    body = {
        error_type: VALIDATION_FAILED_CODE,
        errors: errorCollection
    };
    statusCode = VALIDATION_FAILED_STATUS;
  } 
  res.status(statusCode).send({
      statusCode, 
      body: body
    });
};

export { initApp, createError, createResponse };
