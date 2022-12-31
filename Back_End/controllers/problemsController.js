const Problem = require('../models/problem')
const mongoose = require('mongoose')


const createTestProblem = async (req, res) => {
    console.log(req.body);
    const { ProblemVal, ProblemType, UserID, CourseID } = req.body

    try {
        const data = await Problem.find({ $and: [{ UserID: UserID }, { CourseID: CourseID }] })

        if (data.length == 0) {
            try {
                const data2 = await Problem.create({ CourseID: CourseID, UserID: UserID, Problem: ProblemVal, ProblemType: ProblemType })
                res.status(200).json(data2)
            }
            catch (error) {
                console.log(error.message)
                res.status(400).json({ error: error.message })
            }
        }
        else{
            let problemValue = data[0].Problem +  "--" + " Update: " + ProblemVal;
            try {
                const data2 = await Problem.findOneAndUpdate({ $and: [{ UserID: UserID }, { CourseID: CourseID }] }, {Problem: problemValue} )
                res.status(200).json(data2)
            }
            catch (error) {
                console.log(error.message)
                res.status(400).json({ error: error.message })
            }

        }


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
        console.log(doc)
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