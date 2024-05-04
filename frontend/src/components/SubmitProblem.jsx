import React from 'react'
import styles from '../styles/submitproblem.css'
import {useRef} from 'react'

const SubmitProblem = ({TextArea,setTextArea}) => {

    let list = TextArea.split("\n");
    const lineNumbersRef = useRef(null);
    const textAreaRef = useRef(null);

    const syncScroll = () => {
        if (textAreaRef.current && lineNumbersRef.current) {
          lineNumbersRef.current.scrollTop = textAreaRef.current.scrollTop;
        }
      };
      

 

  return (
    <div className = "main-div">
        <div className= "problem-container">

            <div className= "problem">
                
                <span className= "prob">Problem:</span>
                <span className = "prob">Uvrnuti string XD</span>

            </div>

            <div className= "language-sourcecode">
                <div className= "language">
                    <label for = "languages">Choose a language:</label>
                    <select name = "languages" id = "languages">
                        <option value = "C++">C++</option>
                        <option value = "Python">Python</option>
                        <option value = "Java">Java</option>
                        
                    </select>
                </div>

                <div className= "source-code">
                    <div className= "linenumbers" ref = {lineNumbersRef}>
                        {list.map((item,index) => {
                            index = index + 1;
                            return (<div>{index}</div>)
                        })}
                    </div>

                    <textarea className= "code" placeholder="Source code:" ref = {textAreaRef} onChange = {(e) => {setTextArea(e.target.value)}} onScroll = {syncScroll}></textarea>


                    
                </div>

                <div className= "choose-file">
                    <label for = "file" id = "lblfile">Choose a file:</label>
                    <input type = "file" id = "fileinput"/>
        
                </div>

                

            </div>

            <button className = "btnSubmit" type = "submit">Submit</button>
        </div>
    </div>
  )
}

export default SubmitProblem