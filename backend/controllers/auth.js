const db = require("../db")
var bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken')

const register = (req,res) => {

   
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    const confpassword = req.body.confirmpassword

    if(confpassword!==password) {
        return res.status(400).json({message:"Passwords don't match"})
    }

    const query = 'SELECT * FROM User WHERE username = ? OR email = ?'

    db.query(query,[username,email],(err,data) => {
        if(err) return res.json(err)

        if(data.length) return res.status(409).json({message:"Username already exists!"})

        var salt = bcrypt.genSaltSync(10)
        var hashed = bcrypt.hashSync(password,salt)

        const query = "INSERT INTO User(username,password,email,rating,idRole) VALUES(?)"
        const values = [username,hashed,email,1300,1]

        db.query(query,[values],(err,data) => {
            if(err) return res.json(err)

            return res.status(200).json("User has successfully been registered");
        });
        
    });


}

const login = (req,res) => {

   

    const username = req.body.username
    const password = req.body.password

    
    const query = `SELECT * FROM User WHERE username = ? OR email = ?`

    db.query(query,[username,password],(err,data) => {
        if(err) return res.json(err)

        if(data.length === 0) return res.status(401).json({message:"Invalid username/email!"})

        const correctPassword = bcrypt.compareSync(password,data[0].password)

        if(!correctPassword) return res.status(401).json({message:"Incorrect password!"})

        const token = jwt.sign(data[0].username,"secret-key")

        const sendObj = {username:req.body.username,email:req.body.email}

        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json(sendObj)


    })
}

const logout = (req,res) => {

    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out")
}

module.exports = {register,login,logout}