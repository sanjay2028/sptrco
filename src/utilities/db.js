/**
 * Author: Sanjay Kumar (Sanjay2028@gmail.com)
 * Date: 12/06/2020
 * Purpose: Create a connetion with mongoose
 */
    
'use strict';
import mongoose from 'mongoose';
import {DB_CONNECTION_SUCCESS, DB_CONNECTION_FAILED} from './constants';


/**
 * Configuration as per Mongoose documentation
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

/**
 * Establish the connection with mongoose server
 */

 export default async() => {
    return await new Promise(async (resolve, reject) => {
        try{
            await mongoose.connect(process.env.MONGODBB_URL, {useNewUrlParser: true, useUnifiedTopology:true})
            return resolve(DB_CONNECTION_SUCCESS);
        } catch(error) {
            return reject(DB_CONNECTION_FAILED, error)
        }
    })
 }
