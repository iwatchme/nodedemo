const Express = require("express");
const mongoose = require("mongoose")
const generes = require("./routers/generes")
const customers = require("./routers/customers")
const app = new Express();

app.set('view engine', 'pug');
app.set('views', './views')

mongoose.connect("mongodb://localhost/vidly", {useNewUrlParser: true})
    .then(() => console.log("succesfully connect mongodb"))
    .catch(error => console.log(`failed to connect mongodb, because ${error}`))



app.use(Express.json());
app.use('/api/generes', generes);
app.use('/api/customers', customers);



const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`this is listening ${port}`)
})