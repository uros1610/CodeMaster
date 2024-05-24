import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import '../styles/navbar.css'; 
import AuthContext from '../context/AuthContext';

const NavBar = ({ width, isVisible,setIsVisible}) => {

  const {user,logout} = useContext(AuthContext)

  const btnClick = () => {
    setIsVisible(!isVisible); 
  };

  const bgColor = '#9DB2BF' 
  const left = isVisible ? '0px' : '-1000px'; 

  if (width > 780) {
    setIsVisible(false)
    // If the width is larger than 525px, render the full navbar
    return (
      <div className = "navBar">
         <div className = "userNameLogout" style={{
          width: width < 1050 ? '100%' : 'inherit'
         }}>
        <span className = "appNamefirst">Code<span className = "appNamesecond">Master</span></span>

       
        {user && <Link to = {`/profile/${user.username}`} className = "userName">{user.username}</Link>}
        {user && <span className = "logout" onClick = {logout}>Logout</span>}
        </div>

          <div className = 'links-div' style = {{
            justifyContent: width < 1050 ? 'center' : 'flex-end'
          }}>
          <Link className = "linksNavBar" to="/home">Home</Link>
          <Link className = "linksNavBar" to="/contests">Contests</Link>
          <Link className = "linksNavBar" to="/rating">Rating</Link>
          <Link className = "linksNavBar" to="/problemset">Problemset</Link>
          {user && user.role === "Admin" && <Link className = "linksNavBar" to={"/addcontest"}>Add Contest</Link>}
          {user && user.role === "Admin" && <Link className = "linksNavBar" to={"/manageusers"}>Manage Users</Link>}


          </div>
      </div>
    );
  } else {
 
    return (
      <>
        <div className = "userNameLogoutDropdown">

        <button
          className="dropdown-btn"
          onClick={btnClick}
          style={{ color: bgColor,width:'100px'}}
        >
          <FaBars />
          <p className = "appNamefirst">Code<span className = "appNamesecond">Master</span></p>
        </button>

        <div className = "userNameDropdown">
        {user && <span className = "userName">{user.username}</span>}
        {user && <span className = "logout" onClick = {logout}>Logout</span>}
        </div>
        
        </div>

        <div
          className="dropdown"
          style={{
            
            left: left,
            transition: 'left 0.3s', 
            
          }}
        >
          <Link className = "linksNavBar" to="/home">Home</Link>
          <Link className = "linksNavBar" to="/contests">Contests</Link>
          <Link className = "linksNavBar" to="/rating">Rating</Link>
          <Link className = "linksNavBar" to="/problemset">Problemset</Link>
          {user && user.role === "Admin" && <Link className = "linksNavBar" to={"/addcontest"}>Add Contest</Link>}
          {user && user.role === "Admin" && <Link className = "linksNavBar" to={"/manageusers"}>Manage Users</Link>}


        </div>
      </>
    );
  }
};

export default NavBar;
