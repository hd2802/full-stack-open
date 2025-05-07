const Header = ({ header }) => {
    return (
        <>
            <h1>{header}</h1>
        </>
    )
}

const Part = ({ content }) => {
    return (
        <>
            <p>{content.name} {content.exercises} </p>
        </>
    )
}

// array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
const Total = ({ parts }) => {
    const initial = 0
    const total = parts.reduce(
        (acc, curr) => acc + curr, 0
    );
    return (
        <>
            <b>total of {total} exercises</b>
        </>
    )
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(value => (
                <Part key={value.id} content={value} />
            ))}
            <Total parts={parts} />
        </>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header header={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course