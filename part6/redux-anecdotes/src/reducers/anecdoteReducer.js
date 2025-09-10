import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    reducerVote(state, action) {
      const id = action.payload
     return state.map(anecdote => (
      anecdote.id === id 
        ? {... anecdote, votes: anecdote.votes + 1}
        : anecdote
     ))
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { 
  createAnecdote,
  reducerVote,
  appendAnecdote,
  setAnecdotes
 } = anecdoteSlice.actions

export default anecdoteSlice.reducer


/** 
export const reducerVote = (id) => {
  return {
    type: 'VOTE',
    payload: {
      id
    }
  }
}

export const createAnecdote = (content) => {
    return {
        type: 'NEW_ANECDOTE',
        payload: {
            content,
            id: getId(),
        }
    }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.payload.id
      // need to find the matching anecdote to the id 
      // then update the number of votes for that specific anecdote
      // then need to keep the rest of the ancedotes the same
      // state is an array of objects so we can use the map function on it 
      const newState = state.map(anecdote => (
        anecdote.id === id 
          // need to copy all the current values FIRST, before overriding the desired value
          ? { ... anecdote, votes: anecdote.votes + 1}
          : anecdote
      ))
      return newState
    
    case 'NEW_ANECDOTE':
      return [... state, {id: action.payload.id, content: action.payload.content, votes: 0}]

    default:
      return state
  }
}

export default reducer
*/