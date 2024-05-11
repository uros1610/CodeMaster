const db = require('../db')

const createContest = async (req,res) => {
   
    const name = req.body.name;
    const authors = req.body.authors;
    const date = new Date(req.body.date)

    const mysqlDateTime = date.toISOString().slice(0, 19).replace('T', ' ');
    

    const query = "SELECT * From Contest WHERE name = ?"

    db.query(query,[name],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }

        if(data.length) {
            return res.status(409).json({message:"Contest with that name already exists!"})
        }



        const queryInsert = "INSERT INTO Contest(name,date,authors,length) VALUES(?)"
        const values = [name,mysqlDateTime,authors,req.body.length]

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

module.exports = {createContest,getAllContests,deleteContest}