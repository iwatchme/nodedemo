const mongoose = require("mongoose");
const Joi = require("joi")
const jwt = require('jsonwebtoken');
const config = require('config');


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },

    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true

    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        unique: true

    }
});


schema.methods.generateAuthToke = function () {
    const token = jwt.sign({
        _id: this._id
    }, config.get("jwtPrivateKey"));

    return token;

}


const validate = (genere) => {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(genere, schema);
}





const User = mongoose.model("User", schema)



module.exports.User = User;
module.exports.validate = validate;