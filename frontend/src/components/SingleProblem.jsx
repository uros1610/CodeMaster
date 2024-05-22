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
  const [topics,setTopics] = useState("")
  const [contest,setContest] = useState("")
  const [time,setTime] = useState(null)
  const [length,setLength] = useState(0);
  const {name} = useParams()
  

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
    fetchData();
  },[])
  




  return (

    <div className='singleproblemmain'>

      <div className = "singleproblemdiv">

        <div className = "problem-title">

          Problem: {title}

        </div>

        <div className = "problem-description">
          Descritpion: {description}
      </div>

      

    <div className = "problem-testIO">

      <p className = "input">Input:</p>
      
      <table className = "inputTable">

        {inputs.map((input,idx) => (
          <tr key = {idx+1}>
            <p className = "inputParagraphs">{input.value}</p>
          </tr>
        ))}


      </table>

      <p className = "output">Output:</p>
      
      <table className = "inputTable">

       
      {outputs.map((output,idx) => (
          <tr key = {idx+1}>
            <p className = "inputParagraphs">{output.value}</p>
          </tr>
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
        <p className = "problem-tags">{topics}</p>
      </div>

    </div>

    </div>
  )
}

export default SingleProblem