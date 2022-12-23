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
    changeDiscount,
    getCourseReviewsById,
    getSubtitleByIndexAndCourseID,
    incrementPopularity,
    getCourseByName


    

  } = require('../controllers/courseController')
  const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

// // require auth for all routes
// router.use(requireAuth)


router.get('/test', function routeHandler(req, res) {
  res.send('ok');
});


router.post('/incrementPopularity', incrementPopularity)

router.get('/getSubtitleByIndexAndCourseID/:query', getSubtitleByIndexAndCourseID)

router.get('/getCourseReviewsById/:query',getCourseReviewsById)


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
router.get('/getCourseById/:query' , getCourseById)
router.get('/getCourseByName/:query' , getCourseByName)



// get course id
router.get('/getCountries' , getCountries)

//change discount
router.post('/changeDiscount/:query', changeDiscount)

router.get('/getSubtitleByIndexAndCourseID/:query', getSubtitleByIndexAndCourseID)












module.exports = router