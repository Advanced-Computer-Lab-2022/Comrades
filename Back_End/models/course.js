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
            Exercises: [
                {
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
            Hours: {
                type: Number,
                required: true
            },
            Link: {
                type: String,
                required: true
            },
            Subtitle_description: {
                type: String,
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
    DiscountedPrice: {
        type: Number,
        required: true,
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
    DiscountDuration: {
        type: Number,
        required: false
    },
    DiscountEndDate: {
        type: String,
        required: false
    },
    Description: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('Course', courseSchema)

