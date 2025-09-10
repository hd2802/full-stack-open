import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNewAnecdote = async (event) => {
        event.preventDefault()

        const content = event.target.content.value 
        event.target.content.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
    }

    return (
        <form onSubmit={createNewAnecdote}>
            <div><input name="content"/></div>
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm