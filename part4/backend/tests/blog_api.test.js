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

    test('all blogs have id property', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => {
            assert.notStrictEqual(blog.id, undefined)
        })
    })
})

describe('adding a new blog post', async () => {
    test('a new blog post is added successfully', async () => {

        const newBlogObject = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
        }

        await api
            .post('/api/blogs')
            .send(newBlogObject)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    })

    test('the correct contents of the blog is added to the database', async () => {
        const newBlogObject = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
        }

        await api
            .post('/api/blogs')
            .send(newBlogObject)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        
        const titles = response.body.map(e => e.title)

        assert(titles.includes("Canonical string reduction"))
    })
})

describe('blog post field verification', async () => {
    test('adding a post without likes defaults the number of likes to 0', async () => {

        const newBlogObject = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlogObject)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const blogAsDatabaseObject = response.body

        assert.strictEqual(blogAsDatabaseObject.likes, 0)
        
    })

    test('adding a post without a title returns status code 400', async () => {
        const blogWithoutTitle = {
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
        }

        const response = await api
            .post('/api/blogs')
            .send(blogWithoutTitle)
            .expect(400)
    })

        test('adding a post without a url returns status code 400', async () => {
        const blogWithoutURL = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
        }

        const response = await api
            .post('/api/blogs')
            .send(blogWithoutURL)
            .expect(400)
    })
})

describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.getCurrentBlogs()
        const blogToDelete = blogsAtStart[0]

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    })
})

after(async () => {
    await mongoose.connection.close()
})