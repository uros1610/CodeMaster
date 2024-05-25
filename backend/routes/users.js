const express = require("express")
const router = express.Router()
const {getUser, getUsersRating,getUsers,deleteUser,filterUsers,noUsers, updateRole,updateRating,getAllContestsOneUser} = require('../controllers/user')
const {verifyAdmin} = require('../middleware/verifyToken')
const {expressjwt} = require('express-jwt');
require('dotenv').config()


router.get("/allusersCount",noUsers)
router.get("/rating/:id",getUsersRating)
router.get("/allusers/:id",getUsers)
router.delete("/:username",verifyAdmin,deleteUser)
router.get("/filteredusers/:id",filterUsers);
router.get("/:username",getUser)
router.put("/updateRole/:username/:rola",verifyAdmin,updateRole);
router.put("/:username/rating",updateRating)
router.get("/contests/:username",getAllContestsOneUser);



module.exports = router