const User = require('../models/user')
const mongoose = require('mongoose')
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: "acl-comrades-team-2022@outlook.com",
    pass: "Acl1234$",
  },
});

function generate_token(length) {
  //edit the token allowed characters
  var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  var b = [];
  for (var i = 0; i < length; i++) {
    var j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join("");
}


// Rate course
const rateInstructor = async (req, res) => {
  let query = JSON.parse(req.params.query);

  const courses = await User.find({ "_id": query.id }, '_id Rating TotalRatings')
  let newRating = (courses[0].Rating * courses[0].TotalRatings + query.Rating) / (courses[0].TotalRatings + 1);
  let newTotalRatings = courses[0].TotalRatings + 1;


  let doc = await User.findOneAndUpdate(
    { _id: query.id },
    { Rating: newRating, "TotalRatings": newTotalRatings },
    {
      new: true
    }
  );

  res.status(200).json(doc)
}

const recieveEmailToChangePassword = async (req, res) => {

  let token = generate_token(64);

  let doc = await User.findOneAndUpdate(
    { Email: "omarshokeir2@gmail.com" },
    { PasswordResetToken: token },
    {
      new: true
    }
  );



  let options = {
    from: "acl-comrades-team-2022@outlook.com", // sender address
    to: "omarshokeir2@gmail.com", // list of receivers
    subject: "Comrades Password Reset", // Subject line
    text: "Hello world?", // plain text body
    html: "<h2>Click the following link to change your password</h2><h3>" + token + "</h3>", // html body
  }

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Email sent");
  })

}

// Change password

const changePassword = async (req, res) => {
  let query = JSON.parse(req.params.query);
  const Token = query.Token
  
  let data;
  data = await User.find({ Email: "omarshokeir2@gmail.com" }, 'Password PasswordResetToken')
  console.log(Token[64])
  console.log(data[0].PasswordResetToken)
  if (data[0].PasswordResetToken === Token) {
    console.log(data)
    try {
      let doc = await User.findOneAndUpdate(
        { Email: "omarshokeir2@gmail.com" },
        { Password: query.Password },
        {
          new: true
        }
      );
      res.status(200).json(doc)
    }
    catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  else{
    res.status(400).json({ "error": "Wrong Token" })

  }

}

// create a new user by admin
const createUserByAdmin = async (req, res) => {
  const { Email, Username, Password, UserType } = req.body
  console.log(req.body);
  const Rating = 0;
  const TotalRatings = 0;
  if (UserType != "admin" && UserType != "instructor" && UserType != "ct") {
    res.send("Illegal User Type: " + UserType)
  }
  else {
    try {
      const data = await User.create({ Email, Username, Password, UserType, Rating, TotalRatings })
      res.status(200).json(data)
    }
    catch (error) {
      console.log(error.message)
      res.status(400).json({ error: error.message })
    }
  }
}

module.exports = {
  createUserByAdmin,
  recieveEmailToChangePassword,
  rateInstructor,
  changePassword
}