import React from 'react'
import {FaMedal} from 'react-icons/fa'
import styles from '../styles/card.css'
import { Link } from 'react-router-dom'

const Card = ({user,index}) => {
  return (
    <Link to = {`/profile/${user.username}`} className = "singleCard">
            <img className = "profileImg" src = {!user.userPicture ? 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' : user.userPicture}/>
            <p>Username:{user.username}</p>
            <p>Rating: {user.rating}</p>
            {index === 1 ? <FaMedal className = "gold"/> : index === 2 ? <FaMedal className = "silver"/> : index === 3 ? <FaMedal className = "bronze"/> : null}

    </Link>
  )
}

export default Card