const express = require('express')
const cors = require('cors');
const cookieparser = require('cookie-parser')
const axios = require('axios');
const http = require("http")
const db = require('./db')
const schedule = require('node-schedule')
const {expressjwt} = require('express-jwt')
require('dotenv').config()




const app = express();
const server = http.createServer(app)

app.use(express.json())

app.use(cookieparser())

//app.use(redirection)


app.use('/backend/auth',require('./routes/auth.js'))
app.use('/backend/submissions',require('./routes/submissions'))



app.use('/backend/contest',require('./routes/contests.js'))
app.use('/backend/problem',require('./routes/problem.js'))
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


const K = 32;

const calculateEloRating = (R_A, R_B, S_A) => {
    const E_A = 1 / (1 + 10 ** ((R_B - R_A) / 400));
    const new_R_A = R_A + K * (S_A - E_A);
    return new_R_A;
};

const updateRatings = async (name) => {
    await axios.put(`http://localhost:8800/backend/contest/updateProcessed`, { name: name });
    const resp = await axios.get(`http://localhost:8800/backend/contest/${name}/users/1`);
    const users = [...resp.data];

    const total = users.length;

    users.sort((a, b) => b.ranking - a.ranking);

    for (let i = 0; i < total; i++) {
        const user_A = users[i];
        const R_A = user_A.rating;
        let new_R_A = R_A;

        for (let j = 0; j < total; j++) {
            if (i !== j) {
                const user_B = users[j];
                const R_B = user_B.rating;
                const S_A = (user_A.points > user_B.points) ? 1 : (user_A.points === user_B.points ? 0.5 : 0);
                new_R_A = calculateEloRating(new_R_A, R_B, S_A);
            }
        }

        const ratingChange = new_R_A - R_A;
        await axios.put(`http://localhost:8800/backend/contest/${user_A.username}/${name}/updateRatingChange`, { ratingChange, placed: i+1 });
        await axios.put(`http://localhost:8800/backend/user/${user_A.username}/rating`, { newRating: new_R_A });
    }
};


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

