const db = require("../db")

const getProblemByName = (req,res) => {

    const query = 'SELECT * FROM Problem WHERE title = ?'

    const problemTitle = req.params.name;

    db.query(query,[problemTitle],(err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        const obj = { title: data[0].title, description: data[0].description };
        res.status(200).json(obj);
    })
}

const allProblems = (req,res) => {

    const query = 'SELECT * from Problem'

    
    db.query(query,[problemTitle],(err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
       
        res.status(200).json(data);
    })
}

module.exports = {getProblemByName,allProblems}