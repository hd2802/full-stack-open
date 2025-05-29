const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const { title, author, url, likes } = request.body

  if (!title || !url ) {
    return response.status(400).json({ error : 'title or url is missing' })
  }

  const blog = new Blog({
    title, author, url, likes: likes ?? 0
  })

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter