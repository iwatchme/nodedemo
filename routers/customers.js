const express = require('express');
const {
    Customer,
    validate
} = require('../models/customers')
const router = express.Router();



router.get("/", async (req, res) => {
    const result = await Customer.find().sort('name');
    res.send(result);
});


router.post("/", async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const customer = new Customer({
        name: req.body.name,
        isVip: req.body.isVip,
        phone: req.body.phone
    });
    try {
        const result = await customer.save();
        res.status(200).send(result);
    } catch (e) {
        res.status(400).send(e.errors[field].message);

    }
});


router.put("/:id", async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }


    const result = await Customer.findByIdAndUpdate({
        _id: req.params.id
    }, {
        name: req.body.name,
        isVip: req.body.isVip,
        phone: req.body.phone
    }, {
        new: true
    });

    if (!result) return res.status(404).send("The customer with the given ID is not found");

    return res.status(200).send(result);

});

router.delete("/:id", async (req, res) => {
    const result = await Customer.findByIdAndDelete(req.params.id);

    if (!result) return res.status(404).send("The customer with the given ID is not found");

    res.status(200).send(result);

});

router.get("/:id", async (req, res) => {

    const result = await Customer.findById(req.params.id);

    if (!result) return res.status(404).send("The customer with the given ID is not found");

    res.status(200).send(result);


});


module.exports = router;