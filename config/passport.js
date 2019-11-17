const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../db/index.js').User;

module.exports = function(passport) {
  console.log('ran')
  passport.use(new LocalStrategy(
    function(email, password, done) {
      User.findOne({email}, (err, user) => {
        console.log('trying to find a user')
        if (err) throw err;
        if (!user) {
          return done(null, false, {message: 'Unknown User'})
        }

        bcrypt.comparePassword(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            console.log('it worked')
            return done(null, user);
          } else {
            console.log('invalid pass')
            return done(null, false, {message: 'Invalid Password'});
          }
        })
      })
  }));

  passport.serializeUser(function(user, done) {
    console.log('called')
    done(null, user.id);
  });

  passport.deserializeUser(function(email, done) {
    console.log('called')
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

}