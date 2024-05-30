const axios = require('axios');
const jwt = require('jsonwebtoken')

require('dotenv').config();


async function submitSolution(req, res,next) {
  try {

    const { code, date, username, problemname, val } = req.body;

    if(!req.headers.authorization) {
      return res.status(401);
    }

    const tokenn = req.headers.authorization.split(" ")[1];


    const decoded = jwt.verify(tokenn,process.env.SECRET_KEY);

    if(decoded.username !== username) {
      return res.status(401).json("Unauthorized");
    }



    const languageMap = {
      "cpp17":'C++ 17',
      'python3':'Python 3',
      'java':'Java'

    }

    const submission = {code,date,username,problemname,val:languageMap[val]}



    const BASE_URL = "http://localhost:8800/backend";



    const inputs = await axios.get(`${BASE_URL}/problem/inputs/${problemname}`);
    const outputs = await axios.get(`${BASE_URL}/problem/outputs/${problemname}`);


    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;

    

    const auth_data = {
      "clientId": CLIENT_ID,
      "clientSecret": CLIENT_SECRET
    };

    const auth_response = await axios.post("https://api.jdoodle.com/v1/auth-token", auth_data);
    const token = auth_response.data;

      for(let i = 0; i < inputs.data.length; i++) {
      const data = {
        "clientId": CLIENT_ID,
        "clientSecret": CLIENT_SECRET,
        "language": val,
        "script": code,
        "versionIndex": '0',
        "stdin": inputs.data[i].value
      };

      console.log("INPUT",inputs.data[i].value)


      const headers = { 'Authorization': `Bearer ${token}` }

      try {
        const response = await axios.post("https://api.jdoodle.com/v1/execute", data,headers);

        if (((response.data.output).toString()).trim() !== ((outputs.data[i].value).toString()).trim()) {
          submission.verdictdescription = `Wrong answer on test case ${i+1}`
          console.log("ACTUAL",response.data.output)
          console.log("EXPECTED",outputs.data[i].value)
          return res.status(200).json(submission)
          
        }

      } catch (error) {
        submission.verdictdescription = `Wrong answer on test case ${i+1}`
        return res.status(200).json(submission)
      }
    }


    submission.verdictdescription = 'Accepted'
    return res.status(200).json(submission);
    }

    catch (err) {
        res.status(500).json({ message: 'Internal server error',error:err });
      }
}



module.exports = {submitSolution};
