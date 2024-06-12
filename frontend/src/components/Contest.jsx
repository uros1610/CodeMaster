import React, { useContext,useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import Modal from './Modal'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'



const Contest = ({item,flag,contests,setContests}) => {



  const {user} = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const [open2,setOpen2] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [contestsUser,setContestsUser] = useState([])
  const [registered,setRegistered] = useState(false)
  const [loading,setLoading] = useState(false)


  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resp = await axios.get(`/backend/contest/${item.name}/${user.username}`);
        setContestsUser(resp.data);
        setRegistered(resp.data.find(contest => contest.contestName === item.name));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  

  return (
    <>{!loading && <tr>
        <td>{Date.now() > new Date(item.date) ? (<Link className = "linksNavBar" to = {`/contest/${item.name}/standings`}>{item.name} </Link>) : item.name}</td>
        <td>{item.authors}</td>
        <td>{new Date(item.date).toLocaleString()}
        
        </td>
        <td>{item.length}</td>
        {flag && 
        <td>{(new Date(item.date) > Date.now()) ? 

        <div className = "wrapperRegister">
        {!registered && <button onClick={handleOpen} className = "registration">Register</button>}
        
        
        {registered && <button onClick={handleOpen} className = "registration">Cancel Registration</button>}

          
              { open && <Modal what = {item.name} type = 'registration' registered = {registered} setRegistered={setRegistered} open = {open} setOpen = {setOpen} user = {user.username}/>
                }
        </div>
        
      
            
      
      : <Link className = "standingsLink" to = {`/contest/${item.name}/standings`}>Standings</Link>} </td>}
      {user.role === 'Admin' && (new Date(item.date) > Date.now()) && <td><button className = "editContestBtn"><FaEdit/></button></td>}

      {user.role === 'Admin' && !(new Date(new Date(item.date).getTime() + item.length*60*1000) >= Date.now() && new Date(item.date) <= Date.now()) &&<td><button className = "deleteContestBtn"><FaTrashAlt/></button></td>}

      {open2 && <Modal what = {item.name} type = 'DeleteContest' open = {open2} setOpen = {setOpen2} contests={contests} setContests = {setContests}/>}


    </tr>}
    </>
  )
}

export default Contest