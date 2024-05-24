const express = require('express')
const router = express.Router();
const {getProblemByName,allProblems,addProblem,getInputs,getOutputs,getCount} = require('../controllers/problem')
const {expressjwt} = require('express-jwt');
require('dotenv').config()


router.use(expressjwt({ secret: process.env.SECRET_KEY, algorithms: ['HS256']}));

router.get('/problemCount',getCount)
router.get('/singleproblem/:name',getProblemByName)
router.get('/problemset/:id',allProblems)

router.post('/',addProblem)
router.get("/inputs/:name",getInputs)
router.get("/outputs/:name",getOutputs)

module.exports = router