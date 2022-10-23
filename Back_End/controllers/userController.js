const User = require('../models/user')
const mongoose = require('mongoose')



<<<<<<< Updated upstream
// create a new course
const createUser = async (req, res) => {
    const {Username, Password, UserType} = req.body
    
    try{
        const data = await User.create({Username, Password, UserType})
=======
// create a new admin
const createAdmin = async (req , res) => {
    const {Username , Password} = req.body
    //Username = Username.toLowerCase()
    const UserType = 'admin'
    try{
        const data = await User.create({Username , Password, UserType})
>>>>>>> Stashed changes
        res.status(200).json(data)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
  }

<<<<<<< Updated upstream






module.exports = {
    createUser
=======
// create a new instructor
const createInstructor = async (req , res) => {
  const {Username , Password} = req.body
  //Username = Username.toLowerCase()
  const UserType = 'instructor'
  try{
      const data = await User.create({Username , Password, UserType})
      res.status(200).json(data)
  }
  catch(error){
      res.status(400).json({error: error.message})
  }
}

// create a new ct
const createCT = async (req , res) => {
  const {Username , Password} = req.body
  //Username = Username.toLowerCase()
  const UserType = 'ct'
  try{
      const data = await User.create({Username , Password, UserType})
      res.status(200).json(data)
  }
  catch(error){
      res.status(400).json({error: error.message})
  }
}

  module.exports = {
    createAdmin,
    createInstructor,
    createCT
>>>>>>> Stashed changes
  }