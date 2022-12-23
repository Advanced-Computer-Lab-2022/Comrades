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
        required: false,
        default: "No Bio Yet."
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
    ],
    SignedCourses: [
        {
            CourseName: {
                type: String,
                required: false
            },
            CompletedSubtitles: [
                {
                    SubtitleID: {
                        type: String,
                        required: false
                    }
                }
            ],
            NumSubtitles: {
                type: Number,
                required: false,
                default: 0
            },
            MaxNumSubtitles: {
                type: Number,
                required: false,
                default: 0
            },
            IsCompleted: {
                type: Boolean,
                required: false,
                default: false
            },
            AmountPaid: {
                type: Number,
                required: false,
                default: 0

            }

        }
    ],
    Firstname: {
        type: String,
        required: false
    },
    Lastname: {
        type: String,
        required: false
    },
    Gender: {
        type: String,
        required: false
    }
}, { timestamps: true })

// static signup method
userSchema.statics.signup = async function (email, username, password, firstName, lastName, gender) {


    console.log(username)
    console.log(email)
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

    const exists2 = await this.findOne({ Username: username })

    if (exists2) {
        throw Error('Username already in use')
    }


    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
        Email: email,
        Username: username,
        Password: hash,
        UserType: "it",
        Rating: 0,
        TotalRatings: 0,
        Reviews: [],
        Biography: "biography",
        Firstname: firstName,
        Lastname: lastName,
        Gender: gender
    })

    return user
}

// static login method
userSchema.statics.login = async function (username, password) {

    if (!username || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ Username: username })
    if (!user) {
        throw Error('Incorrect username')
    }

    const match = await bcrypt.compare(password, user.Password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}



module.exports = mongoose.model('User', userSchema)


