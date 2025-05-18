// 2.5: separate component
const Header = ({ course }) => {
  return (
    <h1>
      {course.name}
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

const Content = ({ course }) => {
  // forEach does not return anything so it isnt applicable here
  return (
    <div>
      {
        course.parts.map((part, index) => (
          <div key={index}>
            <Part part={part} />
          </div>
        ))
      }
    </div>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((acc, c) => {
    return acc += c.exercises
  }, 0)
  return (
    <div>
      <b>
      total of {total} exercises
      </b>
    </div>
  )
}

const Course = ({ course }) => {
    return (
    <div>
      <Header course={course} />
      <Content course={course}/>
      <Total course={course}/>
    </div>
    )
}

export default Course