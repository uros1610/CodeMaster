import React, { useContext } from 'react'
import styles from '../styles/profile.css'
import { useParams,Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { ProfileNavBar } from './ProfileNavBar'
import AuthContext from '../context/AuthContext'

const Profile = () => {

    const [userInfo,setUserInfo] = useState({})
    const {username} = useParams()

    const {user} = useContext(AuthContext)

    

    useEffect(() => {

        const fetchData = async () => {
            try {
              
                const response = await axios.get(`/profile/${username}`)
                console.log(response)
                setUserInfo(response.data)
            }
            catch(err) {
                console.log(err)
            }
        }

        fetchData()
    }
    
    ,[])
    

  return (
    <div className = 'profileContainer'>

        <ProfileNavBar/>

        <div className = "profileInfoAndImg">

            <img src = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'/>

            <div className = "profileInfo">
                <p>Username: {userInfo.username}</p>
                <p>Rating: {userInfo.rating}</p>
                {userInfo.username === user.username && <button className = 'editProfileBtn'><Link className='profile-link'>Edit profile</Link></button>}
            </div>
            
        </div>

    </div>
  )
}

export default Profile