import React from 'react'
import styles from '../styles/singleproblem.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect} from 'react'
import { useParams,useNavigate} from 'react-router-dom'


const SingleProblem = () => {

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const navigate = useNavigate()
  const [inputs,setInputs] = useState([])
  const [outputs,setOutputs] = useState([])
  const [contest,setContest] = useState("")
  const [time,setTime] = useState(null)
  const [length,setLength] = useState(0);
  const {name} = useParams()

  const [topics,setTopics] = useState([]);

  const fetchAll = async () => {
    await fetchData();
    await fetchData2();
  }

  const fetchData2 = async () => {
    try {
      const response = await axios.get(`/backend/problem/problemTopic/${name}`);
      console.log("RESP",response);
      var arr = [];
      
      for(let i = 0; i < response.data.length - 1; i++) {
        arr.push(`${response.data[i].topicName}, `)
      }
      arr.push(response.data[response.data.length-1].topicName);
      setTopics(arr);
    }
    catch(err) {
      console.log(err);
    }
  }


  const fetchData = async () => {

    try {
      const response = await axios.get(`/backend/problem/singleproblem/${name}`)
      const inputss = await axios.get(`/backend/inputsoutputs/input/${name}`)
      const outputss = await axios.get(`/backend/inputsoutputs/output/${name}`)



      setInputs(inputss.data)
      setOutputs(outputss.data)
      setTitle(response.data[0].title)
      setDescription(response.data[0].description)
      setTopics(response.data[0].topics)
      setContest(response.data[0].contest_name)
      setTime(response.data[0].date)
      setLength(response.data[0].length)
      
    }
    catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAll();
  },[])

  




  return (

    <div className='singleproblemmain'>

      <div className = "singleproblemdiv">

        <div className = "problem-title">

          Problem: {title}

        </div>

        <div className = "problem-description">
          Description: {description}
      </div>

      

    <div className = "problem-testIO">

      <p className = "input">Input:</p>
      
      <table className = "inputTable">

        {inputs.map((input,idx) => (
          <pre>{input.value}</pre>
        ))}


      </table>

      <p className = "output">Output:</p>
      
      <table className = "inputTable">

       
      {outputs.map((output,idx) => (
         <pre>{output.value}</pre>
        ))}


      </table>

    </div>

    <button type = "submit" className = "submitProblemBtn"><Link className = "linkToSubmit" to = {`/submitproblem/${name}`}>Submit</Link></button>


    </div>

    <div className = "inContest">
      <div className = 'whichContest'>
        <Link className = "linkToContest" to = {`/contest/${contest}/standings`}>{contest}</Link>
        <hr style = {{
          width:'100%'
        }}/>
          <p className='status'>{
            (new Date(new Date(time).getTime() + length*60*1000) < Date.now() ? "Contest is finished" : "Contest is running")
          }</p>
        </div>

      <div className = "problem-tags-div">
        <p className = "problemTags">Problem tags</p>
        <hr style = {{
          width:'100%'
        }}/>
        <p className = "problem-tags">{ new Date(new Date(time).getTime() + length*60*1000) < Date.now() ? <p>{topics?.map(topic => topic)}</p> : "Not available yet"}</p>
      </div>

    </div>

    </div>
  )
}

export default SingleProblem