export const reducerVote = (id) => {
  return {
    type: 'VOTE',
    payload: {
      id
    }
  }
}