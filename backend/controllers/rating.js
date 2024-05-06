const db = require('../db')

const usersRating = (req,res) => {
    const query = 'SELECT username,rating FROM User'

    db.query(query,[],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
        return res.json(data)
    })
}

module.exports = {usersRating}