const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurants')

require('dotenv').config()
const apiKey = process.env.API_KEY

router.get('/new-page', (req, res) => {
  res.render('new', { apiKey })
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const restaurantData = req.body
  return Restaurants.create({...restaurantData, userId})
    .then(() => res.redirect('/'))
    .catch(err => {
      return res.render('error', { errorMessage: err })
    })
})

router.get('/:restaurantId/edit-page', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  return Restaurants.findOne({_id, userId})
    .lean()
    .then(restaurant => {
      const restaurantData = { ...restaurant }
      res.render('edit', { restaurant: restaurantData })
    })
    .catch(err => {
      return res.render('error', { errorMessage: err })
    })
})


router.get('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  Restaurants.findOne({ _id, userId })
    .lean()
    .then(restaurant => {
      res.render('show', { pageTitle: restaurant.name, styleSheetLink: '/stylesheets/show.css', restaurant, apiKey })
    })
    .catch(err => {
      return res.render('error', { errorMessage: err })
    })
})

router.put('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurants.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      restaurant.userId = userId
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => {
      return res.render('error', { errorMessage: err })
    })
})

router.delete('/:restaurantId', (req, res) => {
  const _id = req.params.restaurantId
  const userId = req.user._id
  return Restaurants.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => {
      return res.render('error', { errorMessage: err })
    })
})

module.exports = router
