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
    good {good} 
    <br></br>
    neutral {neutral}
    <br></br>
    bad {bad}
    <br></br>
    all {total}
    <Average good={good} bad={bad} total={total} />
    <Percentage good={good} total={total} />
    </div>
  )
}

export default App