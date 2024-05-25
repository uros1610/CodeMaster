import React from 'react'
import styles from '../styles/contests.css'
import {useState,useEffect} from 'react'
import Contest from './Contest'
import axios from 'axios'


const Contests = ({contests,setContests}) => {

  const [prev,setPrev] = useState([])
  const [upc,setUpc] = useState([])
  const [cur,setCur] = useState([])

  useEffect(() => {

    const fetchData = async () => {


    const resp = await axios.get(`/backend/contest`)
    

    setContests(resp.data)
}

fetchData()

},[])





useEffect(() => {

  setPrev(contests.filter(contest => new Date(new Date(contest.date).getTime() + contest.length*60*1000) < Date.now()).sort((a, b) => new Date(a.date) - new Date(b.date)
  ).reverse())
  setUpc(contests.filter(contest => new Date(contest.date) > Date.now()).sort((a, b) => new Date(a.date) - new Date(b.date)
  ).reverse())

  setCur(contests.filter(contest => new Date(new Date(contest.date).getTime() + contest.length*60*1000) >= Date.now() && new Date(contest.date) <= Date.now()))


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

    {upc.map((item) => (<Contest key = {item.id} item = {item} flag = {true}/>))}


</table>

<table id = "futurecontests">
      <p className = "future">Current contests</p>


      <tr>
          <th>Name</th>
          <th>Authors</th>
          <th>Date</th>
          <th>Length</th>
        
      </tr>

    {cur.map((item) => (<Contest key = {item.id} item = {item} flag = {false}/>))}


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

    {prev.map((item) => (<Contest key = {item.id} item = {item} flag = {true}/>))}


</table>


</div>
  )
}

export default Contests