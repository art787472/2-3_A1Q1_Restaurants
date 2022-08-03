const express = require('express')
require('dotenv').config()
const app = express()

const mongoose = require('mongoose') // 載入 mongoose
const uri = process.env.MONGODB_URI

// connect to database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

const port = 3000

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

const routes = require('./routes')

app.use(routes)

app.listen(port, () => {
  console.log(`app is on: localhost/${port}`)
})
