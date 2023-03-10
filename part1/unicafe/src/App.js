
import { useState } from 'react'

// // a proper place to define a component

const Avg = (props) =>{
  return(
    <tr>
      <td>average</td>
      <td>{(props.good*1 + props.neutral*0 +props.bad*(-1))/props.total}</td>
    </tr>
  )
}

const Positive = (props) => {
  return(
    <tr>
    <td>positive</td>
    <td>{(props.good*100)/props.total}%</td>
    </tr>
  )
}


const StatisticLine = (props)=>{
  return(
      <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
      </tr>
  )
}

const Statistics = (props) => {

  const total = props.good+props.neutral+props.bad

  if(props.good!=0||props.neutral!=0||props.bad!=0){
    return(
      <table>
        <tbody>
          <StatisticLine text="good" value ={props.good} />
          <StatisticLine text="neutral" value ={props.neutral} />
          <StatisticLine text="bad" value ={props.bad} />
          <StatisticLine text="all" value={props.good+props.neutral+props.bad}/>
          <Avg good={props.good} neutral={props.neutral} bad={props.bad} total={total}/>
          <Positive text="positive" good={props.good} total={total}/>
        </tbody>
      </table>
    )
  }
  else{
    return(
      <h3>No feedback given</h3>
    )
  } 
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feeback</h1>
      
      <Button handleClick={()=>setGood(good+1)} text="Good"/>
      <Button handleClick={()=>setNeutral(neutral+1)} text="Neutral"/>
      <Button handleClick={()=>setBad(bad+1)} text="Bad"/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
     
    </div>

  )
}

export default App