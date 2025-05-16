// Ex 1.1: Refactor the code so we have Header, Content and Total components

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
  let total = 0
  return (
    <div>
      Total: 
      {
        course.parts.forEach((part) => {
          total += part.exercises 
        })
      }
      {total}
    </div>
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
      <Header course={course} />
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App