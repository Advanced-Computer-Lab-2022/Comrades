const mongoose = require('mongoose')

const Schema = mongoose.Schema


const courseRequestSchema = new Schema({
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
    Status: {
        type: String,
        default: "Awaiting",
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('CourseRequest', courseRequestSchema)

