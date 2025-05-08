const PersonForm = ({ inputRef, numberRef, submitRef }) => {
    return (
        <div>
            <h2>add new</h2>
      
            <form onSubmit={submitRef}>
                <div>
                    name: <input onChange={inputRef}/>
                </div>
                <div>
                    number: <input onChange={numberRef} />
                 </div>
                 <div>
                    <button type="submit" onClick={submitRef}>add</button>
                </div>
            </form>
        </div>
    )    
}

export default PersonForm