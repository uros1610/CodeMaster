const express = require("express")
const router = express.Router()
const {getUser, getUsersRating,getUsers,deleteUser,filterUsers,noUsers, updateRole,updateRating,getAllContestsOneUser} = require('../controllers/user')
const {verifyAdmin} = require('../middleware/verifyToken')
const {expressjwt} = require('express-jwt');
require('dotenv').config()


router.get("/allusersCount",noUsers)
router.get("/rating/:id",expressjwt({ secret: process.env.SECRET_KEY, algorithms: ['HS256']}),getUsersRating)
router.get("/allusers/:id",getUsers)
router.delete("/:username",verifyAdmin,deleteUser)
router.get("/filteredusers/:id",expressjwt({ secret: process.env.SECRET_KEY, algorithms: ['HS256']}),filterUsers);
router.get("/:username",expressjwt({ secret: process.env.SECRET_KEY, algorithms: ['HS256']}),getUser)
router.put("/updateRole/:username/:rola",verifyAdmin,updateRole);
router.put("/:username/rating",updateRating)
router.get("/contests/:username",expressjwt({ secret: process.env.SECRET_KEY, algorithms: ['HS256']}),getAllContestsOneUser);



module.exports = router