const User = require('../models/user')
const mongoose = require('mongoose')



// create a new course
const createUser = async (req, res) => {
    const {Username, Password, UserType} = req.body
    
    try{
        const data = await User.create({Username, Password, UserType})
        res.status(200).json(data)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
  }







module.exports = {
    createUser
  }