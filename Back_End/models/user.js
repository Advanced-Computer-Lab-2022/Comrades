const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({

    Username: {
        type: String,
        required:true,
        unique: true
    },
    
    Password : {
        type : String,
        required :true
    },

    UserType :{
        type: String,
        required :true
    }
    


},{ timestamps: true })

module.exports = mongoose.model('User', userSchema)


