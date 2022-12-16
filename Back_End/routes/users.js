const express =require ('express')
const {
  createUserByAdmin,
  recieveEmailToChangePassword,
  rateInstructor,
  getRatingsInstructor,
  changePassword,
  changeEmail,
  changeBio,
  getInstructorByID,
  getReviewsInstructor,
  issueRefund,

  loginUser,
  signupUser
} = require('../controllers/userController')


const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)















// Issue Refund
router.post('/issueRefund', issueRefund)


// Get Reviews of Instructor by ID
router.get('/getReviewsInstructor',getReviewsInstructor)


// Get Instructor by ID
router.get('/getInstructorByID',getInstructorByID)


//Rate instructor
router.post('/rateInstructor/:query',rateInstructor)

//Change Email
router.post('/changeEmail/:query',changeEmail)

//Change Bio
router.post('/changeBio/:query',changeBio)

//Change password
router.post('/changePassword/:query',changePassword)

// get instructor rating
router.get('/getRatingsInstructor/:query',getRatingsInstructor)

//Post user by Admin
router.post('/createUserByAdmin',createUserByAdmin)

//Recieve Email To Change Password
router.post('/recieveEmailToChangePassword',recieveEmailToChangePassword)



module.exports = router