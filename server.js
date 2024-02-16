//Necessary Imports
const express = require('express');
const db = require('./db');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('./controllers/userController');

//Controller functions


//Set up for Express
const PORT = process.env.PORT || 3001;
const app = express();

//middleware here
app.use(cors()) //Necessary for some HTTP methods while working on local network
app.use(bodyParser.json()) //Allows you to use the body of requests
app.use(logger('dev')) //Better logs

//Set up and homepage
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

app.get('/', async (req,res) => {
    res.send("Welcome to my the Splash Server!")
})

//Endpoints
app.get('/users', getUsers)
app.get('/users/:id', getUserById)
app.get('/users/create', createUser)
app.get('/users/:id/update', updateUser)
app.get('/users/:id/delete', deleteUser)

// Handle 404 errors
app.get('/*', async (req,res) => {
    res.send("Hit an art block? We were not able to find what you're looking for (404)")
})