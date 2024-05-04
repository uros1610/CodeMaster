import React from 'react'
import styles from '../styles/loginform.css'
import {Link} from 'react-router-dom'

const Login = ({isVisible}) => {

  
  return (
    <div className = "login-div">
    <div className = 'main-container'>
        <form>
         <input type = "text" id = "username" placeholder = "Username/Email"/>
         <input type = "password" id = "password" placeholder="Password"/>
         <input className = 'loginBtn' type = "submit"/>

        <div className = "noAccount">
            Don't have an account yet?
            <Link to = '/signup' className = "signupHere">Sign up here</Link>
        </div>

        </form>
    </div>

    </div>
  )
}

export default Login