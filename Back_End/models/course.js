const mongoose = require('mongoose')

const Schema = mongoose.Schema
const courseSchema = new Schema({
    Preview: {
        type: String,
        required: true 
    },
    Title: {
        type: String,
        required: true
    },
    Subject: {
        type: String,
        required: true
    },
    Subtitles: [
        {
            Name: {
                type: String,
                required: true
            },
            Exercises: {
                type: String,
                required: true
            },
            Hours: {
                type: Number,
                required: true
            },
            YoutubeLink: {
                type: String,
                required: true
            },
            ShortDesc: {
                type: String,
                required: true
            },
            Question: {
                type: String,
                required: true
            },
            Answer1: {
                type: String,
                required: true
            },
            Answer2: {
                type: String,
                required: true
            },
            Answer3: {
                type: String,
                required: true
            },
            Answer4: {
                type: String,
                required: true
            },
            CorrectAnswer: {
                type: Number,
                required: true
            },




        }
    ],
    Instructor: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    TotalHours: {
        type: Number,
        required: true
    },
    CreditHours: {
        type: Number,
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
    Discount: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
        required :true
    }

}, { timestamps: true })

module.exports = mongoose.model('Course', courseSchema)

