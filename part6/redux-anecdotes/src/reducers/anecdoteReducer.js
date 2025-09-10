import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state,action) {
      const id = action.payload
      const index = state.findIndex((a) => a.id === id)
      state[index].votes += 1
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
  appendAnecdote,
  setAnecdotes,
  addVote
 } = anecdoteSlice.actions

export const initialiseAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const increaseVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVote({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch(addVote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer
