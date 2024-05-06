import React from 'react'
import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import styles from '../styles/rating.css'
import RatingRow from './RatingRow'
import AuthContext from '../context/AuthContext'

const Rating = () => {

    const [users,setUsers] = useState([])

    const {user} = useContext(AuthContext)

    

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8800/backend/rating')
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
    },[])

  return (
    <table className = "orderedListRating">

        <tr>
            <th>Place</th>
            <th>Username</th>
            <th>Rating</th>
        </tr>

        {users.map((item,index) => <RatingRow user = {item} index = {index+1} currentUser = {user}/>)}

    </table>
  )
}

export default Rating