import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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

 export const initialiseAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
 }

export default anecdoteSlice.reducer
