const mongoose = require('mongoose')

const Schema = mongoose.Schema


const problemSchema = new Schema({
    CourseID: {
        type: String,
        required: false,
        default: "Garbage_Value_For_Testing"
    },
    UserID: {
        type: String,
        required: false,
        default: "Garbage_Value_For_Testing"
    },
    Problem: {
        type: String,
        required: true,
    },
    ProblemType: {
        type: String,
        required: true,
        default: "Other"
    },
    Status: {
        type: String,
        default: "Unseen",
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Problem', problemSchema)

