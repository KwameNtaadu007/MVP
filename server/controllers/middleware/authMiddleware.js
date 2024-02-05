const jwt = require('jsonwebtoken');
const ROLES_LIST = require('../../config/roles_list')
require('dotenv').config()


function getKeyByValue(value) {
    for (const [key, val] of Object.entries(ROLES_LIST)) {
      if (val === value) {
        return key;
      }
    }
    return null; // Return null if no matching key is found
  }


const requireAuth =  (req, res, next) =>{

    const token = req.cookies.jwt;
    try {
           // check if json web token exist and if verified
        if(token){
          jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken)=>{
              if(err){
                  console.log(err.message);
                  res.status(401).send('you are not authorized');
              }else{
                  console.log(decodedToken)
                  next()
              }
          })
      }else{
          res.status(401).send('you are not authorized');
      }
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
 
}

//check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    if (token) {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      console.log(decodedToken);

      const userRole = getKeyByValue(decodedToken.userInfo?.role);

      if (userRole === 'admin') {
        res.locals.role = 'admin';
      }

      // Continue to the next middleware or route handler
      next();
    } else {
      // Continue to the next middleware or route handler
      res.status(401).send('You are not authorized');
    }
  } catch (err) {
    console.log(err.message);
    // Handle the error as needed
    res.status(401).send('You are not authorized');
  }
};

module.exports = {requireAuth,checkUser};