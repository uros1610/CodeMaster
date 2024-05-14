const express = require('express')
const {expressjwt} = require('express-jwt')

const router = express.Router()
const {getSubmissionByID, getAllSubmissionsOneUser,insertSubmission} = require('../controllers/submissions')

router.get('/:name/:id',getSubmissionByID)
router.get('/:name',getAllSubmissionsOneUser)
router.post('/',insertSubmission)

module.exports = router