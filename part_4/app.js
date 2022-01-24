// REST backend application /api/blogs
const express    = require('express')
const app        = express()
require('express-async-errors')
const cors       = require('cors') 
const mongoose   = require('mongoose')
const logger     = require('./utils/logger')
const config     = require('./utils/config')
const blogRouter = require('./Controllers/blogController')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGO_URI)
        .then(() => {
            logger.info(`Connected to mongoDB ${config.MONGO_URI}`)
        } )
        .catch(error => {
            logger.error(`Error connecting MongoDB ${error}` )
        })

app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use(cors())
app.use(middleware.errorHandler)


module.exports = app