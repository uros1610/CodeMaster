import React from 'react'
import styles from '../styles/contests.css'
import {useState,useEffect} from 'react'
import Contest from './Contest'
import axios from 'axios'


const Contests = ({contests,setContests}) => {

  const [prev,setPrev] = useState([])
  const [upc,setUpc] = useState([])

  useEffect(() => {

    const fetchData = async () => {


    const resp = await axios.get(`/contest`)
    
    console.log(resp)

    setContests(resp.data)
}

fetchData()

},[])

useEffect(() => {

  setPrev(contests.filter(contest => new Date(contest.date) < Date.now()).sort((a, b) => new Date(a.date) - new Date(b.date)
  ))
  setUpc(contests.filter(contest => new Date(contest.date) >= Date.now()).sort((a, b) => new Date(a.date) - new Date(b.date)
  ))

},[contests])
    

   
  return (
    <div className = "table-div">
    <table id = "futurecontests">
      <p className = "future">Upcoming contests</p>


      <tr>
          <th>Name</th>
          <th>Authors</th>
          <th>Date</th>
          <th>Length</th>
          <th className = "choice">Register</th>
        
      </tr>

    {upc.map((item) => (<Contest key = {item.id} item = {item}/>))}


</table>



<table id = "futurecontests">

<p className = "past">Past contests</p>


    <tr>
        <th>Name</th>
        <th>Authors</th>
        <th>Date</th>
        <th>Length</th>
        <th>Leaderboard</th>
      
    </tr>

    {prev.map((item) => (<Contest key = {item.id} item = {item}/>))}


</table>


</div>
  )
}

export default Contests