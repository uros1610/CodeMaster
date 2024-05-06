const express = require('express')
const router = express.Router();
const {getProblemByName,allProblems} = require('../controllers/problem')


router.get('/:name',getProblemByName)
router.get('/',allProblems)

module.exports = router