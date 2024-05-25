const express = require('express')

const router = express.Router()
const {getSubmissionByID, getAllSubmissionsOneUser,insertSubmission,getAllSubmissionsAccepted} = require('../controllers/submissions')


router.get('/accepted',getAllSubmissionsAccepted)
router.get('/:name/:id',getSubmissionByID)
router.get('/:name',getAllSubmissionsOneUser)
router.post('/',insertSubmission)

module.exports = router