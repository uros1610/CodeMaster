const express = require('express')

const router = express.Router()
const {createContest,getAllContests,deleteContest,getProblemsByContest, getUsersByContest,registerUser,getContestsUser,deleteUserFromContest,updateUserProblem} = require('../controllers/contest.js')
const {verifyRoles} = require('../middleware/verifyRoles.js')

router.post("/register",registerUser)
router.put("/:contestName/:userName",updateUserProblem)
router.delete("/delete/:contestName/:userName",deleteUserFromContest)
router.get('/:contestName/users/:id',getUsersByContest)
router.get('/:contestName/standings',getProblemsByContest)
router.post('/addcontest',createContest)
router.get('/',getAllContests)
router.delete('/delete/:name',deleteContest)
router.get("/:contestName/:userName",getContestsUser)

module.exports = router