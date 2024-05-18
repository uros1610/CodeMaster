import React from 'react'
import styles from '../styles/loginform.css'
import { useState } from 'react'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'



const Signup = () => {

    const navigate = useNavigate()
    const [inputs,setInputs] = useState({
      username:"",
      password:"",
      confirmpassword:"",
      email:""
    })


    const [error,setError] = useState(null)

    const handleChange = (e) => {
      const value = e.target.value
      const changed = {...inputs,[e.target.id]:e.target.value}
      setError(null)
      setInputs(changed)
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

   
  
        try {
         
          const res = await axios.post(`/auth/register`,inputs)
          console.log(res)
          navigate('/login')
        }
        catch (err) {
          if(err.response)
            setError(err.response.data.message)
        }

        finally {
          setInputs(
            {
              username:"",
              password:"",
              confirmpassword:"",
              email:""
            }
          )
        }
    }

  return (
    <div className='login-div'>
    <div className='main-container'>
      <form>
        <input type = "text" id = "username" placeholder = "Username" value = {inputs.username} onChange = {handleChange}/>
        <input type = "email" id = "email" placeholder = "Email" value = {inputs.email} onChange = {handleChange}/>
        <input type = "password" id = "password" placeholder="Password" value = {inputs.password} onChange = {handleChange}/>
        <input type = "password" id = "confirmpassword" placeholder="Confirm password" value = {inputs.confirmpassword} onChange = {handleChange}/>
        <button type = "submit" className = "sign-up" onClick={handleSubmit}>Sign up</button>
        <div className = "Account">
            Have an account?
            <Link to = '/login' className = "signinHere">Sign in here</Link>
        </div>
        <label htmlFor = "password" id = "passwordSuggestion">Password should contain at least 7 characters</label>
        {error && <p style = {{
          color:'red',
          fontSize:'1.2rem',
          padding:'0',
          margin:'0'
        }}>{error}</p>}
        </form>
    </div>
    </div>
  )
}

export default Signup