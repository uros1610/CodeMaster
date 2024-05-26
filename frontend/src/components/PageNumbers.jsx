import React from 'react'
import styles from '../styles/pagenumbers.css'

const PageNumbers = ({setpageNumber,no,pageNumber}) => {

    const handlePageChange = (e,id) => {
        e.preventDefault();
  
        setpageNumber(id);
    }
  

  return (
    <div className = "pageNumbersDiv">

    <svg className = "svg" xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth={1.5} stroke="currentColor" onClick = {(e) => {handlePageChange(e,1)}}>
<path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
</svg>


    <svg className = "svg" xmlns="http://www.w3.org/2000/svg" fill="none"  strokeWidth={1.5} stroke="currentColor" onClick = {(e) => {handlePageChange(e,Math.max(1,pageNumber-3))}}>
<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg>



    {pageNumber + 3 > no && (
     
    Array.from({length:3},(_ , i) => ( no-2+i >= 1 && <button className = {no-2+i === pageNumber ? "selectedPageNumber" : "pageNumbers"} onClick = {(e) => {handlePageChange(e,no-2+i)}}> {no-2+i} </button>)))
    }
   
  {pageNumber + 3 <= no &&
  Array.from({length:3},(_ , i) => ( pageNumber+i <= no && <button className = {pageNumber+i === pageNumber ? "selectedPageNumber" : "pageNumbers"}  onClick = {(e) => {handlePageChange(e,i+pageNumber)}}>{pageNumber+i}</button>))}

<svg className = "svg" xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth={1.5} stroke="currentColor" onClick = {(e) => {handlePageChange(e,Math.min(no,pageNumber+3))}}>
<path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>


<svg className = "svg" xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth={1.5} stroke="currentColor" onClick = {(e) => {handlePageChange(e,no)}}>
<path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"/>
</svg>


  </div>
  )
}

export default PageNumbers