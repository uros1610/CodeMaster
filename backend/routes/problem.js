const express = require('express')
const router = express.Router();
const {getProblemByName,allProblems,addProblem} = require('../controllers/problem')


router.get('/problemset',allProblems)
router.get('/:name',getProblemByName)

router.post('/',addProblem)

module.exports = router