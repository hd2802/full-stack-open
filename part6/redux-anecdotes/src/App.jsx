import { useSelector, useDispatch } from 'react-redux'
import { reducerVote } from './reducers/anecdoteReducer'

import NewAnecdote from './components/NewAnecdote'

const anecdoteSort = (a, b) => {
  if(a.votes > b.votes) {
    return -1
  }
  else if (a.votes < b.votes) {
    return 1
  }
  return 0
}

const App = () => {
  const anecdotes = useSelector(state => state)

  anecdotes.sort(anecdoteSort)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(reducerVote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
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
      <h2>create new</h2>
      <NewAnecdote />
    </div>
  )
}
export default App