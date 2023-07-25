const mongoose = require('mongoose')

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const userSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    email:{type:String,required:true},
    phoneNo:{type:Number,required:true},
    password:{type:String,required:true},
    token: { type: String },
    // post:[{type: mongoose.Schema.Types.ObjectId, ref: 'post'}]
    post:[{type:String}]
    
},{timestamps:true})

module.exports= mongoose.model('register',userSchema)