const express = require("express")
const {expressjwt} = require('express-jwt')

const router = express.Router()

require('dotenv').config()

const {getUser} = require('../controllers/user')

router.get("/:username",getUser)



module.exports = router