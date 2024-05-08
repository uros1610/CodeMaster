import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/addcontest.css'

const AddContest = ({contests,setContests}) => {
  const navigate = useNavigate();

  const [name,setName] = useState('')
  const [authors,setAuthors] = useState('')
  const [length,setLength] = useState('')
  const [date,setDate] = useState('')



  const handleClick = async (e) => {
    e.preventDefault();

    
    const id = contests.length === 0 ? 1 : parseInt(contests[contests.length - 1].id) + 1;

 
    const dateFormatted = new Date(date).toISOString();

    const newContest = { id, name, authors, length, date: dateFormatted };

    try {
     
      const updatedContests = [...contests, newContest].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    
      await axios.post('http://localhost:8800/backend/contest/addcontest', newContest,config);

    
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

        <button className="addcontest" onClick={handleClick}>
          Add Contest
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddContest;
