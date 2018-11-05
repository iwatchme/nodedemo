const express = require('express');
const {
    Movie,
    validate
} = require('../models/movies')
const {
    Genere
} = require('../models/generes')
const router = express.Router();



router.get("/", async (req, res) => {
    const result = await Movie.find().sort('title');
    res.send(result);
});


router.post("/", async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genere = await Genere.findById(req.body.genereId);
    if (!genere) res.status(400).send("invalid genere");



    const movie = new Movie({
        title: req.body.title,
        genere: {
            id: genere._id,
            name: genere.name
        },
        isVip: req.body.numberInStock,
        phone: req.body.dailyRentalRate
    });
    
    const result = await movie.save();
    res.status(200).send(result);

});


router.put("/:id", async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }


    const result = await Movie.findByIdAndUpdate({
        _id: req.params.id
    }, {
        name: req.body.name,
        isVip: req.body.isVip,
        phone: req.body.phone
    }, {
        new: true
    });

    if (!result) return res.status(404).send("The movie with the given ID is not found");

    return res.status(200).send(result);

});

router.delete("/:id", async (req, res) => {
    const result = await Movie.findByIdAndDelete(req.params.id);

    if (!result) return res.status(404).send("The movie with the given ID is not found");

    res.status(200).send(result);

});

router.get("/:id", async (req, res) => {

    const result = await Movie.findById(req.params.id);

    if (!result) return res.status(404).send("The movie with the given ID is not found");

    res.status(200).send(result);


});


module.exports = router;