// note: already completed parts 1.3, 1.4 in previous parts

const Header = ({ course }) => {
  return <h1>{course.name}</h1>
}

const Part = ({ course }) => {
  return ( 
    <p> {course.name} {course.exercises} </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      <Part course={parts[0]} />
      <Part course={parts[1]} />
      <Part course={parts[2]} />
    </div>
  )
}

const Total = ({ parts }) => {
  return (
    <p>Number of exercises: { parts[0].exercises + parts[1].exercises + parts[2].exercises }</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course={course}/>

      <Content parts={course.parts} />

      <Total parts={course.parts} />
    </div>
  )
}

export default App