const notesRouter = require('express').Router()
const Note        = require('../models/note')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
  const  result = await Note.findById(request.params.id).catch(error => next(error))

  if(result){
    response.json(result)
  } else {
    response.status(404).send()
  }

})

notesRouter.post('/', async (request, response, next) => {
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

  const savedNote = await newNote.save().catch(error => next(error))
  response.json(savedNote)

})

notesRouter.delete('/:id', async (request, response, next) => {
  const result = await Note.findByIdAndDelete(request.params.id).catch(error => next(error))
  if(result){
    response.send(`${request.params.id} has been deleted`)
  } else {
    response.send(`Unable to find id ${request.params.id}. No action taken.`)
  }
})

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const temp = {
    content:   body.content,
    important: body.important
  }

  const result = await Note.findByIdAndUpdate(request.params.id, temp, { new: true }).catch(error => next(error))
  if(result){
    response.json(result)
  } else {
    response.send(`Unable to find id ${request.params.id}. No action taken.`)
  }
})

module.exports = notesRouter