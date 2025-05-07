import { useState } from 'react'

const Rundown = ({good, neutral, bad}) => {
  return (
    <div>
        good {good} <br></br>
        neutral {neutral} <br></br>
        bad {bad}
    </div>
  )
}

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

const Statistics = (props) => {
  if (props.good !== 0 || props.neutral !== 0 || props.bad !== 0) {
    return (
      <div>
          <Rundown good={props.good} neutral={props.neutral} bad={props.bad} />
          <Total good={props.good} neutral={props.neutral} bad={props.bad} />
          <PercentagePositive good={props.good} neutral={props.neutral} bad={props.bad} />
          <Average good={props.good} neutral={props.neutral} bad={props.bad} />
      </div>
    )
  }
  else {
    return (
      <div>
        No feedback given
      </div>
    )
  }
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>
          good
        </button>
        <button onClick={() => setNeutral(neutral + 1)}>
          neutral
        </button>
        <button onClick={() => setBad(bad + 1)}>
          bad
        </button>
      </div>

      <h1> statistics </h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App