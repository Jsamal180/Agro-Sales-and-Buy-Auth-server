const connectDB = require('../config/mongoDBConfig');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');

// This is a function to add user to my DB
module.exports.signup = async(req, res) => {
    const result = await User.findOne({ email: req.body.email });
    // If user is present before, give appropriate message without adding duplicate entry
    if (result) {
        return res.json({
            message: "Email address is already present!"
        });
    }
    userData = {
        name : req.body.name,
        age : req.body.age,
        gender : req.body.gender,
        email : req.body.email,
        password : req.body.password,
        phoneNumber : req.body.phoneNumber,
        location : req.body.location
    }
    User.create(userData)
    .then(user => {
        console.log('User created:', user);
        res.json({
            message: 'User created successfully'
        });
    })
    .catch(err => {
        console.error('Error creating user:', err);
        res.status(500).json({
            message: 'Error creating user in the process'
        });
    });
   
}

module.exports.login = async(req, res) => {
    email = req.body.email;
    password = req.body.password;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}