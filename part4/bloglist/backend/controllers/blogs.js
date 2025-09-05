const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', {username: 1, name: 1})
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

    const user = await User.findOne()

    if(!user) {
        return response.status(500).json({ error: 'No users found in the database' })
    }

    if(!body.title || !body.url ) {
        return response.status(400).end()
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const returnedBlog = await blog.save()
    user.blogs = user.blogs.concat(returnedBlog._id)
    await user.save()

    const populatedBlog = await returnedBlog.populate('user', { username: 1, name: 1 })

    response.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const { likes } = request.body
    await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true })
    return response.status(204).end()
})

module.exports = blogsRouter