const express = require('express')
const router = express.Router();
const {getProblemByName,allProblems,addProblem,getInputs,getOutputs,getCount,insertProblemTopic,getTopics} = require('../controllers/problem')
const {verifyAdmin} = require('../middleware/verifyToken');
const {expressjwt} = require('express-jwt');
require('dotenv').config()


router.get('/problemTopic/:name',getTopics)
router.get("/inputs/:name",getInputs)
router.get("/outputs/:name",getOutputs)
router.get('/singleproblem/:name',expressjwt({ secret: process.env.SECRET_KEY, algorithms: ['HS256']}),getProblemByName)
router.post('/problemTopic',verifyAdmin,insertProblemTopic)
router.get('/problemCount',getCount)
router.get('/problemset/:id',expressjwt({ secret: process.env.SECRET_KEY, algorithms: ['HS256']}),allProblems)

router.post('/',verifyAdmin,addProblem);


module.exports = router