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

        const object = {username:data[0].username,img:data[0].userPicture,rating:data[0].rating,role:data[0].role}

        res.status(200).json(object)

    })
}

const deleteUser = (req,res) => {
    const username = req.params.username;

    const query = "DELETE FROM User WHERE username = ?"

    db.query(query,[username],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
        if(data.length === 0) {
            return res.status(404).json(err)
        }


        res.status(200).json("User succesfully deleted");

    })


}


const getUsersRating = (req,res) => {
    const query = 'SELECT username,rating FROM User LIMIT ?,?'

    const id = req.params.id;   

    const limit = 15;
    const offset = (id - 1) * limit;



    db.query(query,[offset,limit],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
        return res.json(data)
    })
}

const noUsers = (req,res) => {
    const q = 'SELECT COUNT(*) as broj FROM User'

    db.query(q,[],(err,data) => {
        if(err) {
            return res.status(500).json("Internal server error");
        }
        else {
            return res.status(200).json(data);
        }
    })
}

const filterUsers = (req, res) => {
    const id = parseInt(req.params.id);
    const search = "%"+ req.query.search +"%";
    if (id < 1) {
        return res.status(400).json("Invalid ID");
    }

    console.log("SEARCH",search)

    const limit = 10;
    const offset = (id - 1) * limit;


    const query = "SELECT * FROM User WHERE username LIKE ? LIMIT ?, ? ";
    db.query(query, [search,offset,limit], (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json("Internal server error");
        } 
        
        else {
            console.log(data);
            return res.status(200).json(data);
        }
    });
};

const updateRole = (req,res) => {

    const username = req.params.username;
    const rola = req.params.rola;

    console.log(username,rola)

    const q = "UPDATE User SET rola = ? WHERE username = ?"

    db.query(q,[rola,username],(err,data) => {
        if(err) {
            return res.status(500).json("Internal server error!")
        }

        

        else {
            console.log(data);
            return res.status(204).json("Updated role!");
        }
    })
}

const getUsers = (req, res) => {
    const id = parseInt(req.params.id);

    console.log("ID JE ",id);
    if (id < 1) {
        return res.status(400).json("Invalid ID");
    }

    const limit = 10;
    const offset = (id - 1) * limit;

    const query = "SELECT * FROM User LIMIT ?, ?";
    db.query(query, [offset, limit], (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json("Internal server error");
        } else {
            return res.status(200).json(data);
        }
    });
};
module.exports = {getUser,getUsersRating,getUsers,deleteUser,filterUsers,noUsers,updateRole}