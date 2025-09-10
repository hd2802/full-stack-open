import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification: (state, action) => {
            return action.payload
        },
        removeNotification: (state, action) => {
            return ''
        }
    }
})

export const createNotification = (content) => {
    return dispatch => {
        dispatch(setNotification(content))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }
}

// need to export these for them to be useable - even within this own file
// notifications did not work without it
export const { setNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer