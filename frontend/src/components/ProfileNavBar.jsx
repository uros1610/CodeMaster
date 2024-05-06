import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export const ProfileNavBar = () => {

    const {username} = useParams()

  return (
    <div className = "profile-links-div">
    <ul>
        <li><Link className =  "profile-link" to = {`/profile/${username}`}>Profile</Link></li>
        <li><Link className = "profile-link" to = {`/profile/submissions/${username}`}>Submissions</Link></li>
        <li><Link className= "profile-link" to = {`/profile/contests/${username}`}>Contests</Link></li>
    </ul>
</div>
  )
}
