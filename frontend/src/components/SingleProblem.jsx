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



  const {name} = useParams()



  const fetchData = async () => {

    try {
      const response = await axios.get(`/backend/problem/singleproblem/${name}`)
      const inputss = await axios.get(`/backend/inputsoutputs/input/${name}`)
      const outputss = await axios.get(`/backend/inputsoutputs/output/${name}`)



      setInputs(inputss.data)
      setOutputs(outputss.data)
      setTitle(response.title)
      setDescription(response.data.description)
      setTopics(response.data.topics)
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

          {name}

        </div>

        <div className = "problem-description">
          {description}
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
        <Link className = "linkToContest">Codeforces Round 942 (Div. 2)</Link>
        <hr style = {{
          width:'100%'
        }}/>
          <p className='status'>Finished</p>
          <Link className = "tutorial">Go to Tutorial</Link>
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