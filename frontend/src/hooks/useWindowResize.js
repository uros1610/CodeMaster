import {useState,useEffect} from 'react'

const useWindowSize = () => {
const [windowSize,setWindowSize] = useState({
    width:undefined,
    height:undefined
})

    useEffect(() => {

        const reSize = () => {
            setWindowSize({
                width:window.innerWidth,
                height:window.innerHeight
            })
        }

        reSize()

        window.addEventListener("resize",reSize)
    
        return () => {window.removeEventListener("resize",reSize)}

    },[])

    return windowSize
       
}

export default useWindowSize



