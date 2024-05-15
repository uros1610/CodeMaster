const express = require('express')
const router = express.Router();
const {getProblemByName,allProblems,addProblem,getInputs,getOutputs} = require('../controllers/problem')

router.get('/singleproblem/:name',getProblemByName)
router.get('/problemset',allProblems)

router.post('/',addProblem)
router.get("/inputs/:name",getInputs)
router.get("/outputs/:name",getOutputs)

module.exports = router