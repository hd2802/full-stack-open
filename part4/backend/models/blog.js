const mongoose = require('mongoose')

// custom imports
const config = require('../utils/config')
const logger = require('../utils/logger')

mongoose.set('strictQuery', false)

const url = config.MONGODB_URI

logger.info('attempting connection to MongoDB database')
mongoose.connect(url)
    .then(() => {
        logger.info('succesfully connected to MongoDB ')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB: ', error.message)
    })

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)