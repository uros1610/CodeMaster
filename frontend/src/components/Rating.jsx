import React from 'react'
import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import styles from '../styles/rating.css'
import RatingRow from './RatingRow'
import AuthContext from '../context/AuthContext'
import PageNumbers from './PageNumbers'

const Rating = () => {
  
    const [users,setUsers] = useState([])

    const {user} = useContext(AuthContext)


    const [no,setNo] = useState(0);
    const [pageNumber,setpageNumber] = useState(1);
    const [loading,setLoading] = useState(false)


  useEffect(() => {

    const fetchNo = async () => {
      const resp = await axios.get(`/backend/user/allusersCount`);

      console.log("IND",resp.data);

      var ind = Math.ceil(resp.data[0].broj / 15);

      setNo(ind);
    }

    fetchNo();

  },[])

  const handlePageChange = (e,id) => {
      e.preventDefault();

      setpageNumber(id);
  }

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/backend/user/rating/${pageNumber}`)
                setUsers(response.data)
                    
            }
            catch(err) {

            }

            finally {
              setLoading(false)
            }

        }

    fetchData()
    },[pageNumber])

  return (
    <div className = "ratingDiv" style = {{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column'
    }}>
      
    {!loading && 
    <table className = "orderedListRating">

        <tr>
            <th>Place</th>
            <th>Username</th>
            <th>Rating</th>
        </tr>
       {users.map((item,index) => <RatingRow user = {item} index = {index+1+(pageNumber-1)*15} currentUser = {user}/>)}

    </table>}
    
    <PageNumbers no = {no} setpageNumber={setpageNumber} pageNumber={pageNumber}/>

   
    </div>
  )
}

export default Rating