const mongoose = require("mongoose")
const {
    logger
} = require('../utils/logger');
const config = require('config');

module.exports = function () {
    const db = config.get('db');
    console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));
    console.log(db);
    logger.info(db)
    mongoose.connect(db, {
            useNewUrlParser: true
        })
        .then(() => logger.info(`succesfully connect ${db}`))
}