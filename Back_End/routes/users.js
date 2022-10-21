const express =require ('express')
const {
    createUser
  } = require('../controllers/userController')


const router = express.Router()

//Post a new Data
router.post('/',createUser)

module.exports = router