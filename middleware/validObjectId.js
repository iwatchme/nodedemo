const mongoose = require("mongoose");


module.exports = function (req, res, next) {
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValid) {
        return res.status(404).send("request has invalid id");
    };
    next();
}