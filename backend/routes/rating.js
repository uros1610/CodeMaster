const express = require("express")

const router = express.Router()

const {usersRating} = require('../controllers/rating')
const {expressjwt} = require('express-jwt')


router.get('/',usersRating)

module.exports = router