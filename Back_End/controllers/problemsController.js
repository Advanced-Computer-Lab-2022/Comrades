const Problem = require('../models/problem')
const mongoose = require('mongoose')


const createTestProblem = async (req, res) => {
    console.log(req.body);
    const { ProblemVal, ProblemType } = req.body
    try {
        const data = await Problem.create({ Problem: ProblemVal, ProblemType: ProblemType })
        res.status(200).json(data)
    }
    catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
}

const updateProblemStatus = async (req, res) => {
    console.log(req.body);
    const { ProblemID, NewStatus } = req.body
    try {
        let doc = await Problem.findOneAndUpdate(
            { _id: ProblemID },
            { Status: NewStatus },
            {
                new: true
            }
        );
        res.status(200).json(doc)
    }
    catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
}


const getAllProblems = async (req, res) => {

    try {
        const data = await Problem.find({})
        res.status(200).json(data)
    }
    catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
}



module.exports = {
    createTestProblem,
    getAllProblems,
    updateProblemStatus
}