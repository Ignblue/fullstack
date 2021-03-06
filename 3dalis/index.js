require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())



morgan.token('person', (request, response) => JSON.stringify(request.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

let persons = [
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
    }
]

app.get('/info', (request, response) => {
 Person.find({}).then(persons=> {
   response.send
 (`<div>Phonebook has info for ${persons.length} people </div>
<div> ${new Date()} </div>`)
})
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

//app.get('/api/persons/:id', (request, response) => {
  //const id = Number(request.params.id)
  //const person = persons.find(person =>  person.id === id)
 //if (person) {
   //response.json(person)
 //} else {
   //response.status(404).end()
 ///}
//})
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


const generateId = () => {
  const maxId = persons.length > 0
    ? Math.floor(Math.random(...persons.map(n => n.id))*1000)
    : 0
  return maxId
}

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }
  
  //The name already exists in the phonebook
  //const result1 = persons.find((ele) => ele.name === body.name)

  //if (result1 !== undefined)
  //{
   // return response.status(400).json({
      //error: 'name already existing'
    //})
 // }
 
  const person = new Person ({
    name: body.name,
    number: body.number
  })
  
 person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson.toJSON())
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})