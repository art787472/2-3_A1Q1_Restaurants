const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurants')
const indexTitle = '我的餐廳'

router.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .then(restaurants => {
      res.render('index', { pageTitle: indexTitle, styleSheetLink: '/stylesheets/index.css', restaurants })
    })
    .catch(err => {
      return res.render('error', { errorMessage: err })
    })
})

router.get('/search', (req, res) => {
  const input = req.query.keyword
  const searchFilter = req.query.filter
  const keyword = input.trim().toLowerCase()
  return Restaurants.find({ [searchFilter]: { '$regex': keyword, '$options': 'i' } })
    .lean()
    .then(restaurants => {
      if (restaurants.length === 0) {
        return Restaurants.find().lean().then(restaurants => {
          return { results: [...restaurants], isNotFind: true }
        })
      }
      return { results: [...restaurants], isNotFind: false }
    })
    .then(restaurants => {
      res.render('index', { pageTitle: indexTitle, styleSheetLink: '/stylesheets/index.css', restaurants: restaurants.results, isNotFind: restaurants.isNotFind, searchKeyword: input })
    })
    .catch(err => {
      return res.render('error', { errorMessage: err })
    })
})

module.exports = router
