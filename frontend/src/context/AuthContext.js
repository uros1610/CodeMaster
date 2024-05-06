import {useState,createContext,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AuthContext = createContext({})

export const AuthContextProvider = ({children}) => {

    const URL = "http://localhost:8800/backend"
    const navigate = useNavigate()


    const [user,setuser] = useState(JSON.parse(localStorage.getItem('user')) || null)

    const login = async (inputs) => {
        const resp = await axios.post(`${URL}/auth/login`,inputs)
        setuser(resp.data)
    }

    const logout = async () => {
        const resp = await axios.post(`${URL}/auth/logout`)
        setuser(null)
        navigate('/login')
    }

    useEffect(() => {
        localStorage.setItem('user',JSON.stringify(user))
    },[user])

    return <AuthContext.Provider value = {{user,login,logout}}>{children}</AuthContext.Provider>

}

export default AuthContext