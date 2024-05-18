import React from 'react'
import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import styles from '../styles/rating.css'
import RatingRow from './RatingRow'
import AuthContext from '../context/AuthContext'

const Rating = () => {

    const [users,setUsers] = useState([])

    const {user} = useContext(AuthContext)


    const [no,setNo] = useState(0);
    const [pageNumber,setpageNumber] = useState(1);


  useEffect(() => {

    const fetchNo = async () => {
      const resp = await axios.get(`/user/allusersCount`);

      var ind = resp.data[0].broj / 15;

      console.log("IND",ind);

      if(resp.data[0].broj % 15 !== 0) {
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

    useEffect(() => {

        const fetchData = async () => {
            try {
               
                const response = await axios.get(`/user/rating/${pageNumber}`)
                console.log(response.data)
                setUsers(response.data.sort((a,b) => {
                    if(a.rating > b.rating) {
                        return -1;
                    }
                    return 1;

                }
                ))
            }
            catch(err) {

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
    <table className = "orderedListRating">

        <tr>
            <th>Place</th>
            <th>Username</th>
            <th>Rating</th>
        </tr>

        {users.map((item,index) => <RatingRow user = {item} index = {index+1} currentUser = {user}/>)}

    </table>
    <div className = "pageNumbersDiv">
      {Array.from({length:no},(_ , i) => <button className = "pageNumbers" onClick = {(e) => {handlePageChange(e,i+1)}}>{i+1}</button>)}
      </div>
    </div>
  )
}

export default Rating