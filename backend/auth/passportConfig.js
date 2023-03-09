const bcrypt = require("bcryptjs");
const db = require('../db')
const localStrategy = require("passport-local").Strategy;
const logger = require('../config/logger')

const matchPassword = async (password, hashPassword) => {
  const match = await bcrypt.compare(password, hashPassword);
  return match
};


module.exports = function (passport) {
  passport.use(
    new localStrategy(
      async (username, password, done) => {
        try {
          const user = await db.authUserByName(username)
          logger.log('debug', user);
          if (!user) return done(null, false, { message: 'User not Found' }); //add 'User not Found' in to the sessions 
          logger.debug(`user exists :)`);
          const isMatch = (password == user.password) //await matchPassword(password, user.password);
          if (!isMatch) return done(null, false, { message: 'Password not matched' });
          return done(null, { id: user.id, username: user.username });
        } catch (error) {
          logger.error(`error`);
          done(err)
        }
      })
  );

  passport.serializeUser((user, cb) => {
    console.log(user);
    cb(null, user.id);
  });
  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await db.getUserById(id)
      cb(null, user);
    } catch (err) {
      if (err) { cb(err) }
    }
  });

};

