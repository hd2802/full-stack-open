const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)        
    } catch (exception) {
        next(excpetion)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const likes = body.likes ? body.likes : 0

    if(!body.title || !body.url) {
        response.status(400).end()
    }

    const newBlog = new Blog ({
        "title": body.title,
        "author": body.author,
        "url": body.url,
        "likes": likes
    })

    try {
        const savedBlog = await newBlog.save()
        response.status(201).json(savedBlog)
    } catch (exception) {
        next(exception)
    }

})

module.exports = blogsRouter