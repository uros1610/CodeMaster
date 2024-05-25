const db = require("../db")


const getTopic = (req,res) => {

    const topic_name = req.params.topicName;

    const q = "SELECT * FROM Topic WHERE topic_name = ?";

    db.query(q,[topic_name],(err,data) => {
        if(err) {
            return res.status(500).json({message:"Internal server error"});
        }
        

        if(data.length === 0) {
            return res.status(403).json({message:"The topic isn't available,please choose another"})
        }

        return res.status(200).json("OK");
    })
}


module.exports = {getTopic}