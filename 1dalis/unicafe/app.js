import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)
//const Display = (props) => {
 // return (
   // <p> {props.text} {props.counter}  </p>
// )
//}
const Statistics = (props) => {
  if (props.All===0){
    return(
      <div>
        <h4>No feedback given</h4>
      </div>
    )
  }
  return (
    <div>
      <h3>Good: {props.good}</h3>
      <h3>Neutral: {props.neutral}</h3>
      <h3>Bad: {props.bad}</h3>
      <h3>All: {props.All}</h3>
      <h3>Average: {props.Average}</h3>
      <h3>Positive: {props.Positive*100} % </h3>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button onClick={() => setBad(bad + 1)} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good}
      neutral={neutral}
      bad={bad}
      All={good+neutral+bad}
      Average={(good - bad)/(good + neutral + bad)}
      Positive={(good*1+neutral*0)/(good+neutral+bad)}/>
    </div>
  )
}

export default App
