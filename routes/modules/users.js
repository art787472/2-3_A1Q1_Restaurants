const express = require('express')
const router = express.Router()


router.get('/register', (req, res) => {
  return render('login')
})

router.post('/register', (req, res) => {
  return 
})

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', (req, res) => {
  return 
})

router.get('/logout', (req, res) => {
  return 
})

module.exports = router