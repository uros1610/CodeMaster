import React from 'react'
import { FaTrash,FaEdit} from 'react-icons/fa'
import styles from '../styles/addedproblem.css'

const AddedProblem = ({problem,problems,setProblems}) => {
    // {problem.description.length > 25 ? (`${problem.description.slice(0,25)}...`) : problem.description}


    const handleDelete = (title) => {
        const filtered = problems.filter(problem => problem.title !== title)
        setProblems(filtered)
    } 

  return (
    <div className = "added" key = {problem.title}>
        {problem.title}
        

        <div className = "btns">
        <button className = "deleteBtn" onClick = {() => {handleDelete(problem.title)}}>
            <FaTrash/>
        </button>

        <button className = "editBtn">
            <FaEdit/>
        </button>
        </div>


    </div>
  )
}

export default AddedProblem