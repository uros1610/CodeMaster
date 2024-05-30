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

const getNoSubmissions = (req,res) => {
    const username = req.params.username
    


    const query = "SELECT COUNT(*) AS broj FROM Submission WHERE userName = ? "

    db.query(query,[username],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
 
        
        res.status(200).json(data)
    })

}


const getAllSubmissionsOneUser = (req,res) => {
    const username = req.params.name
    const id = req.params.id;


    const query = "SELECT id,problemTitle,s.date AS submissionDate,verdictdescription,userName,language,code,c.length,c.date AS contestDate FROM Submission s INNER JOIN Problem p ON p.title = s.problemTitle INNER JOIN Contest c ON p.contest_name = c.name WHERE userName = ? ORDER BY ID DESC LIMIT ?,?"

    db.query(query,[username,(id-1)*20,20],(err,data) => {
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

const getAllSubmissionsAccepted = (req,res) => {
    

    const query = `
    SELECT DISTINCT s.id, s.problemTitle, s.date, s.verdictdescription, s.userName, s.language 
FROM Submission s 
INNER JOIN Problem p ON s.problemTitle = p.title 
INNER JOIN Contest c ON c.name = p.contest_name 
WHERE s.verdictdescription = 'Accepted' 
AND s.date BETWEEN c.date AND DATE_ADD(c.date, INTERVAL c.length MINUTE)
`;
    db.query(query,[],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }

  
        res.status(200).json(data)
    })

}

const getAllSubmissionsGrouped = (req,res) => {

    const q = `SELECT s.*
    FROM Submission s
    JOIN (
        SELECT problemTitle, MIN(date) AS firstDate
        FROM Submission
        WHERE userName = ?
        GROUP BY problemTitle
    ) AS first_submissions ON s.problemTitle = first_submissions.problemTitle AND s.date = first_submissions.firstDate
    WHERE s.userName = ? `

    db.query(q,[req.params.username,req.params.username],(err,data) => {
        if(err) {
            return res.status(500).json("Internal server error!")
        }
        else {
            return res.status(200).json(data);
        }
    })
}

module.exports = {getAllSubmissionsOneUser,getSubmissionByID,insertSubmission,getAllSubmissionsAccepted,getAllSubmissionsGrouped,getNoSubmissions}