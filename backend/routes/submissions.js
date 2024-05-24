const express = require('express')

const router = express.Router()
const {getSubmissionByID, getAllSubmissionsOneUser,insertSubmission,getAllSubmissionsOneUserAccepted} = require('../controllers/submissions')


router.get('/accepted',getAllSubmissionsOneUserAccepted)
router.get('/:name/:id',getSubmissionByID)
router.get('/:name',getAllSubmissionsOneUser)
router.post('/',insertSubmission)

module.exports = router