const axios = require('axios');

require('dotenv').config();

async function submitSolution(req, res) {
  try {

    const { code, date, username, problemname, val } = req.body;

    console.log(val);

    const languageMap = {
      "cpp17":'C++ 17',
      'python3':'Python 3',
      'java':'Java'

    }

    const submission = {code,date,username,problemname,val:languageMap[val]}

    console.log("BODY",req.body);

    const BASE_URL = "http://localhost:8800/backend";



    const inputs = await axios.get(`${BASE_URL}/problem/inputs/${problemname}`);
    const outputs = await axios.get(`${BASE_URL}/problem/inputs/${problemname}`);


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

      const headers = { 'Authorization': `Bearer ${token}` }

      try {
        const response = await axios.post("https://api.jdoodle.com/v1/execute", data,headers);
        console.log("DATAAAAA", response.data);

        if (response.data.output !== outputs.data[0].value) {
          submission.verdictdescription = `Wrong answer on test case ${i+1}`
          await axios.post(`${BASE_URL}/submissions/`, submission);
          return res.status(404).json({"message":`Wrong answer on test case ${i+1}`})
          
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
    
    }
    submission.verdictdescription = 'Accepted'
    await axios.post(`${BASE_URL}/submissions/`, submission);

   return res.status(200).json({ message: 'Accepted'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {submitSolution};
