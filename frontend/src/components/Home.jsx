import React, { useContext, useEffect } from 'react'
import styles from '../styles/home.css'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Home = () => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/problemset')
  }

  const {user} = useContext(AuthContext)

  useEffect(() => {

    if(!user) {
      navigate('/login');
    }
  },[user])
  

  return (
    <>
    <h1 className = "welcome">Welcome to CodeMaster!</h1>
    <div className = "homeDiv">

      <div className = "quoteDiv">
        <p>At CodeMaster, we push you to be your best. Tackle diverse problems, compete with talented coders, and enhance your skills. Each challenge is a step toward mastery. Start your coding journey with CodeMaster.</p>
        <button className = "startSolving" onClick = {handleClick}><Link to = "/problemset" className = "solvingLink">Start Solving</Link></button>
      </div>

      <img src = "/pngegg.png"/>
        
      
    </div>
    </>
  )
}

export default Home