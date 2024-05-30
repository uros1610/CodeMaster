const db = require("../db")


const getTopics = (req,res) => {

    const topic_name = req.params.topicName;

    const q = "SELECT * FROM Topic";

    db.query(q,[topic_name],(err,data) => {
        if(err) {
            return res.status(500).json({message:"Internal server error"});
        }
    
        return res.status(200).json(data);
    })
}


module.exports = {getTopics}