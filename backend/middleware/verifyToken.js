
const jwt = require('jsonwebtoken')
require('dotenv').config();

const verifyAdmin = (req,res,next) => {

    if(!req.headers.authorization) {
        return res.status(401).json("Access denied!")
    }

    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token,process.env.SECRET_KEY);

    if(decoded.role !== "Admin") {
        return res.status(403).json("Access denied!")
    }
    else {
        next();
    }

}

module.exports = {verifyAdmin}