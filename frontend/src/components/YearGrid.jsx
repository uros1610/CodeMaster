import React, { useState, useEffect, useRef } from 'react';
import { isLeapYear } from 'date-fns';
import styles from '../styles/yeargrid.css'

const YearGrid = ({ submissions }) => {
  const [year, setYear] = useState(2024);
  const [isLeap, setIsLeap] = useState(isLeapYear(new Date(year, 0, 1)));
  const [daysColors, setDaysColors] = useState([]);


  const handleYearChange = (e) => {
    const y = parseInt(e.target.value)
    setIsLeap(isLeapYear(new Date(y,0,1)));
    setYear(y);
  }

  

  useEffect(() => {
    generateAll();
  }, [year, submissions]);

  const generateAll = () => {
    const days = Array.from({ length: isLeap ? 366 : 365 }, (_, i) => {
      return numberOfSubmissionsColored(i);
    });
    setDaysColors(days);
  };

  const numberOfSubmissionsColored = (i) => {
    const date = new Date(year, 0, 1, 0, 0, 0);
    const dateDown = new Date(date.getTime() + i * 24 * 60 * 60 * 1000);
    const dateUp = new Date(dateDown.getTime() + 24 * 60 * 60 * 1000);
    

    const filtered = submissions.filter(
      (submission) => new Date(submission.date) >= dateDown && new Date(submission.date) < dateUp
    );


    if(filtered.length === 0) {
        return 'lightgray';
    }
    else if(filtered.length === 1) {
        return '#46D267'
    }
    else if(filtered.length === 2) {
        return '#45F96F'
    }
    else {
        return '#00FF3C'
    }
  };

  const months = [
    { name: 'January', days: 31 },
    { name: 'February', days: isLeap ? 29 : 28 },
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 },
  ];

  var sum = 0;

  return (
    <div className = "wrapMonthsDiv">
      
      <div className = "yearDiv">
      <p className = "solvedProblems">Solved problems by year</p>
      <div style = {{
        display:'flex',
        alignItems:'center',
        gap:'20px'
      }}>
      <p style = {{
        color:'#e3fef7'
        
      }}>Choose a year:</p>
<input 
  className="yearInput" 
  type="number" 
  min="1900" 
  max="2099" 
  step="1" 
  value={year} 
  onChange={(e) => handleYearChange(e)} 
/>
      </div>
      </div>
    <div className = "gridMonths">
      {months.map((month, monthIndex) => (

        <div key={`month${monthIndex}`} style={{ marginBottom: '20px' }}>
          <h3 className = "months">{month.name}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {Array.from({ length: month.days }, (_, dayIndex) => {
             
              const color = daysColors[sum];
              sum++;
              return (
                <div
                  key={`day${sum}`}
                  style={{
                    backgroundColor: color,
                    width: '10px',
                    height: '10px',
                    
                    border: '1px solid gray',
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default YearGrid;
