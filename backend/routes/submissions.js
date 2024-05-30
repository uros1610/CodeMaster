const express = require('express')

const router = express.Router()
const {getSubmissionByID, getAllSubmissionsOneUser,insertSubmission,getAllSubmissionsAccepted,getAllSubmissionsGrouped, getNoSubmissions} = require('../controllers/submissions')

router.get('/allSubmissions/count/:username',getNoSubmissions);
router.get('/allSubmissionsGrouped/:username',getAllSubmissionsGrouped)
router.get('/accepted',getAllSubmissionsAccepted)
router.get('/:name/:id',getSubmissionByID)
router.get('/all/:name/:id',getAllSubmissionsOneUser)
router.post('/',insertSubmission)

module.exports = router