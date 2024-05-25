const db = require('../db')

const createContest = async (req,res) => {
   
    const name = req.body.name;
    const authors = req.body.authors;
    const date = new Date(req.body.date)

    

    const query = "SELECT * From Contest WHERE name = ?"

    db.query(query,[name],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }

        if(data.length) {
            return res.status(409).json({message:"Contest with that name already exists!"})
        }



        const queryInsert = "INSERT INTO Contest(name,date,authors,length,processed) VALUES(?)"
        const values = [name,date,authors,req.body.length,false]

        db.query(queryInsert,[values],(err, data) => {
            if(err) {
                return res.status(500).json(err)
            }

            return res.status(200).json("Contest has been successfully created")

        })
    })

   
}

const getAllContests = (req,res) => {
    const query = 'SELECT * From Contest'

    

    db.query(query,[],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }

        return res.status(200).json(data)
    })
}

const deleteContest = (req,res) => {
    const name = req.params.name
    const query = 'DELETE FROM Contest WHERE name = ? '

    db.query(query,[name],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
        return res.status(204).json("Contest has been removed")
    })
}

const getProblemsByContest = (req,res) => {
    const q = "SELECT * FROM Problem WHERE contest_name = ?"
    const contestName = req.params.contestName;

    db.query(q,[contestName],(err,data) => {
        if(err) {
            return res.status(500).json("Internal server error!")
        }
        if(!data.length) {
            return res.status(404)
        }
        return res.status(200).json(data)
    })
}

const getUsersByContest = (req,res) => {
    const q = "SELECT * FROM ContestUser cu INNER JOIN User u ON cu.userName = u.username WHERE contestName = ? LIMIT ?,?"
    const contestName = req.params.contestName;
    const id = req.params.id;

    console.log("usao ovdje",id)

    const limit = 100;
    const offset = (id-1)*100;

    db.query(q,[contestName,offset,limit],(err,data) => {
        if(err) {
            return res.status(500).json("Internal server error!")
        }
        return res.status(200).json(data)
    })
}

const registerUser = (req,res) => {
    const q = "INSERT INTO ContestUser(ranking,ratingGain,numOfSolved,contestName,userName) VALUES(?)"
    const values = [0,0,0,req.body.contestName,req.body.user]


    db.query(q,[values],(err,data) => {
        if(err) {
            return res.status(500).json("Internal server error!")
        }

        else {
            return res.status(200).json("User has been succesfully registered!")
        }
    })
}

const getContestsUser = (req,res) => {
    const query = 'SELECT * From ContestUser WHERE contestName = ? AND userName = ?'

    

    db.query(query,[req.params.contestName,req.params.userName],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
        
        return res.status(200).json(data)
    })
}

const deleteUserFromContest = (req,res) => {
    const query = 'DELETE From ContestUser WHERE contestName = ? AND userName = ?'

    

    db.query(query,[req.params.contestName,req.params.userName],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
        
        return res.status(200).json(data)
    })
}

const updateUserProblem = (req,res) => {
    const query = 'UPDATE ContestUser SET ranking = ranking + ? , numOfSolved = numOfSolved + 1 WHERE contestName = ? AND userName = ?'


    db.query(query,[req.body.diff,req.params.contestName,req.params.userName],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
        
        return res.status(200).json(data)
    })
}

const updateRatingChange = (req,res) => {
    const query = 'UPDATE ContestUser SET ratingGain = ? , placed = ?  WHERE contestName = ? AND userName = ?'


    db.query(query,[req.body.ratingChange,req.body.placed,req.params.contestName,req.params.userName],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
        
        return res.status(200).json(data)
    })
}


const setProcessedTrue = (req,res) => {
    const q = "UPDATE Contest SET processed = TRUE WHERE name = ?"
    db.query(q,[req.body.name],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
        
        return res.status(200).json(data)
    })
}


const getCount = (req,res) => {
    const q = 'SELECT COUNT(*) as broj FROM ContestUser'


    db.query(q,[],(err,data) => {
        if(err) {
            return res.status(500).json("Internal server error");
        }
        else {
            return res.status(200).json(data);
        }
    })
}




module.exports = {createContest,getAllContests,deleteContest,getProblemsByContest,getUsersByContest,registerUser,getContestsUser,deleteUserFromContest,updateUserProblem,setProcessedTrue,updateRatingChange,getCount}