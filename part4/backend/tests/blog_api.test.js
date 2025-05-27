const { test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const CURRENT_NOTE_COUNT = 1

test('blogs are returned as json', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, CURRENT_NOTE_COUNT)
})

test('returned notes should have the valid id property', async () => {
    const response = await api.get('/api/blogs')
    let all_valid = true
    response.body.forEach((blog) => {
        // need now to check that each blog has _id renamed
        if (!Object.hasOwn(blog, 'id')) {
            all_valid = false
        }
    })
    assert.strictEqual(all_valid, true)
})

after(async () => {
    await mongoose.connection.close()
})