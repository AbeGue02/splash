const { Schema } = require('mongoose')

const Comment = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
        content: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = Comment