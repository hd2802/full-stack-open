// Not worrying about folder structure for this component as its such a small project
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
      {parts.map(
        part => <Part course={part} />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
    return (
        <p>total of  
        &nbsp;
        {parts.reduce((accumulator, part) => {
            return accumulator + part.exercises
        }, 0)} 
        &nbsp;
        exercises</p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course