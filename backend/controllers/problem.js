const db = require("../db")

const getProblemByName = (req,res) => {

    const query = 'SELECT * FROM Problem p INNER JOIN Contest c ON p.contest_name = c.name WHERE title = ?'

    const problemTitle = req.params.name;

    console.log("ProblemTitle je",problemTitle);

    db.query(query,[problemTitle],(err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        
        res.status(200).json(data);
    })
}

const getTopics = (req,res) => {
    const name = req.params.name;
    const q = "SELECT topicName FROM ProblemTopic WHERE problemTitle = ?"

    db.query(q,[name],(err,data) => {
        if(err) {
            return res.status(500).json("Internal server error!");
        }
        
        return res.status(200).json(data);
    })
}

const getCount = (req,res) => {
    const up = req.query.up;
    const down = req.query.down;
    const search = "%"+req.query.title+"%";



   const q = 'SELECT COUNT(*) AS broj from Problem p WHERE p.dateShown < NOW() AND RATING BETWEEN ? AND ? AND title LIKE ?'
    db.query(q,[down,up,search],(err,data) => { 
    if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    return res.status(200).json(data);

})


}

const allProblems = (req,res) => {

    const up = req.query.up;
    const down = req.query.down;
    const search = "%"+req.query.title+"%";



    const query = 'SELECT * from Problem p WHERE p.dateShown < NOW() AND RATING BETWEEN ? AND ? AND title LIKE ? LIMIT ?, ?'
    const id = req.params.id;
    const limit = 10;
    const offset = (id - 1) * limit;

    

    
    db.query(query,[down,up,search,offset,limit],(err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

       
        res.status(200).json(data);
    })
}

const insertProblemTopic = (req,res) => {

  

   
    const insertQuery = 'INSERT INTO ProblemTopic(problemTitle,topicName) VALUES(?)'
    const values = [req.body.title,req.body.topic];

    const resp = db.query(insertQuery,[values],(err,otherdata) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        return res.status(200).json("Problem has successfully been created!")
    })

    

}

const addProblem = (req,res) => {
    
    const query = 'SELECT * FROM Problem WHERE title = ?'
    const result = db.query(query,[req.body.title],(err,data) => {


        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

    if(data.length > 0) {
        return res.status(403).json("Problem with that name already exists!")
    }

    
    const insertQuery = 'INSERT INTO Problem(title,description,contest_name,rating,dateshown) VALUES(?)'
    const values = [req.body.title,req.body.description,req.body.contestname,parseInt(req.body.rating),req.body.dateshown]

    const resp = db.query(insertQuery,[values],(err,otherdata) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        return res.status(200).json("Problem has successfully been created!")

    });

    

    })

}

const getInputs = (req,res) => {
    const name = req.params.name

    const q = "SELECT * FROM Input WHERE problem_title = ?"

    db.query(q,[name],(err,data) => {
        if(err) {
            return res.status(500).json("Internal server error!");
        }
        else {
            return res.status(200).json(data)
        }
    })
}

const getOutputs = (req,res) => {
    const name = req.params.name

    const q = "SELECT * FROM Output WHERE problem_title = ?"

    db.query(q,[name],(err,data) => {
        if(err) {
            return res.status(500).json("Internal server error!");
        }
        else {
            return res.status(200).json(data)
        }
    })
}



module.exports = {getProblemByName,allProblems,addProblem,getInputs,getOutputs,getCount,insertProblemTopic,getTopics}