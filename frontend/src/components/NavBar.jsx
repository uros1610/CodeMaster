import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import '../styles/navbar.css'; // Ensure the CSS file is included

const NavBar = ({ width, isVisible,setIsVisible}) => {


  const btnClick = () => {
    setIsVisible(!isVisible); // Toggle the visibility state
  };

  const bgColor = '#9DB2BF' // Background color based on visibility
  const left = isVisible ? '0px' : '-1000px'; // Left position to control dropdown visibility

  if (width > 637) {
    setIsVisible(false)
    // If the width is larger than 525px, render the full navbar
    return (
      <div className = "navBar">

        <span className = "appNamefirst">Code<span className = "appNamesecond">Master</span></span>

          <div className = 'links-div'>
          <Link className = "linksNavBar" to="/">Home</Link>
          <Link className = "linksNavBar" to="/contests">Contests</Link>
          <Link className = "linksNavBar" to="/rating">Rating</Link>
          <Link className = "linksNavBar" to="/login">Sign in</Link>
          <Link className = "linksNavBar" to="/problemset">Problemset</Link>  
          </div>
      </div>
    );
  } else {
    // Otherwise, render a button and the dropdown for smaller screens
    return (
      <>
    
        <button
          className="dropdown-btn"
          onClick={btnClick}
          style={{ color: bgColor,width:'100px'}}
        >
          <FaBars />
          <p className = "appNamefirst">Code<span className = "appNamesecond">Master</span></p>
        </button>

        <div
          className="dropdown"
          style={{
            
            left: left,
            transition: 'left 0.3s', 
            
          }}
        >
         

          <Link className = "linksNavBar" to="/">Home</Link>
          <Link className = "linksNavBar" to="/contests">Contests</Link>
          <Link className = "linksNavBar" to="/rating">Rating</Link>
          <Link className = "linksNavBar" to="/login">Sign in</Link>
          <Link className = "linksNavBar" to="/problemset">Problemset</Link>
        </div>
      </>
    );
  }
};

export default NavBar;
