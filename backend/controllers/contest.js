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



        const queryInsert = "INSERT INTO Contest(name,date,authors,length) VALUES(?)"
        const values = [name,date,authors,req.body.length]

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
    console.log("NAME",name)
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
    const q = "SELECT * FROM ContestUser WHERE contestName = ? LIMIT ?,?"
    const contestName = req.params.contestName;
    const id = req.params.id;

    const limit = 100;
    const offset = (id-1)*100;

    db.query(q,[contestName,offset,limit],(err,data) => {
        if(err) {
            return res.status(500).json("Internal server error!")
        }
      
        return res.status(200).json(data)
    })
}


module.exports = {createContest,getAllContests,deleteContest,getProblemsByContest,getUsersByContest}