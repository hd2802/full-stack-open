const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDatabase()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDatabase()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creating fails with a non-unique username', async () => {
    const usersAtStart = await helper.usersInDatabase()

    const newUser = {
        username: 'root',
        password: 'test'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    
    const usersAtEnd = await helper.usersInDatabase()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

describe('adding a new user', () => {
    test('fails if the username is less than 3 characters long', async () => {
        const usersAtStart = await helper.usersInDatabase()

        const newUser = {
            username: 'l',
            password: 'test'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        const usersAtEnd = await helper.usersInDatabase()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('fails if the password is less than 3 characters long', async () => {
        const usersAtStart = await helper.usersInDatabase()
        
        const newUser = {
            username: 'test',
            password: 'b'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        const usersAtEnd = await helper.usersInDatabase()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})