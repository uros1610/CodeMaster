import React, { useContext } from 'react'
import { ProfileNavBar } from './ProfileNavBar'
import { useState,useEffect} from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import Submission from './Submission'
import styles from '../styles/submissions.css'
import { useParams } from 'react-router-dom'

const Submissions = () => {

  const [data,setData] = useState([])

  const {user} = useContext(AuthContext)

  const {username} = useParams()


  useEffect(() => {

    const fetchData = async () => {
      try {
        
      const response = await axios.get(`/submissions/${username}`)
      console.log(response)
      const sorted = response.data.sort((a,b) => ((a.id < b.id) ? 1 : -1))
      setData(sorted)
      }
      catch(err) {
        console.log(err)
      }
    }

    fetchData()

  },[])

  return (
    <div className='profileContainer'>
        <ProfileNavBar/>
        <table className = "submissionsTable">
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Username</th>
            <th>Problem Name</th>
            <th>Language</th>
            <th>Verdict</th>
          </tr>
          {data.map(item => <Submission item = {item}/>)}
        </table>
    </div>
  )
}

export default Submissions