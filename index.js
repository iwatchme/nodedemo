const Express = require("express");
require('express-async-errors');
const app = new Express();

require('./startup/router')(app);
require('./startup/db')();
const {
    logger
} = require('./utils/logger');
require('./startup/validate')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    logger.info(`this is listening ${port}`)
});

module.exports = server;