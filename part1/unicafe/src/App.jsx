import { useState } from 'react'

const Button = ({ text, functionReference }) => {
  return (
    <div>
      <button onClick={functionReference}>
        {text}
      </button>
    </div>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text}
      </td> 
      <td>
        {value}
      </td>
    </tr>
  )
}

const Statistics = ({ good, bad, neutral, total}) => {
  if (total === 0)
  {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  else {
    return (
      <table>
        <StatisticsLine text={"good"} value={good} />
        <StatisticsLine text={"neutral"} value={neutral} />
        <StatisticsLine text={"bad"} value={bad} />
        <StatisticsLine text={"average"} value={(good + (bad * -1)) / (total === 0 ? 1 : total)} />
        <StatisticsLine text={"positive"} value={(good / (total === 0 ? 1 : total)) * 100} />
      </table>
    )
  }
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)
  const [ total, setTotal ] = useState(0)

  const handleInput = () => {
    setTotal(total + 1)
  }

  const handleGood = () => {
    setGood(good + 1)
    handleInput()
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    handleInput()
  }

  const handleBad = () => {
    setBad(bad + 1)
    handleInput()
  }

  return (
    <div>
      <div>
        <h1> give feedback </h1>

        <Button text={"good"} functionReference={handleGood} />
        <Button text={"neutral"} functionReference={handleNeutral} />
        <Button text={"bad"} functionReference={handleBad} />

      </div>
      
      <div>
        <h1>statistics</h1>
        <Statistics good={good} bad={bad} neutral={neutral} total={total} />
      </div>
    </div>
  )
}

export default App