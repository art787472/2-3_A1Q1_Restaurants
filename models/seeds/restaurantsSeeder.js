const Restaurants = require('../restaurants')
const User = require('../users')
const bcrypt = require('bcrypt')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// Load restaurants.json
const restaurantsJSON = require('./restaurant.json')
const restaurantsSeeds = restaurantsJSON.results

const SEED_USER1 = {
  email: 'user1@example.com',
  password: '12345678'
}

const SEED_USER2 = {
  email: 'user2@example.com',
  password: '12345678'
}

const db = require('../../config/mongoose')
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER1.password, salt))
    .then(hash => User.create({
      email: SEED_USER1.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id  
      return Promise.all(Array.from({ length: 3 }, (_, i) => Restaurants.create({...restaurantsSeeds[i], userId})))
    })
    .then(() => {
      console.log('User1 seed data generated.')
    })

  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER2.password, salt))
    .then(hash => User.create({
      email: SEED_USER2.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id  
      return Promise.all(Array.from({ length: 3 }, (_, i) => Restaurants.create({...restaurantsSeeds[i + 3], userId})))
    })
    .then(() => {
      console.log('User2 seed data generated.')
      process.exit()
    }) 
})

