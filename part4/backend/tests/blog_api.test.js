const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const helper = require('./helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

describe('data base connection', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })  

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        const initialBlogs = helper.initialBlogs
        assert.strictEqual(response.body.length, initialBlogs.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})