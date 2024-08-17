var mysql = require('mysql2')
require('dotenv').config()

 const dbConf = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME,
})




module.exports = dbConf