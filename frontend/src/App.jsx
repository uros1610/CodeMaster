

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
import SingleProblem from './components/SingleProblem';
import "@fontsource/roboto";
import ProblemSet from './components/ProblemSet';
import Rating from './components/Rating';



function App() {

  const {width} = useWindowResize();
  const [isVisible, setIsVisible] = useState(false);
 
   const [contests, setContests] = useState([])


  // dio za takmicenja



  

  

 
  return (
    <div className="App">
      <NavBar width = {width} isVisible={isVisible} setIsVisible={setIsVisible}/>
      
      <Routes>
      <Route path = '/' element = {<Login/>}/>
      <Route path = '/login' element = {<Login/>}/>
      <Route path = '/register' element = {<Signup/>} />
      <Route path = '/submitproblem' element = {<SubmitProblem/>} />
      <Route path = '/contests'  element = {<Contests contests={contests} setContests={setContests}/>} />
      <Route path = '/addcontest' element = {<AddContest contests={contests} setContests={setContests}/>}/>
      <Route path = '/singleproblem/:name' element = {<SingleProblem/>}/>
      <Route path = '/submitproblem/:name' element = {<SubmitProblem/>}/>
      <Route path = '/problemset' element = {<ProblemSet/>}/>
      <Route path = '/rating' element = {<Rating/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
