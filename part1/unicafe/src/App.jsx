import { useState } from 'react'

const Button = ({ text, func }) => {
  return (
    <button onClick={func} >
      {text}
    </button>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  else {
    return (
      <div>
          <StatisticsLine text={"good"} value={props.good} />
          <StatisticsLine text={"neutral"} value={props.neutral} />
          <StatisticsLine text={"bad"} value={props.bad} />
          <StatisticsLine text="total" value={props.total} />
          <StatisticsLine text="average" value={
            (props.total === 0) ? 0 : (props.good + props.bad * -1) / props.total
          } />
          <StatisticsLine text="positive" value = {
            (props.total === 0) ? 0 : ((props.good / props.total)) * 100 + "%"
          } />
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleClick = () => {
    setTotal(total + 1)
  }

  const handleGood = () => {
    setGood(good + 1)
    handleClick()
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    handleClick()
  }

  const handleBad = () => {
    setBad(bad + 1)
    handleClick()
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button text={"good"} func={handleGood} />
        <Button text={"neutral"} func={handleNeutral} />
        <Button text={"bad"} func={handleBad} />
      </div>

    <h1>statistics</h1>
    <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App