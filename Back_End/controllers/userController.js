const User = require('../models/user')
const mongoose = require('mongoose')
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');
const { distinct } = require('../models/user');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}


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


// Get instructor by ID
const getInstructorByID = async (req, res) => {
  let json = JSON.parse(req.params.query);

  const users = await User.find({ "Username": json.query },);
  console.log(users[0]);
  res.status(200).json(users[0])
}


// Rate instructor
const rateInstructor = async (req, res) => {
  let query = JSON.parse(req.params.query);
  console.log("HEY")
  const courses = await User.find({ "Username": query.name }, '_id Rating TotalRatings')
  let newRating = (parseInt(courses[0].Rating) * parseInt(courses[0].TotalRatings) + parseInt(query.Rating)) / (parseInt(courses[0].TotalRatings) + 1);
  let newTotalRatings = courses[0].TotalRatings + 1;


  let doc = await User.findOneAndUpdate(
    { "Username": query.name },
    { Rating: newRating, "TotalRatings": newTotalRatings },
    {
      new: true
    }
  );

  res.status(200).json(doc)
}

const recieveEmailToChangePassword = async (req, res) => {

  let query = JSON.parse(req.params.query);
  let token = generate_token(64);
  //  { Email: "req.params.email" },

  let doc = await User.findOneAndUpdate(
    { Email: query.Email },
    { PasswordResetToken: token },
    {
      new: true
    }
  );

  console.log(doc)


  let options = {
    from: "acl-comrades-team-2022@outlook.com", // sender address
    to: doc.Email, // list of receivers
    subject: "Comrades Password Reset", // Subject line
    text: "Hello world?", // plain text body
    html: "<h2>Click the following link to change your password</h2><h3>"
      + "localhost:3000/cp?token=" + token
      + "</h3>", // html body
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

const changePasswordNoToken = async (req, res) => {
  let query = JSON.parse(req.params.query);
  const Token = query.Token
  console.log("Password: " + query.Password);
  console.log("Token: " + query.Token);
  let data;
  data = await User.find({ Username: Token }, 'Password PasswordResetToken')
  console.log(data[0]);

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(query.Password, salt)

  try {
    let doc = await User.findOneAndUpdate(
      { Username: Token },
      { Password: hash },
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

const changePassword = async (req, res) => {
  let query = JSON.parse(req.params.query);
  const Token = query.Token
  console.log("Password: " + query.Password);
  let data;
  data = await User.find({ PasswordResetToken: Token }, 'Password PasswordResetToken')
  console.log(data[0]);

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(query.Password, salt)

  if (data[0].PasswordResetToken === Token) {
    try {
      let doc = await User.findOneAndUpdate(
        { PasswordResetToken: Token },
        { Password: hash },
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
  else {
    res.status(400).json({ "error": "Wrong Token" })

  }

}

// get ratings of an instructor
const getRatingsInstructor = async (req, res) => {
  let query = JSON.parse(req.params.query);
  console.log(query.query);
  const users = await User.find({ "_id": query.query }, 'Rating')
  console.log(users[0])
  res.status(200).json(users)
}


const reviewInstructor = async (req, res) => {
  const { Reviewer, Review, Instructor } = req.body


  const user = await User.find({ "Username": Instructor });


  let js = {Reviewer: Reviewer, Review: Review}
  user[0].Reviews.push(js)

  console.log(user[0].Reviews);

  let doc = await User.findOneAndUpdate(
    { Username: Instructor },
    { Reviews: user[0].Reviews },
    {
      new: true
    }
  )
  res.status(200).json({ done: doc })

};

const getReviewsInstructor = async (req, res) => {
  let query = JSON.parse(req.params.query);
  console.log(query);
  const reviews = await User.find({ "Username": query.instructor }, 'Reviews')
  console.log(reviews);
  console.log(reviews[0].Reviews)
  res.status(200).json(reviews[0].Reviews)
}


//change email

const changeEmail = async (req, res) => {
  let query = JSON.parse(req.params.query);
  let doc = await User.findOneAndUpdate(
    { Username: query.User },
    { Email: query.Email },
    {
      new: true
    }
  )
};


const changeBio = async (req, res) => {
  let query = JSON.parse(req.params.query);
  let doc = await User.findOneAndUpdate(
    { Username: query.User },
    { Biography: query.Bio },
    {
      new: true
    }
  )
};



const emailCertificate = async (req, res) => {
  const { Username, CourseID } = req.body

  const users = await User.find({ "Username": Username });


  let options = {
    from: "acl-comrades-team-2022@outlook.com", // sender address
    to: users[0].Email, // list of receivers
    subject: "Certificate of Course Completion", // Subject line
    text: CourseID, // plain text body
    html: "<h2>Click the following link to </h2>" +
      "<h3> http://localhost:3000/Certificate?Username=" + Username + "&Course=" + CourseID.replace(/ /g, "%") + "</h3>"
  }

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Email sent");
  })


  res.status(200).json({ done: "done" })

};

const requestRefund = async (req, res) => {
  const { Username, CourseID } = req.body

  const users = await User.find({ "Username": Username });
  let user = users[0]
  let newSignedCourses = [];
  let newWallet = user.Wallet;
  for (let i = 0; i < user.SignedCourses.length; i++) {
    if (user.SignedCourses[i].CourseName === CourseID) {
      console.log(user.SignedCourses[i].AmountPaid)
      newWallet += user.SignedCourses[i].AmountPaid
    }
    else {
      newSignedCourses.push(user.SignedCourses[i])
    }
  }
  let doc = await User.findOneAndUpdate(
    { "Username": Username },
    { Wallet: newWallet, SignedCourses: newSignedCourses },
    {
      new: true
    }
  )
  res.status(200).json({ done: doc })

};

const userFinishSubtitle = async (req, res) => {
  const { Username, CourseID, SubtitleID } = req.body

  const users = await User.find({ "Username": Username });
  let user = users[0]
  for (let i = 0; i < user.SignedCourses.length; i++) {
    if (user.SignedCourses[i].CourseName == CourseID) {
      let isFound = false;
      console.log(user.SignedCourses[i].CourseName);
      for (let j = 0; j < user.SignedCourses[i].CompletedSubtitles.length; j++) {
        if (user.SignedCourses[i].CompletedSubtitles[j].SubtitleID === SubtitleID) {
          isFound = true;
          break;
        }
      }
      if (!isFound) {
        let course = user.SignedCourses[i];
        let progress = user.SignedCourses[i].NumSubtitles
        progress = progress - 1;
        let isDone = false
        if (progress == 0)
          isDone = true;
        if (course.CompletedSubtitles.includes(SubtitleID))
          break;
        else {
          user.SignedCourses[i].CompletedSubtitles.push(({ SubtitleID }));
          user.SignedCourses[i].NumSubtitles--;
          user.SignedCourses[i].IsCompleted = isDone;

          let doc = await User.findOneAndUpdate(
            { "Username": Username },
            { SignedCourses: user.SignedCourses[i] },
            {
              new: true
            }
          )
          res.status(200).json({ done: doc })
          break;
        }
      }
      break;
    }
  }
  res.status(200).json({ error: "Already exist" })
};

const addCourseToUser = async (req, res) => {

  const { Username, CourseName, NumSubtitles, AmountPaid } = req.body
  console.log(CourseName);
  try {
    const users = await User.find({ "Username": Username });

    let courses = users[0].SignedCourses
    courses.push({ CourseName: CourseName, NumSubtitles: NumSubtitles, MaxNumSubtitles: NumSubtitles, AmountPaid: AmountPaid})
    let doc = await User.findOneAndUpdate(
      { "Username": Username },
      { SignedCourses: courses },
      {
        new: true
      }
    )
    console.log(doc);
    res.status(200).json({ done: "Done" })

  }
  catch {
    res.status(400).json({ error: "User not found" })
  }
};

const issueRefund = async (req, res) => {

  const { Username, Amount } = req.body
  try {
    const users = await User.find({ "Username": Username });
    console.log(users[0].Wallet);

    let newWallet = parseInt(users[0].Wallet) + parseInt(Amount)

    let doc = await User.findOneAndUpdate(
      { "Username": Username },
      { Wallet: newWallet },
      {
        new: true
      }
    )
    res.status(200).json({ done: "Done" })

  }
  catch {
    res.status(400).json({ error: "User not found" })
  }
};



// create a new user by admin
const createUserByAdmin = async (req, res) => {
  const { Email, Username, Password, UserType } = req.body
  const Rating = 0;
  const TotalRatings = 0;
  if (UserType != "admin" && UserType != "instructor" && UserType != "ct") {
    res.send("Illegal User Type: " + UserType)
  }
  else {
    try {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(Password, salt)
      const data = await User.create({ Email, Username, Password: hash, UserType, Rating, TotalRatings })
      res.status(200).json(data)
    }
    catch (error) {
      console.log(error.message)
      res.status(400).json({ error: error.message })
    }
  }
}



// signup a user
const signupUser = async (req, res) => {
  const { email, username, password, userType, biography } = req.body

  try {
    const user = await User.signup(email, username, password, userType, biography)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ username, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// login a user
const loginUser = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.login(username, password)

    // create a token
    const token = createToken(user._id)

    console.log({ username, token })
    res.status(200).json({ UserType: user.UserType, username, token })
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: error.message })
  }
}



module.exports = {
  createUserByAdmin,
  recieveEmailToChangePassword,
  rateInstructor,
  getRatingsInstructor,
  changePassword,
  changeEmail,
  changeBio,
  getInstructorByID,
  getReviewsInstructor,
  issueRefund,
  addCourseToUser,
  userFinishSubtitle,
  requestRefund,
  emailCertificate,
  changePasswordNoToken,
  reviewInstructor,

  loginUser,
  signupUser
}