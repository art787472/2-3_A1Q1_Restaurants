const express = require('express')
const router = express.Router()

const Restaurants = require('../../models/restaurants') 

require('dotenv').config()
const apiKey = process.env.API_KEY

router.get('/new-page', (req, res) => {
  res.render('addform')
})

router.post('/new', (req, res) => {
   const restaurantData = req.body
      // 從 req.body 拿出表單裡的 name 資料
  return Restaurants.create(restaurantData)     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(err => {
      console.error(err)
      return res.redirect('../')
    })
  
})

router.get('/:restaurantId/edit-page', (req, res) => {
  const id = req.params.restaurantId
  return Restaurants.findById(id)
    .lean()
    .then(restaurant => {
      const restaurantData = {...restaurant}
      res.render('edit', {restaurant: restaurantData})
    })
    .catch(err => {
      console.error(err)
      return res.redirect('../')
    })
})

router.get('/:restaurantId', (req, res) => {
   Restaurants.findById(req.params.restaurantId)
    .lean()
    .then(restaurant => {
      res.render('show', { pageTitle: restaurant.name, styleSheetLink: '/stylesheets/show.css', restaurant: restaurant, apiKey: apiKey })
    })
    .catch(err => {
      console.error(err)
      return res.redirect('../')
    })
})


router.post('/:restaurantId/edit', (req, res) => {
  const id = req.params.restaurantId
  const {name, name_en, category, image, location, phone, google_map, rating, description} = req.body
  const editedData = req.body
  return Restaurants.findById(id)
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
      return restaurant.save()
    })
    .then(()=> res.redirect(`/restaurants/${id}`))
    .catch(err => {
      console.error(err)
      return res.redirect('../')
    })
})

router.post('/:restaurantId/delete', (req, res) => {
  const id = req.params.restaurantId
  return Restaurants.findById(id)
    .then(restaurant => restaurant.remove())
    .then(()=> res.redirect('/'))
    .catch(err => {
      console.error(err)
      return res.redirect('../')
    })
})



module.exports = router