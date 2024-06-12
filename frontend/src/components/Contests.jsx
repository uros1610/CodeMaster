import React, { useContext, useRef } from 'react'
import styles from '../styles/contests.css'
import {useState,useEffect} from 'react'
import Contest from './Contest'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'


const Contests = ({contests,setContests}) => {

  const [prev,setPrev] = useState([])
  const [upc,setUpc] = useState([])
  const [cur,setCur] = useState([])
  const navigate = useNavigate();
  const [past,setPast] = useState(false);
  const [upcoming,setUpcoming] = useState(false);
  const [current,setCurrent] = useState(true);
  const [loading,setLoading] = useState(false);

  const [active,setActive] = useState("current");

  const {user} = useContext(AuthContext)

  useEffect(() => {

    if(!user) {
      navigate('/login')
    }
  },[user])

  useEffect(() => {


    const fetchData = async () => {
    setLoading(true);
    try {
    const resp = await axios.get(`/backend/contest`)
    setContests(resp.data)

    }

    catch(err) {
      console.log(err);
    }

    finally {
      setLoading(false);
    }

    

}

fetchData()

},[])


const handleClickCurrent = () => {

setActive("current");
}
const handleClickPast = () => {

  setActive("past");

}

const handleClickUpcoming = () => {
  setActive("upcoming");

}




useEffect(() => {

  setPrev(contests.filter(contest => new Date(new Date(contest.date).getTime() + contest.length*60*1000) < Date.now()).sort((a, b) => new Date(a.date) - new Date(b.date)
  ).reverse())
  setUpc(contests.filter(contest => new Date(contest.date) > Date.now()).sort((a, b) => new Date(a.date) - new Date(b.date)
  ).reverse())

  setCur(contests.filter(contest => new Date(new Date(contest.date).getTime() + contest.length*60*1000) >= Date.now() && new Date(contest.date) <= Date.now()))


},[contests])


if(loading) {
  return <Loading/>
}
   
  return (

    <>
    <div className = "table-div">

      <div className = "buttonsContests">
        <button className = {active === "upcoming" ? "activeBtn" : "notactiveBtn"} onClick = {handleClickUpcoming}>Upcoming Contests</button>
        <button className = {active === "current" ? "activeBtn" : "notactiveBtn"} onClick = {handleClickCurrent}>Current Contests</button>
        <button className = {active === "past" ? "activeBtn" : "notactiveBtn"} onClick = {handleClickPast}>Past Contests</button>
      </div>


      {active === "upcoming" && <table className = "contests">


        <tr>
            <th>Name</th>
            <th>Authors</th>
            <th>Date</th>
            <th>Length</th>
            <th className = "choice">Register</th>
            {user?.role === 'Admin' && <th>Edit</th>}
            {user?.role === 'Admin' && <th>Delete</th>}

          
        </tr>

      {upc.map((item) => (<Contest key = {item.id} item = {item} flag = {true}/>))}


  </table>}



  {active === "current" && <table className = "contests">


        <tr>
            <th>Name</th>
            <th>Authors</th>
            <th>Date</th>
            <th>Length</th>
            
          
        </tr>

      {cur.map((item) => (<Contest key = {item.id} item = {item} flag = {false}/>))}


  </table>}


  {active === "past" && <table className = "contests">



      <tr>
          <th>Name</th>
          <th>Authors</th>
          <th>Date</th>
          <th>Length</th>
          <th>Leaderboard</th>
          {user?.role === 'Admin' && <th>Delete contest</th>}

        
      </tr>

      {prev.map((item) => (<Contest key = {item.id} item = {item} flag = {true} contests = {contests} setContests={setContests}/>))}


  </table>}


  </div>
  </> 
  )
}

export default Contests