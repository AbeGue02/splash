const mongoose = require('mongoose')
const userSchema = require('./user')
const postSchema = require('./post')
const likeSchema = require('./like')
const commentSchema = require('./comment')

const User = mongoose.model('User', userSchema, 'Users')
const Post = mongoose.model('Post', postSchema, 'Posts')
const Like = mongoose.model('Like', likeSchema, 'Likes')
const Comment = mongoose.model('Comment', commentSchema, 'Comment')

module.exports = {
    User,
    Post,
    Like,
    Comment,
}