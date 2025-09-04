const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there are initially some blogs', () => {
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

  test('all blogs have the id property', async () => {
    const response = await api.get('/api/blogs')
    const result = response.body[0]
    const keys = Object.keys(result)

    assert(keys.includes('id'))
    assert.strictEqual(keys.includes('_id'), false)
  
  })
})

describe('adding a new blog', () => {
  test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Test blog",
    author: "Test Author",
    url: "testurl.com",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDatabase()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  assert(titles.includes("Test blog"))

})

test('a blog added without likes defaults that likes to 0', async () => {
  await Blog.deleteMany({})

  const newBlog = {
    title: "Test blog",
    author: "Test Author",
    url: "testurl.com"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDatabase()  

  const titles = blogsAtEnd.map(b => b.title)
  assert(titles.includes("Test blog"))

  const blogToView = blogsAtEnd[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(resultBlog.body.likes, 0)
})

test('a blog without a title is not added to the database', async () => {
  const blogsAtStart = await helper.blogsInDatabase()

  const newBlog = {
    //title: "Test blog",
    author: "Test Author",
    url: "testurl.com",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
  const blogsAtEnd = await helper.blogsInDatabase()
  
  assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
})

test('a blog without a url is not added to the database', async () => {
  const blogsAtStart = await helper.blogsInDatabase()

  const newBlog = {
    title: "Test blog",
    author: "Test Author",
    //url: "testurl.com",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
  const blogsAtEnd = await helper.blogsInDatabase()
  
  assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
})
})

describe('deleting a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDatabase()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDatabase()

    const titles = blogsAtEnd.map(b => b.titles)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })
})


after(async () => {
    await mongoose.connection.close()
})