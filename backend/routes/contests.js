const express = require('express')

const router = express.Router()
const {createContest,getAllContests,deleteContest,getProblemsByContest, getUsersByContest,registerUser,getContestsUser,deleteUserFromContest,updateUserProblem,setProcessedTrue} = require('../controllers/contest.js')
const {verifyRoles} = require('../middleware/verifyRoles.js')

router.post("/register",registerUser)
router.put("/:contestName/:userName",updateUserProblem)
router.delete("/delete/:contestName/:userName",deleteUserFromContest)
router.get('/:contestName/users/:id',getUsersByContest)
router.get('/:contestName/problems',getProblemsByContest)
router.post('/addcontest',createContest)
router.get('/',getAllContests)
router.delete('/delete/:name',deleteContest)
router.get("/:contestName/:userName",getContestsUser)
router.put("/updateProcessed",setProcessedTrue);

module.exports = router