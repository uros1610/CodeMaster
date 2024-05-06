const db = require('../db')


const getUser = (req,res) => {
    const username = req.params.username

  
    const query = "SELECT * FROM User WHERE username = ?"

    db.query(query,[username],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
        if(data.length === 0) {
            return res.status(404).json(err)
        }

        const object = {username:data[0].username,img:data[0].userPicture,rating:data[0].rating}

        res.status(200).json(object)

    })
}

module.exports = {getUser}