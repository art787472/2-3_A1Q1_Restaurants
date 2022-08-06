const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurants')
const indexTitle = '我的餐廳'

router.get('/', (req, res) => {
  const sortBy = req.query['sort-by'] || '_id'
  const order = Number(req.query.order) || 1
  let sortIcon = ''

  if (sortBy === '_id') {
    sortIcon = '<i class="fas fa-sort-amount-down"></i>'
  } else if (sortBy === 'name') {
    if (order === 1) sortIcon = '<i class="fas fa-sort-alpha-down"></i>'
    else sortIcon = '<i class="fas fa-sort-alpha-up"></i>'
  } else if (sortBy === 'location') {
    sortIcon = '<i class="fas fa-map-marker-alt"></i>'
  } else if (sortBy === 'category') {
    sortIcon = '<i class="fas fa-utensils"></i>'
  } else if (sortBy === 'rating') {
    if (order === 1) sortIcon = '<i class="fas fa-star"></i><i class="fas fa-sort-numeric-down"></i>'
    else sortIcon = '<i class="fas fa-star"></i><i class="fas fa-sort-numeric-up"></i>'
  }

  return Restaurants.find()
    .lean()
    .sort({ [sortBy]: order })
    .then(restaurants => {
      res.render('index', { pageTitle: indexTitle, styleSheetLink: '/stylesheets/index.css', restaurants, sortIcon })
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

router.delete('/', (req, res) => {
  console.log('delete')
  return res.end('delete')
})

module.exports = router
