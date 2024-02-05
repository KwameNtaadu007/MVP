const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config();


//handle errors
const handleErrors = (err) =>{
    console.log(err.message,err.code)
    let errors = {email:'',password:''};

    if(err.message === 'incorrect email'){
        errors.email = 'that email is not registered';
    }
    if(err.message === 'incorrect password'){
        errors.password = 'that password is incorrect';
    }

    if(err.code == 11000){
        errors.email = 'that email is already registered ';
        return errors; 
    }

    //validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path]=properties.message;
        })
    }
    return errors;
}

const createToken = (id,secret,maxAge)=>{
    return jwt.sign({id},secret,{
        expiresIn:maxAge
    })
}


module.exports.signup_post = async (req,res)=>{
    const {email,password} = req.body;
    const maxAge = 3 * 24 * 60 *60;
    const secret = process.env.ACCESS_TOKEN_SECRET;

    try {
       const user = await User.create({
        username,
        email,
        password,
        name,
        profilePicture,
        bio,
        role: role || 'user',
        
       });
        


       const token = createToken(user._id,secret,maxAge)
       res.cookie('jwt',token,{httpOnly:true,maxAge: maxAge *1000})
       res.status(201).json({user:user._id})
    } catch (err) {
       const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

module.exports.login_post = async (req,res)=>{
    const maxAge = 3 * 24 * 60 *60;
    const secret = process.env.ACCESS_TOKEN_SECRET;

    const {email,password} = req.body;
    
   try {
        const user = await User.login(email,password);
        const token = createToken(user._id,secret,maxAge);
        res.cookie('jwt',token,{httpOnly:true,maxAge: maxAge *1000})
        res.status(200).json({user:user._id})
   } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
   }
}


module.exports.logout_get = (req,res)=>{
    res.cookie('jwt', '', {maxAge:1})
    res.redirect('/');
}