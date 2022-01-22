const config      = require('./utils/config')
const express     = require('express')
const app         = express()
const cors        = require('cors')
const notesRouter = require('./controllers/notes')
const middleware  = require('./utils/middleware')
const logger      = require('./utils/logger')
const mongoose    = require('mongoose')

logger.info('connecting to', config.MONGODB)

mongoose.connect(config.MONGODB)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('Error connecting to MongoEB:' , error.message)
  })


// Allows request.body from POST to become an object
app.use(cors())
app.use(express.static('build')) // Make express show static content (index.html and JS)
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
