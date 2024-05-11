import React from 'react'
import { FaTrash,FaEdit} from 'react-icons/fa'
import styles from '../styles/addedproblem.css'
import { useNavigate } from 'react-router-dom'
import { useContext,useState} from 'react'
import ProblemsContext from '../context/ProblemsContext'

const AddedProblem = ({problem,problems,setProblems,setProblemName,setProblemDesc,setProblemInputs,setProblemOutputs,rating,setRating,topics,setTopics}) => {
    // {problem.description.length > 25 ? (`${problem.description.slice(0,25)}...`) : problem.description}

    const navigate = useNavigate()

    const handleDelete = (title) => {

        const filtered = problems.filter((problemi) => problemi.title !== title)
        setProblems(filtered)
    }

    const handleEdit = () => {
      setProblemName(problem.title)
      setProblemDesc(problem.description)
      setProblemInputs(problem.inputs)
      setProblemOutputs(problem.outputs)
      setProblems(problems.filter((problemi) => problemi.title !== problem.title))
      setRating(problem.rating)
      setTopics(problem.topics)
    }

   
  return (
    <div className = "added" key = {problem.title}>
        <p className = "problemTitle">{problem.title}</p>
        
        <div className = "btns">
        <button className = "deleteBtn" onClick = {() => {handleDelete(problem.title)}}>
            <FaTrash/>
        </button>

        <button className = "editBtn" onClick = {handleEdit}>
            <FaEdit/>
        </button>
        </div>


    </div>
  )
}

export default AddedProblem