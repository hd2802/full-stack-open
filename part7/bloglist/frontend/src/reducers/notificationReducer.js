import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: "", type: "" },
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
    removeNotification: (state, action) => {
      return { message: "", type: "" };
    },
  },
});

export const createNotification = (content, type) => {
  return (dispatch) => {
    dispatch(setNotification({ message: content, type }));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
};

export const { setNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
