const express = require('express')
const mongoose = require('mongoose')

// middleware and config imports
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./middleware/middleware')

// router imports
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

// app config
const app = express()
app.use(express.json())

const mongoUrl = config.MONGODB_URI

try {
    mongoose.connect(mongoUrl)
} catch (error) {
    logger.info('error connecting to MongoDB: ', error)
}

// router connections
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

// middleware connections
app.use(middleware.requestLogger)

module.exports = app