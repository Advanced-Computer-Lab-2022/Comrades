const express =require ('express')
const {
  createUserByAdmin
} = require('../controllers/userController')


const router = express.Router()

//Post user by Admin
router.post('/createUserByAdmin',createUserByAdmin)


module.exports = router