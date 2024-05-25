const express = require('express')
const {submitSolution} = require('../controllers/submit.js');
const router = express.Router();
const {expressjwt} = require('express-jwt');
require('dotenv').config()

router.post("/",expressjwt({ secret: process.env.SECRET_KEY, algorithms: ['HS256']}),submitSolution);

module.exports = router;