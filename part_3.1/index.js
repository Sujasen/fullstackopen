let persons  = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    { 
        "id": 5,
        "name": "Mega Man", 
        "number": "12-65-2133121"
    }
]
////////////////////////////////////////////////

const express = require('express')
const { token } = require('morgan')
const app = express()
const morgan = require('morgan')

app.use(express.json())   //used for POST




app.use(morgan( function (tokens, req, res) {
    console.log()
    if(tokens.method(req, res) === 'POST')
    {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req,res), 'ms',
            `${JSON.stringify(persons.at(-1))}`

        ].join(' ')
    } else {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req,res), 'ms',
        ].join(' ')  
    }
  }))

app.get('/', (request, response) => {
    response.send('Welcome to Persons API.')
})

app.get('/info', (request, response) => {
    const personCount = persons.length
    const info        = `Phonebook has info for ${personCount} people.`
    const newLine     ='<br\>'
    const dateTime    = new Date();

    response.send(info + newLine + newLine + dateTime)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response)=> {
    const id     = Number(request.params.id);
    const person = persons.find(temp => temp.id === id)

    if(person)
    {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    if(persons.find(temp => temp.id === id)){
        persons = persons.filter(temp => temp.id !== id)
        response.send(`Person ${id} removed`).end()
    } else {
        response.status(404).send(`Person ${id} not found`).end()
    }
})




app.post('/api/persons', (request, response)=> {
    const body   = request.body
    const name   = body.name
    const number = body.number

    if(!name){
        return response.status(400).json({
            error:'name missing'
        })
    } else if (!number) {
        return response.status(400).json({
            error:'number missing'
        })
    } else if (persons.find(temp => temp.name === name))
    {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    let newId = Math.floor(Math.random() * 999999999)

    while(persons.find(temp => temp.id === newId))
    {
        console.log(`curId ${newId} matches, generating new id` )
        newId = Math.floor(Math.random() * 999999999)
    }
    console.log('newId', newId)
    const newPerson = {
        id:     newId,
        name:   name,
        number: number
    }

    persons = persons.concat(newPerson)
    //console.log('newPerson', newPerson)

    response.json(newPerson)

})

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server starting on ${PORT}`)
})



