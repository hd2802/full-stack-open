import { createSlice } from "@reduxjs/toolkit"

import loginService from "../services/login"
import storageService from "../services/storage"

import { createNotification } from "./notificationReducer"

const loginSlice = createSlice({
    name: "login",
    initialState: null,
    reducers: {
        logIn: (state, action) => {
            return action.payload
        },
        logOut: () => {
            return null
        }
    }
})

export const { logIn, logOut } = loginSlice.actions

export const setUser = (loginCredentials) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login(loginCredentials)
            storageService.saveUser(user)
            dispatch(logIn(user))
            dispatch(createNotification("Logged in successfully", "success"));
            return user
        } catch (error) {
            console.log(error)
            dispatch(createNotification('Login failed, please check username and/or password', 'error'))
        }
    }
}

export const removeUser = () => {
    return async (dispatch) => {
        try {
            storageService.removeUser()
            dispatch(logOut())
        } catch (error) {
            console.log(error)
            dispatch(createNotification('Logout failed', 'error'))
        }
    }
}

export default loginSlice.reducer