import React, { useContext } from 'react'
import styles from '../styles/loginform.css'
import {Link,useNavigate} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import AuthContext  from '../context/AuthContext'



const Login = ({isVisible}) => {


  const navigate = useNavigate()
  const {login} = useContext(AuthContext)


  const [inputs,setInputs] = useState({
    username:"",
    password:"",
  })

  const [error,setError] = useState(null)



  const handleChange = (e) => {
  
    const value = e.target.value
    const changed = {...inputs,[e.target.id]:e.target.value}
    setError(null)
    setInputs(changed)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if((inputs.username).includes('\'')) {
      setError("mene ces da zeznes")
      return;

    }

    

    try {
     
      

    await login(inputs)
    navigate('/home')
  }
  catch (err) {
    if(err.response) {
      setError(err.response.data.message)
    }

  }
  finally {
    
  }
  }

  
  return (
    <div className = "login-div">
    <div className = 'main-container'>
        <form>
         <input type = "text" id = "username" placeholder = "Username/Email" onChange = {handleChange}/>
         <input type = "password" id = "password" placeholder="Password" onChange = {handleChange}/>
         <button className = 'loginBtn' type = "submit" onClick = {handleSubmit}>Sign in</button>

        <div className = "noAccount">
            Don't have an account yet?
            <Link to = '/register' className = "signupHere">Sign up here</Link>
        </div>

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

export default Login