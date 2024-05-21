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


    const query = "SELECT id,problemTitle,date,verdictdescription,userName,language,code FROM Submission WHERE userName = ?"

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

const insertSubmission = (req,res) => {

    const code = req.body.code
    const date = new Date(req.body.date)

    const username = req.body.username
    const problemname = req.body.problemname
    const verdictdescription = req.body.verdictdescription
    const val = req.body.val;


    const query = "INSERT INTO Submission(date,problemTitle,userName,code,verdictdescription,language) VALUES(?)"
    const values = [date,problemname,username,code,verdictdescription,val]

    db.query(query,[values],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
        return res.status(200).json("Submission created!!!!!!!!")
    })
}

const getAllSubmissionsOneUserAccepted = (req,res) => {
    

    const query = "SELECT DISTINCT id,problemTitle,date,verdictdescription,userName,language FROM Submission WHERE verdictdescription = 'Accepted' "

    db.query(query,[],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }

        if(data.length === 0) {
            return res.status(404).json("No such user exists!")
        }

  
        res.status(200).json(data)
    })

}

module.exports = {getAllSubmissionsOneUser,getSubmissionByID,insertSubmission,getAllSubmissionsOneUserAccepted}