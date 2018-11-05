const Express = require("express");
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require("mongoose")
const generes = require("./routers/generes")
const customers = require("./routers/customers")
const movies = require('./routers/movie');
const rentals = require('./routers/rental');
const users = require('./routers/users');
const auth = require('./routers/auth')
const app = new Express();

app.set('view engine', 'pug');
app.set('views', './views')

mongoose.connect("mongodb://localhost/vidly", {
        useNewUrlParser: true
    })
    .then(() => console.log("succesfully connect mongodb"))
    .catch(error => console.log(`failed to connect mongodb, because ${error}`))



app.use(Express.json());
app.use('/api/generes', generes);
app.use('/api/customers', customers);
app.use('/api/rentals', rentals);
app.use('/api/movies', movies);
app.use('/api/users', users);
app.use('/api/auth', auth);




const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`this is listening ${port}`)
})