/**
 * Author: Sanjay Kumar (Sanjay2028@gmail.com)
 * Date : 12/06/2020
 * Purpose: File contains the routes for movies end point
 */

import express from 'express';
import { moviesControllers } from '../controllers';
import { newMovieValidator, batchMovieValidator } from '../middlewares'


const router = express.Router();
const {addMovie, addMovies, listMovies} = moviesControllers;

/**
 * Add a new Movie 
 */

router.post('/movie', newMovieValidator, addMovie);

/**
 * Add multiple movies
 */
router.post('/movies', batchMovieValidator, addMovies);

/**
 * List all movies
 */
router.get('/movies', listMovies);

export default router