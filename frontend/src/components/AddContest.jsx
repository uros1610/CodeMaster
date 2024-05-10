import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/addcontest.css'
import {FaPlus} from 'react-icons/fa'
import AddedProblem from './AddedProblem';

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


  const handleInputOutput = (e) => {
    e.preventDefault()

    setInputs([...inputs,currInput])
    setOutputs([...outputs,currOutput])



  }

  const handleAddProblem = (e) => {
    e.preventDefault()

    const currProblem = {title:problemName,description:problemDesc,inputs,outputs}

    setProblems([...problems,currProblem])

  }



  const handleClick = async (e) => {
    e.preventDefault();

    try {
     
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    const dateFormatted = new Date(date).toISOString();
    const newContest = {name, authors, length, date: dateFormatted };

      const BASE_URL = process.env.REACT_APP_BASE_URL

      console.log("NESTO",localStorage.getItem('token'))
    
      await axios.post(`${BASE_URL}/contest/addcontest`, newContest,config);

      const updatedContests = [...contests, newContest].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

    
      setContests(updatedContests);

    
      setName('');
      setDate('');
      setAuthors('');
      setLength('');
      
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
            {problems.map((problem) => <AddedProblem problem = {problem} problems={problems} setProblems={setProblems}/>)}
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
        <div className = "wrapperDiv">
          <textarea required value = {problemDesc} onInput={(e) => setproblemDesc(e.target.value)} placeholder='Problem description'></textarea>

          <div className = "inputoutput">
            <textarea className = "input" placeholder='inputs' value = {currInput} onInput = {(e) => setCurrInput(e.target.value)}/>
            <textarea className = "output" placeholder='outputs' value = {currOutput} onInput = {(e) => setCurrOutput(e.target.value)} />
          </div>

          <button className = "addInputOutput" onClick = {handleInputOutput}>
            <FaPlus/>
          </button>

          <button className='addproblem' onClick = {handleAddProblem}>Add problem</button>


        </div>

      
        
      </form>
    </div>
    </div>
  );
};

export default AddContest;
