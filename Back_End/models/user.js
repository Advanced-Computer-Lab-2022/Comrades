const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Username: {
        type: String,
        required: true,
        unique: true
    },

    Password: {
        type: String,
        required: true
    },
    UserType: {
        type: String,
        required: true
    },

    Rating: {
        type: Number,
        required: true
    },
    TotalRatings: {
        type: Number,
        required: true
    },

    Biography: {
        type: String,
        required: false
    },

    PasswordResetToken: {
        type: String,
        required: false
    },
    Reviews: [
        {
            Reviewer: {
                type: String,
                required: true
            },
            Review: {
                type: String,
                required: true
            },
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)


