const express = require("express")

const router = express.Router()

const {getUser} = require('../controllers/user')
const {getAllSubmissionsOneUser,getSubmissionByID} = require('../controllers/submissions')

router.get("/:username",getUser)
router.get("/submissions/:username",getAllSubmissionsOneUser)



module.exports = router