const express = require('express');
const authRouter = express.Router();
const User = require('../modals/user');
const {validateSignUpData} = require('../utils/validation')
const bcrypt = require('bcrypt')

authRouter.post("/signup", async (req, res) => {
    try {
      validateSignUpData(req)
      const {firstName,lastName,gender,email, password} = req.body;
      const bcyrptPassword = await bcrypt.hash(password,10)
      const user = new User({
        firstName,
        lastName,
        gender,
        email,
        password : bcyrptPassword
      })
      //Creating a nee instance of the user modal and passed data into it ,
      //  when i saved then the new document is added to the databse
    
      await user.save();
      res.json({message:"User added successfully",data:user});
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  authRouter.post('/login', async(req,res)=>{
    try{
      
    const {email,password} = req.body;
  
    const user = await User.findOne({email:email});
    
    if(!user){
      throw new Error("Invalid credentials")
    }
    
    const isPasswordValid  = await user.bcryptPass(password)
      if(isPasswordValid ){
        const token = await user.generateJwt()
        res.cookie("token", token, {
          expires: new Date(Date.now() + 8 * 3600000),
        });
        res.json({message:"User Logged in successfully",data:user});
      }
      else{
        throw new Error("Invalid credentials")
      }
  }catch(err){
    res.status(500).send("Internal Server error: "+ err.message)
  }
  })

  authRouter.post('/logout' , async(req,res)=>{
    res.cookie('token',null, {expires: new Date()}).send()
  })

  module.exports = authRouter