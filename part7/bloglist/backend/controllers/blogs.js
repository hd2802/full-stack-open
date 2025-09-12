const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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
        user: user._id,
        comments: body.comments || []
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

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const { comment } = request.body
  const user = request.user

  if(!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  if(!comment) {
    return response.status(400).json({ error: 'comment content missing' })
  }

  const blog = await Blog.findById(request.params.id)
  
  if(!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  blog.comments = blog.comments.concat(comment)
  await blog.save()

  const updatedBlog = await Blog.findById(request.params.id)
    .populate('user', { username: 1, name: 1 })

  response.json(updatedBlog)
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

module.exports = blogsRouter