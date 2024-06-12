import React from 'react'
import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import styles from '../styles/manageusers.css'
import AuthContext from '../context/AuthContext'
import { FaSearch } from 'react-icons/fa'
import PageNumbers from './PageNumbers'
import Card from './Card'
import Loading from './Loading'
const ManageUsers = () => {

  
  const [users,setUsers] = useState([])

  const {user} = useContext(AuthContext)

  const [pageNumber,setpageNumber] = useState(1);

  const [search,setSearch] = useState("");


  const [loading,setLoading] = useState(false);


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

  const fetchData = async () => {
    setLoading(true);
    try {
        
      const resp = await axios.get(`/backend/user/filteredusers/${pageNumber}?search=${search}`)
      console.log(resp.data)
      setUsers(resp.data)
    }
    catch(err) {
      console.log(err);
    }

    finally {
      setLoading(false);
    }

  }

  useEffect(() => {

    fetchData();
    window.scrollTo(0,0);
  
  },[pageNumber])

  useEffect(() => {
    console.log("NO",no);
  },[no])

  
 const filterSearch = async () => {

  try {
    fetchData();
    fetchNo();
  }
  catch(err) {

  }
 }

 useEffect(() => {
  filterSearch();
 },[search])
  
 

  return (
    <>
    <div className = "usersDiv">

      <div className = "searchBarBtnEdit">
        <form className = "searchBarForm">
        <input type = "text" className = "searchUsers" placeholder='Search Users' value = {search} onChange = {(e) => {setSearch(e.target.value)}}/>
        <button className = "searchIcon" ><FaSearch/></button>
      
        </form>


      </div>

      <div className = "manageUsers">
        {!loading && users.map((user) => (<Card key = {user.username} user = {user} role = {user.rola} users = {users} setUsers={setUsers} type = 'delete'/>))}
        {loading && <Loading/>}
      </div>

            

    </div>

    {!loading && <PageNumbers no = {no} setpageNumber={setpageNumber} pageNumber={pageNumber}/>}

    </>

      
  )
}

export default ManageUsers