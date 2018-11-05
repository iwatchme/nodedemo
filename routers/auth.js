const express = require('express');
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const {
    User
} = require('../models/user');
const bcrypt = require('bcrypt');



router.post("/", async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(400).send("invalid email or password");
    };


    const passwordValidate = await bcrypt.compare(req.body.password, user.password);

    if (!passwordValidate) {
        return res.status(400).send("invalid email or password");
    }
    const token = user.generateAuthToke();
    res.send(token);

});


const validate = (req) => {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req, schema);
}


module.exports = router