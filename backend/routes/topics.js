const express = require("express")

const router = express.Router()

const {getTopic} = require('../controllers/topics')


router.get('/:topicName',getTopic)

module.exports = router