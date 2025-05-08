const Header = ({ course }) => {
    return (
      <h1>{course}</h1>
    )
}
  
const Part = ({ part }) => {
    return (
      <div>
        {part.name} {part.exercises}
      </div>
    )
}
  
const Content = ({ parts }) => {
    return (
      <div>
          {parts.map(part => 
            <Part key={part.id} part={part} />
          )}
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

export default Course