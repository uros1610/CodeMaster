import React, { useState, useEffect,useRef} from 'react';
import { isLeapYear } from 'date-fns';
import styles from '../styles/yeargrid.css';
import Loading from './Loading';

const YearGrid = ({ submissions }) => {
  const [year, setYear] = useState(2024);
  const [isLeap, setIsLeap] = useState(isLeapYear(new Date(year, 0, 1)));
  const [daysColors, setDaysColors] = useState([]);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipTimer = useRef(null);


  const handleYearChange = (e) => {
    const y = parseInt(e.target.value);
    setIsLeap(isLeapYear(new Date(y, 0, 1)));
    setYear(y);
  };

  useEffect(() => {
    generateAll();
  }, [year, submissions]);

  const generateAll = () => {
    const days = Array.from({ length: isLeap ? 366 : 365 }, (_, i) => numberOfSubmissionsColored(i));
    setDaysColors(days);
  };

  const numberOfSubmissionsColored = (i) => {
    const date = new Date(year, 0, 1, 0, 0, 0);
    const dateDown = new Date(date.getTime() + i * 24 * 60 * 60 * 1000);
    const dateUp = new Date(dateDown.getTime() + 24 * 60 * 60 * 1000);

    const filtered = submissions.filter(
      (submission) => new Date(submission.date) >= dateDown && new Date(submission.date) < dateUp
    );

    if (filtered.length === 0) {
      return { color: 'lightgray', filtered: filtered };
    } else if (filtered.length === 1) {
      return { color: '#46D267', filtered: filtered };
    } else if (filtered.length === 2) {
      return { color: '#45F96F', filtered: filtered };
    } else {
      return { color: '#00FF3C', filtered: filtered };
    }
  };

  const handleMouseEnter = (tmp) => {
    clearTimeout(tooltipTimer.current);
    setHoveredDay(tmp);
    tooltipTimer.current = setTimeout(() => {
      setTooltipVisible(true);
    }, 150);
  };

  const handleMouseLeave = () => {
    clearTimeout(tooltipTimer.current);
    tooltipTimer.current = setTimeout(() => {
      setTooltipVisible(false);
      setHoveredDay(null);
    }, 150); 
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

  if (daysColors.length === 0) {
    return <Loading />;
  }

  let sum = 0;

  return (
    <div className="wrapMonthsDiv">
      <div className="yearDiv">
        <p className="solvedProblems">Solved problems by year</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <p
            style={{
              color: '#e3fef7',
            }}
          >
            Choose a year:
          </p>
          <input
            className="yearInput"
            type="number"
            min="1900"
            max="2099"
            step="1"
            value={year}
            onChange={handleYearChange}
          />
        </div>
      </div>
      <div className="gridMonths">
        {months.map((month, monthIndex) => (
          <div key={`month${monthIndex}`} style={{ marginBottom: '20px' }}>
            <h3 className="months">{month.name}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {Array.from({ length: month.days }, (_, dayIndex) => {
                const tmp = sum;
                sum++;

                const dayData = daysColors[tmp];

                return (
                  <div key={`day${tmp}`}
                    onMouseEnter={() => {handleMouseEnter(tmp)}}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      position: 'relative',
                      backgroundColor: dayData ? dayData.color : 'lightgray',
                      width: '10px',
                      height: '10px',
                      border: '1px solid gray',
                      margin: '7px',
                    }}
                  >
                    {hoveredDay === tmp && dayData && (
                      <div
                        className="tooltip"
                        style={{
                          display:'flex',
                          alignItems:'center',
                          flexDirection:'column',
                          
                          position: 'absolute',
                          top: '20px',
                          left: '0px',
                          backgroundColor: 'white',
                          padding: '5px',
                          border: '1px solid black',
                          zIndex: 1,
                          visibility: 'visible',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <span className = "dayMonthParagraph">{(dayIndex+1 % 10 === 1) ? `${months[monthIndex].name} ${dayIndex+1}st` : (dayIndex+1 % 10 === 2) ? `${months[monthIndex].name} ${dayIndex+1}nd` :
                        (dayIndex+1 % 10 === 3) ? `${months[monthIndex].name} ${dayIndex+1}rd` :  `${months[monthIndex].name} ${dayIndex+1}th` 
                      }</span>

                        {dayData.filtered.length > 0
                          ? dayData.filtered.map((submission, index) => (
                              <div className = "submissionsAcceptedCertainDay" key={index}>{submission.problemTitle}</div>
                            ))
                          : 'No submissions'}
                      </div>
                    )}
                  </div>
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
