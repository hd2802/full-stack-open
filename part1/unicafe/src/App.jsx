import { useState } from 'react'

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)
  const [ total, setTotal ] = useState(0)
  const [ average, setAverage ] = useState(0)
  const [ ratio, setRatio ] = useState(0)

  const handleInput = () => {
    setTotal(total + 1)
  }

  const handleGood = () => {
    setGood(good + 1)
    setAverage(((average * total) + 1) / (total + 1))
    setRatio((good + 1) / (total + 1))
    handleInput()
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAverage((average * total) / (total + 1))
    setRatio((good) / (total + 1))
    handleInput()
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAverage(((average * total) - 1) / (total + 1))
    setRatio((good) / (total + 1))
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
        <h1> statistics </h1>
        good {good}
        <br />
        neutral {neutral}
        <br />
        bad {bad}
        <br />
      </div>
      
      <div>
        total {total}
        <br />
        average {average}
        <br />
        percentage {ratio * 100} %
      </div>
    </div>
  )
}

export default App