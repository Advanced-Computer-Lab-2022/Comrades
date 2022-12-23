const express =require ('express')
const {
    createCourseRequest,
    getAllRequests,
    updateRequestStatus
} = require('../controllers/courseRequestController.js')


const router = express.Router()


router.post('/createCourseRequest',createCourseRequest)

router.post('/updateRequestStatus',updateRequestStatus)

router.get('/getAllRequests',getAllRequests)




module.exports = router