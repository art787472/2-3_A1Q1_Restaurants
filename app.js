const express = require('express')
require('dotenv').config()
require('./config/mongoose')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const routes = require('./routes')

const app = express()

const port = process.env.PORT || 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting file location for static files
app.use(express.static('public'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`app is on: localhost/${port}`)
})
