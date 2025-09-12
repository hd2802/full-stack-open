import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import loginService from '../services/login'
import storageService from '../services/storage'

import { createNotification } from './notificationReducer'

const loginSlice = createSlice({
    name: 'login',
    initialState: null, //no user logged in by default
    reducers: {
        logIn: (state, action) => {
            return action.payload
        },
        // setting the current user to null means that no user information is stored - so no one is logged in 
        logOut: () => {
            return null
        }
    }
})

export const setCurrentUser = (loginCredentials) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login(loginCredentials)
            storageService.saveUser(user)
            blogService.setToken(user.token)
            dispatch(logIn(user))
        } catch (error) {
            dispatch(createNotification(`Failed to log in, please check either username or password`))
        }
    }
}

export const removeCurrentUser = () => {
    return async (dispatch) => {
        storageService.removeUser()
        blogService.setToken(null)
        dispatch(logOut())
    }
}

export const { logIn, logOut } = loginSlice.actions

export default loginSlice.reducer