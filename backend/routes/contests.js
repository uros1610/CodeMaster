const express = require('express')

const router = express.Router()
const {createContest,getAllContests,deleteContest,getProblemsByContest, getUsersByContest,registerUser,getContestsUser,deleteUserFromContest,updateUserProblem,setProcessedTrue,
updateRatingChange,getCount} = require('../controllers/contest.js')
const {expressjwt} = require('express-jwt');
require('dotenv').config()
const {verifyAdmin} = require('../middleware/verifyToken')

router.put("/:userName/:contestName/updateRatingChange",updateRatingChange);
router.put("/updateProcessed",setProcessedTrue);



router.get("/:contestName/count",getCount)
router.post("/register",expressjwt({ secret: process.env.SECRET_KEY, algorithms: ['HS256']}),registerUser)
router.put("/:contestName/:userName",updateUserProblem)
router.delete("/delete/:contestName/:userName",deleteUserFromContest)
router.get('/:contestName/users/:id',getUsersByContest)
router.get('/:contestName/problems',getProblemsByContest)
router.delete('/delete/:name',verifyAdmin,deleteContest)
router.get("/:contestName/:userName",getContestsUser)

router.post('/addcontest',verifyAdmin,createContest)
router.get('/',getAllContests)


module.exports = router