const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

const initialUser = {
  username: 'testuser',
  password: 'testpassword',
  name: 'Test User'
}

let token = null

const createUserAndGetToken = async () => {
  await User.deleteMany({})
  await api.post('/api/users').send(initialUser)

  const loginResponse = await api.post('/api/login').send({
    username: initialUser.username,
    password: initialUser.password
  })

  // return the token belonging to the user
  return loginResponse.body.token
}

// function allows authorization for a user before making blog requests
// all functions go through this user so the tests now function correctly
beforeEach(async () => {
  await Blog.deleteMany({})
  token = await createUserAndGetToken()

  // Get the user from DB
  const user = await User.findOne({ username: initialUser.username })

  // Add user reference to each blog
  const blogsWithUser = helper.initialBlogs.map(blog => ({
    ...blog,
    user: user._id
  }))

  await Blog.insertMany(blogsWithUser)
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
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
      author: "Test Author",
      url: "testurl.com",
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDatabase()

    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })
})

describe('updating the likes of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDatabase()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDatabase()
    const updated = blogsAtEnd.find(b => b.id === blogToUpdate.id)

    assert.strictEqual(updated.likes, blogToUpdate.likes + 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})
