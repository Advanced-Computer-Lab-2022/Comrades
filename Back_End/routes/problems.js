const express =require ('express')
const {
    createTestProblem,
    getAllProblems,
    updateProblemStatus
} = require('../controllers/problemsController')


const router = express.Router()


//Post test problem
router.post('/createTestProblem',createTestProblem)

//Update problem status
router.post('/updateProblemStatus',updateProblemStatus)

//Get all problems
router.get('/getAllProblems',getAllProblems)



module.exports = router