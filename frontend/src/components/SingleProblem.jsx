import React from 'react'
import styles from '../styles/singleproblem.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect} from 'react'
import { useParams,useNavigate} from 'react-router-dom'


const SingleProblem = () => {

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const navigate = useNavigate()

  const {name} = useParams()

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/backend/problem/${name}`)

      setTitle(response.title)
      setDescription(response.description)
    }
    catch(error) {

      navigate('/notfound')
    }
  }

  fetchData()

},[])


  return (

    <div className='singleproblemmain'>

      <div className = "singleproblemdiv">

        <div className = "problem-title">

          Coin Games

        </div>

        <div className = "problem-description">
          There are n
      coins on the table forming a circle, and each coin is either facing up or facing down. Alice and Bob take turns to play the following game, and Alice goes first.

      In each operation, the player chooses a facing-up coin, removes the coin, and flips the two coins that are adjacent to it. If (before the operation) there are only two coins left, then one will be removed and the other won't be flipped (as it would be flipped twice). If (before the operation) there is only one coin left, no coins will be flipped. If (before the operation) there are no facing-up coins, the player loses.

      Decide who will win the game if they both play optimally. It can be proved that the game will end in a finite number of operations, and one of them will win.

      Input:
      
      Each test contains multiple test cases. The first line contains the number of test cases t
      (1≤t≤100
      ). The description of the test cases follows.

      The first line of each test case contains only one positive integer n
      (1≤n≤100
      ), representing the number of the coins.

      A string s
      of length n
      follows on the second line of each test case, containing only "U" and "D", representing that each coin is facing up or facing down.

      Output:
      For each test case, print "YES" if Alice will win the game, and "NO" otherwise.

      You can output the answer in any case (upper or lower). For example, the strings "yEs", "yes", "Yes", and "YES" will be recognized as positive responses.
          
      </div>

      

    <div className = "problem-testIO">

      <p className = "input">Input:</p>
      
      <table className = "inputTable">

        <tr>
          <div><p className = "inputParagraphs">3</p></div>
        </tr>

        <tr>
          <div>
            <p className = "inputParagraphs">5</p>
            <p className = "inputParagraphs">UUDUD</p>
          </div>
        </tr>

        <tr>
          <div>
            <p className = "inputParagraphs">5</p>
            <p className = "inputParagraphs">UUDDD</p>
          </div>
        </tr>

        <tr>
          <div>
            <p className = "inputParagraphs">3</p>
            <p className = "inputParagraphs">DUD</p>
          </div>
        </tr>


      </table>

      <p className = "output">Output:</p>
      
      <table className = "outputTable">

       
        <tr>
          <div>
           
            <p className = "inputParagraphs">NO</p>
          </div>
        </tr>

        <tr>
          <div>
           
            <p className = "inputParagraphs">YES</p>
          </div>
        </tr>

        <tr>
          <div>
            <p className = "inputParagraphs">YES</p>

          </div>
        </tr>


      </table>

    </div>

    <button type = "submit" className = "submitProblemBtn"><Link className = "linkToSubmit" to = {`/submitproblem/${title}`}>Submit</Link></button>


    </div>

    <div className = "inContest">
      <div className = 'whichContest'>
        <Link className = "linkToContest">Codeforces Round 942 (Div. 2)</Link>
        <hr style = {{
          width:'100%'
        }}/>
          <p className='status'>Finished</p>
          <Link className = "tutorial">Go to Tutorial</Link>
        </div>

      <div className = "problem-tags-div">
        <p className = "problemTags">Problem tags</p>
        <hr style = {{
          width:'100%'
        }}/>
        <p className = "problem-tags">games,brute force</p>
      </div>

    </div>

    </div>
  )
}

export default SingleProblem