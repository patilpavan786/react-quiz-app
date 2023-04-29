import React , { useState , useRef } from "react";
import "./style.css";
import {questionsData} from './constant'

export default function App() {
  const [index , setIndex] = useState(0)
  const [ chooseOpt , selectChooseOpt] = useState("")
  const [ show , setShow] = useState(false)
  const [ score , setScore] = useState(0)

  // console.log(questionsData)

  const correctAnswerArray = questionsData.map((elm) => elm.correctAnswer )
  console.log(correctAnswerArray,"coorect answer")

  const selectedOptionRef = useRef([])

  const handleNext = () =>{
    setIndex((index)=> index + 1)
    selectedOptionRef.current.push(chooseOpt)
  }

  const captureChange = (e) =>{
    // console.log(e.target.value ,"slect")
    selectChooseOpt(e.target.value)
  }
  // console.log(selectedOptionRef,"selected option")

  const handleSubmit = ()=>{
    selectedOptionRef.current.push(chooseOpt)
    const mergedArray = [...correctAnswerArray , ...selectedOptionRef.current]
    console.log(mergedArray,"merged array")
    let obj = {}
    for(let word of mergedArray){
      obj[word] = ++obj[word] || 1
    }
    let point = 0
    for(let key in obj){
        if(obj[key] === 2){
          point = point + 2
        }
    }
    setScore(point)
    setShow(true)
  }

  return (
    <div>
      {show ?
      <div>
        {score > 12 ? <h3> "You are Genius" Your got {score} Points</h3>  
         :
         <>
         <h3> "Better Luck next Time" Your got {score} Points</h3>
         <button onClick={()=>location.reload()}>Restart</button>
         </>}

        </div>
      :
      <> 
      <h3>{questionsData[index].question}</h3>
          {
            questionsData[index].options.map((option)=>
            <div key={option}>
              <input id={option}  value={option} onChange={(e)=>captureChange(e)} type="radio" name="option"/>
              <label htmlFor={option}>{option}</label>
            </div>
            )
          }
          {
            index === 9 ? <button onClick={handleSubmit}>Submit</button>
          :
        <button onClick={handleNext}>Next</button>
          }
          </>
        }
    </div>
  );
}
