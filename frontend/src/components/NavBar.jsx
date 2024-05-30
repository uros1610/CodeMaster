import React, { useState,useContext,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import '../styles/navbar.css'; 
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ width, isVisible,setIsVisible}) => {

  const {user,logout} = useContext(AuthContext)
  const currentUrl = window.location.href;
  const navigate = useNavigate();

  const parsed = currentUrl.split("/");

  const [home,sethome] = useState(false);
  const [profile,setprofile] = useState(false);
  const [contests,setcontests] = useState(false);
  const [problemset,setproblemset] = useState(false);
  const [addcontest,setaddcontest] = useState(false);
  const [manageusers,setmanageusers] = useState(false);
  const [rating,setrating] = useState(false);

 


 useEffect(() => {

 

  sethome(parsed.indexOf("home") === -1 ? false : true);
  if(user) {
  setprofile(parsed.indexOf(`${user.username}`) === -1 ? false : true);
  }
  setcontests(parsed.indexOf("contests") === -1 ? false : true);
  setproblemset(parsed.some(pars => pars.includes("problem")));
  setaddcontest(parsed.indexOf("addcontest") === -1 ? false : true);
  setmanageusers(parsed.indexOf("manageusers") === -1 ? false : true);
  setrating(parsed.indexOf("rating") === -1 ? false : true);

 },[user,window.location.href])




  const btnClick = () => {
    setIsVisible(!isVisible); 
  };

  const bgColor = '#9DB2BF' 
  const left = isVisible ? '0px' : '-1000px'; 

  if (width > 780) {
    setIsVisible(false)
    
    return (
      <div className = "navBar">
         <div className = "userNameLogout" style={{
          width: width < 1050 ? '100%' : 'inherit'
         }}>
        <span className = "appNamefirst">Code<span className = "appNamesecond">Master</span></span>

       
        {user && <Link to = {`/profile/${user.username}`} className = {profile ? "userNameactive" : "userName"}>{user.username}</Link>}
        {user && <span className = "logout" onClick = {logout}>Logout</span>}
        </div>

          <div className = 'links-div' style = {{
            justifyContent: width < 1050 ? 'center' : 'flex-end'
          }}>
          <Link className = {home ? "linksNavBaractive" : "linksNavBar"} to="/home" >Home</Link>
          <Link className = {contests ? "linksNavBaractive" : "linksNavBar"} to="/contests" >Contests</Link>
          <Link className = {rating  ? "linksNavBaractive" : "linksNavBar"} to="/rating">Rating</Link>
          <Link className = {problemset ? "linksNavBaractive" : "linksNavBar"} to="/problemset">Problemset</Link>
          {user && user.role === "Admin" && <Link className = {addcontest ? "linksNavBaractive" : "linksNavBar"} to={"/addcontest"}>Add Contest</Link>}
          {user && user.role === "Admin" && <Link className = {manageusers ? "linksNavBaractive" : "linksNavBar"} to={"/manageusers"}>Manage Users</Link>}


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
        {user && <Link to = {`/profile/${user.username}`} className = {profile ? "userNameactive" : "userName"}>{user.username}</Link>}
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
          <Link className = {home ? "linksNavBaractive" : "linksNavBar"} to="/home" >Home</Link>
          <Link className = {contests ? "linksNavBaractive" : "linksNavBar"} to="/contests" >Contests</Link>
          <Link className = {rating  ? "linksNavBaractive" : "linksNavBar"} to="/rating">Rating</Link>
          <Link className = {problemset ? "linksNavBaractive" : "linksNavBar"} to="/problemset">Problemset</Link>
          {user && user.role === "Admin" && <Link className = {addcontest ? "linksNavBaractive" : "linksNavBar"} to={"/addcontest"}>Add Contest</Link>}
          {user && user.role === "Admin" && <Link className = {manageusers ? "linksNavBaractive" : "linksNavBar"} to={"/manageusers"}>Manage Users</Link>}

        </div>
      </>
    );
  }
};

export default NavBar;
