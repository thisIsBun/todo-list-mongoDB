import passport from "passport";
import LocalStrategy from "passport-local";
import User from '../models/user.js'

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
        if (user.password !== password) {
          req.flash('warning_msg', '密碼不正確。')
          return done(null, false)
        }
        return done(null, user)
      })
      .catch(error => {
        return done(error)
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