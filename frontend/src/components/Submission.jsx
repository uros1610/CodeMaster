import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWindowClose } from 'react-icons/fa';

const Submission = ({ item }) => {
  const [display, setDisplay] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = () => {
    setDisplay(!display);
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

  return (
    <>
      <tr key={item.id}>
        <td>
          <button className="submissionIDbtn" onClick={handleClick}>
            {item.id}
          </button>
        </td>
        <td>{new Date(item.submissionDate).toLocaleString()}</td>
        <td>
          <Link to={`/profile/${item.userName}`} className="problemTitle">
            {item.userName}
          </Link>
        </td>
        <td>
          <Link to={`/problem/${item.problemTitle}`} className="problemTitle">
            {item.problemTitle}
          </Link>
        </td>
        <td>{item.language}</td>
        <td
          style={{
            color: item.verdictdescription === 'Accepted' ? 'lime' : 'red',
          }}
        >
          {item.verdictdescription}
        </td>
      </tr>

      {display && Date.now() > new Date(new Date(item.contestDate).getTime() + item.length * 60 * 1000) && (
        <div className="displayCode">
          <button
            className="closeWindow"
            ref={buttonRef}
            onClick={handleClick}
          >
            <FaWindowClose />
          </button>
          <textarea className="textareacode" readOnly value={item.code} />
        </div>
      )}
    </>
  );
};

export default Submission;
