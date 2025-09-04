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

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })

    const returnedBlog = blog.save()
    response.json(returnedBlog)
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
    }
})

module.exports = blogsRouter