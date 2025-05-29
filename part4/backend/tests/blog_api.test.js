const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')

// more custom imports
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('all blogs have the appropriate id attribute', async () => {
    const blogs = await api.get('/api/blogs')

    // bit of a hack-y fix, but it works (for now)
    let valid = false
    blogs.body.forEach(blog => {
        if(!Object.hasOwn(blog, 'id')) {
            valid = false
        }
        else {
            valid = true
        }
    })
    assert.strictEqual(valid, true)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('Type wars'))
})

test('new blogs default to 0 likes unless specified', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const testBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
    }

    const response = await api
        .post('/api/blogs')
        .send(testBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const newBlog = response.body
    
    assert.strictEqual(newBlog.likes, 0)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)
})

test('new blogs without a url raise an error', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogWithoutURL = {
        title: "Type wars",
        author: "Robert C. Martin",
        likes: 10
    }

    await api
        .post('/api/blogs')
        .send(blogWithoutURL)
        .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
})

test('new blogs without a title raise an error', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogWithoutTitle = {
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 10
    }

    await api
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
})


after(async () => {
    await mongoose.connection.close()
})