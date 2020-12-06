/**
 * Author: Sanjay Kumar (Sanjay2028@gmail.com)
 * Date : 12/06/2020
 * Purpose: Contains validators for incoming data 
 */

import { newMovieSchema, batchMovieSchema } from './validationSchemas';
import { createError } from '../utilities';
import { MovieModel } from '../models';

 const newMovieValidator = async (req, res, next) => {
    try{
        const  {name=null,year=null,director=null} = req.body;
        await newMovieSchema.validateAsync({name,year,director}, { abortEarly: false }) 
        await validateMovieExists(name);
        console.log("Error generate")       
        next();
    } catch(error){ 
        createError(res, error);
    }
 }
 
 const batchMovieValidator = async (req, res, next) => {
    try{
        const  {movies} = req.body;
        await batchMovieSchema.validateAsync({movies}, { abortEarly: false })
        
        let errors = [];
        await Promise.all(
            movies.map( async ({name}, reqIndex) => {
                try{
                    let result = await validateMovieExists(name)
                } catch(error) {
    
                    if(error.hasOwnProperty("details")){
                        let {details} = error;
                        details.map((item, index) => {
                            let oldVal = details[index];
                            oldVal.path = ['movies', reqIndex.toString(), 'name'];
                            details[index] = oldVal;                                                        
                        });
                        console.log("Details are ", details);
                        errors = errors.concat(details);
                    }
                }
                
            })
        );     
        
        if(errors.length) throw {details: errors};
        req.body.movies = movies.map(item => {
            item["name_canonical"] = item.name.toLowerCase();
            return item;
        })
        next();
    } catch(error){ 
        createError(res, error);
    }
 }

 const validateMovieExists = async (name) => {
    return await new Promise(async (resolve, reject) => {
        try{
            let name_canonical = name.toLowerCase();
            let record = await MovieModel.find({name_canonical}).exec();
            return record.length? reject({
                "details" : [{
                    message: `Movie with name ${name} already exists`,
                    path: ['movie']
                }]
            }) : resolve();
        }catch(error){
            return reject(error.toString())
        }

    })
}

 export { newMovieValidator, batchMovieValidator }