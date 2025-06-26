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

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next (exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const { likes } = request.body

    Blog.findById(request.params.id)
        .then(blog => {
            if (!blog) {
                return response.status(404).end()
            }

            blog.likes = likes

            return blog.save().then((updatedBlog) => {
                response.json(updatedBlog)
            })
        })
        .catch(error => next(error))
})

module.exports = blogsRouter