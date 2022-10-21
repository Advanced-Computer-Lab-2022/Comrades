const express =require ('express')
const {
    createCourse
  } = require('../controllers/courseController')


const router = express.Router()

//Post a new Data
router.post('/',createCourse)

module.exports = router