const express = require("express")
const {expressjwt} = require('express-jwt')

const router = express.Router()

require('dotenv').config()

const {getUser, getUsersRating,getUsers,deleteUser,filterUsers,noUsers, updateRole,updateRating} = require('../controllers/user')

router.get("/allusersCount",noUsers)
router.get("/rating/:id",getUsersRating)
router.get("/allusers/:id",getUsers)
router.delete("/:username",deleteUser)
router.get("/filteredusers/:id",filterUsers);
router.get("/:username",getUser)
router.put("/updateRole/:username/:rola",updateRole);
router.put("/:username/rating",updateRating)



module.exports = router