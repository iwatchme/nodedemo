const mongoose = require("mongoose");
const Joi = require("joi")


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50

    },
    isVip: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50

    }
});


const validate = (customer) => {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        phone:Joi.string().min(3).max(50).required(),
        isVip:Joi.boolean()
    };
    return Joi.validate(customer, schema);
}


const Customer = mongoose.model("Customer", schema)


module.exports.Customer = Customer;
module.exports.validate = validate;