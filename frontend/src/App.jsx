

import styles from './styles/App.css'
import {Routes,Route} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import SubmitProblem from './components/SubmitProblem';
import useWindowResize from './hooks/useWindowResize'
import NavBar from './components/NavBar';
import {useState,useEffect} from 'react'
import Contests from './components/Contests'
import axios from 'axios'
import AddContest from './components/AddContest';
import "@fontsource/roboto";


function App() {

  const {width} = useWindowResize();
  const [isVisible, setIsVisible] = useState(false);
  const [TextArea,setTextArea] = useState("")
  

  // dio za takmicenja

  const [contests, setContests] = useState([])
  const [name,setName] = useState('')
  const [authors,setAuthors] = useState('')
  const [length,setLength] = useState('')
  const [date,setDate] = useState('')
  

  useEffect(() => {

      const fetchData = async () => {
      const resp = await axios.get('http://localhost:3500/contests')
      console.log("usao");

      setContests(resp.data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      ))

  }

  fetchData()

  },[])

 
  return (
    <div className="App">
      <NavBar width = {width} isVisible={isVisible} setIsVisible={setIsVisible}/>
      <Routes>

      <Route path = '/login' element = {<Login/>}/>
      <Route path = '/signup' element = {<Signup/>} />
      <Route path = '/submitproblem' element = {<SubmitProblem setTextArea={setTextArea} TextArea={TextArea}/>} />
      <Route path = '/contests'  element = {<Contests contests = {contests}/>} />
      <Route path = 'addcontest' element = {<AddContest contests={contests}
      
      name = {name}
      setName = {setName}
      length = {length}
      setLength = {setLength}
      date = {date}
      setDate = {setDate}
      authors = {authors}
      setAuthors = {setAuthors}
      setContests = {setContests}
      
      />
 }/>

      </Routes>
    </div>
  );
}

export default App;
