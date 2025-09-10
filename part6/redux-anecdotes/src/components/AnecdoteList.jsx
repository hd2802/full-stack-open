import { useSelector, useDispatch } from 'react-redux'
import { reducerVote } from '../reducers/anecdoteReducer'

const anecdoteSort = (a, b) => {
  if(a.votes > b.votes) {
    return -1
  }
  else if (a.votes < b.votes) {
    return 1
  }
  return 0
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if(state.filter === 'ALL') {
            return state.anecdotes
        } else {
            return state.anecdotes.filter(anecdote => {
                // keep forgetting that curly braces means that we need a return statement
                // also do not need to reference state.filter.payload but instead just state.filter
                return anecdote.content.toUpperCase().includes(state.filter.toUpperCase())
            })
        }
    })

    anecdotes.sort(anecdoteSort)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(reducerVote(id))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList