let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

////////////////////////////

// Importing express and storing application into 'app'
require('dotenv').config()
const express  = require('express')
const mongoose = require('mongoose')
const cors     = require('cors')
const Note     = require('./models/note')



const app      = express()

/// Middleware
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:'  , request.path)
  console.log('Body:'  , request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error('middleware: ', error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({ error:'Middleware: Malformatted id' })
  } else if(error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// Allows request.body from POST to become an object
app.use(cors())
app.use(express.static('build')) // Make express show static content (index.html and JS)
app.use(express.json())
app.use(requestLogger)




//Route1 : root
app.get('/', (request, response) => {
  response.send('<h1> Hello World!</h1>')
})

//Route2: HTTP GET notes
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

//Route3: GET single notes
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if(note){
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))

  // const id = Number(request.params.id)
  // const note = notes.find(note => note.id === id)

  // if(note)
  // {
  //     response.json(note)
  // } else {
  //     response.status(404).end()
  // }

})

//Route4: DELETE note
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      if(result){
        response.send(`Note ID ${request.params.id} deleted.`).end()
      } else {
        response.status(404).send(`Note ID ${request.params.id} not found. No Action taken.`).end()
      }
    })
    .catch(error => next(error))

  // const id = Number(request.params.id)
  // notes = notes.filter(note => note.id !== id)

  // response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0

  return maxId + 1
}

//Route5: POST note
app.post('/api/notes', (request, response, next) => {
  const body = request.body
  if(body.content === undefined){
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    //id: generateId(),
    content: body.content,
    important: body.important || false,
    date: new Date()
  })
  console.log('newNote', note)

  note.save()
    .then(saveNote => {
      response.json(saveNote)
    })
    .catch(error => next(error))

  // notes = notes.concat(note)
  // response.json(note)
})

//Route6: PUT note
app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body
  const note = {
    content: body.content,
    important: body.important
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
    // notes = notes.map(temp => temp.id !== request.body.id ? temp : request.body)
    // response.json(request.body)
})

const PORT =  process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})

app.use(errorHandler)