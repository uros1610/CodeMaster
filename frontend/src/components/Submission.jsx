import React from 'react'

const Submission = ({item}) => {
  return (
    <tr key = {item.id}>
        <td>{item.id}</td>
        <td>{new Date(item.date).toLocaleString()}</td>
        <td>{item.userName}</td>
        <td>{item.problemTitle}</td>
        <td>{item.language}</td>
        <td style = {{
          color:item.verdictdescription === "Accepted" ? 'lime' : 'red'
        }}>{item.verdictdescription}</td>
    </tr>
    )
}

export default Submission