const User = require('../models/user')
const mongoose = require('mongoose')


// create a new user by admin
const createUserByAdmin = async (req, res) => {
  const { Username, Password, UserType } = req.body
  //Username = Username.toLowerCase()
  if (UserType != "admin" && UserType != "instructor" && UserType != "ct") {
    res.send("Illegal User Type")
  }
  else {
    try {
      const data = await User.create({ Username, Password, UserType })
      res.status(200).json(data)
    }
    catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}

module.exports = {
  createUserByAdmin,
}