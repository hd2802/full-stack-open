// custom imports
const logger = require('../utils/logger')

// npm imports
const mongoose =  require('mongoose')
require('dotenv').config()

const url = process.env.MONGO_URL
logger.info(url)

mongoose.set('strictQuery', false)
mongoose.connect(url)
    .then(() => {
        logger.info('connected to database')
    })
    .catch((error) => {
        logger.error('error connecting to database')
        logger.error(`${error}`)
    })

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})

module.exports = mongoose.model('Blog', blogSchema)