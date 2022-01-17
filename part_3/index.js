let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
  ]

////////////////////////////

// Importing express and storing application into 'app'
const express = require('express')   
const app     = express()

const cors = require('cors')

/// Middleware
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:'  , request.path)
    console.log('Body:'  , request.body)
    console.log('---')
    next()
}

// Allows request.body from POST to become an object
app.use(express.json())
app.use(requestLogger)
app.use(cors())
app.use(express.static('build')) // Make express show static content (index.html and JS)



//Route1 : root
app.get('/', (request, response) => {
    response.send('<h1> Hello World!</h1>')
}) 

//Route2: HTTP GET notes
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

//Route3: GET single notes
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    
    if(note)
    {
        response.json(note)
    } else {
        response.status(404).end()
    }

})

//Route4: DELETE note
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0

    return maxId + 1;
}

//Route5: POST note
app.post('/api/notes', (request, response) => {
    const body = request.body
    if(!body.content){
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        id: generateId(),
        content: body.content,
        important: body.important || false,
        date: new Date()
    }
    console.log("newNote", note);

    notes = notes.concat(note)
    
    response.json(note)
})

//Route6: PUT note
app.put('/api/notes/:id', (request, response) => {
    notes = notes.map(temp => temp.id !== request.body.id ? temp : request.body)
    response.json(request.body)
})

const PORT =  process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})