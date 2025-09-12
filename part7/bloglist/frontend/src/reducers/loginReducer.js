import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";
import storageService from "../services/storage";
import blogService from "../services/blogs";

import { createNotification } from "./notificationReducer";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    logIn: (state, action) => {
      return action.payload;
    },
    logOut: () => {
      return null;
    },
  },
});

export const { logIn, logOut } = loginSlice.actions;

export const setUser = (loginCredentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(loginCredentials);
      storageService.saveUser(user);
      dispatch(logIn(user));
      blogService.setToken(user.token);
      dispatch(createNotification("Logged in successfully", "success"));
      return user;
    } catch (error) {
      console.log(error);
      dispatch(
        createNotification(
          "Login failed, please check username and/or password",
          "error",
        ),
      );
    }
  };
};

export const removeUser = () => {
  return async (dispatch) => {
    try {
      storageService.removeUser();
      dispatch(logOut());
    } catch (error) {
      console.log(error);
      dispatch(createNotification("Logout failed", "error"));
    }
  };
};

export const restoreUser = (user) => {
  return (dispatch) => {
    dispatch(logIn(user));
    blogService.setToken(user.token);
  };
};

export default loginSlice.reducer;
