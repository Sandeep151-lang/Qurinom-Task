const mongoose = require('mongoose')


const post = new mongoose.Schema({
    
    post:[{type:String}]
    
},{timestamps:true})

module.exports= mongoose.model('post',post)