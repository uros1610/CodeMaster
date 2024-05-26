import React from 'react'
import { ProfileNavBar } from './ProfileNavBar'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserContests = () => {
  const {username} = useParams();

  const [contests,setContests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/backend/user/contests/${username}`)
        setContests(response.data)
        console.log("RESP",response);
      }
      catch(err) {
        console.log(err);
      }
    }
    fetchData();
  },[])

  return (
    <div className='profileContainer'>
        <ProfileNavBar/>

        <table className = "submissionsTable">

        <tr>
          <th>
            Contest Name
          </th>
          <th>Placement</th>
          <th>Rating change</th>
          <th>Number of solved</th>
        </tr>

        {contests.map(contest => (<tr>
          <td><Link className = "linksNavBar" to = {`/contest/${contest.contestName}/standings`}>{contest.contestName}</Link></td>
          <td>{contest.placed}</td>
          <td style = {{
            color: contest.ratingGain > 0 ? 'lime' : contest.ratingGain === 0 ? '#e3fef7' : 'red'
          }}>{contest.ratingGain > 0 ? `+${contest.ratingGain}` : (contest.ratingGain)}</td>
          <td>{contest.numOfSolved}</td>
        </tr>))}

        </table>


    </div>
  )
}

export default UserContests