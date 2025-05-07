import { useState } from 'react'

const Average = ({ good, bad, total }) => {
  if (total === 0) {
    return (
      <div>
        average 0
      </div>
    )
  }
  else {
    return (
      <div>
        average {(good + bad * -1 )/ total}
      </div>
    )
  }
}

const Percentage = ({ good, total }) => {
  // why is this a let and not a const?
  let percentage = 0
  if (total === 0) {
    percentage = 0
  }
  else {
    percentage = (good / total) * 100
  }

  return (
    <div>
      percentage {percentage}
    </div>
  )
}

const StatsLine = ({ text, value }) => {
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
          <StatsLine text={"good"} value={props.good} />
          <StatsLine text={"neutral"} value={props.neutral} />
          <StatsLine text={"bad"} value={props.bad} />
          <StatsLine text="total" value={props.total} />
          <Average good={props.good} bad={props.bad} total={props.total} />
          <Percentage good={props.good} total={props.total} />
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
        <button onClick={handleGood}>
          good
        </button>
        <button onClick={handleNeutral}>
          neutral
        </button>
        <button onClick={handleBad}>
          bad
        </button>
      </div>

    <h1>statistics</h1>
    <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App