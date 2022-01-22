const notesRouter = require('express').Router()
const Note        = require('../models/note')

notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(result => {
      if(result){
        response.json(result)
      } else {
        response.status(404).send()
      }
    })
    .catch(error => next(error))
})

notesRouter.post('/', (request, response, next) => {
  const body = request.body

  if(body.content === undefined)
  {
    return  response.send(400).json({
      error: 'Missing content'
    })
  }

  const newNote = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  newNote.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      if(result){
        response.send(`${request.params.id} has been deleted`)
      } else {
        response.send(`Unable to find id ${request.params.id}. No action taken.`)
      }
    })
    .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const temp = {
    content:   body.content,
    important: body.important
  }

  Note.findByIdAndUpdate(request.params.id, temp, { new: true })
    .then(result => {
      if(result){
        response.json(result)
      } else {
        response.send(`Unable to find id ${request.params.id}. No action taken.`)
      }
    })
    .catch(error => next(error))
})

module.exports = notesRouter