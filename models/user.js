const { Schema } = require('mongoose')

const User = new Schema(
    {
        username: { type: String, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        profile_picture: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        isLoggedIn: { type: Boolean, required: true, default: false },
        followers: { type: [{type: Schema.Types.ObjectId, ref: 'User'}] },
        following: { type: [{type: Schema.Types.ObjectId, ref: 'User'}] },
    },
    { timestamps: true },
)

module.exports = User