import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/addcontest.css'
import {FaPlus} from 'react-icons/fa'
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

  const [currInput,setCurrInput] = useState('')
  const [currOutput,setCurrOutput] = useState('')

  const [rating,setRating] = useState('')
  const [topics,setTopics] = useState('')

  const [err,setErr] = useState(null)

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');



  if(!token) {
    navigate('/login');
  }

  

 else if(user.role !== "Admin") {
  

    navigate('/Home');
  }

  


  const handleInputOutput = (e) => {
    e.preventDefault()

    setInputs([...inputs,currInput])
    setOutputs([...outputs,currOutput])

  }

  

  const handleAddProblem = async (e) => {
    e.preventDefault()

   const currProblem = {id:problems.length+1,contestname:name,title:problemName,description:problemDesc,inputs,outputs,rating,topics}

   const topicsSplit = topics.split(",")

    for(let topic of topicsSplit) {
      const topicStrip = topic.trim();

      console.log(topicStrip);

      try {
      const resp = await axios.get(`${URL}/topics/${topicStrip}`);
      }
      catch(err) {
        if(err.response) {
        setErr(err.response.data.message)
        }
        return;
      }

    }

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

      const BASE_URL = process.env.REACT_APP_BASE_URL

        console.log("NESTO",localStorage.getItem('token'))
      
        await axios.post(`/contest/addcontest`, newContest);

        for(let problem of problems) {
            console.log(problem)
            problem.contestname = name
            problem.dateshown = date
            
            try {
            await axios.post(`/problem`,problem)
            }
            catch (err) {
              await axios.delete(`/contest/delete/${name}`)
              break;
            }

            for(let i = 0; i < problem.inputs.length; i++) {
               const obj = {input:problem.inputs[i],problemname:problem.title,output:problem.outputs[i]}
                await axios.post(`/inputsoutputs`,obj)
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
          <select name = "Choose how many problems" onChange = {(e) => {setnoProblems(e.target.value)}}> 
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
          onChange={(e) => setproblemName(e.target.value)}
        />

        <input type = "text"
        placeholder='Rating'
        required
        value = {rating}
        onChange = {(e) => setRating(e.target.value)}/>

        <input type = "text"
        placeholder='Topics'
        required
        value = {topics}
        onChange = {(e) => {setTopics(e.target.value); setErr(null)}}/>

        {err && <p>{err}</p>}
        

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