/**
 * Author: Sanjay Kumar
 * Date : 12/06/2020
 * Purpose: contains functions to manage movies CRUD operations
 */
'use-strict';
 
import { MovieModel } from '../models';
import { createError, createResponse } from '../utilities/common';

/**
 * Add a movie record
 */
const addMovie = async (req, res) => {    
    try{
        const {name, year, director} = req.body;
        const movie = new MovieModel({name, year, director, name_canonical : name.toLowerCase()});
        let output = await movie.save();
        createResponse(res, output);
    }catch(error){     
        createError(res, error);
    }
}

/**
 * Add a movie record
 */
const addMovies = async (req, res) => {    
    try{
        const {movies} = req.body;
        let results = await MovieModel.insertMany(movies);
        createResponse(res, results);
    }catch(error){      
        createError(res, error);
    }
}

/**
 * List all movie record
 * Also list the movies filtered by the data passed in query string
 */
const listMovies = async (req, res) => {    
    try{
        let page_limit = +process.env.RECORDS_PER_PAGE;

        let {query=null} = req.query;   
        let params = !!query? {$text:{$search: query}} : {}
        let movies = await MovieModel.find(params).limit(page_limit).exec();
        createResponse(res, movies);
    } catch(error){
        createError(res, error);
    }
}


export default {
    addMovie, addMovies, listMovies
}