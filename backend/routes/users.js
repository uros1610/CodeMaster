const express = require("express")

const router = express.Router()

const {getUser} = require('../controllers/user')


router.get("/:username",getUser)


module.exports = router