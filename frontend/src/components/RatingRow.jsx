import React from 'react'
import { Link } from 'react-router-dom'

const RatingRow = ({user,index,currentUser}) => {
  return (
    <tr style = {{
        
        
        backgroundColor: currentUser ? (currentUser.username === user.username ? '#27375D' : 'transparent') : null,
        fontWeight: currentUser ? (currentUser.username === user.username ? '700' : '400') : null
    }}key = {index}>
        <td>{index}</td>
        <td><Link to = {`/profile/${user.username}`} className = "problemTitle">{user.username}</Link></td>

        <td>{user.rating}</td>
    </tr>
  )
}

export default RatingRow