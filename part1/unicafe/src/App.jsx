import { useState } from 'react'

const Total = ({ good, neutral, bad }) => {
  return (
    <div>
      all {good + neutral + bad}
    </div>
  )
}

const PercentagePositive = ({ good, neutral, bad }) => {
  if (neutral + bad !== 0) {
    return (
      <div>
        positive {( good / (neutral + bad )) * 100} %
      </div>
    )
  }
  else {
    return (
      <div>
        positive 0 %
      </div>
    )
  }
}

// error occurred here when tried to reassign const total by using += 
const Average = ({ good, neutral, bad }) => {
  const total = good * 1 + bad * -1;
  const totalFeedback = good + neutral + bad;
  const average = totalFeedback !== 0 ? total / totalFeedback : 0;

  return (
    <div>
      average {average}
    </div>
  );
}

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
        <Total good={good} neutral={neutral} bad={bad} />
        <PercentagePositive good={good} neutral={neutral} bad={bad} />
        <Average good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  return (
    <div>
        good {good} <br></br>
        neutral {neutral} <br></br>
        bad {bad}
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App