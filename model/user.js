const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    email:{type:String,required:true},
    phoneNo:{type:Number,required:true},
    password:{type:String,required:true},
    token: { type: String },
    
},{timestamps:true})

module.exports= mongoose.model('register',userSchema)