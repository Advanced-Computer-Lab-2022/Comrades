const mongoose = require('mongoose')

const Schema = mongoose.Schema
const courseSchema = new Schema({
    Preview: {
        type: String,
        required: true
    },
    Popularity: {
        type: Number,
        required: false,
        default: 0
    },
    Title: {
        type: String,
        required: true,
        unique: true
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
                        required: false
                    },
                    Answer1: {
                        type: String,
                        required: false
                    },
                    Answer2: {
                        type: String,
                        required: false
                    },
                    Answer3: {
                        type: String,
                        required: false
                    },
                    Answer4: {
                        type: String,
                        required: false
                    },
                    CorrectAnswer: {
                        type: Number,
                        required: false
                    },
                },
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
    },
    Reviews: [
        {Reviewer: {
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

module.exports = mongoose.model('Course', courseSchema)

