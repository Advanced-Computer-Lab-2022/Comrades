const express =require ('express')
const {
<<<<<<< Updated upstream
    createUser
=======
  createAdmin,
  createInstructor,
  createCT
>>>>>>> Stashed changes
  } = require('../controllers/userController')


const router = express.Router()

<<<<<<< Updated upstream
//Post a new Data
router.post('/',createUser)
=======
//Post a new Admin
router.post('/createAdmin',createAdmin)

//Post a new Instructor
router.post('/createInstructor',createInstructor)

//Post a new CT
router.post('/createCT',createCT)

>>>>>>> Stashed changes

module.exports = router