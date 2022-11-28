const express =require ('express')
const {
  createUserByAdmin,
  recieveEmailToChangePassword,
  rateInstructor,
  changePassword
} = require('../controllers/userController')


const router = express.Router()

//Rate instructor
router.post('/rateInstructor/:query',rateInstructor)

//Change password
router.post('/changePassword/:query',changePassword)

//Post user by Admin
router.post('/createUserByAdmin',createUserByAdmin)

//Recieve Email To Change Password
router.post('/recieveEmailToChangePassword',recieveEmailToChangePassword)


module.exports = router