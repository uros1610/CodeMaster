import React from 'react'
import styles from '../styles/user.css'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const User = ({currUser,users,setUsers,role}) => {


    const [selectedValue, setSelectedValue] = useState(role);
    const navigate = useNavigate();

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };



    const handleClick = async (id) => {
        try {
            await axios.delete(`/user/${id}`)
            setUsers(users.filter(user => user.username !== currUser))
        }
        catch (err) {
            console.log(err)
        }
    }


    const handleEditRole = async (username) => {

        try {
        const resp = await axios.put(`/user/updateRole/${username}/${selectedValue}`)
        alert("Uspjesno editovano!");
        }
        catch(err) {

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
    }}>{currUser}

    <div className = "mainDivForEdits">
    
    <form className = "mainFormForEdits" >
    <label htmlFor = "Admin">Admin</label>
    <input className = "radioBtns" name = {`nameRole${currUser}`} type = "radio" value = "Admin" checked = {selectedValue === "Admin"}
    
    onChange = {(e) => {handleRadioChange(e,"Admin")}}
    />
    
    <label htmlFor = "Editor">Editor</label>
    <input className = "radioBtns" name = {`nameRole${currUser}`} type = "radio" value = "Editor" checked = {selectedValue === "Editor"}
    
    onChange = {(e) => {handleRadioChange(e,"Editor")}}
    />
   

   
    <label htmlFor = "User">User</label>
    <input className = "radioBtns" name = {`nameRole${currUser}`} type = "radio" value = "User" checked = {selectedValue === "User"}
    
    onChange = {(e) => {handleRadioChange(e,"User")}}
    />
    </form>

   

    
    <button className = "buttonEdit"
    onClick = {(e) => {handleEditRole(currUser)}}
    >Edit Role</button>
    <button className = "buttonDelete" 

    onClick={(e) => {handleClick(currUser)}}

    >Delete</button>

    </div>

    </div>
  )
}

export default User