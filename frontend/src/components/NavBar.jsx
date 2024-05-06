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
         <div className = "userNameLogout">
        <span className = "appNamefirst">Code<span className = "appNamesecond">Master</span></span>

       
        {user && <Link to = {`/profile/${user.username}`} className = "userName">{user.username}</Link>}
        {user && <span className = "logout" onClick = {logout}>Logout</span>}
        </div>

          <div className = 'links-div'>
          <Link className = "linksNavBar" to={user ? "/home" : "/login"}>Home</Link>
          <Link className = "linksNavBar" to={user ? "/contests" : "/login"}>Contests</Link>
          <Link className = "linksNavBar" to={user ? "/rating" : "/login"}>Rating</Link>
          <Link className = "linksNavBar" to={user ? "/problemset" : "/login"}>Problemset</Link>
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
          <Link className = "linksNavBar" to={user ? "/home" : "/login"}>Home</Link>
          <Link className = "linksNavBar" to={user ? "/contests" : "/login"}>Contests</Link>
          <Link className = "linksNavBar" to={user ? "/rating" : "/login"}>Rating</Link>
          <Link className = "linksNavBar" to={user ? "/problemset" : "/login"}>Problemset</Link>
        </div>
      </>
    );
  }
};

export default NavBar;
