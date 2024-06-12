import React from 'react'
import ReactLoading from "react-loading";
const Loading = () => {
    
    return <div className = "dlo" style = {{
        margin:'auto auto',
        fontSize:'60px',
        color:'#e3fef7',
        height:'100%',
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        flexDirection:'column'
    }}><p>Loading,Please wait...</p>
    
    <ReactLoading
          type={"bars"}
          color={"#03fc4e"}
          height={100}
          width={100}
        />
    </div>
}

export default Loading