const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { request } = require('express')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    if(blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const user = request.user

    if(!user) {
        return response.status(400).json({ error: 'userId missing or not valid' })
    }

    if(!body.title || !body.url ) {
        return response.status(400).end()
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        comments: body.comments || [],
        user: user._id,
    })

    const returnedBlog = await blog.save()
    // update the user database entry to include the new blog post id in blogs[]
    user.blogs = user.blogs.concat(returnedBlog._id)
    await user.save()

    response.status(201).json(returnedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const body = request.body

    const user = request.user

    if(!user) {
        return response.status(400).json({ error: 'userId missing or not valid' })
    }

    const blog = await Blog.findById(request.params.id)

    if(blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    }
    return response.status(400).json({ error: 'blog to delete is not created by this user' })
})

blogsRouter.put('/:id', async (request, response, next) => {
    const { user, likes, author, title, url, comments } = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { 
        user: user,
        likes: likes,
        author: author,
        title: title,
        url: url,
        comments: comments
    }, {new: true})
    .populate('user', { username: 1, name: 1})
    
    // need to return a blog here, didnt before
    if(updatedBlog) {
        response.json(updatedBlog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.get('/:id/comments', async(request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    if(blog) {
        response.json(blog.comments)
    } else {
        response.status(404).end()
    }
})

blogsRouter.put('/:id/comments', async(request, response, next) => {
    const { comment } = request.body
    if(!comment || comment.length <= 0) {
        return response.json(400).json({ error: 'Invalid comment' })
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        // take the current field and push the new comment, don't need to manipulate the rest of the
        // object directly
        { $push: {comments: comment}},
        {new : true}
    )

    if (updatedBlog) {
        response.json(updatedBlog)
    } else {
        response.status(404).end()
    }
})

module.exports = blogsRouter