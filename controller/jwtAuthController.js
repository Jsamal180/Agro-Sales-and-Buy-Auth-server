const connectDB = require('../config/mongoDBConfig');
const User = require('../models/userModel');

// This is a function to add user to my DB
module.exports.signup = async(req, res) => {
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
            message: 'Error creating user'
        });
    });
   
}
module.exports.login = (req, res) => {
    //Handle Login
}