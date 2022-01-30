const notesRouter = require('express').Router()
const Note        = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const result = await Note.findById(request.params.id)
  if(result){
    response.json(result)
  } else {
    response.status(404).end()
  }

})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }
  return null
}


notesRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log(decodedToken)

  if(!decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const newNote = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id
  })

  const savedNote = await newNote.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

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