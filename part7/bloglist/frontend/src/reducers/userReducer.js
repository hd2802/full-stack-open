import { createSlice } from "@reduxjs/toolkit";

import userService from "../services/users";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
    appendUser: (state, action) => {
      return state.concat(action.payload);
    },
    removeUser: (state, action) => {
      return state.filter((user) => user.id !== action.payload.id);
    },
  },
});

export const initialiseUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export const { setUsers, appendUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
