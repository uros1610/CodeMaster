import React from 'react'
import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import styles from '../styles/manageusers.css'
import AuthContext from '../context/AuthContext'
import User from './User'
import { FaSearch } from 'react-icons/fa'
import PageNumbers from './PageNumbers'
const ManageUsers = () => {

  
  const [users,setUsers] = useState([])

  const {user} = useContext(AuthContext)

  const [pageNumber,setpageNumber] = useState(1);

  const [search,setSearch] = useState("");


  const [no,setNo] = useState(0);

  const fetchNo = async () => {
    const resp = await axios.get(`/backend/user/allusersCount?search=${search}`);


    var ind = Math.ceil(resp.data[0].broj/10)

    setNo(ind);
  }


  useEffect(() => {


    fetchNo();

  },[])

  const handlePageChange = (e,id) => {
      e.preventDefault();

      setpageNumber(id);
  }

  useEffect(() => {

    const fetchData = async () => {
        
        try {
            
          const resp = await axios.get(`/backend/user/filteredusers/${pageNumber}?search=${search}`)
          console.log(resp.data)
          setUsers(resp.data)
        }
        catch(err) {
          console.log(err);
        }

    }

  fetchData()
  },[pageNumber])

  useEffect(() => {
    console.log("NO",no);
  },[no])

  
 const filterSearch = async (e) => {

  e.preventDefault();

  try {
    const resp = await axios.get(`/backend/user/filteredusers/${pageNumber}?search=${search}`)
   
    setUsers(resp.data);
    fetchNo();
  }
  catch(err) {

  }
 }
  


  return (
    <>
    <div className = "usersDiv">
      <form className = "searchBarForm">
      <input type = "text" className = "searchUsers" placeholder='Search Users' value = {search} onChange = {(e) => {setSearch(e.target.value)}}/>
      <button className = "searchIcon" onClick={filterSearch}><FaSearch/></button>
      </form>
      
      {users.map((user) => (<User key = {user.username} currUser = {user.username} role = {user.rola} users = {users} setUsers={setUsers}/>))}

            

    </div>

    <PageNumbers no = {no} setpageNumber={setpageNumber} pageNumber={pageNumber}/>

    </>

      
  )
}

export default ManageUsers