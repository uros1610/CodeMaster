const express = require('express')
const {submitSolution} = require('../controllers/submit.js');


const router = express.Router();


router.post("/",submitSolution);

module.exports = router;