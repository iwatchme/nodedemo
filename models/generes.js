const mongoose = require("mongoose");
const Joi = require("joi")


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50

    },
});


const validate = (genere) => {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        // id: mongoose.Types.ObjectId.isValid(genere.id)
    };
    return Joi.validate(genere, schema);
}


const Genere = mongoose.model("Genere", schema)


module.exports.Genere = Genere;
module.exports.validate = validate;
module.exports.genereSchema = schema;