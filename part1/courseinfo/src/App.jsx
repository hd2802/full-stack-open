// Ex 1.1: Refactor the code so we have Header, Content and Total components

const Header = ({ course }) => {
  return (
    <h1>
      {course}
    </h1>
  )
}

const Content = ({ parts, exercises }) => {
  return (
    <div>
      {parts[0]} {exercises[0]}
      <br />
      {parts[1]} {exercises[1]}
      <br />
      {parts[2]} {exercises[2]}
      <br />
    </div>
  )
}

const Total = ({ exercises }) => {
  return (
    <div>
      Total: {exercises[0] + exercises[1] + exercises[2]}
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]}/>
      <Total exercises={[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

export default App