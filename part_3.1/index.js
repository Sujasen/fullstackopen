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

require('dotenv').config()
const express = require('express')
const morgan  = require('morgan')
const Person  = require('./models/person')

const app = express()


/// Middleware
const errorHandler = (error, request, response, next) => {
    console.error("Middleware:", error)

    if(error.name === 'CastError'){
        return response.status(400).send({error: "Middleware - Malformmed ID"})
    } else if (error.name === 'ValidationError'){
        return response.status(400).send(error.message)
     }

    next(error)
}

app.use(express.json())   //used for POST
//app.use(express.static('build'))


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
    Person.find({})
          .then(result => {
              const text = `Phonebook has info for ${result.length} people. <br\> <br\> ${new Date}`
              response.send(text)
          })
})

app.get('/api/persons', (request, response) => {
    Person.find({})
           .then(result => {
              response.json(result)
           })
})

app.get('/api/persons/:id', (request, response)=> {
    Person.findById(request.params.id)
          .then(result => {
              if(result){
                response.json(result)
              } else {
                  response.status(404).send(`Persons ID ${request.params.id} not found. No action taken.`)
              }
          })
          .catch(result => {
              response.status(404).end()
          })
          
    // const id     = Number(request.params.id);
    // const person = persons.find(temp => temp.id === id)

    // if(person)
    // {
    //     response.json(person)
    // } else {
    //     response.status(404).end()
    // }
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
           .then (result => {
               if(result){
                   response.send(`Person ID ${request.params.id} removed from MongoDB `);
               } else {
                   response.status(404).send(`Person ID ${request.params.id} was not found. No action taken`).end()
               }
           })
           .catch(error => next(error))
    // const id = Number(request.params.id)
    // if(persons.find(temp => temp.id === id)){
    //     persons = persons.filter(temp => temp.id !== id)
    //     response.send(`Person ${id} removed`).end()
    // } else {
    //     response.status(404).send(`Person ${id} not found`).end()
    // }
})

app.post('/api/persons', (request, response, next)=> {
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

    // let newId = Math.floor(Math.random() * 999999999)

    // while(persons.find(temp => temp.id === newId))
    // {
    //     console.log(`curId ${newId} matches, generating new id` )
    //     newId = Math.floor(Math.random() * 999999999)
    // }
    // console.log('newId', newId)

    
    const newPerson = new Person({
        // id:     newId,
        name:   name,
        number: number
    })

    newPerson.save()
             .then(result => {
                response.json(result)
            })
             .catch(error => next(error))
    // persons = persons.concat(newPerson)
    // console.log('newPerson', newPerson)
    // response.json(newPerson)

})

app.put('/api/persons/:id', (request, response) => {
    const body = request.body

    const newPerson = {
        name:   body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, newPerson, {new: true})
        .then(result => {
            console.log(result)
            if(result){
                response.json(result)
            } else {
                response.status(404).send(`Person ID ${request.params.id} was not found. No action taken.`).end()
            }
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server starting on ${PORT}`)
})

app.use(errorHandler)

