import React, { useContext } from 'react'
import { ProfileNavBar } from './ProfileNavBar'
import { useState,useEffect} from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import Submission from './Submission'
import styles from '../styles/submissions.css'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import PageNumbers from './PageNumbers'

const Submissions = () => {

  const [data,setData] = useState([])

  const {user} = useContext(AuthContext)
  const [no,setNo] = useState(0);
  const [pageNumber,setpageNumber] = useState(1);

  const {username} = useParams()
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      
    const response = await axios.get(`/backend/submissions/all/${username}/${pageNumber}`)
    console.log(response.data);
      
    setData(response.data)
    }
    catch(err) {
      
      console.log(err)
    }
  }

  const fetchNo = async () => {
    try {
    const response = await axios.get(`/backend/submissions/allSubmissions/count/${username}`);
    console.log(response.data[0]);
    setNo(Math.ceil(response.data[0].broj / 20));
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchNo();

  },[])

  useEffect(() => {

   
    fetchData();

  },[pageNumber])

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

    <PageNumbers no={no} pageNumber={pageNumber} setpageNumber={setpageNumber}/>
 
    </div>
  )
}

export default Submissions