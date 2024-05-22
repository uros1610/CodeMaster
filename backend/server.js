const express = require('express')
const cors = require('cors');
const cookieparser = require('cookie-parser')
const redirection = require('./middleware/redirect')
const axios = require('axios');
const http = require("http")
const db = require('./db')
const schedule = require('node-schedule')



const app = express();
const server = http.createServer(app)

app.use(express.json())

app.use(cookieparser())

//app.use(redirection)


app.use('/backend/contest',require('./routes/contests.js'))
app.use('/backend/auth',require('./routes/auth.js'))
app.use('/backend/problem',require('./routes/problem.js'))
app.use('/backend/submissions',require('./routes/submissions'))
app.use('/backend/inputsoutputs',require('./routes/inputoutput'))
app.use('/backend/topics',require('./routes/topics'))
app.use('/backend/user',require('./routes/users'))
app.use('/backend/submit',require('./routes/submit'))
app.use('/backend/profile',require('./routes/users'))


const checkForNewContests = () => {
    const query = 'SELECT * FROM Contest WHERE processed = FALSE';
    db.query(query, [], (error, results) => {
        if (error) {
            console.error('Error fetching new contests:', error);
            return;
        }

        results.forEach(async (contest) => {
            if(!contest.processed) {
            scheduleContestEndJob(contest);
            }
            
        });
    });
};

const updateRatings = async (name) => {
    await axios.put(`http://localhost:8800/backend/contest/updateProcessed`,{name:name})
    const resp = await axios.get(`http://localhost:8800/backend/contest/${name}/users/1`)
    const users = [...resp.data]

    const total = users.length;

    users.sort((a,b) => b.ranking - a.ranking)

    users.forEach(async (user,index) => {

        const newRating = user.rating + 15 * (total-index-1);
       
        await axios.put(`http://localhost:8800/backend/user/${user.username}/rating`,{newRating})
    })
}

const scheduleContestEndJob = (contest) => {
    const endTime = new Date(new Date(contest.date).getTime()+contest.length*60*1000);

   
    if(Date.now() >= endTime) {
        updateRatings(contest.name)
    }
    else {
    schedule.scheduleJob(endTime, () => updateRatings(contest.name));
    }
    
};

setInterval(checkForNewContests, 60000);

checkForNewContests();



server.listen(8800,() => {
    console.log("Connected")
})

