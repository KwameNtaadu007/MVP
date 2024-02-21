const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // Import JSON Web Token for authentication
require('dotenv').config(); // Import dotenv to access environment variables

// Function to handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // Handle incorrect email and password errors
    if (err.message === 'incorrect email') {
        errors.email = 'that email is not registered';
    }
    if (err.message === 'incorrect password') {
        errors.password = 'that password is incorrect';
    }

    // Handle duplicate email error
    if (err.code == 11000) {
        errors.email = 'that email is already registered ';
        return errors;
    }

    // Handle validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};

// Function to create JSON Web Token
const createToken = (id, secret, maxAge) => {
    return jwt.sign({ id }, secret, {
        expiresIn: maxAge
    });
};

// Controller for user signup
module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    const maxAge = 3 * 24 * 60 * 60; // 3 days
    const secret = process.env.ACCESS_TOKEN_SECRET; // Secret key for JWT

    try {
        // Create a new user
        const user = await User.create({
            username,
            email,
            password,
            name,
            profilePicture,
            bio,
            role: role || 'user', // Set default role to 'user'
        });

        // Generate JWT token
        const token = createToken(user._id, secret, maxAge);

        // Set JWT token in cookie
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        // Send response with user ID
        res.status(201).json({ user: user._id });
    } catch (err) {
        // Handle errors
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

// Controller for user login
module.exports.login_post = async (req, res) => {
    const maxAge = 3 * 24 * 60 * 60; // 3 days
    const secret = process.env.ACCESS_TOKEN_SECRET; // Secret key for JWT

    const { email, password } = req.body;

    try {
        // Attempt to log in the user
        const user = await User.login(email, password);

        // Generate JWT token
        const token = createToken(user._id, secret, maxAge);

        // Set JWT token in cookie
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        // Send response with user ID
        res.status(200).json({ user: user._id });
    } catch (err) {
        // Handle errors
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

// Controller for user logout
module.exports.logout_get = (req, res) => {
    // Clear JWT token from cookie
    res.cookie('jwt', '', { maxAge: 1 });

    // Redirect to homepage
    res.redirect('/');
};
