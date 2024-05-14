const db = require('../db')

const insertIO = (req,res) => {
    console.log(req.body)
    const problemname = req.body.problemname
    const val = req.body.input
    const val2 = req.body.output

    const query = "INSERT INTO Input(problem_title,value) VALUES(?)"
    const values = [problemname,val]

    db.query(query,[values],(err,data) => {
        if(err) {
            return res.status(500)
        }
        
        const q = "INSERT INTO Output(problem_title,value) VALUES(?)"
        const values2 = [problemname,val2]

        db.query(q,[values],(err,data) => {
            if(err) {
                return res.status(500)
            }

            return res.status(200).json("Added input and output")
        })
    })
}

module.exports = insertIO