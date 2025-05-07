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

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(value => (
                <Part key={value.id} content={value} />
            ))}
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