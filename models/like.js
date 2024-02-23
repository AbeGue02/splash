const { Schema } = require('mongoose')

const Like = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
    },
    { timestamps: true },
)

module.exports = Like