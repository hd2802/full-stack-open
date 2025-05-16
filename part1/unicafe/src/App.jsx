import { useState } from 'react'

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
    </div>
  )
}

export default App