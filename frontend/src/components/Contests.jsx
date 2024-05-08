import React from 'react'
import styles from '../styles/contests.css'
import {useState,useEffect} from 'react'
import Contest from './Contest'
import axios from 'axios'


const Contests = ({contests,setContests}) => {

 

  useEffect(() => {

    const fetchData = async () => {

     

    const resp = await axios.get('http://localhost:8800/backend/contest')
    
    console.log(resp)
  

    setContests(resp.data.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    ))

}

fetchData()

},[])
    

   
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