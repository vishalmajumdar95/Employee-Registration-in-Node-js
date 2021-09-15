const express = require('express');
const app = express();
require('dotenv').config();
// Parser 
const bodyParser = require('body-parser');
app.use(express.json())

// Port
const port = process.env.PORT || 5001;

// Knex Connection
// const knex = require("./config/db")

// Router
const user = require('./Routes/user');
app.use('/user', user)


// define a root route
app.get('/', (req, res) => {
    res.send("Hello World");
});

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ::`, port);
});