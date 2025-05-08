const Filter = ({ funcRef }) => {

    return (
        <div>
            <h2>Search</h2>
            <input onChange={funcRef} />
        </div>
    )
}

export default Filter