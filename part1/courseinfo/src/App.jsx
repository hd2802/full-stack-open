const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Part = ({ course }) => {
  return ( 
    <p> {course.title} {course.exerciseno} </p>
  )
}

const Content = ({ courses }) => {
  return (
    <div>
      <Part course={courses[0]} />
      <Part course={courses[1]} />
      <Part course={courses[2]} />
    </div>
  )
}

const Total = ({ courses }) => {
  return (
    <p>Number of exercises: { courses[0].exerciseno + courses[1].exerciseno + courses[2].exerciseno }</p>
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

  const courses = [
    { title : part1, exerciseno : exercises1 },
    { title : part2, exerciseno : exercises2 },
    { title : part3, exerciseno : exercises3 },
  ]

  return (
    <div>
      <Header course={course}/>

      <Content courses={courses} />

      <Total courses={courses} />
    </div>
  )
}

export default App