import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/addcontest.css'
import {FaPlus,FaTimes} from 'react-icons/fa'
import AddedProblem from './AddedProblem';
import Input from './Input';
import { useEffect } from 'react';
import AuthContext from '../context/AuthContext';


const AddContest = ({contests,setContests}) => {
  const navigate = useNavigate();

  const [name,setName] = useState('')
  const [authors,setAuthors] = useState('')
  const [length,setLength] = useState('')
  const [date,setDate] = useState('')
  const [problemName,setproblemName] = useState('')
  const [problemDesc,setproblemDesc] = useState('')
  const [noProblems,setnoProblems] = useState(4)
  const [problems,setProblems] = useState([])
  const [inputs,setInputs] = useState([])
  const [outputs,setOutputs] = useState([])
  const [allTopics,setallTopics] = useState([]);
  const [selectedTopic,setSelectedTopic] = useState('');

  const [currInput,setCurrInput] = useState('')
  const [currOutput,setCurrOutput] = useState('')

  const [rating,setRating] = useState('')
  const [topics,setTopics] = useState([])

  const [err,setErr] = useState(null)
  const [err2,setErr2] = useState(null);

  const {user} = useContext(AuthContext)

  const handleInputOutput = (e) => {
    e.preventDefault()

    setInputs([...inputs,currInput])
    setOutputs([...outputs,currOutput])

    setCurrInput('');
    setCurrOutput('');

  }

   const handleClose = (e,id) => {
        e.preventDefault();

        const filtered = topics.filter(topic => topic !== id);

        setTopics(filtered);
        
    }

  const fetchData = async (e) => {
    try {
      const allTopicsDB = await axios.get(`/backend/topics/`);
      console.log("allTopicsDB",allTopicsDB);
      setallTopics(allTopicsDB.data);
    } 
    catch {

    }
  }

  useEffect(() => {
    fetchData();
  },[])

  useEffect(() => {

    if(allTopics.length > 0) {
      setSelectedTopic(allTopics[0].topic_name);
    }
  },[allTopics])

  

  const handleAddProblem = async (e) => {
    e.preventDefault()

    if(problemName.trim() === "") {
      setErr("Problem name can't be empty!");
      return;
    }

   const currProblem = {id:problems.length+1,contestname:name,title:problemName,description:problemDesc,inputs,outputs,rating,topics}




   
    setProblems([...problems,currProblem])
    setproblemName('')
    setproblemDesc('')
    setInputs([])
    setOutputs([])
    setCurrInput('')
    setCurrOutput('')
    setRating('')
    setTopics('')

    console.log(currProblem)
  }




  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const dateFormatted = new Date(date).toUTCString();
      console.log(dateFormatted)
      const newContest = {name, authors, length, date: dateFormatted};

      
      if(problems.length !== noProblems) {
        setErr2("Please match the number of problems specified!");
        return;
      }
      



      await axios.post(`/backend/contest/addcontest`, newContest);

        for(let problem of problems) {
            console.log(problem)
            problem.contestname = name
            problem.dateshown = date
            
            try {
            await axios.post(`/backend/problem`,problem)
            
            for(let topic of topics) {
              await axios.post(`/backend/problem/problemTopic`,{title:problem.title,topic:topic});
            }

            }
            catch (err) {
              await axios.delete(`/backend/contest/delete/${name}`)
              break;
            }

            for(let i = 0; i < problem.inputs.length; i++) {
               const obj = {input:problem.inputs[i],problemname:problem.title,output:problem.outputs[i]}
                await axios.post(`/backend/inputsoutputs`,obj)
            }

          
        }

        const updatedContests = [...contests, newContest].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      setContests(updatedContests);
      setName('');
      setDate('');
      setAuthors('');
      setLength('');
      setProblems([])
      navigate('/contests'); 

    } catch (error) {
      console.error("Error adding contest:", error);
    }
  };

  return (
    <div className = 'contests-div'>
      <div className="main-containerContests">

        <p>Add contest</p>

        {err2 && <p>{err2}</p>}

        <form className="formContests">
          <input
            type="text"
            placeholder="Name of a contest"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Authors"
            required
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
          />

          <input
            type="datetime-local"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="text"
            placeholder="Length"
            pattern="\d{2}:\d{2}"
            required
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <div style = {{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            gap:'10px'
          }}>
          <label htmlFor = "Choose how many problems" style = {{
            color:'#e3fef7'
          }}>Choose how many problems:</label>
            <select name = "Choose how many problems" onChange = {(e) => {setnoProblems(e.target.value)}} style = {{
              width:'50px'
            }}> 
              <option value = {4}>4</option>
              <option value = {5}>5</option>
              <option value = {6}>6</option>
              <option value = {7}>7</option>
            </select>
          </div>

          <div className = "addedproblems">
              <p>Added problems:</p>
              {problems.map((problem) => <AddedProblem problem = {problem} problems={problems} setProblems={setProblems}
              setProblemName={setproblemName} setProblemDesc={setproblemDesc} setProblemInputs={setInputs} setProblemOutputs={setOutputs}
              rating={rating} setRating={setRating} topics={topics} setTopics={setTopics}/>)}
          </div>

          <button className="addcontest" onClick={handleClick}>
            Add Contest
          </button>
        </form>
      </div>

    
      <div className="main-containerProblem">

      <p>Add problem</p>

      <form className="formContests">
        <input
          type="text"
          placeholder="Problem Name"
          required
          value={problemName}
          onChange={(e) => {setErr(null); setproblemName(e.target.value)}}
        />

        <input type = "text"
        placeholder='Rating'
        required
        value = {rating}
        onChange = {(e) => setRating(e.target.value)}/>

        <div className = "addedTopicsDiv">
          {Array.from(new Set(topics))?.map(topic => <div key = {topic} className = "addedTopic"><div>{topic}</div> <button onClick = {(e) => {handleClose(e,topic)}}><FaTimes/></button></div>)}
        </div>

        <div style = {{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            gap:'10px'
          }}>
            <label htmlFor = "Choose Topics" style = {{
              color:'#e3fef7'
            }}>Choose Topics:</label>
              <select name = "Choose Topics" onChange = {(e) => {setSelectedTopic(e.target.value)}} style = {{
                
              }}> 
                {allTopics?.map(topic => <option value = {topic.topic_name}>{topic.topic_name}</option>)}
              </select>
              <button className = "addInputOutput" onClick = {(e) => { e.preventDefault(); setTopics(Array.from(new Set([...topics,selectedTopic])))}}><FaPlus/></button>

          </div>

       

        <div className = "wrapperDiv">
          <textarea required value = {problemDesc} onInput={(e) => setproblemDesc(e.target.value)} placeholder='Problem description'></textarea>

            <div className = "inputoutput">
              <textarea className = "input" placeholder='inputs' value = {currInput} onInput = {(e) => setCurrInput(e.target.value)}/>
              <textarea className = "output" placeholder='outputs' value = {currOutput} onInput = {(e) => setCurrOutput(e.target.value)} />
            </div>


            <button className = "addInputOutput" onClick = {handleInputOutput}>
              <FaPlus/>
            </button>

            <div className = "addedinputsoutputs">
            
            {inputs.map((input,idx) => (<Input id = {idx} inputs = {inputs} outputs = {outputs} setInputs = {setInputs} setOutputs = {setOutputs} setCurrInput = {setCurrInput} setCurrOutput = {setCurrOutput}
            currInput = {currInput} currOutput = {currOutput}
            />))}

            </div>


          <button className='addproblem' onClick = {handleAddProblem}>Add problem</button>


        </div>

      
        
      </form>
    </div>
    </div>
  );
};

export default AddContest;