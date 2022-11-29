const express =require ('express')
const {
    createCourse,
    getCurrency,
    getCourses,
    getCoursesInstructor,
    search,
    getCourseById,
    searchInstructor,
    getCountries,
    filterCoursesBySubjectInstructor,
    filterCoursesByPriceInstructor,
    filterCoursesByPrice,
    filterCoursesBySubjectAndRating,
    rateCourse,
    changeDiscount
    

  } = require('../controllers/courseController')


const router = express.Router()

router.get('/test', function routeHandler(req, res) {
  res.send('ok');
});

//Rate course
router.post('/rateCourse/:query',rateCourse)

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

//Filter courses by price
router.get('/filterCoursesByPrice/:query' , filterCoursesByPrice)

//Filter courses by price
router.get('/filterCoursesBySubjectAndRating/:query' , filterCoursesBySubjectAndRating)

// get course instructor
router.get('/getCoursesInstructor' , getCoursesInstructor)



// filter course instructor by subject
router.get('/filterCoursesBySubjectInstructor/:query' , filterCoursesBySubjectInstructor)

// filter course instructor by price
router.get('/filterCoursesByPriceInstructor/:query' , filterCoursesByPriceInstructor)


// get course id
router.get('/getCourseById/:id' , getCourseById)

// get course id
router.get('/getCountries' , getCountries)

//change discount
router.post('/changeDiscount/:query', changeDiscount)









module.exports = router