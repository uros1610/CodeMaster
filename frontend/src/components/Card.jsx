import React from 'react'
import {FaMedal, FaUser} from 'react-icons/fa'
import styles from '../styles/card.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Modal from './Modal'

const Card = ({user,index,type,users,setUsers}) => {

  const [open, setOpen] = useState(false);
    const handleOpen = (event) => {setOpen(true)};
    const handleClose = (event) => {setOpen(false)};

  return (
    <>
    {!type && <Link to = {`/profile/${user.username}`} onClick = {(e) => {e.preventDefault();}} className = "singleCard">
            <div className = "profileInfoCard">
              {user.userPicture && <img src = {`${user.userPicture}`} className='profileImgCard'/>}
              {!user.userPicture && <FaUser className = "userIcon"/>}
              <p>Username:{user.username}</p>
              <p>Rating: {user.rating}</p>
              {index === 1 ? <FaMedal className = "gold"/> : index === 2 ? <FaMedal className = "silver"/> : index === 3 ? <FaMedal className = "bronze"/> : null}
              {type === 'delete' &&
              
              (
              
              
              <button className = "buttonDeleteUser" onClick={handleOpen}>Delete</button>  
              
              )}
            </div>
            

    </Link>}

    {type && <div className = "singleCard">
            <div className = "profileInfoCard">
              {user.userPicture && <img src = {`${user.userPicture}`} className='profileImgCard'/>}
              {!user.userPicture && <FaUser className = "userIcon"/>}
              <p>Username:{user.username}</p>
              <p>Rating: {user.rating}</p>
              {index === 1 ? <FaMedal className = "gold"/> : index === 2 ? <FaMedal className = "silver"/> : index === 3 ? <FaMedal className = "bronze"/> : null}
              {type === 'delete' &&
              
              (
              
              
              <button className = "buttonDeleteUser" onClick={handleOpen}>Delete</button>  
              
              )}
            </div>
            

    </div>}
    {open && <Modal type = 'confirmDelete' open = {open} setOpen={setOpen} users = {users} user = {user.username} setUsers={setUsers}/>}

    </>
  )
}

export default Card