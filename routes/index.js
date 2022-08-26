const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const notfound = require('./modules/notfound')
const auth = require('./modules/auth')
const { authenticator } = require('./../middleware/auth')



router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)
router.use('*', notfound)

module.exports = router
