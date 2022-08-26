const Restaurants = require('../restaurants')
const User = require('../users')
const bcrypt = require('bcrypt')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// Load restaurants.json
const restaurantsJSON = require('./restaurant.json')
const restaurantsSeeds = restaurantsJSON.results

const generateSeed = async (user, dataArr) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    const userData = await User.create({email: user.email, password: hash})
    const userId = userData._id
    const data = await Promise.all(Array.from({ length: dataArr.length }, (_, i) => Restaurants.create({...dataArr[i], userId})))

    return `${user.email} seed generated`

  } catch (err) {
    throw err
  }
}

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
  
   Promise.all([generateSeed(SEED_USER1, restaurantsSeeds.slice(0, 3)), generateSeed(SEED_USER2, restaurantsSeeds.slice(3, 6))])
    .then(data => data.forEach(seed => console.log(seed)))
    .then(() => {
      console.log('All seeds generated')
      process.exit()
    })
})

