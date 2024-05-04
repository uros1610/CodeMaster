import React from 'react'
import styles from '../styles/loginform.css'

const Signup = () => {
  return (
    <div className='login-div'>
    <div className='main-container'>
      <form>
        <input type = "text" id = "username" placeholder = "Username"/>
        <input type = "email" id = "username" placeholder = "Email"/>
        <input type = "text" id = "password" placeholder="Password"/>
        <input type = "text" id = "password" placeholder="Confirm password"/>
        <button type = "submit" className = "sign-up">Sign up</button>
        <label for = "password" id = "passwordSuggestion">Password should contain at least 7 characters</label>
        </form>
    </div>
    </div>
  )
}

export default Signup