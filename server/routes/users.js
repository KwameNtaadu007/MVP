const express = require('express')
const {
    signupUser,
    loginUser,
    getUsersList,
    postNewUser
} = require('../controllers/userController')
const { requireAuth, checkUser } = require('../controllers/middleware/authMiddleware')

const router = express.Router()

// signup user
router.post('/api/signup', signupUser)

// login user
router.post('/api/login', loginUser)

//-----------Authenticated Routes-----------------//

//fetch all user 
router.get('/api/users', checkUser ,getUsersList);

// POST route to create a new user 
router.post('/api/users', checkUser, postNewUser)


module.exports = router