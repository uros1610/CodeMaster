const db = require('../db')
const jwt = require('jsonwebtoken')

const getSubmissionByID = (req,res) => {
    
    
    const id = req.params.id
    const username = req.params.username

    const query = "SELECT code FROM Submission WHERE id = ? AND userName = ?"

    db.query(query,[id,username],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
        const responseObj = {code:data[0].code}

        res.status(200).json(responseObj)
    })
}

const getAllSubmissionsOneUser = (req,res) => {
    const username = req.params.username

    const query = "SELECT Submission.id,problemTitle,date,Verdict.description FROM Submission JOIN Verdict ON Submission.verdictID = Verdict.id WHERE userName = ?"

    db.query(query,[username],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }

        if(data.length === 0) {
            return res.status(404).json("No such user exists!")
        }
  
        res.status(200).json(data)
    })

}

module.exports = {getAllSubmissionsOneUser,getSubmissionByID}