const jwt = require('jsonwebtoken')

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const User = require('../models/user')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    
    if(authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    } 
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const decodedToken = jwt.verify(getTokenFrom(request),process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }  
    
    const user = await User.findById(decodedToken.id)

    if (!user) {
        return response.status(400).json({ error: 'userID missing or not valid '})
    }

    const likes = body.likes ? body.likes : 0

    if(!body.title || !body.url) {
        response.status(400).end()
    }

    const newBlog = new Blog ({
        "title": body.title,
        "author": body.author,
        "url": body.url,
        "likes": likes,
        "user": user._id
    })

    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)

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