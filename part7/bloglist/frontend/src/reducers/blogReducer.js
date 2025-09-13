import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { blogSort } from "../utils";

import { createNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
    appendBlog: (state, action) => {
      return state.concat(action.payload);
    },
    updateBlog: (state, action) => {
      return blogSort(
        state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog,
        ),
      );
    },
    removeBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
  },
});

export const initialiseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogSort(blogs)));
  };
};

export const addNewBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content);
      dispatch(appendBlog(newBlog));
      dispatch(
        createNotification(
          `${newBlog.title} by ${newBlog.author} added`,
          "success",
        ),
      );
    } catch (error) {
      console.log(error);
      dispatch(createNotification("Failed to add new blog", "error"));
    }
  };
};

export const addComment = (content, newComment) => {
  return async (dispatch) => {
    try {
      console.log(newComment)
      const returnedBlog = await blogService.addComment(content.id, newComment)
      dispatch(updateBlog(returnedBlog))
      dispatch(createNotification('added comment successfully', 'success'))
    } catch (error) {
      console.log(error)
      dispatch(createNotification("Failed to add a comment to the blog", "error"))
    }
  }
}

export const addLike = (content) => {
  return async (dispatch) => {
    try {
      const updatedBlog = {
        likes: content.likes + 1,
        author: content.author,
        title: content.title,
        url: content.url,
        user: content.user.id || content.user._id,
      };
      // needed to add the backend call here - before we weren't doing this and it created a success notification
      // but nothing was actually changing
      const returnedBlog = await blogService.update(content.id, updatedBlog);
      dispatch(updateBlog(returnedBlog));
      dispatch(createNotification(`${updatedBlog.title} was liked`, 'success'));
    } catch (error) {
      console.log(error);
      dispatch(createNotification("Failed to like the blog", "error"));
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id);
      // removeBlog was expecting the full blog object but I was only passing the blog.id
      // changing this meant that the state updated automatically
      dispatch(removeBlog(blog));
      dispatch(
        createNotification(`blog ${blog.title} by ${blog.author} removed`),
      );
    } catch (error) {
      console.log(error);
      dispatch(createNotification("Failed to delete the blog", "error"));
    }
  };
};

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions;

export default blogSlice.reducer;
