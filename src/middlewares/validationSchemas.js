/**
 * Author: Sanjay Kumar (Sanjay2028@gmail.com)
 * Date : 12/06/2020
 * Purpose: Validation Schemas for post requests
 */

import Joi from 'joi';

const date = new Date();
const presentYear = date.getFullYear();
const movieObject = {
    name: Joi.string().min(2).max(100).required().label('Movie Name'),
    year: Joi.number().min(1900).max(presentYear).required().label('Release year'),
    director: Joi.string().min(1).max(100).required().label('Director name')
}

/**
 * Joi schema for single movie
 */
const newMovieSchema = Joi.object(movieObject)


/**
 * Joi schema for multiple movies
 */
const batchMovieSchema = Joi.object().keys({
    movies: Joi.array().items(movieObject)
})

export { newMovieSchema, batchMovieSchema }

