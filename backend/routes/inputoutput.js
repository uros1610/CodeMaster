const express = require('express')

const router = express.Router()

const insertIO = require('../controllers/inputoutput')


router.post('/',insertIO)

module.exports = router