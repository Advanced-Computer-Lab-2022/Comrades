const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema
const userSchema = new Schema({
    Wallet: {
        type: Number,
        required: false,
        default: 0
    },
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

// static signup method
userSchema.statics.signup = async function (email, username, password, userType, biography) {



    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }


    const exists = await this.findOne({ Email: email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
        Email: email,
        Username: username,
        Password: hash,
        UserType: userType,
        Rating: 0,
        TotalRatings: 0,
        Reviews: [],
        Biography: biography
    })

    return user
}

// static login method
userSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ Email: email })
    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.Password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}



module.exports = mongoose.model('User', userSchema)


