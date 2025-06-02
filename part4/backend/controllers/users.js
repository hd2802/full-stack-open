const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

// custom imports
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if(!password || !username) {
        return response.status(400).json({ error : 'either username or password is missing' })
    }

    if (password.length <= 3 || username.length <= 3 ) {
        return response.status(400).json({ error : 'username or password is too short' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter