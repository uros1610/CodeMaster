const express = require('express')

const router = express.Router()
const {createContest,getAllContests} = require('../controllers/contest.js')

router.post('/addcontest',createContest)
router.get('/',getAllContests)

module.exports = router