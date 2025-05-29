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

after(async () => {
    await mongoose.connection.close()
})