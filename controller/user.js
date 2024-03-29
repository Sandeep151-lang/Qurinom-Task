const express = require('express')
const router = express.Router()
const User = require('../model/user')
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

router.post('/register',async(req,res)=>{
    const {name,email,password,phoneNo}= req.body
    const userExist = await User.findOne({ email:email });
    
    try {
        if (userExist) {
            return res.status(401).send({ message: 'Email already exist' })
        } else {
            const hash = await bcrypt.hash(password, 10)
            const user_register = await User({ firstName:name,email,password:hash,phoneNo});
            console.log(user_register,'dddd')
        await user_register.save();
        return res.status(200).send({ message: 'Registered Successfully'})  
      }
    } catch (error) {
      return res.status(401).send(error)
    } 
})


router.post('/login',async(req,res)=>{
    const {email, password} = req.body
    const hash = await bcrypt.hash(password, 10)

    const userExist = await User.findOne({email:email})
    
    try {
        if(userExist){
            const isMatch = await bcrypt.compare(password, userExist.password);
            if(isMatch){

                const token = jwt.sign(
                    {  
                        id: userExist?._id,
                        email: email ,
                        
                    },
                    process.env.JWT_TOKEN,
                    {
                        expiresIn: "2h",
                    }
                    );
                    const data =  await User.findByIdAndUpdate({ _id: userExist._id }, { token: token},{new:true})
                    return  res.status(200).json({token:data?.token, email:data?.email});
                }
                return res.status(401).send({message:"Invalid credential"})
            
        }
        
            return res.status(401).send({message:"Invalid Credential"})
        
    } catch (error) {
    throw new Error(error)
    }
})


router.post('/post',async(req,res)=>{
    const {id,post,email} = req.body
    try {
        const resp = await User.findOneAndUpdate({email:email},{$addToSet:{post:post}}, {
            new: true,
            upsert: true
        })
      return res.status(200).json({message:"Post added successfully",resp})
    } catch (error) {
      return  res.status(400).json({message:error})
    }
    
})




router.post('/getpost',async(req,res)=>{
    const {email}= req.body
    try {
        const resp = await User.findOne({email:email})
        if(resp){
            return res.status(200).json(resp)
        }
    } catch (error) {
        res.status(400).json({message:error})
    }
})


module.exports = router