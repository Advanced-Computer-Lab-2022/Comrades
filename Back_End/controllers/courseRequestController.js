const CourseRequest = require('../models/courseRequest')
const mongoose = require('mongoose')

const createCourseRequest = async (req, res) => {
    console.log(req.body);
    const { CourseID, UserID, Status } = req.body
    try {
        const data = await CourseRequest.create({ CourseID, UserID, Status })
        res.status(200).json(data)
    }
    catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
}

const updateRequestStatus = async (req, res) => {
    console.log(req.body);
    const { RequestID } = req.body
    try {
        let doc = await CourseRequest.findOneAndDelete(
            { _id: RequestID },
        );
        console.log(doc)
        res.status(200).json(doc)
    }
    catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
}


const getAllRequests = async (req, res) => {

    try {
        const data = await CourseRequest.find({})
        res.status(200).json(data)
    }
    catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
}





module.exports = {
    createCourseRequest,
    getAllRequests,
    updateRequestStatus
}