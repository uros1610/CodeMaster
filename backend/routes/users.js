const express = require("express")
const {expressjwt} = require('express-jwt')

const router = express.Router()

require('dotenv').config()

const {getUser} = require('../controllers/user')
const {getAllSubmissionsOneUser,getSubmissionByID} = require('../controllers/submissions')

router.get("/:username",getUser)
router.get("/submissions/:username",getAllSubmissionsOneUser)



module.exports = router