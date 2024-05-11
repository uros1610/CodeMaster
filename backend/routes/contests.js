const express = require('express')

const router = express.Router()
const {createContest,getAllContests,deleteContest} = require('../controllers/contest.js')
const {verifyRoles} = require('../middleware/verifyRoles.js')

router.post('/addcontest',createContest)
router.get('/',getAllContests)
router.delete('/delete/:name',deleteContest)

module.exports = router