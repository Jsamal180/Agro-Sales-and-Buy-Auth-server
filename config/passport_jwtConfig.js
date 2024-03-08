const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');
require('dotenv').config();

//Option setup
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY
};

// Configure Passport to use JWT strategy
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    // Find user by id in payload
    const user = await User.findById(jwt_payload.sub);
    if (user) {
      // If user exists, return it
      return done(null, user);
    } else {
      // If user not found, return false
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;
