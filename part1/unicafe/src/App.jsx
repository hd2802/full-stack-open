import { useState } from 'react'

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
      <div>
        <div>
          good {good} 
          <br />
          neutral {neutral}
          <br />
          bad {bad}
          <br />
          total {total}
          <br />
          average {(good + (bad * -1)) / (total === 0 ? 1 : total)}
          <br />
          positive {(good / (total === 0 ? 1 : total)) * 100} %
        </div>
      </div>
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
      
      <div>
        <h1>statistics</h1>
        <Statistics good={good} bad={bad} neutral={neutral} total={total} />
      </div>
    </div>
  )
}

export default App