const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./../models/users')
const bcrypt = require('bcrypt')
const FacebookStrategy = require('passport-facebook').Strategy
require('dotenv').config()

const facebookId = process.env.FACEBOOK_ID
const facebookSecret = process.env.FACEBOOK_SECRET
const facebookCallback = process.env.FACEBOOK_CALLBACK
console.log(facebookId, facebookSecret)

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: '帳號不存在' })
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) return done(null, false, { message: 'email or password incorrect.' })
            return done(null, user)
          })
      })
      .catch(err => done(err))
  }))
  // set facebook login strategy
   passport.use(new FacebookStrategy({
    clientID: facebookId,
    clientSecret: facebookSecret,
    callbackURL: facebookCallback,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
        })
  }))
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}