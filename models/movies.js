const mongoose = require("mongoose");
const {
    genereSchema
} = require("./generes")
const Joi = require("joi")


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 25
    },

    genere: {
        type: genereSchema,
        required: true
    },

    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    },

    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
})

const validateMovie = (movie) => {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genereId: Joi.string().required(),
        numberInStock: Joi.string().min(0).required(),
        dailyRentalRate: Joi.string().min(0).required()
    }

    return Joi.validate(movie, schema);
}


const Movies = mongoose.model("Movie", movieSchema)

exports.movie= Movies;
exports.validate = validateMovie;