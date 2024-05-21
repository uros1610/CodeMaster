import React, { useContext,useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import axios from 'axios'



const Contest = ({item}) => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height:150,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    paddingBottom:'10px',
    backgroundColor:'#526D82',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  }

  const {user} = useContext(AuthContext)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [contestsUser,setContestsUser] = useState([])
  const [registered,setRegistered] = useState(false)
  const [loading,setLoading] = useState(false)

  const register = async () => {
    try {
      if(!registered) {
      const resp = await axios.post(`/backend/contest/register/`,{contestName:item.name,user:user.username})
      setRegistered(true)
      alert("Registration successful!");
      }

      else {
      const resp = await axios.delete(`/backend/contest/delete/${item.name}/${user.username}`)
      setRegistered(false)
      alert("Cancellation successful!");
      }

    }

    catch(err) {
      alert("Registration unsuccessful!")
      console.log(err)
    }

    finally {
      handleClose()
    }

  }

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
        <td>{item.name}</td>
        <td>{item.authors}</td>
        <td>{new Date(item.date).toLocaleString()}
        
        </td>
        <td>{item.length}</td>
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

              { open && <div style = {style}>
                {!registered && <p>Are you sure you want to register for {item.name}?</p>}
                {registered && <p>Are you sure you want to cancel registration for {item.name}?</p>}
                
                <div>
                  <button style = {{
                    marginRight:'20px'}} onClick = {register}>
                  Yes</button>
                  <button onClick = {handleClose}>No</button>
                </div>

              </div>}
      </div>
            
      
      : <Link className = "standingsLink" to = {`/contest/${item.name}/standings`}>Standings</Link>} </td>
    </tr>}
    </>
  )
}

export default Contest