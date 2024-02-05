require('dotenv').config()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const ROLES_LIST = require('../config/roles_list')

const secret = process.env.ACCESS_TOKEN_SECRET;
const maxAge = 1 * 24 * 60 *60;

const createToken = (id,secret,maxAge)=>{
    return jwt.sign(id,secret,{
        expiresIn:maxAge
    })
}

// get a single user
const loginUser = async (req, res) => {
  const { email,password } = req.body
   // add doc to db
   try {
    const user = await User.login(email, password)
    const userRole = ROLES_LIST[user.role]

  
    //create token
    const token = createToken(
      {
        "userInfo":{
          "userID":user._id,
          "role":userRole,
        }
      },secret,maxAge)
    res.cookie('jwt',token,{httpOnly:true,maxAge: maxAge *1000})
    res.status(200).json({email,token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
 
}


// create new user
const signupUser = async (req, res) => {
    const { username, email} = req.body;
  try {
      // Check if the username or email is already in use
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ error: 'Username or email is already in use' });
      }

    const user = await User.signup(req.body)
    //create token
  
    const token = createToken(
      {
        "userInfo":{
          "userID":user._id,
          "role":userRole,
        }
      },secret,maxAge)
    res.cookie('jwt',token,{httpOnly:true,maxAge: maxAge *1000})
    res.status(201).json({user:user._id,token}) //sending of token should be reviewed for security reasons
  } catch (error) {
    // res.status(400).json({error: error.message})
    //console.log('Error creating user:', error);
    res.status(400).json({error: error.message});
  }
}


const getUsersList = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


const postNewUser = async (req, res) => {
    try {
      const { username, email} = req.body;
      // Check if the username or email is already in use
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ error: 'Username or email is already in use' });
      }

      const savedUser = await User.signup(req.body)
      // Respond with the created user
      res.status(201).json(savedUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports = {
  signupUser,
  loginUser,
  getUsersList,
  postNewUser
 
}