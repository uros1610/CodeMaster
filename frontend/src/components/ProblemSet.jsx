import React from 'react'
import { useState,useEffect} from 'react'
import axios from 'axios'
import Problem from './Problem'
import styles from '../styles/problemset.css'
import { FaSearch } from 'react-icons/fa'

const ProblemSet = () => {

    const [loading,setLoading] = useState(true)
    const [error,setError] = useState('')
    const [problems,setProblems] = useState([])
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const [no,setNo] = useState(0);
    const [pageNumber,setpageNumber] = useState(1);


    const [filter,setFilter] = useState({
        title:"",
        ratingUp:"",
        ratingDown:""
    })

    useEffect(() => {

        const fetchNo = async () => {
          const resp = await axios.get(`${BASE_URL}/problem/problemCount`);
    
          var ind = resp.data[0].broj / 10;
    
          console.log("IND",ind);
    
          if(resp.data[0].broj % 10 !== 0) {
            ind++;
          }
    
          setNo(ind);
        }
    
        fetchNo();
    
      },[])
    
      const handlePageChange = (e,id) => {
          e.preventDefault();
    
          setpageNumber(id);
      }
    

    const handleChange = (e) => {
        const id = e.target.id;
        const newObj = {...filter};
        newObj[id] = e.target.value;
        setFilter(newObj);
    } 

    const handleFilter = async () => {

        var up = parseInt(filter["ratingUp"]);
        var down = parseInt(filter["ratingDown"]);

        if(isNaN(up)) {
            up = 9999;
        }
        if(isNaN(down)) {
            down = 0;
        }

        const response = await axios.get(`${BASE_URL}/problem/problemset/${pageNumber}`,{
            params:{
                title:filter["title"],
                up:up,
                down:down
            }
        })
        setProblems(response.data)




    }

    useEffect(() => {
    const fetchData = async () => {


        try {
        var up = parseInt(filter["ratingUp"]);
        var down = parseInt(filter["ratingDown"]);

        if(isNaN(up)) {
            up = 9999;
        }
        if(isNaN(down)) {
            down = 0;
        }

        const response = await axios.get(`${BASE_URL}/problem/problemset/${pageNumber}`,{
            params:{
                title:filter["title"],
                up:up,
                down:down
            }
        })
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
        <div className = "problemsetDivSearch">

            <div className = "search">

            <p className = "searchParagraph">Search problems by rating and title</p>

            <div className = "searchRating">
            <input type = "text" id = "ratingDown"
            placeholder='Rating lower bound'
            onChange={handleChange}
            />

            <input type = "text"
            id = "ratingUp"
            placeholder='Rating upper bound'
            onChange={handleChange}/>
            </div>

            <input type = "text"
            placeholder='Search by title' id = "title" onChange={handleChange}/>
            

            <button className = "filterBtn" onClick={handleFilter}>Filter</button>

        </div>

        <table className = "problemsetTable">
            <tr>
                <th>Problem Name</th>
                <th>Rating</th>
            </tr>

            {problems.map(problem => <Problem problem = {problem}/>)}
            
        </table>

        <div className = "pageNumbersDiv">
      {Array.from({length:no},(_ , i) => <button className = "pageNumbers" onClick = {(e) => {handlePageChange(e,i+1)}}>{i+1}</button>)}
      </div>
    
        </div>
    )
    
}

export default ProblemSet