import {useState,createContext,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const ProblemsContext = createContext({})

export const ProblemsContextProvider = ({children}) => {
    const [problems,setProblems] = useState([])
    


    return <ProblemsContext.Provider value = {{problems,setProblems}}>{children}</ProblemsContext.Provider>
}
export default ProblemsContext