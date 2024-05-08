const express = require('express')
const cors = require('cors');
const cookieparser = require('cookie-parser')
const redirection = require('./middleware/redirect')



const app = express();




app.use(cors());

app.use(express.json())

app.use(cookieparser())

//app.use(redirection)


app.use('/backend/contest',require('./routes/contests.js'))
app.use('/backend/auth',require('./routes/auth.js'))
app.use('/backend/problem',require('./routes/problem.js'))
app.use('/backend/rating',require('./routes/rating'))
app.use('/backend/submitproblem',require('./routes/submitproblem'))



// rute za profil

app.use('/backend/profile',require('./routes/users'))


app.listen(8800,() => {
    console.log("Connected")
})