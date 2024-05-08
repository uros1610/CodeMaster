const express = require("express")

const {expressjwt} = require('express-jwt')

const {getProblemByName} = require('../controllers/problem')

const router = express.Router()

require('dotenv').config()

router.get('/:name',expressjwt({ secret: process.env.SECRET_KEY,algorithms: ['HS256']}),getProblemByName)

module.exports = router