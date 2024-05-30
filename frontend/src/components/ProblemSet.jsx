import React from 'react'
import { useState,useEffect} from 'react'
import axios from 'axios'
import Problem from './Problem'
import styles from '../styles/problemset.css'
import { FaSearch } from 'react-icons/fa'
import PageNumbers from './PageNumbers'
import Loading from './Loading'

const ProblemSet = () => {

    const [loading,setLoading] = useState(true)
    const [error,setError] = useState('')
    const [problems,setProblems] = useState([])
    const [no,setNo] = useState(0);
    const [pageNumber,setpageNumber] = useState(1);


    const [filter,setFilter] = useState({
        title:"",
        ratingUp:"",
        ratingDown:""
    })
    const fetchNo = async () => {
        var up = parseInt(filter["ratingUp"]);
        var down = parseInt(filter["ratingDown"]);

        if(isNaN(up)) {
            up = 9999;
        }
        if(isNaN(down)) {
            down = 0;
        }

      const resp = await axios.get(`/backend/problem/problemCount`,{
        params:{
            title:filter["title"],
            up:up,
            down:down
        }
      });

      console.log(resp);

      var ind = Math.ceil(resp.data[0].broj / 10);

      console.log("IND",ind);


      setNo(ind);
    }

    useEffect(() => {

        
    
        fetchNo();
    
      },[])
    
     

    const handleChange = (e) => {
        const id = e.target.id;
        const newObj = {...filter};
        newObj[id] = e.target.value;
        setFilter(newObj);
    } 

    const handleFilter = async (e) => {
        e.preventDefault();
        var up = parseInt(filter["ratingUp"]);
        var down = parseInt(filter["ratingDown"]);

        if(isNaN(up)) {
            up = 9999;
        }
        if(isNaN(down)) {
            down = 0;
        }

        const response = await axios.get(`/backend/problem/problemset/${pageNumber}`,{
            params:{
                title:filter["title"],
                up:up,
                down:down
            }
        })
        fetchNo()
        setProblems(response.data)




    }

    useEffect(() => {
    const fetchData = async () => {

        setLoading(true)
        try {
        var up = parseInt(filter["ratingUp"]);
        var down = parseInt(filter["ratingDown"]);

        if(isNaN(up)) {
            up = 9999;
        }
        if(isNaN(down)) {
            down = 0;
        }

        const response = await axios.get(`/backend/problem/problemset/${pageNumber}`,{
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
},[pageNumber])

    if(loading) {
    return (
     <Loading/>
    )
    }


    return (
        <div className = "problemsetDivSearch">

            <div className = "search">

            <p className = "searchParagraph">Search problems by rating and title</p>

            <div className = "searchRating">
            <input type = "text" id = "ratingDown"
            placeholder='Rating lower bound'
            value = {filter.ratingDown}
            onChange={handleChange}
            />

            <input type = "text"
            id = "ratingUp"
            placeholder='Rating upper bound'
            value = {filter.ratingUp}
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

      <PageNumbers setpageNumber = {setpageNumber} no = {no} pageNumber = {pageNumber}/>

    
    
        </div>
    )
    
}

export default ProblemSet