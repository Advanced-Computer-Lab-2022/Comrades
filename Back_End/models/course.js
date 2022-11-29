const mongoose = require('mongoose')

const Schema = mongoose.Schema
const courseSchema = new Schema({
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
            }

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
    DiscountDuration: {
        type: Number,
        required: true
    },
    DiscountDuration: {
        type: Number,
        required: false
    },
    DiscountEndDate:{
        type:String,
        required: false
    },
    Description: {
        type: String,
        required :true
    }

}, { timestamps: true })

module.exports = mongoose.model('Course', courseSchema)

