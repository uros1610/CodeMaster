const db = require('../db')


const getSubmissionByID = (req,res) => {
    const id = req.params.id
    const username = req.params.username

    const query = "SELECT code FROM Submissions WHERE id = ? AND userName = ?"

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

    const query = "SELECT id,problemTitle,date,Verdict.description FROM Submissions JOIN Verdict ON Submissions.verdictID = Verdict.id WHERE userName = ?"

    db.query(query,[username],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
  
        res.status(200).json(data)
    })

}

module.exports = {getAllSubmissionsOneUser,getSubmissionByID}