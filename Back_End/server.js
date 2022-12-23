require ('dotenv').config()
const express = require('express')
const mongoose = require ('mongoose')
const cors = require('cors');


//Express App
const app = express()
const myCourseRoutes = require('./routes/courses')
const myUserRoutes = require('./routes/users')
const myProblemsRoutes = require('./routes/problems')
const courseRequestRoutes = require('./routes/courseRequests')


//MiddleWare
app.use(express.json())
app.use((req,res , next)=>{
    console.log(req.path, req.method)
    next()

})
app.use(cors());

//routes
app.use('/api/courses',myCourseRoutes)
app.use('/api/users',myUserRoutes)
app.use('/api/problems',myProblemsRoutes)
app.use('/api/courseRequests',courseRequestRoutes)


app.get('/test', function routeHandler(req, res) {
    res.send('ok');
  });

//connnect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    // Listen For Requests
    app.listen(process.env.PORT, ()=> {
    console.log('Connected to DB & listening on port '+ process.env.PORT)
})
})
.catch((error)=>{
    console.log(error)
})



