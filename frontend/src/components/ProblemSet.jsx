import React from 'react'
import { useState,useEffect} from 'react'
import axios from 'axios'
import Problem from './Problem'
import styles from '../styles/problemset.css'

const ProblemSet = () => {

    const [loading,setLoading] = useState(true)
    const [error,setError] = useState('')
    const [problems,setProblems] = useState([])
    const BASE_URL = process.env.REACT_APP_BASE_URL

    useEffect(() => {
    const fetchData = async () => {

        console.log(`${BASE_URL}/problem/problemset`)

        try {
            const response = await axios.get(`${BASE_URL}/problem/problemset`)
            console.log("KAKO",response.data)
            setProblems(response.data)
        }
        catch(err) {
            console.log("Error loading problems!")
        }

        finally {
            setLoading(false)
        }
    }

    fetchData()
},[])

    return (
        <table className = "problemsetTable">
            <tr>
                <th>Problem Name</th>
                <th>Rating</th>
            </tr>

            {problems.map(problem => <Problem problem = {problem}/>)}
            
        </table>
    )
    
}

export default ProblemSet