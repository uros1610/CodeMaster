import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaWindowClose } from 'react-icons/fa'

const Submission = ({item}) => {

  const [display,setDisplay] = useState(false)

  const handleClick1 = () => {
    setDisplay(true)
  }

  const handleClick2 = () => {
    setDisplay(false)
  }

  return (
    <>
    <tr key = {item.id}>
        <td><button className = "submissionIDbtn" onClick={handleClick1}>{item.id}</button></td>
        <td>{new Date(item.date).toLocaleString()}</td>
        <td><Link to = {`/profile/${item.userName}`} className = "problemTitle">{item.userName}</Link> </td>
        <td><Link to = {`/problem/${item.problemTitle}`} className = "problemTitle">{item.problemTitle}</Link> </td>
        <td>{item.language}</td>
        <td style = {{
          color:item.verdictdescription === "Accepted" ? 'lime' : 'red'
        }}>{item.verdictdescription}</td>
    </tr>

      {display && <div className = "displayCode" readOnly>
        <button className = "closeWindow" onClick = {handleClick2}><FaWindowClose/></button>
        <textarea className = "textareacode" readOnly>
        {item.code}
        </textarea>
        
        
        </div>}

    </>
    )
}

export default Submission