const express = require('express');
const {
    Genere,
    validate
} = require('../models/generes')
const router = express.Router();
const auth = require('../middleware/auth');
const validObjectId = require('../middleware/validObjectId')



router.get("/", async (req, res) => {
    const result = await Genere.find().sort('name');
    res.send(result);
});


router.post("/", auth, async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genere = new Genere({
        name: req.body.name
    });
    try {
        const result = await genere.save();
        res.status(200).send(result);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.put("/:id", validObjectId, async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }


    const result = await Genere.findOneAndUpdate({
        _id: req.params.id
    }, {
        name: req.body.name
    }, {
        new: true
    });

    if (!result) return res.status(404).send("The genere with the given ID is not found");

    res.status(200).send(result);
});

router.delete("/:id", validObjectId, async (req, res) => {
    const result = await Genere.findOneAndDelete({
        "_id": req.params.id
    });

    if (!result) return res.status(404).send("The genere with the given ID is not found");

    res.status(200).send(result);

});

router.get("/:id", validObjectId,async (req, res) => {

    const result = await Genere.findById(req.params.id);

    if (!result) return res.status(404).send("The genere with the given ID is not found");

    res.status(200).send(result);


});




module.exports = router;