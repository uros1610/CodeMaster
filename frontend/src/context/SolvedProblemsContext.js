import React, { createContext, useState,useContext,useEffect} from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';

export const SolvedProblemsContext = createContext();

export const SolvedProblemsProvider = ({ children }) => {
    const [solvedProblems, setSolvedProblems] = useState([]);
    const {user} = useContext(AuthContext)


    useEffect(() => {

        const fetchData = async () => {
          try {
            
          const response = await axios.get(`/backend/submissions/accepted/`)
          setSolvedProblems(response.data)
          }
          catch(err) {
            console.log(err)
          }
        }
    
        fetchData()
    
      },[])
    

    return (
        <SolvedProblemsContext.Provider value={{ solvedProblems, setSolvedProblems }}>
            {children}
        </SolvedProblemsContext.Provider>
    );
};