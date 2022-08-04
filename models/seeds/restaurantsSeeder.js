const Restaurants = require('../restaurants') // 載入 todo model

// Load restaurants.json
const restaurantsJSON = require('./restaurant.json')
const restaurantsSeeds = restaurantsJSON.results

const db = require('../../config/mongoose')
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let restaurant of restaurantsSeeds) {
    Restaurants.create(restaurant)
  }
  console.log('Seed generated.')
})

