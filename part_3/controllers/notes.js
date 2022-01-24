const notesRouter = require('express').Router()
const Note        = require('../models/note')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const result = await Note.findById(request.params.id)
  response.json(result)

})

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const newNote = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  const savedNote = await newNote.save()
  response.status(201).json(savedNote)

})

notesRouter.delete('/:id', async (request, response) => {

  const result = await Note.findByIdAndDelete(request.params.id)
  if(result){
    response.status(204).send(`${request.params.id} has been deleted`)
  } else {
    response.send(`Unable to find id ${request.params.id}. No action taken.`)
  }
})

notesRouter.put('/:id', async (request, response) => {
  const body = request.body

  const temp = {
    content:   body.content,
    important: body.important
  }

  const result = await Note.findByIdAndUpdate(request.params.id, temp, { new: true })
  if(result){
    response.json(result)
  } else {
    response.send(`Unable to find id ${request.params.id}. No action taken.`)
  }

})

module.exports = notesRouter