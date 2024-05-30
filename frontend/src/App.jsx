

import styles from './styles/App.css'
import {Routes,Route} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import SubmitProblem from './components/SubmitProblem';
import useWindowResize from './hooks/useWindowResize'
import NavBar from './components/NavBar';
import {useState,useEffect, useContext} from 'react'
import Contests from './components/Contests'
import axios from 'axios'
import AddContest from './components/AddContest';
import SingleProblem from './components/SingleProblem';
import "@fontsource/roboto";
import ProblemSet from './components/ProblemSet';
import Rating from './components/Rating';
import AuthContext from './context/AuthContext';
import Home from './components/Home'
import Profile from './components/Profile';
import { Outlet } from 'react-router-dom';
import { ProfileNavBar } from './components/ProfileNavBar';
import Submissions from './components/Submissions';
import UserContests from './components/UserContests';
import ProblemsContext from './context/ProblemsContext';
import ManageUsers from './components/ManageUsers';
import Standings from './components/Standings';
import EditProfile from './components/EditProfile';


function App() {

  const {width} = useWindowResize();
  const [isVisible, setIsVisible] = useState(false);
 
   const [contests, setContests] = useState([])

   const {user} = useContext(AuthContext)

   

  return (
    <div className="App">
      <NavBar width = {width} isVisible={isVisible} setIsVisible={setIsVisible}/>
      
      <Routes>
      <Route path = '/' element = { !user ? <Login/> : <Home/>}/>
      <Route path = '/login' element = {<Login/>}/>
      <Route path = '/register' element = {<Signup/>} />
      <Route path = '/submitproblem' element = {<SubmitProblem/>} />
      <Route path = '/contests'  element = {<Contests contests={contests} setContests={setContests}/>}/>
      <Route path = '/addcontest' element = {<AddContest contests={contests} setContests={setContests}/>}/>
      <Route path = '/problem/:name' element = {<SingleProblem/>}/>
      <Route path = '/submitproblem/:name' element = {<SubmitProblem/>}/>
      <Route path = '/problemset' element = {<ProblemSet/>}/>
      <Route path = '/rating' element = {<Rating/>}/>
      <Route path = '/home' element = {<div>Home</div>}/>
      <Route path = '/profile/:username' element = {<Profile/>}/>
      <Route path = '/profile/submissions/:username' element = {<Submissions/>}/>
      <Route path = '/profile/contests/:username' element = {<UserContests/>}/>
      <Route path = '/manageusers' element = {<ManageUsers/>}/>
      <Route path = '/contest/:name/standings' element = {<Standings/>}/>
      <Route path = '/profile/editProfile/:username' element = {<EditProfile/>}/>


      </Routes>
      
    </div>
  );
}

export default App;
