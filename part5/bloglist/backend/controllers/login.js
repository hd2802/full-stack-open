const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ username })

    // checks if the password sent matches the password set for the users, stores in boolean
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)
    
    if(!user || !passwordCorrect) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    // the payload for the json web token to authenticate and prove who the user is (who the token belongs to)
    const userForToken = {
        username: user.username,
        id: user._id
    }

    // this creates a token - contains the signed version of the username and id 
    const token = jwt.sign(userForToken, process.env.SECRET) // uses SECRET to sign it

    response
        .status(200)
        // sends back the token and the username (and name) of the user whom the token belongs to
        .send({ token, username: user.username, name: user.name})
    
})

module.exports = loginRouter