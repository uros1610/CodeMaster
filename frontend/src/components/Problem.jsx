import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect} from 'react';
import axios from 'axios';

const Problem = ({problem}) => {

  const [topics,setTopics] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/backend/problem/problemTopic/${problem.title}`);

      
      var arr = [];
      
      for(let i = 0; i < response.data.length - 1; i++) {
        arr.push(`${response.data[i].topicName}, `)
      }
      arr.push(response.data[response.data.length-1].topicName);
      setTopics(arr);
    }
    catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    <tr>
        <td>
            <div> <Link to = {`/problem/${problem.title}`} className = "problemTitle">{problem.title}</Link> 
        
                <span className = "problemSpanTopics">{topics?.map(topic => topic)}</span>  
            </div>
        
        </td>
        <td>{problem.rating}</td>
    </tr>
  )
}

export default Problem