const Course = require('../models/course')
const mongoose = require('mongoose')
let countries = {
    "USA": 1,
    "Germany": 1,
    "Italy": 1,
    "France": 1,
    "Spain": 1,
    "Egypt": 24,
    "England": 0.86,
    "Portugal": 1,
    "Ukraine": 36.94,
    "Russia": 61.53
}



// create a new course
const createCourse = async (req, res) => {
    const { Title, Subject, Subtitles, Instructor, Price, CreditHours, Discount, Description } = req.body
    const Rating = 5;
    var TotalHours = 0;
    for (let i = 0; i < Subtitles.length; i++) {
        TotalHours = TotalHours + Subtitles[i].Hours;
    }

    try {
        const data = await Course.create({ Title, Subject, Subtitles, Instructor, Price, TotalHours, CreditHours, Rating, Discount, Description })
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Get a country
const getCurrency = async (req, res) => {
    let country = JSON.stringify(req.params.country)
    country = country.substring(1, country.length - 1)
    if (countries[country] == null) {
        return res.status(404).json({ error: 'No such Country ' + country })
    }

    const rate = countries[country]

    res.status(200).json(rate)
}
// get all courses
const getCourses = async (req, res) => {
    const courses = await Course.find({}, 'Title  Subject  Subtitles  Price  TotalHours  Rating  CreditHours  Discount');

    res.status(200).json(courses)
}

//get courses of an instructor
const getCoursesInstructor = async (req, res) => {
    const courses = await Course.find({ "Instructor": "ahmedInstructor" }, 'Title Instructor')
    res.status(200).json(courses)
}

//Search
const search = async (req, res) => {
    let query = JSON.stringify(req.params.query)
    query = query.substring(1, query.length - 1)
    const courses = await Course.find(
        { $or: [{ "Instructor": query }, { "Title": query }, { "Subject": query }] },
        // { "Instructor": query },
        'Title  Subject  Subtitles  Price  TotalHours  Rating  CreditHours  Discount');

    res.status(200).json(courses)
}

//Search Instructor
const searchInstructor = async (req, res) => {
    let query = JSON.stringify(req.params.query)
    query = query.substring(1, query.length - 1)
    const courses = await Course.find(
        {
            $and: [
                { "Instructor": "ahmedInstructor" },
                { $or: [{ "Title": query }, { "Subject": query }] }
            ]

        },
        // { "Instructor": query },
        'Title  Subject  Subtitles  Instructor  Price  TotalHours  Rating  CreditHours  Discount');

    res.status(200).json(courses)
}

const getCourseById = async (req, res) => {
    let query = JSON.stringify(req.params.query)
    query = query.substring(1, query.length - 1)
    const courses = await Course.find({ "_id": query }, 'Title  Rating  Description Price TotalHours')
    res.status(200).json(courses)
}






module.exports = {
    createCourse,
    getCurrency,
    getCourses,
    getCoursesInstructor,
    search,
    getCourseById,
    searchInstructor
}