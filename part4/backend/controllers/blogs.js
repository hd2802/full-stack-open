const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const likes = body.likes ? body.likes : 0

    const newBlog = new Blog ({
        "title": body.title,
        "author": body.author,
        "url": body.url,
        "likes": likes
    })

    newBlog.save()
        .then(savedBlog => {
            response.status(201).json(savedBlog)}
        )
        .catch(error => next(error))
})

module.exports = blogsRouter