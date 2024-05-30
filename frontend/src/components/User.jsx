import React from 'react'
import styles from '../styles/user.css'
import axios from 'axios';
import { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Modal from './Modal';


const User = ({currUser,users,setUsers,role}) => {


    const [selectedValue, setSelectedValue] = useState(role);

   

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };



 


    const handleEditRole = async (username) => {

        try {
        const resp = await axios.put(`/backend/user/updateRole/${username}/${selectedValue}`)
        alert("Uspjesno editovano!");
        }
        catch(err) {
          alert("Nije uspjesno editovano!");

        }
    }

  return (
    <div style = {{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        border:'2px solid #DDE6ED',
        color:'#DDE6ED',
        padding:'10px',
        width:'100%'
    }}> <Link className = "linksProblem" to = {`/profile/${currUser}`}>{currUser}</Link>
        {open && <Modal open={open} setOpen={setOpen} users = {users} user = {currUser} type = 'confirmDelete' setUsers={setUsers}/>}


    <div className = "mainDivForEdits">


    
    <form className = "mainFormForEdits" >
    <label htmlFor = "Admin">Admin</label>
    <input className = "radioBtns" name = {`nameRole${currUser}`} type = "radio" value = "Admin" checked = {selectedValue === "Admin"}
    
    onChange = {(e) => {handleRadioChange(e,"Admin")}}
    />
    
  

   
    <label htmlFor = "User">User</label>
    <input className = "radioBtns" name = {`nameRole${currUser}`} type = "radio" value = "User" checked = {selectedValue === "User"}
    
    onChange = {(e) => {handleRadioChange(e,"User")}}
    />
    </form>

   

    
    <button className = "buttonEdit"
    onClick = {(e) => {handleEditRole(currUser)}}
    >Edit Role</button>
    <button className = "buttonDelete" onClick={handleOpen}

    >Delete</button>


    </div>

    </div>
  )
}

export default User