import React, { useContext,useRef} from 'react'
import styles from '../styles/singleproblem.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect} from 'react'
import { useParams,useNavigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { FaWindowClose } from 'react-icons/fa';



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
  const [submissions,setSubmissions] = useState([])

  const {user} = useContext(AuthContext);

  const [topics,setTopics] = useState([]);

  const [display, setDisplay] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = (submissionId) => {
    setDisplay(display === submissionId ? null : submissionId);
  };

  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      setDisplay(false);
    }
  };

  useEffect(() => {
    const currentButton = buttonRef.current;
    if (display && currentButton) {
      currentButton.focus();
      document.addEventListener('keyup', handleEsc);
    }

    return () => {
      document.removeEventListener('keyup', handleEsc);
    };
  }, [display]);


  const fetchAll = async () => {
    await fetchData();
    await fetchData2();
    await fetchSubmissions();
  }

  const fetchSubmissions = async () => {
    const resp = await axios.get(`/backend/submissions/allSubmissions/${user.username}/${name}`);

    console.log("RESPFIDKIDSFG",resp);

    setSubmissions(resp.data)
    
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

        <div className="wrapSubmissions">
      <p className="lastSubmissions">Last submissions:</p>
      <table>
        
          {submissions.map((submission, idx) => (
            <React.Fragment key={idx}>
              <tr className="submissionRow">
                <td>
                  <button onClick={() => handleClick(submission.id)} className="submissionIDbtn">
                    <span>{submission.id}</span>
                  </button>
                </td>
                <td>Date: {new Date(submission.date).toLocaleString()}</td>
                <td style={{
                  color: submission.verdictdescription === 'Accepted' ? 'lime' : 'red'
                }}>{submission.verdictdescription}</td>
              </tr>
              {display === submission.id && (
                <tr>
                  <td colSpan="3">
                    <div className="displayCode">
                      <button
                        className="closeWindow"
                        ref={buttonRef}
                        onClick={() => handleClick(submission.id)}
                      >
                        <FaWindowClose />
                      </button>
                      <textarea className="textareacode" readOnly value={submission.code} />
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
       
      </table>
    </div>

    </div>

   
    </div>
  )
}

export default SingleProblem