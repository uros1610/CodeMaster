import React from 'react'

const Contest = ({item}) => {
  return (
    <tr>
        <td>{item.name}</td>
        <td>{item.authors}</td>
        <td>{new Date(item.date).toLocaleString()}
        
        </td>
        <td>{item.length}</td>
        <td><input type = "checkbox"/></td>
    </tr>
  )
}

export default Contest