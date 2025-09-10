import {  useMutation, useQueryClient } from '@tanstack/react-query'
import {  createAnecdote } from '../requests'

import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const dispatchNotification = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    },
    onError: (res) => {
      notificationDispatch({ type: 'SET', payload: `${res.response.data.error}`})
      setTimeout(() => {
        notificationDispatch({type: 'CLEAR'})
      },5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content: content, votes: 0 })
    dispatchNotification({ type: 'SET', payload: `added ${content}`})
    setTimeout(() => {
      dispatchNotification({ type: 'RESET' })
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
