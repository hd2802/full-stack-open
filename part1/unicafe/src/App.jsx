import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props

  const calculateAverage = () => {
    if ((good + neutral + bad ) === 0) return 0
    return (good + (bad * -1)) / (good + neutral + bad)
  }

  const calculatePositivePercentage = () => {
    if ((good + neutral + bad) === 0) return 0
    return (good / (good+bad+neutral)) * 100
  }
  return (
    <div>
      <h1>statistics</h1>
      <div> 
        {(good + neutral + bad) === 0 && (
          <p>No feedback given </p>
        )}
        {(good + neutral + bad) !== 0 && (
          <div>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="average" value={calculateAverage()} />
            <StatisticLine text="positive" value={calculatePositivePercentage()} />
          </div>
        )}
      </div>
    </div>
  )
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  const props = {
    good: good,
    neutral: neutral,
    bad: bad,
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(good+1)}>good</button>
        <button onClick={() => setNeutral(neutral+1)}>neutral</button>
        <button onClick={() => setBad(bad+1)}>bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App