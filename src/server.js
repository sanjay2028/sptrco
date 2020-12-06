/**
 * Author: Sanjay Kumar
 * Date : 12/06/2020
 * Purpose: Default entry file for backend.
 */
'use-strict';

require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import CORS from 'cors';
import { initApp } from './utilities';
import {moviesRouter} from './routes';

const app = express();

/**
 * Application configuration
 */
app.use(CORS());
app.use(bodyParser.urlencoded({extended:true}))

/**
 * Regiser routes with app
 */
app.use('/api', moviesRouter)

/**
 * Functio to initiate app. 
 */
const startServer = async () => {
    try{
        await initApp(app);            
    } catch(error){
        console.log("Error", error)
    }
}


/**
 * Start the app here
 */
startServer();