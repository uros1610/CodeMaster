import React from 'react'
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import {useState,useEffect} from 'react'
import styles from '../styles/editcontest.css'


const EditContest = () => {

    const {contestName} = useParams();

    const [data,setData] = useState({})
    const [problems,setProblems] = useState([]);
    const navigate = useNavigate();
    const [dateErr,setDateErr] = useState('');
    const [lengthErr,setLengthErr] = useState('');

    const handleChangeContest = async (e) => {
        e.preventDefault();

        
            if (!data.length) {
                setLengthErr('Please set the length of the contest!');
                return;
                
            }
            try {
               data.date = new Date(data.date).toUTCString();
        await axios.put(`/backend/contest/updateContest/${contestName}`,data);
        alert('Update successful');
        navigate('/contests');
            }
        
        catch(err) {
            alert('Failed to update');
            navigate('/contests');
        }
        
    }

    

    const rightFormat = (date) => {
        const pad = (number) => number.toString().padStart(2, '0');

        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());


        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());


        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
        return formattedDate;
    }

    const changeData = (e) => {
        const newObj = {...data};

        

        console.log(e.target);

        if(e.target.id === 'date') {
            if(new Date(new Date().getTime()+24*60*60*1000) > new Date(e.target.value)) {
                setDateErr('Please set contest at least day after today!');
                return;
            }
            setDateErr('')
        }

        if(e.target.id === 'length') {
            if(isNaN(e.target.value)) {
                setLengthErr('Please set the length in minutes!');
                return;
            }
            setLengthErr('');
        }

        newObj[e.target.id] = e.target.value;

        setData(newObj);
    }

    const fetchProblems = async () => {
        try {
            const problemsData = await axios.get(`/backend/contest/${contestName}/problems`);
            setProblems(problemsData.data);
        }
        catch (err) {
            console.log(err)
        }
    }

    const fetchContestData = async () => {
        try {
            const contestData = await axios.get(`/backend/contest/oneContest/${contestName}`);
            console.log("CONTESTDATA",contestData);
            setData(contestData.data[0]);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchProblems();
        fetchContestData();
    },[])

    useEffect(() => {
        if(data) {
            if(new Date(data.date) < Date.now()) {
                
                alert('Cannot edit contests that are finished!');
                setTimeout(() =>
                navigate('/contests'),1000)
                
            }
        }
    },[data])

  return (
    <div className = "editContestDiv">
        <form className = "editEverything formContests">
            <p style = {{
                fontSize:'1.5rem',
                color:'#e3fef7'
            }}>Edit contest</p>

            {dateErr && <p style = {{
                fontSize:'1.5rem'
            }}>{dateErr}</p>}

            {lengthErr && <p style = {{
                fontSize:'1.5rem'
            }}>{lengthErr}</p>}
        
        <div style = {{
            display:'flex',
            gap:'20px',
            flexWrap:'nowrap',
            width:'70%',
            alignItems:'center',
            justifyContent:'center'
        }}>
            <label htmlFor='name'>Contest name:</label>
            <input type = "text" id = "name" value = {data.name} onChange = {changeData}/>

        </div>
        <div style = {{
            display:'flex',
            gap:'20px',
            flexWrap:'nowrap',
            width:'70%',
            alignItems:'center',
            justifyContent:'center'
        }}>
            <label htmlFor='date'>Contest date:</label>
            <input type = "datetime-local" id = "date" value = {rightFormat(new Date(new Date(data.date).toLocaleString()))} onChange = {changeData} />
        </div>

        <div style = {{
            display:'flex',
            gap:'20px',
            flexWrap:'nowrap',
            width:'70%',
            alignItems:'center',
            justifyContent:'center'
        }}>
            <label htmlFor='length'>Contest length:</label>
            <input type = "text" id = "length" value = {data.length} onChange = {changeData}/>

         </div>
       

        <div className = "divButtons">
            <button onClick = {handleChangeContest}>Save changes</button>
            <button onClick = {() => {navigate('/contests')}}>Discard changes</button>
        </div>
        </form> 
    </div>
  )
}

export default EditContest