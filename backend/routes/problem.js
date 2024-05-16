const express = require('express')
const router = express.Router();
const {getProblemByName,allProblems,addProblem,getInputs,getOutputs,getCount} = require('../controllers/problem')

router.get('/problemCount',getCount)
router.get('/singleproblem/:name',getProblemByName)
router.get('/problemset/:id',allProblems)

router.post('/',addProblem)
router.get("/inputs/:name",getInputs)
router.get("/outputs/:name",getOutputs)

module.exports = router