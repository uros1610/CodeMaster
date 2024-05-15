import React from 'react'
import styles from '../styles/submitproblem.css'
import {useRef,useState,useEffect} from 'react'
import { useParams,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const SubmitProblem = ({errDesc,setErrDesc}) => {

    const [TextArea,setTextArea] = useState("")

    
    const navigate = useNavigate()

    const [val,setVal] = useState('cpp17');

    const {name} = useParams()



    const {user} = useContext(AuthContext)
    const BASE_URL = process.env.REACT_APP_BASE_URL

    if(!localStorage.getItem('token')) {
      navigate('/login')
    }

    const languageMap = {
      "C++ 17": "cpp17",
      "Python 3": "python3",
      "Java": "java"
    };

    
      const handleLanguageChange = (lang) => {
        
        // Set selected language based on mapped value
        setVal(lang);
      };
    

      const handleClick = async (e) => {

          try {
            const date = Date.now()
            const dateFormatted = new Date(date).toUTCString();
            
            const submission = {code:TextArea,date:dateFormatted,username:user.username,problemname:name, val:val}
            const resp = await axios.post(`${BASE_URL}/submit`,submission)
            navigate(`/profile/submissions/${user.username}`)

      }
      catch(err) {
        navigate(`/profile/submissions/${user.username}`)

      }

    }
  

    let list = TextArea.split("\n");
    const lineNumbersRef = useRef(null);
    const textAreaRef = useRef(null);

    const syncScroll = () => {
        if (textAreaRef.current && lineNumbersRef.current) {
          lineNumbersRef.current.scrollTop = textAreaRef.current.scrollTop;
        }
      };
      

 

  return (
    <div className = "main-div">
        <div className= "problem-container">

            <div className= "problem">
                
                <span className= "prob">Problem:</span>
                <span className = "prob">{name}</span>

            </div>

            <div className= "language-sourcecode">
                <div className= "language">
                    <label htmlFor = "languages" style = {{color:'#E3FEF7',marginRight:'10px'}}>Choose a language:</label>
                    <select name = "languages" id = "languages" onChange = {(e) => {handleLanguageChange(e.target.value)}}>
                        <option value = "cpp17">C++ 17</option>
                        <option value = "python3">Python 3</option>
                        <option value = "java">Java</option>
                        
                    </select>
                </div>

                <div className= "source-code">
                    <div className= "linenumbers" ref = {lineNumbersRef}>
                        {list.map((item,index) => {
                            index = index + 1;
                            return (<div>{index}</div>)
                        })}
                    </div>

                    <textarea className= "code" placeholder="Source code:" ref = {textAreaRef} onChange = {(e) => {setTextArea(e.target.value)}} onScroll = {syncScroll}></textarea>


                    
                </div>

               
            </div>

            <button className = "btnSubmit" type = "submit" onClick = {handleClick}>Submit</button>
        </div>
    </div>
  )
}

export default SubmitProblem