const express = require('express')

const router = express.Router()

const {insertIO,getInputs,getOutputs} = require('../controllers/inputoutput')

router.get("/input/:name",getInputs)
router.get("/output/:name",getOutputs)
router.post('/',insertIO)


module.exports = router