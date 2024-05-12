import React from 'react'
import { Link } from 'react-router-dom'

const Contest = ({item}) => {
  return (
    <tr>
        <td>{item.name}</td>
        <td>{item.authors}</td>
        <td>{new Date(item.date).toLocaleString()}
        
        </td>
        <td>{item.length}</td>
        <td>{(new Date(item.date) > Date.now()) ? <Link className='standingsLink'>Register</Link> : <Link className = "standingsLink">Standings</Link>} </td>
    </tr>
  )
}

export default Contest