import passport from "passport";
import LocalStrategy from "passport-local";
import FacebookStrategy from 'passport-facebook';
import User from '../models/user.js'
import bcryptjs from "bcryptjs";

const usePassport = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
    .then(user => {
        if (!user) {
          req.flash('warning_msg', 'Email 沒有註冊過。')
          return done(null, false)
        }
        return bcryptjs.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              req.flash('warning_msg', '密碼不正確。')
              return done(null, false)
            }
            return done(null, user)
          })
      })
      .catch(error => {
        return done(error)
      })
  }))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { email, name } = profile._json

    User.findOne({ email })
    .then(user => {
      if (user) {
        return done(null, user)
      }

      bcryptjs.genSalt(10)
      .then(salt => {
        const randomPassword = Math.random().toString(36).slice(-8);
        return bcryptjs.hash(randomPassword, salt)
      })
      .then(hash => User.create({ name, email, password: hash }))
      .then(user => done(null, user))
      .catch(error => done(error))
    })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => {
        done(null, user)
      })
      .catch(error => {
        done(error, null)
      })
  })
}

export default usePassport;