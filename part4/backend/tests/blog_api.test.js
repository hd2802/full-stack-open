const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')

// more custom imports
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

describe('fetching from the api', () => {
    test('returns blogs as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('returns all blogs', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('ensures all blogs have the appropriate id attribute', async () => {
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
})

describe('posting to the api', () => {
    test('adds a valid blog correctly', async () => {
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

    test('defaults likes to 0 unless specified', async () => {
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

    test('returns status code 400 if no title is given', async () => {
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

    test('returns status code 400 if no url is given', async () => {
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
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        const titles = blogsAtEnd.map(n => n.title)
        assert(!titles.includes(blogToDelete.title))

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
})  

describe('updating a blog', () => {
    test('updating the number of likes works correctly', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = {...blogsAtStart[0]}
        blogToUpdate.likes = 1000
        const initialLikes = blogToUpdate.likes

        await api.put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        const likes = blogsAtEnd.map(b => b.likes)
        assert(likes.includes(1000))

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})