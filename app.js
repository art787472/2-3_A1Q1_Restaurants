const express = require('express')
require('dotenv').config()
const app = express()

const port = 3000

const apiKey = process.env.API_KEY
// require handle-bar
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting file location for static files
app.use(express.static('public'))

// json file

const restaurants = require('./restaurant.json')

app.get('/', (req, res) => {
  res.render('index', { pageTitle: 'Index Page', styleSheetLink: '/stylesheets/index.css', restaurants: restaurants.results })
})

app.get('/restaurants/:restaurantId', (req, res) => {
  const restaurant = restaurants.results.find(restaurant => restaurant.id.toString() === req.params.restaurantId)
  res.render('show', { pageTitle: 'Index Page', styleSheetLink: '/stylesheets/show.css', restaurant: restaurant, apiKey: apiKey })
})

app.get('/search', (req, res) => {
  const input = req.query.keyword
  const keyword = input.trim().toLowerCase()
  const restaurantsList = restaurants.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
  })
  if (restaurantsList.length === 0) {
    return res.render('index', {
    restaurants: restaurants.results, keyword, pageTitle: 'Search Page', styleSheetLink: '/stylesheets/index.css', input: '', isNotFind: true, searchKeyword: keyword
    
  })
  } 
     res.render('index', {
    restaurants: restaurantsList, keyword, pageTitle: 'Search Page', styleSheetLink: '/stylesheets/index.css', input, isNotFind: false
  })
  
 
})

app.listen(port)