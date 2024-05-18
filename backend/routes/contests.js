const express = require('express')

const router = express.Router()
const {createContest,getAllContests,deleteContest,getProblemsByContest, getUsersByContest} = require('../controllers/contest.js')
const {verifyRoles} = require('../middleware/verifyRoles.js')

router.get('/:contestName/users/:id',getUsersByContest)
router.get('/:contestName/standings',getProblemsByContest)
router.post('/addcontest',createContest)
router.get('/',getAllContests)
router.delete('/delete/:name',deleteContest)

module.exports = router