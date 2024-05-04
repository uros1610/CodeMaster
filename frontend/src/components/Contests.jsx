import React from 'react'
import styles from '../styles/contests.css'

import Contest from './Contest'


const Contests = ({contests}) => {

    

   
  return (
    <div className = "table-div">
    <table id = "futurecontests">

    <tr>
        <th>Name</th>
        <th>Authors</th>
        <th>Date</th>
        <th>Length</th>
        <th className = "choice">Choose contest</th>
      
    </tr>

    {contests.map((item) => (<Contest key = {item.id} item = {item}/>))}


</table>

<button className = "regButton">Register</button>

</div>
  )
}

export default Contests