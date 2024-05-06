import React from 'react'

const RatingRow = ({user,index,currentUser}) => {
  return (
    <tr style = {{
        backgroundColor: currentUser.username === user.username ? '#27375D' : 'transparent',
        fontWeight:currentUser.username === user.username ? '700' : '400'
    }}key = {index}>
        <td>{index}</td>
        <td>{user.username}</td>
        <td>{user.rating}</td>
    </tr>
  )
}

export default RatingRow