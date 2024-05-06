const express = require("express")

const router = express.Router()

const {usersRating} = require('../controllers/rating')


router.get('/',usersRating)

module.exports = router