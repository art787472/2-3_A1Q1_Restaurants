const mongoose = require('mongoose')
const Restaurants = require('../restaurants') // 載入 todo model
require('dotenv').config() // 載入環境變數
const uri = process.env.MONGODB_URI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

// Load restaurants.json
const restaurantsJSON = require('./restaurant.json')
const restaurantsSeeds = restaurantsJSON.results

const db = mongoose.connection
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

