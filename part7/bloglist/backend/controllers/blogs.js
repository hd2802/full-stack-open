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
        user: user._id
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
    const { user, likes, author, title, url } = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { 
        user: user,
        likes: likes,
        author: author,
        title: title,
        url: url
    }, {new: true})
    .populate('user', { username: 1, name: 1})
    
    // need to return a blog here, didnt before
    if(updatedBlog) {
        response.json(updatedBlog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.get('/:id/comments', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    if(blog) {
        response.json(blog.comments)
    } else {
        response.status(404).end()
    }
})

// very straightforward function, just saying that if a blog exists and a comment is sent to the request
// then POST it in comments
// we want to POST the new comment rather than PUT as PUT is for modifying an individual comment, not for adding a new one entirely
blogsRouter.post('/:id/comments', async (request, response, next) => {
    const { comment } = request.body
    // find the blog by the id
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).json({ error: 'Blog not found' })
    }

    if (!comment || comment.trim() === '') {
        return response.status(400).json({ error: 'Comment is missing or empty' })
    }

    // given the found blog, add the comment to the list of comments
    blog.comments = blog.comments.concat(comment)
    // then save the updated blog 
    const updatedBlog = await blog.save()

    response.status(201).json(updatedBlog.comments)
})


module.exports = blogsRouter