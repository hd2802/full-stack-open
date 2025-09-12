import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { blogSort } from '../utils'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs: (state, action) => {
            return action.payload
        },
        appendBlog: (state, action) => {
            return state.concat(action.payload)
        }
    }
})

export const initialiseBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogSort(blogs)))
    }
}

export const addNewBlog = (content) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.create(content)
            dispatch(appendBlog(newBlog))
        } catch (error) {
            console.log(error)
        }
    }
}

export const { setBlogs, appendBlog } = blogSlice.actions

export default blogSlice.reducer