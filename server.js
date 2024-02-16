//Necessary Imports
const express = require('express');
const db = require('./db');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

//Controller functions
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('./controllers/userController');
const { getPosts, getPostById, createPost, updatePost, deletePost } = require('./controllers/postController');
const { getLikes, getLikeById, createLike, updateLike, deleteLike } = require('./controllers/likeController');
const { getComments, getCommentById, createComment, updateComment, deleteComment } = require('./controllers/commentController');

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
    res.send("Welcome to the Splash Server!")
})

//Endpoints
app.get('/users', getUsers)
app.get('/users/:id', getUserById)
app.post('/users/create', createUser)
app.put('/users/:id/update', updateUser)
app.delete('/users/:id/delete', deleteUser)

app.get('/posts', getPosts)
app.get('/posts/:id', getPostById)
app.post('/posts/create', createPost)
app.put('/posts/:id/update', updatePost)
app.delete('/posts/:id/delete', deletePost)

app.get('/likes', getLikes)
app.get('/likes/:id', getLikeById)
app.post('/likes/create', createLike)
app.put('/likes/:id/update', updateLike)
app.delete('/likes/:id/delete', deleteLike)

app.get('/comments', getComments)
app.get('/comments/:id', getCommentById)
app.post('/comments/create', createComment)
app.put('/comments/:id/update', updateComment)
app.delete('/comments/:id/delete', deleteComment)

// Handle 404 errors
app.get('/*', async (req,res) => {
    res.send("Hit an art block? We were not able to find what you're looking for (404)")
})