const Course = require('../models/course')
const mongoose = require('mongoose')



// create a new course
const createCourse = async (req, res) => {
    const {Title , Subject , Subtitles , Instructor , Price , TotalHours , CreditHours , Rating , Discount , Description} = req.body
    
    try{
        const data = await Course.create({Title , Subject , Subtitles , Instructor , Price , TotalHours , CreditHours , Rating , Discount , Description})
        res.status(200).json(data)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
  }







module.exports = {
    createCourse
  }