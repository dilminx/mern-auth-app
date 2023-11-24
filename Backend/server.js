const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();



const User = require('./Model/model');
const app = express();
const SECRRET_KEY = 'secrretkey';

//Data Base Connection

mongoose.connect(process.env.URL)
   .then(()=>{
    console.log('db conected'),
    app.listen(8000,()=>{console.log(`app listning  port 8000`)});
})
.catch((e)=>{
    console.log('db not conected');

})
//middleware handle
app.use(bodyParser.json());
app.use(cors());


//route
app.post('/register', async(req, res)=>{
    try{
        const{email,username,password}= req.body
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({email,username,password:hashedPassword})
        await newUser.save()
        res.status(200).json({message:"user created successfully"})
    }catch(error){
        res.status(500).json({message:'error save user',error})
    }

})

app.get('/register', async(req, res) => {
    try{
        const users = await User.find()
        res.status(200).json({message:"users get successfully",users})
    }catch(error){
        res.status(500).json({message:'error get users',error})
    }
})


//get login

app.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body
        const user = await User.findOne({username:username})
        if(!user){
            return res.status(404).json({message:'Not found User name'})
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(404).json({message:'Invalid password'})
        }
        const token = jwt.sign({userId:user._id},SECRRET_KEY,{expiresIn:'1hr'})
        res.json({message:'Login Successful'})
    }catch(e){
        res.status(404).json({message:'error log in',e})
    }
})