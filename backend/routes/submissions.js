const express = require('express')

const router = express.Router()
const {getSubmissionByID, getAllSubmissionsOneUser} = require('../controllers/submissions')

router.get('/:name',getAllSubmissionsOneUser)
router.get('/:name/:id',getSubmissionByID,getSubmissionByID)

module.exports = router