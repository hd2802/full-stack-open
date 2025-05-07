import { useState } from 'react'

const Button = ({ handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0){
    return ( 
      <div>
        No feedback given
      </div>
    )
  }
  else {
    return (
      <table>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
        <StatisticLine text="average" value={
            props.good + props.neutral + props.bad === 0
              ? 0
              : ((props.good * 1 + props.bad * -1) / (props.good + props.bad + props.neutral))
          }
         />
        <StatisticLine text="positive" value={
          props.neutral + props.bad === 0 ? 0 :
          ((props.good) / (props.neutral + props.bad)) * 100
        } />
     </table>
    )
  }
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button text={"good"} handleClick={handleGood} />
        <Button text={"neutral"} handleClick={handleNeutral} />
        <Button text={"bad"} handleClick={handleBad} />
      </div>
      <h1> statistics </h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App