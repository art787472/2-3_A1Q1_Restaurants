const express = require('express')
require('dotenv').config()
const app = express()

const mongoose = require('mongoose') // 載入 mongoose
const uri = process.env.MONGODB_URI
const Restaurants = require('./models/restaurants') 
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})


const port = 3000

const apiKey = process.env.API_KEY
// require handle-bar
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting file location for static files
app.use(express.static('public'))

// 引用 body-parser
const bodyParser = require('body-parser')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// json file

//const restaurants = require('./restaurant.json')
const indexTitle = "我的餐廳"
app.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .then(restaurants => {
      res.render('index', { pageTitle: indexTitle, styleSheetLink: '/stylesheets/index.css', restaurants: restaurants })
    })
    .catch(console.error)
  
})

app.get('/restaurants/add', (req, res) => {
  res.render('addform')
})

app.post('/restaurants/new', (req, res) => {
   const restaurantData = req.body
   console.log(restaurantData)       // 從 req.body 拿出表單裡的 name 資料
  return Restaurants.create(restaurantData)     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
  
})

app.get('/restaurants/:restaurantId', (req, res) => {
   Restaurants.findById(req.params.restaurantId)
    .lean()
    .then(restaurant => {
      res.render('show', { pageTitle: restaurant.name, styleSheetLink: '/stylesheets/show.css', restaurant: restaurant, apiKey: apiKey })
    })
    .catch(console.error)
  
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