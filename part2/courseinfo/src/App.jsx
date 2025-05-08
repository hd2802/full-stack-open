const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({ part, exercises }) => {
  return (
    <div>
      {part} {exercises}
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0].name} exercises={parts[0].exercises} />
      <Part part={parts[1].name} exercises={parts[1].exercises} />
      <Part part={parts[2].name} exercises={parts[2].exercises} />
    </div>
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce(
    (accumulator, ex) => accumulator + ex.exercises,
    0,
  );
  return (
    <div>
      <b> total of {sum} exercises</b>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App