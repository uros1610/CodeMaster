import React, { useContext, useEffect, useState } from 'react'
import {useParams,Link} from 'react-router-dom'
import axios from 'axios'
import { SolvedProblemsContext } from '../context/SolvedProblemsContext'
import styles from '../styles/standings.css'
import {FaCheck,FaTimes} from 'react-icons/fa'
const Standings = () => {

    

    const {name} = useParams()
    const [problem,setProblems] = useState([])
    const [error,setError] = useState(null)
    const [arr,setArr] = useState({})
    const [users,setUsers] = useState([])
    const {solvedProblems} = useContext(SolvedProblemsContext)
    const [loading,setLoading] = useState(false)
    const [date,setDate] = useState("");
    const [length,setLength] = useState(0);
    
    
    
    
    

    const fetchData = async () => {
        setLoading(true)

        try {
            const resp = await axios.get(`/backend/contest/${name}/problems`)
            const resp2 = await axios.get(`/backend/contest/${name}/users/1`)
            setLength(resp.data[0].length)
            setDate(new Date(resp.data[0].date))
            
            setProblems(resp.data)

            const sorted = resp2.data.sort((a,b) => (
                a.ranking >= b.ranking ? -1 : 1
            ))

            setUsers(resp2.data)

            var tmp = {}

            for(let i = 0; i < resp.data.length; i++) {
                tmp[i+1] = resp.data[i];
            }
            setArr(tmp)

        }
        catch(err) {
            setError(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
        
    },[solvedProblems])
   
    const checkSolved = (id,userName) => {
  
      return solvedProblems.find(solved => (solved.problemTitle === arr[id].title && solved.userName === userName))
    }

    if(loading) {
        return <div className = "dlo" style = {{
            margin:'auto auto',
            fontSize:'60px',
            color:'#e3fef7',
            height:'100%',
            width:'100%',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        }}><p>Loading,Please wait...</p></div>
    }

  return (
    
    <table className = "standingsTable">
        <tr>
        <th>Place</th>
        <th>Username</th>
        {Object.keys(arr).map(ind => <th><Link className = "linksProblem " to = {`/problem/${arr[ind].title}`}>{ind} </Link></th>)}
        <th>Points</th>
        <th>User rating</th>
        </tr>

        {users.map((user,indx) => (

            <tr key = {indx+1}>
                <td>{indx+1}</td>
                <td><Link className = "linksProblem" to = {`/profile/${user.userName}`}>{user.userName}</Link></td>
                {Object.keys(arr).map(ind => (
                     <td>{checkSolved(ind,user.userName) ? <span className = "solved"
                     
                     ><FaCheck/></span> : <span className = "notsolved"><FaTimes/></span>}</td>
                ))}

                <td>{user.ranking}</td>
                <td>{user.rating}</td>
            
            </tr>

        ))}

    </table>
  )
}

export default Standings