import React from 'react'
import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import styles from '../styles/manageusers.css'
import AuthContext from '../context/AuthContext'
import User from './User'
import { FaSearch } from 'react-icons/fa'
const ManageUsers = () => {

  
  const [users,setUsers] = useState([])

  const {user} = useContext(AuthContext)

  const [pageNumber,setpageNumber] = useState(1);

  const [search,setSearch] = useState("");


  const [no,setNo] = useState(0);

  const fetchNo = async () => {
    const resp = await axios.get(`/backend/user/allusersCount?search=${search}`);

    console.log("sdjsdfujfsdjfsgkgskjgfjkjgfdkkjgfkjdgfkjdgf",resp.data[0].broj)

    var ind = resp.data[0].broj / 10;

    console.log("IND",ind);

    if(resp.data[0].broj % 10 !== 0) {
      ind++;
    }

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
    <div className = "usersDiv">
      <form className = "searchBarForm">
      <input type = "text" className = "searchUsers" placeholder='Search Users' value = {search} onChange = {(e) => {setSearch(e.target.value)}}/>
      <button className = "searchIcon" onClick={filterSearch}><FaSearch/></button>
      </form>
      {users.map((user) => (<User currUser = {user.username} role = {user.rola} users = {users} setUsers={setUsers}/>))}

      <div className = "pageNumbersDiv">
      {Array.from({length:no},(_ , i) => <button className = "pageNumbers" onClick = {(e) => {handlePageChange(e,i+1)}}>{i+1}</button>)}
      </div>

      

    </div>

      
  )
}

export default ManageUsers