const db = require('../db')
const jwt = require('jsonwebtoken')

const getSubmissionByID = (req,res) => {
    
    
    const id = req.params.id
    const username = req.params.name


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
    const username = req.params.name

    console.log("USERNAME",username)

    const query = "SELECT id,problemTitle,date,verdictdescription,userName FROM Submission WHERE userName = ?"

    db.query(query,[username],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }

        if(data.length === 0) {
            return res.status(404).json("No such user exists!")
        }

        console.log(data)
  
        res.status(200).json(data)
    })

}

const insertSubmission = (req,res) => {

    const code = req.body.code
    const date = new Date(req.body.date)

    const username = req.body.username
    const problemname = req.body.problemname

    console.log(req.body)

    const query = "INSERT INTO Submission(date,problemTitle,userName,code,verdictdescription) VALUES(?)"
    const values = [date,problemname,username,code,"Test"]

    db.query(query,[values],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
        return res.status(200).json("Submission created!!!!!!!!")
    })
}

module.exports = {getAllSubmissionsOneUser,getSubmissionByID,insertSubmission}