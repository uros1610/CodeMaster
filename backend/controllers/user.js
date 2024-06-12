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

const updateUser = (req,res) => {
    const {username,picture} = req.body;

    console.log(req.params);

    console.log(username);

    const picturePath = `/public/images/${picture}`

    const q = "UPDATE User SET username = ? , userPicture = ? WHERE username = ?"

    db.query(q,[username,picturePath,req.params.username],(err,data) => {
        if(err) {
            return res.status(500).json("Internal server error!");
        }
        else {
            return res.status(204).json("Update successful");
        }
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

const getAdmins = (req,res) => {
    const q = "SELECT username FROM User WHERE rola = 'Admin' "

    db.query(q,[],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
        return res.status(200).json(data)
    })
}


const getUsersRating = (req,res) => {
    const query = 'SELECT username,rating,userPicture FROM User ORDER BY rating DESC LIMIT ?,?'

    const id = req.params.id;   

    const limit = 15;
    const offset = (id - 1) * limit;

   



    db.query(query,[offset,limit],(err,data) => {
        if(err) {
            return res.status(500).json(err)
        }
        console.log(data);
        return res.status(200).json(data)
    })
}

const noUsers = (req,res) => {
    const q = 'SELECT COUNT(*) as broj FROM User WHERE username LIKE ?'
    var srch;
    if(req.query.search) {
    srch = "%" +req.query.search + "%";
    }
    else {
        srch = "%";
    }

    db.query(q,[srch],(err,data) => {
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


    const limit = 10;
    const offset = (id - 1) * limit;


    const query = "SELECT * FROM User WHERE username LIKE ? LIMIT ?, ? ";
    db.query(query, [search,offset,limit], (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json("Internal server error");
        } 
        
        else {
            return res.status(200).json(data);
        }
    });
};

const updateRole = (req,res) => {

    const username = req.params.username;
    const rola = req.params.rola;


    const q = "UPDATE User SET rola = ? WHERE username = ?"

    db.query(q,[rola,username],(err,data) => {
        if(err) {
            return res.status(500).json("Internal server error!")
        }

        

        else {
            return res.status(204).json("Updated role!");
        }
    })
}

const getUsers = (req, res) => {
    const id = parseInt(req.params.id);

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

const updateRating = (req,res) => {
    const username = req.params.username;
    const newRating = req.body.newRating;

    const q = "UPDATE User SET rating = ? WHERE username = ?"
    db.query(q,[newRating,username],(err,data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json("Internal server error");
        } else {
            return res.status(200).json("Update successful");
        }
    })
}

const getAllContestsOneUser = (req,res) => {
    const q = "SELECT * FROM ContestUser WHERE userName = ?"


    db.query(q,[req.params.username],(err,data) => {
        if(err) {
            return res.status(500).json("Internal server error!");
        }
        else {
            return res.status(200).json(data);
        }
    })
}

module.exports = {getUser,getUsersRating,getUsers,deleteUser,filterUsers,noUsers,updateRole,updateRating,getAllContestsOneUser,updateUser,getAdmins}