// Ex 1.1: Refactor the code so we have Header, Content and Total components

const Header = ({ course }) => {
  return (
    <h1>
      {course}
    </h1>
  )
}

const Part = ({ part }) => {
  //console.log(part)
  return (
    <div>
      {part.name} {part.exercises}
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  )
}

const Total = ({ parts }) => {
  return (
    <div>
      Total: {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
    const parts = [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App