const express =require ('express')
const {
    createCourse,
    getCurrency,
    getCourses,
    getCoursesInstructor,
    search,
    getCourseById,
    searchInstructor
  } = require('../controllers/courseController')


const router = express.Router()

router.get('/test', function routeHandler(req, res) {
  res.send('ok');
});


//Post a new Data
router.post('/createCourse',createCourse)

//Get currency
router.get('/getCurrency/:country',getCurrency)

//Search
router.get('/search/:query',search)

//Search
router.get('/searchInstructor/:query',searchInstructor)

//get data
router.get('/getCourses' , getCourses)

// get course instructor
router.get('/getCoursesInstructor' , getCoursesInstructor)

// get course id
router.get('/getCourseById/:id' , getCourseById)

module.exports = router