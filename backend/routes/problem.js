const express = require('express')
const router = express.Router();
const {getProblemByName,allProblems,addProblem} = require('../controllers/problem')


router.get('/:name',getProblemByName)
router.get('/',allProblems)
router.post('/',addProblem)

module.exports = router