const db = require('../db')
const { Like, User, Post } = require('../models')

db.on('error', console.error.bind(console, "MongoDB connection error: "))

const main = async () => {
    const users = await User.find()
    const posts = await Post.find()
    
    const likes = [
        {
            user: users[0]._id,
            post: posts[3]._id
        },
        {
            user: users[0]._id,
            post: posts[5]._id
        },
        {
            user: users[0]._id,
            post: posts[7]._id
        },
        {
            user: users[0]._id,
            post: posts[8]._id
        },
        {
            user: users[1]._id,
            post: posts[0]._id
        },
        {
            user: users[1]._id,
            post: posts[2]._id
        },
        {
            user: users[1]._id,
            post: posts[4]._id
        },
        {
            user: users[1]._id,
            post: posts[7]._id
        },
        {
            user: users[2]._id,
            post: posts[0]._id
        },
        {
            user: users[2]._id,
            post: posts[3]._id
        },
        {
            user: users[2]._id,
            post: posts[4]._id
        },
        {
            user: users[2]._id,
            post: posts[6]._id
        },
        {
            user: users[3]._id,
            post: posts[0]._id
        },
        {
            user: users[3]._id,
            post: posts[1]._id
        },
        {
            user: users[3]._id,
            post: posts[2]._id
        },
        {
            user: users[3]._id,
            post: posts[3]._id
        },
    ]

    await Like.insertMany(likes)
    console.log('Like were inserted to database')
}

const run = async () => {
    await main()
    db.close()
}

run()