const express = require('express');
const router = express.Router();
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const notfound = require('./modules/notfound')

router.use('/', home)
router.use('/restaurants', restaurants)
router.use('*', notfound)

module.exports = router