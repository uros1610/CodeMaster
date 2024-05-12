import React from 'react'
import { Link } from 'react-router-dom'

const Problem = ({problem}) => {
  return (
    <tr>
        <td>
            <div> <Link to = {`/problem/${problem.title}`} className = "problemTitle">{problem.title}</Link> 
        
                <span className = "problemSpanTopics">{problem.topics}</span>  
            </div>
        
        </td>
        <td>{problem.rating}</td>
    </tr>
  )
}

export default Problem