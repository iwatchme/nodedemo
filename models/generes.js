const mongoose = require("mongoose");
const Joi = require("joi")


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50

    },
});


const validate = (genere) => {
    const schema = {
        name: Joi.string().min(3).max(50).required()
    };
    return Joi.validate(genere, schema);
}


const Genere = mongoose.model("Genere", schema)


module.exports.Genere = Genere;
module.exports.validate = validate;