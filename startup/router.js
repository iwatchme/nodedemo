const Express = require("express");
const generes = require("../routers/generes")
const customers = require("../routers/customers")
const movies = require('../routers/movie');
const rentals = require('../routers/rental');
const users = require('../routers/users');
const auth = require('../routers/auth');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(Express.json());
    app.use('/api/generes', generes);
    app.use('/api/customers', customers);
    app.use('/api/rentals', rentals);
    app.use('/api/movies', movies);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
}