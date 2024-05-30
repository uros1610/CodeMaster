import React, { useContext,useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import Modal from './Modal'



const Contest = ({item,flag}) => {



  const {user} = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

        <div>
        {!registered && <button onClick={handleOpen} style = {{
          backgroundColor:'transparent',
          color:'#e3fef7',
          border:'none'}}>Register</button>}
        
        {registered && <button onClick={handleOpen} style = {{
          backgroundColor:'transparent',
          color:'#e3fef7',
          border:'none'}}>Cancel Registration</button>}

              { open && <Modal what = {item.name} type = 'registration' registered = {registered} setRegistered={setRegistered} open = {open} setOpen = {setOpen} user = {user.username}/>
                }
      </div>
            
      
      : <Link className = "standingsLink" to = {`/contest/${item.name}/standings`}>Standings</Link>} </td>}
    </tr>}
    </>
  )
}

export default Contest