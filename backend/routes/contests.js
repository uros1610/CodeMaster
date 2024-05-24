const express = require('express')

const router = express.Router()
const {createContest,getAllContests,deleteContest,getProblemsByContest, getUsersByContest,registerUser,getContestsUser,deleteUserFromContest,updateUserProblem,setProcessedTrue} = require('../controllers/contest.js')
const {expressjwt} = require('express-jwt');
require('dotenv').config()
const {verifyAdmin} = require('../middleware/verifyToken')

router.use(expressjwt({ secret: process.env.SECRET_KEY, algorithms: ['HS256']}));


router.post("/register",registerUser)
router.put("/:contestName/:userName",updateUserProblem)
router.delete("/delete/:contestName/:userName",deleteUserFromContest)
router.get('/:contestName/users/:id',getUsersByContest)
router.get('/:contestName/problems',getProblemsByContest)
router.post('/addcontest',verifyAdmin,createContest)
router.get('/',getAllContests)
router.delete('/delete/:name',verifyAdmin,deleteContest)
router.get("/:contestName/:userName",getContestsUser)
router.put("/updateProcessed",setProcessedTrue);

module.exports = router