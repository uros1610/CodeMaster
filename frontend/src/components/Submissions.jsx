import React, { useContext } from 'react'
import { ProfileNavBar } from './ProfileNavBar'
import { useState,useEffect} from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
const Submissions = () => {

  const [data,setData] = useState([])

  const {user} = useContext(AuthContext)

  useEffect(() => {

    const fetchData = async () => {
      try {
      const response = await axios.get(`http://localhost:8800/backend/profile/submissions/${user.username}`)
      setData(response.data)
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
    </div>
  )
}

export default Submissions