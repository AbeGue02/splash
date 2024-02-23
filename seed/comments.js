const db = require('../db')
const { Comment, User, Post } = require('../models')

db.on('error', console.error.bind(console, "MongoDB connection error: "))

const main = async () => {
    const users = await User.find()
    const posts = await Post.find()
    
    const comments = [
        {
            user: users[3]._id,
            post: posts[4]._id,
            content: "Wow, that painting really 'draws' me in! It's 'canvas' be more perfect! 🎨 #ArtLoverDadJokes",
        },
        {
            user: users[3]._id,
            post: posts[1]._id,
            content: "Are they painting or dancing? 🤔 Either way, they're 'brushing' up on their moves! 🎨💃 #ArtDanceDadJokes",
        },
        {
            user: users[3]._id,
            post: posts[0]._id,
            content: "First post? Let's 'paint' a picture of success! 🎨📸 #FirstPostDadJokes",
        },
    ]

    await Comment.insertMany(comments)
    console.log('Comments were inserted to database')
}

const run = async () => {
    await main()
    db.close()
}

run()