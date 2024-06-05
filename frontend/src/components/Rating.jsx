import React from 'react'
import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import styles from '../styles/rating.css'
import AuthContext from '../context/AuthContext'
import PageNumbers from './PageNumbers'
import Card from './Card'

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
    <div className = "orderedListRating">

    
       {users.map((item,index) => <Card user = {item} index = {index+1+(pageNumber-1)*15} currentUser = {user}/>)}

    </div>}
    
    <PageNumbers no = {no} setpageNumber={setpageNumber} pageNumber={pageNumber}/>

   
    </div>
  )
}

export default Rating