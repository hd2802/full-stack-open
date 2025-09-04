const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
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

    if(!body.title || !body.url ) {
        return response.status(400).end()
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
    })

    const returnedBlog = await blog.save()
    response.status(201).json(returnedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndDelete(request.params.id)
})

blogsRouter.put('/:id', async (request, response, next) => {
    // not sure on other properties to be updated yet
    const { likes } = request.body

    const blog = Blog.findById(request.params.id)
    if(blog) {
        blog.likes = likes
        await blog.save()
    } else {
        response.status(404).end()
    }
})

module.exports = blogsRouter