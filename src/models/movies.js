/**
 * Author: Sanjay Kumar (Sanjay2028@gmail.com)
 * Date: 12/06/2020
 * Purpose: File for creating Movies model
 */
'use-strict'

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const requiredString = {type: String, required: true,trim: true}

const MovieSchema = new Schema({
    name: { ...requiredString, unique: true },
    name_canonical : { ...requiredString, unique: true},
    year: { ...requiredString, type: Number },
    director: { ...requiredString },
});

/**
 * create index
 */
MovieSchema.index({"name":"text", "director":"text","year":"text"})

/**
 * Remove __id,__v, name_canonical while generating JSON output
 */
MovieSchema.methods.toJSON = function() {
    const movie = this.toObject();
    delete movie._id;
    delete movie.__v;
    delete movie.name_canonical;
    return movie;
}

const Movie = mongoose.model('Movie', MovieSchema);



export default Movie;