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

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const resp = await axios.get(`/contest/${name}/standings`)
                const resp2 = await axios.get(`/contest/${name}/users/1`)
                
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
    
        fetchData();

    },[])
    
    const checkSolved = (id) => {
        if(!arr) {
            return false;
        }
        console.log(solvedProblems)
        console.log("arr je",arr)
        return solvedProblems.find(solved => solved.problemTitle === arr[id].title)
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
        </tr>

        {users.map((user,indx) => (

            <tr key = {indx+1}>
                <td>{indx+1}</td>
                <td><Link className = "linksProblem" to = {`/profile/${user.userName}`}>{user.userName}</Link></td>
                {Object.keys(arr).map(ind => (
                     <td>{checkSolved(ind) ? <span className = "solved"
                     
                     ><FaCheck/></span> : <span className = "notsolved"><FaTimes/></span>}</td>
                ))}

                <td>{user.ranking}</td>
            
            </tr>

        ))}

    </table>
  )
}

export default Standings