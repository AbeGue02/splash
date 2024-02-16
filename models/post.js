const { Schema } = require('mongoose')

const Post = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        image: { type: String },
    },
    { timestamps: true },
)

module.exports = Post